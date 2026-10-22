/*
 * Textos em inglês do site.
 *
 * O português fica escrito no próprio HTML (index.html e ajax/projeto-*.html). Cada texto traduzível
 * tem uma chave no HTML, e a tradução em inglês fica aqui, com a mesma chave:
 *   data-i18n="chave"            troca o texto do elemento
 *   data-i18n-html="chave"       troca o conteúdo com HTML (links, <br>, <span>)
 *   data-i18n-attr="attr:chave"  troca atributos (placeholder, alt, title, aria-label, src, href...),
 *                                separados por vírgula: "src:chave1, alt:chave2"
 *
 * Ao criar um texto novo no HTML, adicione a chave nele e a tradução aqui.
 * Se faltar uma tradução, o texto fica em português e aparece um aviso no console.
 * Os textos do formulário de contato e dos popups ficam no js/main.js.
 */
window.I18N_EN = {
    /* Página */
    'meta.title': 'Lucas Santos | Software Engineer',
    'meta.description': 'Portfolio of Lucas Santos, Backend and Full Stack Software Engineer based in São Paulo, Brazil.',

    /* Cabeçalho */
    'header.photoTitle': "It's me, Lucas",
    'header.photoAlt': 'Photo of Lucas',
    'header.themeLabel': 'Dark theme',
    'header.themeTooltip': 'Light / dark theme',
    'header.langLabel': 'Switch language to Portuguese',

    /* Menu */
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.services': 'What I Do',
    'nav.resume': 'Resume',
    'nav.projects': 'Projects',
    'nav.testimonial': 'Testimonials',
    'nav.contact': 'Contact',

    /* Introdução */
    'home.typed1': "I'm Lucas Santos",
    'home.typed2': "I'm a Software Engineer.",
    'home.typed3': "I'm a Backend Dev.",
    'home.typed4': "I'm a Full Stack Dev.",
    'home.welcome': 'Welcome',
    'home.location': 'Based in São Paulo, Brazil.',
    'home.hire': 'Hire Me',

    /* Sobre */
    'about.watermark': 'About Me',
    'about.subtitle': 'Know Me More',
    'about.heading': "I'm <span class=\"text-primary\">Lucas Santos</span>, a Software Engineer.",
    'about.text1': 'I have over <span class="years-experience">6</span> years of experience in backend and full stack '
        + 'development, with a strong focus on digital health and payment platforms. I work mainly with Node.js, '
        + 'TypeScript and NestJS to build scalable APIs, using PostgreSQL, MySQL, SQL Server and MongoDB, '
        + 'along with Angular and React on the frontend.',
    'about.text2': 'I design backend solutions focused on scalability, performance and maintainability, applying '
        + 'Clean Code, DDD and AI tools to speed up development, code reviews and testing.',
    'about.name': 'Name:',
    'about.age': 'Age:',
    'about.location': 'Location:',
    'about.locationValue': 'São Paulo - SP, Brazil',
    'about.counterYears': 'Years of Experience',
    'about.counterCompanies': 'Companies Worked At',
    'about.counterDone': 'Projects Done',
    'about.counterOngoing': 'Projects in Progress',
    'cv.file': 'pdf/Resume_Lucas_Santos_EN.pdf',
    'cv.downloadName': 'resume_lucas_santos',

    /* O que eu faço */
    'services.watermark': 'Services',
    'services.subtitle': 'What I Do',
    'services.frontText': 'I build web interfaces with Angular, React and Next.js, using TypeScript and JavaScript, '
        + 'integrated with REST APIs and services such as Firebase and Stripe.',
    'services.backText': 'I build scalable REST APIs with Node.js, NestJS, Express and PHP (Laravel), using '
        + 'PostgreSQL, MySQL, SQL Server, MongoDB and Redis, queues with BullMQ and Pub/Sub, and deployment '
        + 'with Docker on AWS and Google Cloud.',

    /* Qualificações */
    'resume.watermark': 'Summary',
    'resume.subtitle': 'Resume',
    'resume.education': 'Education',
    'resume.edu1.title': 'Computer Science',
    'resume.edu1.text': "Bachelor's degree in Computer Science, covering programming, databases, networks and "
        + 'artificial intelligence. For my final project, I built Student Workspace, a productivity web app '
        + 'based on the Pomodoro technique.',
    'resume.edu2.title': 'English Language',
    'resume.edu2.text': 'Open English course to improve my communication skills in the language. '
        + 'Current level: intermediate.',
    'resume.experience': 'Experience',
    'resume.exp1.period': '2024 - Present',
    'resume.exp1.title': 'Mid-Level Software Engineer',
    'resume.exp1.company': 'GetConnect | Digital Health Management',
    'resume.exp1.text': 'Full stack development of a telemedicine platform for online consultations and the '
        + 'management of public primary care units (UBSs), using Node.js, NestJS, TypeScript, PostgreSQL and '
        + 'Angular on GCP. I work on migrating legacy LoopBack microservices to NestJS and built a feature that '
        + "cut the team's support workload by 50%.",
    'resume.exp2.title': 'Backend Developer',
    'resume.exp2.text': 'Backend for the members area and back office of a payments and digital product sales '
        + 'platform. I built REST APIs with Node.js, TypeScript, Express and NestJS, queues with BullMQ, caching '
        + 'with Redis and scheduled jobs, using Docker and serverless on AWS.',
    'resume.exp3.title': 'Software Development Analyst',
    'resume.exp3.text': 'I started as an intern and was promoted to junior and then mid-level analyst, working on '
        + 'a public health regulation system used by hospitals, urgent care units, primary care units and '
        + 'pharmacies. I developed with PHP (Laravel and CodeIgniter), JavaScript and SQL Server, cut report '
        + 'generation from 2 minutes to 40 seconds and did code reviews.',
    'resume.skills': 'My Skills',

    /* Projetos */
    'projects.watermark': 'Projects',
    'projects.subtitle': 'My Work',
    'projects.filterAll': 'All',
    'projects.categoryMixed': 'Full Stack',
    'projects.tm.image': 'images/tm-en-escuro.png',
    'projects.tm.alt': 'Time Entertainment cover',
    'projects.tm.details': 'View Time Entertainment details',
    'projects.tm.text': 'A SaaS platform to track TV shows, movies, anime and games, which I founded and built '
        + 'from scratch to deployment with the help of AI. The release calendar is synced daily by cron jobs '
        + 'integrated with the TMDB, TheTVDB and RAWG APIs, and subscriptions are handled through Stripe.',
    'projects.tm.client': 'Own project (founder and developer)',
    'projects.tm.tech': 'Angular, NestJS, TypeScript, PostgreSQL, BullMQ, Redis and Stripe',
    'projects.sw.image': 'images/student-workspace-cover-en.png',
    'projects.sw.alt': 'Student Workspace cover',
    'projects.sw.details': 'View Student Workspace details',
    'projects.sw.text': 'A productivity web app based on the Pomodoro technique, developed as my Computer Science '
        + 'final project at UNIP, with sign-in through Firebase Authentication and data stored in Cloud Firestore.',
    'projects.sw.client': 'Academic project (final project)',
    'projects.sw.tech': 'Next.js, React, TypeScript, Firebase Authentication and Cloud Firestore',

    /* Popups dos projetos (ajax/projeto-*.html) */
    'popup.about': 'About the project:',
    'popup.details': 'Details:',
    'popup.client': 'Client:',
    'popup.tech': 'Technologies:',
    'popup.category': 'Category:',
    'popup.date': 'Date:',
    'popup.github': 'GitHub repository',
    'popup.live': 'View live project',

    /* Contato */
    'contact.watermark': 'Contact',
    'contact.subtitle': 'Get in Touch',
    'contact.address': 'Address',
    'contact.addressValue': 'São Paulo - SP,<br>Brazil',
    'contact.follow': 'Follow Me',
    'contact.formTitle': 'Send Me a Message',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell me more about what you need...',
    'contact.honeypot': 'Leave this field empty',

    /* Rodapé e geral */
    'footer.rights': 'All rights reserved.',
    'footer.disclaimer': 'Disclaimer',
    'common.backToTop': 'Back to top',
    'common.close': 'Close',

    /* Modal Termos e Política */
    'terms.title': 'Terms & Policy',
    'terms.intro': 'This website is a personal portfolio, created to showcase my projects, experience and skills '
        + 'as a developer.',
    'terms.useTitle': 'Terms of Use',
    'terms.useText': 'You are free to browse and share links to this website. The texts, images and code shown '
        + 'here must not be copied or redistributed as your own.',
    'terms.privacyTitle': 'Privacy Policy',
    'terms.privacyIntro': 'Information sent through the contact form is used only to reply to your message.',
    'terms.privacy1': 'The data you enter in the contact form (name, email and message) is collected, along with '
        + 'the IP address, approximate location and browser used to send it, to prevent spam and abuse.',
    'terms.privacy2': 'Your data is not sold, rented or shared with third parties. The message is delivered by '
        + 'email through <a href="https://resend.com/legal/privacy-policy" target="_blank">Resend</a>.',
    'terms.privacy3': 'The form is protected by Cloudflare Turnstile, subject to the Cloudflare '
        + '<a href="https://www.cloudflare.com/privacypolicy/" target="_blank">Privacy Policy</a> and '
        + '<a href="https://www.cloudflare.com/turnstile-privacy-policy/" target="_blank">Turnstile Privacy Addendum</a>.',
    'terms.privacy4': 'Your language and theme (light or dark) preferences and the time of your last form submission '
        + '(used to prevent repeated submissions) are stored only in your browser.',
    'terms.privacy5': 'You can request the deletion of your data at any time by emailing lucas_vfsantos@hotmail.com.',

    /* Modal Aviso Legal */
    'disclaimer.title': 'Copyright & Disclaimer',
    'disclaimer.intro': 'All content on this website belongs to Lucas Santos, unless otherwise stated.',
    'disclaimer.item1': 'The projects shown were developed by me, either individually or as part of a team.',
    'disclaimer.item2': 'Third-party trademarks, logos and names belong to their respective owners.',
    'disclaimer.item3': 'The information on this website may be updated at any time without prior notice.',
    'disclaimer.item4': 'Links to external websites are provided for convenience only, and I am not responsible '
        + 'for their content.'
};