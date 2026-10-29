/**
 * Formulário de contato: função da Vercel (POST /api/contact).
 *
 * Recebe a mensagem do site, confere as travas anti-spam e envia um e-mail
 * em texto puro pelo Resend.
 *
 * Variáveis de ambiente (Vercel > Settings > Environment Variables):
 *   TURNSTILE_SECRET_KEY  chave secreta do widget do Cloudflare Turnstile
 *   RESEND_API_KEY        chave de API do Resend (permissão "Sending access")
 *   CONTACT_TO_EMAIL      e-mail que recebe as mensagens
 *   CONTACT_FROM_EMAIL    remetente: um e-mail de domínio verificado no Resend
 *                         ou onboarding@resend.dev
 *
 * As regras de validação também estão no js/main.js. Mantenha as duas iguais.
 */
'use strict';

const LIMITS = {
    nameMin: 2,
    nameMax: 100,
    emailMax: 254,
    messageMin: 10,
    messageMax: 3000,
    maxLinks: 3,
};
const MIN_FILL_TIME_MS = 3000;
const MAX_BODY_BYTES = 10 * 1024;
const REQUEST_TIMEOUT_MS = 8000;
const TURNSTILE_ACTION = 'contact';
const TURNSTILE_MAX_TOKEN_LENGTH = 2048;

// Chaves secretas de teste da Cloudflare: com elas o domínio e a ação não são conferidos
const TURNSTILE_TEST_SECRETS = [
    '1x0000000000000000000000000000000AA',
    '2x0000000000000000000000000000000AA',
    '3x0000000000000000000000000000000AA',
];

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}' ’.-]*$/u;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
const LINK_RE = /https?:\/\/|www\./gi;
// Caracteres invisíveis usados para disfarçar textos (direção do texto, largura zero)
const INVISIBLE_RE = /[­​-‏‪-‮⁠-⁤⁦-⁩﻿]/g;
// Caracteres de controle, menos tab e quebra de linha
const CONTROL_RE = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g;
const DOMAIN_RE = /(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?\.)+\p{L}{2,}/gu;
const IPV4_RE = /\b\d{1,3}(?:\.\d{1,3}){3}\b/g;

module.exports = async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return reply(res, 405, 'method');
    }

    const host = getHost(req);
    const ip = getIp(req);

    // 1. Só aceita envios feitos a partir do próprio site
    if (!isSameOrigin(req, host)) {
        log('recusado: origem diferente', ip, req.headers.origin);
        return reply(res, 403, 'origin');
    }

    // 2. Formato e tamanho do pedido
    const contentType = String(req.headers['content-type'] || '').toLowerCase();
    if (!contentType.startsWith('application/json')) {
        return reply(res, 415, 'validation');
    }
    if (Number(req.headers['content-length'] || 0) > MAX_BODY_BYTES) {
        return reply(res, 413, 'validation');
    }

    let body;
    try {
        body = req.body;
    } catch (err) {
        return reply(res, 400, 'validation');
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return reply(res, 400, 'validation');
    }
    if (JSON.stringify(body).length > MAX_BODY_BYTES) {
        return reply(res, 413, 'validation');
    }

    // 3. Campo armadilha preenchido: responde "enviado" e descarta, para o robô não perceber
    if (body.website !== '') {
        log('descartado: campo armadilha', ip);
        return reply(res, 200);
    }

    // 4. Enviado rápido demais para ter sido preenchido por uma pessoa
    if (typeof body.elapsed !== 'number' || !(body.elapsed >= MIN_FILL_TIME_MS)) {
        log('descartado: enviado rápido demais', ip);
        return reply(res, 200);
    }

    // 5. Validação dos campos
    const result = validate(body);
    if (!result.ok) {
        log(`recusado: campo inválido (${result.field})`, ip);
        return reply(res, 400, 'validation', { field: result.field });
    }
    const data = result.data;

    const env = {
        secret: (process.env.TURNSTILE_SECRET_KEY || '').trim(),
        apiKey: (process.env.RESEND_API_KEY || '').trim(),
        to: (process.env.CONTACT_TO_EMAIL || '').trim(),
        from: (process.env.CONTACT_FROM_EMAIL || '').trim(),
    };
    if (!env.secret || !env.apiKey || !env.to || !env.from) {
        console.error('[contato] faltam variáveis de ambiente: TURNSTILE_SECRET_KEY, RESEND_API_KEY, CONTACT_TO_EMAIL ou CONTACT_FROM_EMAIL');
        return reply(res, 500, 'server');
    }

    // 6. Verificação anti-robô (Cloudflare Turnstile)
    const token = typeof body.token === 'string' ? body.token : '';
    if (!token || token.length > TURNSTILE_MAX_TOKEN_LENGTH) {
        log('recusado: sem token do Turnstile', ip);
        return reply(res, 403, 'captcha');
    }
    const captcha = await verifyTurnstile(token, ip, host.replace(/:\d+$/, ''), env.secret);
    if (!captcha.ok) {
        log(`recusado: Turnstile (${captcha.reason})`, ip);
        return captcha.unavailable ? reply(res, 502, 'server') : reply(res, 403, 'captcha');
    }

    // 7. Envio do e-mail
    const meta = {
        date: formatDate(new Date()),
        ip,
        location: getLocation(req),
        userAgent: defang(cleanLine(String(req.headers['user-agent'] || '')).slice(0, 300)),
        host,
    };

    let sent;
    try {
        sent = await sendEmail(env, data, meta);
    } catch (err) {
        console.error('[contato] falha ao chamar o Resend:', err.message);
        return reply(res, 502, 'server');
    }
    if (!sent.ok) {
        console.error(`[contato] Resend recusou o envio (${sent.status} ${sent.name}): ${sent.message}`);
        const quota = ['daily_quota_exceeded', 'monthly_quota_exceeded', 'rate_limit_exceeded'];
        return quota.includes(sent.name) ? reply(res, 503, 'unavailable') : reply(res, 502, 'server');
    }

    return reply(res, 200);
};

function reply(res, status, error, extra) {
    const body = error ? Object.assign({ ok: false, error }, extra) : { ok: true };
    return res.status(status).json(body);
}

function log(reason, ip, detail) {
    console.warn(`[contato] ${reason}`, ip || 'IP desconhecido', detail || '');
}

function getHost(req) {
    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    return String(host).split(',')[0].trim().toLowerCase();
}

function getIp(req) {
    const ip = req.headers['x-real-ip'] || String(req.headers['x-forwarded-for'] || '').split(',')[0];
    return String(ip || '').trim().slice(0, 64);
}

function isSameOrigin(req, host) {
    const origin = req.headers.origin;
    if (!origin || !host) {
        return false;
    }
    try {
        return new URL(origin).host.toLowerCase() === host;
    } catch (err) {
        return false;
    }
}

function getLocation(req) {
    const decode = (value) => {
        try {
            return decodeURIComponent(String(value || ''));
        } catch (err) {
            return '';
        }
    };
    const parts = [
        decode(req.headers['x-vercel-ip-city']),
        decode(req.headers['x-vercel-ip-country-region']),
        decode(req.headers['x-vercel-ip-country']),
    ].map((part) => cleanLine(part).slice(0, 60)).filter(Boolean);
    return parts.join(', ');
}

// Texto de uma linha: sem caracteres invisíveis/de controle e com espaços simples
function cleanLine(value) {
    return value
        .normalize('NFC')
        .replace(INVISIBLE_RE, '')
        .replace(CONTROL_RE, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Texto com várias linhas: mantém as quebras, mas no máximo uma linha em branco seguida
function cleanText(value) {
    return value
        .normalize('NFC')
        .replace(/\r\n?/g, '\n')
        .replace(INVISIBLE_RE, '')
        .replace(CONTROL_RE, '')
        .replace(/[ \t]+$/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function validate(body) {
    const fields = ['name', 'email', 'message'];
    for (const field of fields) {
        if (typeof body[field] !== 'string') {
            return { ok: false, field };
        }
    }

    // Quebra de linha no nome ou no e-mail é tentativa de injetar cabeçalhos no e-mail
    if (/[\r\n]/.test(body.name)) {
        return { ok: false, field: 'name' };
    }
    if (/[\r\n]/.test(body.email)) {
        return { ok: false, field: 'email' };
    }

    const name = cleanLine(body.name);
    const email = cleanLine(body.email);
    const message = cleanText(body.message);

    if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax || !NAME_RE.test(name)) {
        return { ok: false, field: 'name' };
    }
    if (email.length > LIMITS.emailMax || email.split('@')[0].length > 64 || !EMAIL_RE.test(email)) {
        return { ok: false, field: 'email' };
    }
    if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax) {
        return { ok: false, field: 'message' };
    }
    if ((message.match(LINK_RE) || []).length > LIMITS.maxLinks) {
        return { ok: false, field: 'message' };
    }

    return { ok: true, data: { name, email, message } };
}

// Desativa links para não serem clicados por engano: https://site.com -> hxxps[://]site[.]com
function defang(text) {
    return text
        .replace(/\b([a-z][a-z0-9+.-]*):\/\//gi, (match, scheme) => scheme.replace(/^http/i, 'hxxp') + '[://]')
        .replace(DOMAIN_RE, (match) => match.replace(/\./g, '[.]'))
        .replace(IPV4_RE, (match) => match.replace(/\./g, '[.]'));
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(date);
}

async function verifyTurnstile(token, ip, hostname, secret) {
    const params = new URLSearchParams({ secret, response: token });
    if (ip) {
        params.set('remoteip', ip);
    }

    let result;
    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: params,
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });
        result = await response.json();
    } catch (err) {
        return { ok: false, unavailable: true, reason: `falha ao consultar a Cloudflare: ${err.message}` };
    }

    if (!result || result.success !== true) {
        const codes = (result && result['error-codes']) || [];
        const configError = codes.includes('missing-input-secret') || codes.includes('invalid-input-secret');
        return { ok: false, unavailable: configError, reason: codes.join(', ') || 'sem detalhes' };
    }
    if (!TURNSTILE_TEST_SECRETS.includes(secret)) {
        if (result.hostname !== hostname) {
            return { ok: false, reason: `domínio diferente: ${result.hostname}` };
        }
        if (result.action !== TURNSTILE_ACTION) {
            return { ok: false, reason: `ação diferente: ${result.action}` };
        }
    }
    return { ok: true };
}

async function sendEmail(env, data, meta) {
    const from = env.from.includes('<') ? env.from : `Contato Portfolio <${env.from}>`;

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${env.apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to: [env.to],
            reply_to: data.email,
            // Assunto fixo: o visitante não escolhe o que aparece na sua caixa de entrada
            subject: `Nova mensagem do portfólio - ${meta.date}`,
            text: buildText(data, meta),
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (response.ok) {
        return { ok: true };
    }
    const error = await response.json().catch(() => ({}));
    return { ok: false, status: response.status, name: error.name || '', message: error.message || '' };
}

function buildText(data, meta) {
    return [
        'ATENÇÃO: mensagem enviada pelo formulário de contato do portfólio.',
        'O nome, o e-mail e o texto abaixo foram digitados pelo visitante e NÃO foram verificados.',
        'Os links foram desativados de propósito. Não informe senhas ou dados pessoais a partir desta mensagem.',
        'Para responder, use "Responder": a resposta vai para o e-mail informado pelo visitante.',
        '',
        '----------------------------------------',
        `Nome: ${defang(data.name)}`,
        `E-mail: ${data.email}`,
        '',
        'Mensagem:',
        defang(data.message),
        '----------------------------------------',
        '',
        `Enviado em: ${meta.date} (horário de Brasília)`,
        `IP: ${meta.ip || 'desconhecido'}`,
        `Local: ${meta.location || 'desconhecido'}`,
        `Navegador: ${meta.userAgent || 'desconhecido'}`,
        `Site: ${meta.host}`,
    ].join('\n');
}