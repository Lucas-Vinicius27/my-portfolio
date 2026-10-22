(function ($) {
	"use strict";

// Preloader
$(window).on('load', function () {
	$('.lds-ellipsis').fadeOut(); // will first fade out the loading animation
	$('.preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(333);
});


// Header Sticky
$(window).on('scroll',function() {
	var stickytop = $('#header.sticky-top .bg-transparent');
	var stickytopslide = $('#header.sticky-top-slide');
	
	if ($(this).scrollTop() > 1){  
		stickytop.addClass("sticky-on-top");
		stickytop.find(".logo img").attr('src',stickytop.find('.logo img').data('sticky-logo'));
	}
	else {
		stickytop.removeClass("sticky-on-top");
		stickytop.find(".logo img").attr('src',stickytop.find('.logo img').data('default-logo'));
	}
	
	if ($(this).scrollTop() > 180){  
		stickytopslide.find(".primary-menu").addClass("sticky-on");
		stickytopslide.find(".logo img").attr('src',stickytopslide.find('.logo img').data('sticky-logo'));
	}
	else{
		stickytopslide.find(".primary-menu").removeClass("sticky-on");
		stickytopslide.find(".logo img").attr('src',stickytopslide.find('.logo img').data('default-logo'));
	}
});


// Sections Scroll
if($("body").hasClass("side-header")){
$('.smooth-scroll').on('click', function() {
	event.preventDefault();
    var sectionTo = $(this).attr('href');
	$('html, body').stop().animate({
      scrollTop: $(sectionTo).offset().top}, 1500, 'easeInOutExpo');
});
   }else {
$('.smooth-scroll').on('click', function() {
	event.preventDefault();
    var sectionTo = $(this).attr('href');
	$('html, body').stop().animate({
      scrollTop: $(sectionTo).offset().top - 50}, 1500, 'easeInOutExpo');
});
}

// Mobile Menu
$('.navbar-toggler').on('click', function() {
	$(this).toggleClass('show');
});
$(".navbar-nav a").on('click', function() {
    $(".navbar-collapse, .navbar-toggler").removeClass("show");
});

// Overlay Menu & Side Open Menu
$('.navbar-side-open .collapse, .navbar-overlay .collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
    e.preventDefault();
}),
$('.navbar-side-open [data-bs-toggle="collapse"], .navbar-overlay [data-bs-toggle="collapse"]').on('click', function(e) {
   e.preventDefault();
   $($(this).data('target')).toggleClass('show');
})

/*---------------------------------
   Carousel (Owl Carousel)
----------------------------------- */
$(".owl-carousel").each(function (index) {
    var a = $(this);
	if ($("html").attr("dir") == 'rtl') {
		var rtlVal = true
	}else{
		var rtlVal = false
    }
	$(this).owlCarousel({
		rtl: rtlVal,
		autoplay: a.data('autoplay'),
		center: a.data('center'),
		autoplayTimeout: a.data('autoplaytimeout'),
		autoplayHoverPause: a.data('autoplayhoverpause'),
		loop: a.data('loop'),
		speed: a.data('speed'),
		nav: a.data('nav'),
		dots: a.data('dots'),
		autoHeight: a.data('autoheight'),
		autoWidth: a.data('autowidth'),
		margin: a.data('margin'),
		stagePadding: a.data('stagepadding'),
		slideBy: a.data('slideby'),
		lazyLoad: a.data('lazyload'),
		navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		animateOut: a.data('animateout'),
		animateIn: a.data('animatein'),
		video: a.data('video'),
		items: a.data('items'),
		responsive:{
        0:{items: a.data('items-xs'),},
        576:{items: a.data('items-sm'),},
		768:{items: a.data('items-md'),},
        992:{items: a.data('items-lg'),}
        }
    });
});

/*------------------------------------
    Magnific Popup
-------------------------------------- */
// Image on Modal
$('.popup-img-gallery').each(function() {
$(this).magnificPopup({
    delegate: '.popup-img:visible',
	type: "image",
	tLoading: '<div class="preloader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>',
    closeOnContentClick: !0,
    mainClass: "mfp-fade",
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
    },
});
});

// Ajax On Modal 
$('.popup-ajax-gallery').each(function() {
$(this).magnificPopup({
	delegate: '.popup-ajax:visible',
    type: "ajax",
	tLoading: '<div class="preloader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>',
	mainClass: "mfp-fade",
	closeBtnInside: true,
	midClick: true,
	gallery: {
      enabled: true,
    },
	callbacks: {
		ajaxContentAdded: function() {
			$(".owl-carousel").each(function (index) {
			  var a = $(this);
			  // Com uma imagem só, não gira o carrossel (evita deslizar para uma cópia da mesma imagem)
			  var hasManyItems = a.children('.item').length > 1;
			  if ($("html").attr("dir") == 'rtl') {
		var rtlVal = true
	}else{
		var rtlVal = false
    }
	$(this).owlCarousel({
		rtl: rtlVal,
				autoplay: hasManyItems && a.data('autoplay'),
				center: a.data('center'),
				autoplayTimeout: a.data('autoplaytimeout'),
				autoplayHoverPause: a.data('autoplayhoverpause'),
				loop: hasManyItems && a.data('loop'),
				speed: a.data('speed'),
				nav: a.data('nav'),
				dots: a.data('dots'),
				autoHeight: a.data('autoheight'),
				autoWidth: a.data('autowidth'),
				margin: a.data('margin'),
				stagePadding: a.data('stagepadding'),
				slideBy: a.data('slideby'),
				lazyLoad: a.data('lazyload'),
				navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
				animateOut: a.data('animateOut'),
				animateIn: a.data('animateIn'),
				video: a.data('video'),
				items: a.data('items'),
				responsive:{
					0:{items: a.data('items-xs'),},
					576:{items: a.data('items-sm'),},
					768:{items: a.data('items-md'),},
					992:{items: a.data('items-lg'),}
				}	
                });
            });
         }
    }
});
});

// YouTube/Viemo Video & Gmaps
$('.popup-youtube, .popup-vimeo, .popup-gmaps').each(function() {
$(this).magnificPopup({
        type: 'iframe',
		mainClass: 'mfp-fade',
});
});


/*------------------------------------
    Isotope Portfolio Filter
-------------------------------------- */

$(window).on('load', function () {
$(".portfolio-filter").each(function() {
    var e = $(this);
	e.imagesLoaded(function () {
	if ($("html").attr("dir") == 'rtl') {
		var rtlVal = false
	}else{
		var rtlVal = true;
    }
	var $grid = e.isotope({
			layoutMode: "masonry",
			originLeft: rtlVal
		});
	$(".portfolio-menu").find("a").on("click", function() {
        var filterValue = $(this).attr("data-filter");
        return $(".portfolio-menu").find("a").removeClass("active"), $(this).addClass("active"), 
		$grid.isotope({
          filter: filterValue
        }), !1
    });
	});
	});
});

/*------------------------------------
    Parallax Background
-------------------------------------- */
$(".parallax").each(function () {
$(this).parallaxie({
	speed: 0.5,
});
});

/*------------------------------------
    Tempo de experiência
    (fica antes do Counter, que lê o data-to quando a animação começa)
-------------------------------------- */
const careerStart = new Date('12/01/2019'); // início do estágio na DuoSystem
const experienceDate = new Date(Date.now() - careerStart);
const years_experience = Math.abs(experienceDate.getUTCFullYear() - 1970);

document.querySelectorAll('.years-experience').forEach(function (el) {
	el.textContent = years_experience;
	el.setAttribute('data-to', years_experience);
});

/*------------------------------------
    Counter
-------------------------------------- */
$(".counter").each(function () {
    $(this).appear(function () {
        $(this).countTo({
			speed: 1800,
		});
    });
});

/*------------------------------------
    Typed
-------------------------------------- */

$(".typed").each(function() {
var typed = new Typed('.typed', {
    stringsElement: '.typed-strings',
	loop: true,
	typeSpeed: 100,
    backSpeed: 50,
	backDelay: 1500,
});
});


/*------------------------------------
    YTPlayer YouTube Background
-------------------------------------- */

$(".player").each(function () {
    $(this).mb_YTPlayer();
});


/*------------------------
   tooltips
-------------------------- */
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


/*------------------------
   Scroll to top
-------------------------- */
$(function () {
		$(window).on('scroll', function(){
			if ($(this).scrollTop() > 400) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		});
$('#back-to-top').on("click", function() {
	$('html, body').animate({scrollTop:0}, 'slow');
	return false;
});


/*------------------------
   Formulário de Contato
   Envia para a função da Vercel (api/contact.js), que confere tudo de novo no servidor.
   As regras de validação são as mesmas do servidor: mantenha as duas iguais.
-------------------------- */
	var CONTACT_LIMITS = { nameMin: 2, nameMax: 100, emailMax: 254, messageMin: 10, messageMax: 3000, maxLinks: 3 };
	var CONTACT_COOLDOWN_MS = 60000; // espera depois de um envio com sucesso
	var CONTACT_TIMEOUT_MS = 20000;
	var CONTACT_NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}' ’.-]*$/u;
	var CONTACT_EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
	var CONTACT_LINK_RE = /https?:\/\/|www\./gi;
	var CONTACT_ERRORS = {
		validation: 'Confira os dados do formulário e tente novamente.',
		captcha: 'Não foi possível confirmar que você não é um robô. Aguarde a verificação e tente novamente.',
		unavailable: 'O formulário está temporariamente indisponível.',
		server: 'Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.',
		tooMany: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.',
		network: 'Não foi possível conectar. Verifique sua internet e tente novamente.',
		captchaMissing: 'Não foi possível carregar a verificação anti-robô. Recarregue a página e tente novamente.',
		captchaPending: 'Aguarde a verificação anti-robô terminar e tente novamente.'
	};

	var contactForm = document.getElementById('contact-form');
	if (contactForm) {
		setupContactForm(contactForm);
	}

	function setupContactForm(form) {
		var submitBtn = document.getElementById('submit-btn');
		var statusBox = document.getElementById('contact-status');
		var captchaBox = document.getElementById('contact-captcha');
		var fields = {
			name: form.elements.namedItem('name'),
			email: form.elements.namedItem('email'),
			message: form.elements.namedItem('message'),
			website: form.elements.namedItem('website') // campo armadilha
		};
		var fallbackEmail = form.getAttribute('data-fallback-email') || '';
		var originalLabel = submitBtn.innerHTML;
		var readyAt = Date.now();
		var sending = false;
		var cooldownTimer = null;
		var widgetId = null;
		var widgetTheme = null;

		/* Verificação anti-robô (Cloudflare Turnstile) */
		function currentTheme() {
			return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
		}

		function renderCaptcha() {
			if (!window.turnstile || !captchaBox) {
				return;
			}
			if (widgetId !== null) {
				window.turnstile.remove(widgetId);
			}
			widgetTheme = currentTheme();
			widgetId = window.turnstile.render(captchaBox, {
				sitekey: captchaBox.getAttribute('data-sitekey'),
				action: 'contact',
				theme: widgetTheme,
				language: 'pt-br',
				'error-callback': function (code) {
					console.warn('Turnstile: erro ' + code);
					return true;
				}
			}) || null;
		}

		// Chamada pelo script do Turnstile quando ele termina de carregar (onload=onTurnstileLoad)
		window.onTurnstileLoad = renderCaptcha;
		if (window.turnstile) {
			renderCaptcha();
		}

		// O widget não troca de tema sozinho: é recriado com o tema novo
		document.addEventListener('themechange', function () {
			if (widgetId !== null && !sending && currentTheme() !== widgetTheme) {
				renderCaptcha();
			}
		});

		/* Validação (mostra o aviso no próprio campo) */
		function validateFields() {
			var limits = CONTACT_LIMITS;
			var name = fields.name.value.replace(/\s+/g, ' ').trim();
			var email = fields.email.value.trim();
			var message = fields.message.value.trim();
			var links = message.match(CONTACT_LINK_RE) || [];

			var nameError = '';
			if (name.length < limits.nameMin || name.length > limits.nameMax) {
				nameError = 'O nome deve ter entre ' + limits.nameMin + ' e ' + limits.nameMax + ' caracteres.';
			} else if (!CONTACT_NAME_RE.test(name)) {
				nameError = 'Use apenas letras no nome.';
			}

			var emailError = '';
			if (email.length > limits.emailMax || email.split('@')[0].length > 64 || !CONTACT_EMAIL_RE.test(email)) {
				emailError = 'Informe um e-mail válido, como nome@exemplo.com.';
			}

			var messageError = '';
			if (message.length < limits.messageMin) {
				messageError = 'A mensagem deve ter pelo menos ' + limits.messageMin + ' caracteres.';
			} else if (message.length > limits.messageMax) {
				messageError = 'A mensagem deve ter no máximo ' + limits.messageMax + ' caracteres.';
			} else if (links.length > limits.maxLinks) {
				messageError = 'A mensagem pode ter no máximo ' + limits.maxLinks + ' links.';
			}

			fields.name.setCustomValidity(nameError);
			fields.email.setCustomValidity(emailError);
			fields.message.setCustomValidity(messageError);
			return form.reportValidity();
		}

		// O aviso some assim que a pessoa volta a digitar no campo
		[fields.name, fields.email, fields.message].forEach(function (field) {
			field.addEventListener('input', function () {
				field.setCustomValidity('');
			});
		});

		/* Mensagens de retorno (sempre como texto, nunca como HTML) */
		function showStatus(type, text, withEmail) {
			var box = document.createElement('div');
			box.className = 'alert alert-' + type + ' text-center mb-0';
			box.appendChild(document.createTextNode(text));
			if (withEmail && fallbackEmail) {
				var link = document.createElement('a');
				link.className = 'alert-link';
				link.href = 'mailto:' + fallbackEmail;
				link.textContent = fallbackEmail;
				box.appendChild(document.createTextNode(' Se preferir, me escreva em '));
				box.appendChild(link);
				box.appendChild(document.createTextNode('.'));
			}
			statusBox.textContent = '';
			statusBox.appendChild(box);
		}

		function showError(status, code) {
			if (status === 429) {
				showStatus('warning', CONTACT_ERRORS.tooMany);
			} else if (code === 'validation' || code === 'captcha') {
				showStatus('danger', CONTACT_ERRORS[code]);
			} else if (code === 'unavailable') {
				showStatus('danger', CONTACT_ERRORS.unavailable, true);
			} else {
				showStatus('danger', CONTACT_ERRORS.server, true);
			}
		}

		/* Bloqueio de reenvio */
		function setSending(isSending) {
			sending = isSending;
			submitBtn.disabled = isSending;
			submitBtn.innerHTML = isSending
				? '<span class="spinner-border spinner-border-sm align-self-center me-2" aria-hidden="true"></span>Enviando...'
				: originalLabel;
		}

		function startCooldown(ms) {
			var endsAt = Date.now() + ms;
			clearInterval(cooldownTimer);
			submitBtn.disabled = true;

			function tick() {
				var secondsLeft = Math.ceil((endsAt - Date.now()) / 1000);
				if (secondsLeft <= 0) {
					clearInterval(cooldownTimer);
					cooldownTimer = null;
					submitBtn.disabled = false;
					submitBtn.innerHTML = originalLabel;
					return;
				}
				submitBtn.textContent = 'Aguarde ' + secondsLeft + 's';
			}

			cooldownTimer = setInterval(tick, 1000);
			tick();
		}

		function getLastSent() {
			try {
				return Number(localStorage.getItem('contactSentAt')) || 0;
			} catch (e) {
				return 0;
			}
		}

		function saveLastSent() {
			try {
				localStorage.setItem('contactSentAt', String(Date.now()));
			} catch (e) {}
		}

		// Recarregar a página não libera um novo envio antes do tempo
		var sinceLastSent = Date.now() - getLastSent();
		if (sinceLastSent >= 0 && sinceLastSent < CONTACT_COOLDOWN_MS) {
			startCooldown(CONTACT_COOLDOWN_MS - sinceLastSent);
		}

		/* Envio */
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			if (sending || cooldownTimer !== null) {
				return;
			}
			statusBox.textContent = '';

			if (!validateFields()) {
				return;
			}
			if (!window.turnstile) {
				showStatus('danger', CONTACT_ERRORS.captchaMissing, true);
				return;
			}
			var token = widgetId !== null ? window.turnstile.getResponse(widgetId) : '';
			if (!token) {
				showStatus('warning', CONTACT_ERRORS.captchaPending);
				return;
			}

			var payload = {
				name: fields.name.value,
				email: fields.email.value,
				message: fields.message.value,
				website: fields.website.value,
				elapsed: Date.now() - readyAt,
				token: token
			};

			setSending(true);
			var controller = typeof AbortController === 'function' ? new AbortController() : null;
			var timeout = setTimeout(function () {
				if (controller) {
					controller.abort();
				}
			}, CONTACT_TIMEOUT_MS);

			fetch(form.getAttribute('action'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify(payload),
				signal: controller ? controller.signal : undefined
			})
				.then(function (response) {
					return response.json()
						.catch(function () {
							return {};
						})
						.then(function (data) {
							return { status: response.status, ok: response.ok && data.ok === true, error: data.error };
						});
				})
				.then(function (result) {
					if (result.ok) {
						form.reset();
						saveLastSent();
						showStatus('success', 'Mensagem enviada! Obrigado pelo contato, respondo assim que possível.');
					} else {
						showError(result.status, result.error);
					}
					return result.ok;
				}, function () {
					showStatus('danger', CONTACT_ERRORS.network);
					return false;
				})
				.then(function (sent) {
					clearTimeout(timeout);
					setSending(false);
					// O token do Turnstile vale para um envio só
					if (window.turnstile && widgetId !== null) {
						window.turnstile.reset(widgetId);
					}
					if (sent) {
						startCooldown(CONTACT_COOLDOWN_MS);
					}
				});
		});
	}

	const birthday = new Date('09/27/1997');
	const current_date = Date.now();
	const ageDifMs = current_date - birthday;
	const ageDate = new Date(ageDifMs); // miliseconds from epoch
	const years_old = Math.abs(ageDate.getUTCFullYear() - 1970);

	document.getElementById('years_old').innerText = years_old;

	// Ano atual no rodapé
	document.getElementById('current-year').innerText = new Date().getFullYear();

/*------------------------
   Tema claro / escuro
   (o tema inicial é aplicado por um script no <head> do index.html)
-------------------------- */
	var root = document.documentElement;
	var themeSwitch = document.getElementById('theme-switch');

	function getSavedTheme() {
		try {
			return localStorage.getItem('theme');
		} catch (e) {
			return null;
		}
	}

	function applyTheme(theme) {
		root.setAttribute('data-theme', theme);
		if (themeSwitch) {
			themeSwitch.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
		}
		// Avisa outras partes da página (ex.: a verificação anti-robô do formulário)
		document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
	}

	applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

	if (themeSwitch) {
		themeSwitch.addEventListener('click', function () {
			var newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			applyTheme(newTheme);
			try {
				localStorage.setItem('theme', newTheme);
			} catch (e) {}
		});
	}

	// Enquanto o visitante não escolher um tema, acompanha o tema do sistema operacional
	if (window.matchMedia) {
		var darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		var onSchemeChange = function (e) {
			var saved = getSavedTheme();
			if (saved !== 'light' && saved !== 'dark') {
				applyTheme(e.matches ? 'dark' : 'light');
			}
		};
		if (darkSchemeQuery.addEventListener) {
			darkSchemeQuery.addEventListener('change', onSchemeChange);
		} else if (darkSchemeQuery.addListener) {
			darkSchemeQuery.addListener(onSchemeChange);
		}
	}
})(jQuery)