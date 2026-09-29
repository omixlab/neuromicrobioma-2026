// NeuroMicrobioma 2026 - Language switcher (PT-BR / EN)
//
// Portuguese is written directly in index.html. Elements marked with data-i18n="key"
// get the English text below; data-i18n-attr="attr:key;attr2:key2" does the same for
// attributes. Texts from data/*.json use { "pt": "...", "en": "..." } (see data/LEIA-ME.md).

(function () {
  const EN = {
    'meta.title': 'NeuroMicrobioma 2026 | 1st Symposium on Microbiome, Gut-Brain Axis and Mental Health',
    'meta.description': '1st Symposium on Microbiome, Gut-Brain Axis and Mental Health. November 17–18, 2026, UFPel — Capão do Leão Campus, Brazil. Free registration, posters and Scientific Pitch.',

    'nav.toggle': 'Toggle navigation',
    'nav.sobre': 'About',
    'nav.palestrantes': 'Speakers',
    'nav.programacao': 'Program',
    'nav.inscricao': 'Registration',
    'nav.local': 'Venue',
    'nav.organizacao': 'Organization',
    'nav.contato': 'Contact',

    'hero.eyebrow': '1st Symposium',
    'hero.tagline': 'Science that connects. Health that transforms.',
    'hero.date': 'November 17–18, 2026',
    'hero.place': 'UFPel · Capão do Leão Campus, RS, Brazil',
    'hero.free': 'Free registration · limited spots',
    'hero.cta': 'Register',

    'cal.botao': 'Add to calendar',
    'cal.titulo': 'Add to calendar',
    'cal.sub': 'NeuroMicrobioma 2026 · Brasília time (UTC−3)',
    'cal.google': 'Google Calendar',
    'cal.dia1': 'Day 1 · Nov 17, 12:30–17:30',
    'cal.dia2': 'Day 2 · Nov 18, 9:00–17:30',
    'cal.ics': 'Both days · .ics file',
    'cal.evento': 'NeuroMicrobioma 2026 — Day',
    'cal.detalhes': '1st Symposium on Microbiome, Gut-Brain Axis and Mental Health.\nProgram:',
    'hero.cta2': 'Call for abstracts',

    'sobre.eyebrow': 'Overview',
    'sobre.title': 'About the event',
    'sobre.lead': 'An interdisciplinary scientific meeting on the interfaces between the microbiome, gut, brain and mental health.',
    'sobre.p1': 'The symposium brings together invited Brazilian and international researchers, students, professors and professionals from different fields to share knowledge, experiences and perspectives on the interactions between the microbiota, the body and the nervous system — fostering dialogue and scientific collaboration.',
    'sobre.p2': 'The event is part of the international scientific cooperation between UFPel and the University of Illinois Urbana-Champaign, strengthened by the 2025 Fulbright–ABC Award and supported by FAPERGS.',
    'sobre.temas': 'Topics',
    'sobre.t1': 'Microbiota and microbiome',
    'sobre.t2': 'Gut-brain axis',
    'sobre.t3': 'Neuroscience and neuroinflammation',
    'sobre.t4': 'Neurodegenerative diseases and Alzheimer\'s disease',
    'sobre.t5': 'Mental health, depression and anxiety',
    'sobre.t6': 'Sleep, behavior and cognition',
    'sobre.t7': 'Inflammation and immunity',
    'sobre.t8': 'Intestinal diseases',
    'sobre.t9': 'Metabolism and nutrition',
    'sobre.t10': 'Oxidative stress',
    'sobre.t11': 'Probiotics, prebiotics and psychobiotics',
    'sobre.t12': 'Pharmacology',
    'sobre.t13': 'Molecular and cell biology',
    'sobre.t14': 'Bioinformatics and omics',
    'sobre.t15': 'Health biotechnology',

    'palestrantes.eyebrow': 'Invited speakers',
    'palestrantes.title': 'Speakers',
    'palestrantes.placeholder': 'Speakers will be announced soon. Follow <a href="https://www.instagram.com/neuromicrobioma/" target="_blank" rel="noopener">@neuromicrobioma</a> for updates.',
    'palestrantes.cv': 'Profile',

    'programacao.eyebrow': 'Schedule',
    'programacao.title': 'Scientific program',
    'programacao.placeholder': 'Program coming soon. Follow <a href="https://www.instagram.com/neuromicrobioma/" target="_blank" rel="noopener">@neuromicrobioma</a> for updates.',
    'programacao.fuso': 'All times in Brasília time (UTC−3).',
    'programacao.dia': 'Day',

    'submissao.eyebrow': 'Call for abstracts',
    'submissao.title': 'Abstract submission',
    'submissao.subtitle': 'We welcome work from undergraduate, scientific initiation, graduate, research and extension projects, including studies that do not directly assess the microbiome. <strong>Abstracts are submitted through a dedicated form, separate from registration.</strong>',
    'submissao.posterTag': 'Undergraduate',
    'submissao.posterTitle': 'Poster presentation',
    'submissao.posterText': 'Undergraduate and scientific initiation students choose the poster (banner) option when submitting their abstract. After review and approval by the Scientific Committee, participants receive instructions for the session.',
    'submissao.poster1': 'Vertical banner, 90 × 120 cm, with a cord for hanging',
    'submissao.poster2': 'Banner stands provided by the organizers',
    'submissao.pitchTag': 'Graduate',
    'submissao.pitchText': 'A dynamic, concise oral presentation for master\'s and PhD students.',
    'submissao.pitch1': '3-minute presentation',
    'submissao.pitch2': '1 static slide, in English',
    'submissao.pitch4': 'Talk in Portuguese or English',
    'submissao.pitch3': '5 to 6 selected per category (master\'s and PhD)',
    'submissao.pitchNote': 'Abstracts not selected for the Scientific Pitch will be presented as posters.',
    'submissao.datas': 'Key dates',
    'submissao.d0': 'Registration opens',
    'submissao.d1': 'Abstract submission opens',
    'submissao.d2': 'Submission closes',
    'submissao.d3': 'Accepted abstracts announced',
    'submissao.d4': 'Scientific Pitch finalists announced',
    'submissao.d5': 'Poster session',
    'submissao.d6': 'Scientific Pitch',
    'submissao.d0Data': 'Oct 1',
    'submissao.d1Data': 'Oct 6',
    'submissao.d2Data': 'Oct 20, 11:59 pm',
    'submissao.d3Data': 'Oct 26',
    'submissao.d4Data': 'Nov 3',
    'submissao.d5Data': 'Nov 17',
    'submissao.d6Data': 'Nov 18',
    'submissao.envio': 'Submitting your work',
    'submissao.n1': 'Single-paragraph abstract, up to 300 words, in Portuguese or English',
    'submissao.n2': '3 to 5 keywords; no tables, figures or references',
    'submissao.n3': 'Presenter registered for the event, with at most 2 works',
    'submissao.anais': 'Accepted abstracts will be published in the event proceedings (e-book on Zenodo).',
    'submissao.enviar': 'Submit abstract',
    'submissao.regulamento': 'Submission rules (PDF, in Portuguese)',
    'submissao.modeloResumo': 'Abstract template (.docx)',
    'submissao.modeloPoster': 'Poster template (.pptx)',

    'inscricao.eyebrow': 'Registration',
    'inscricao.title': 'Free registration',
    'inscricao.subtitle': '<strong>Registration opens October 1.</strong> Spots are limited. Certificates are issued for participation in the event\'s activities and for presenting work (poster or oral).',
    'inscricao.como': 'How to register',
    'inscricao.s1': 'Fill in the registration form with your details.',
    'inscricao.s2': 'Choose how you will take part: <strong>attendee</strong> and/or <strong>presenting work</strong>.',
    'inscricao.s3': 'If you are presenting, also submit your abstract through the <a href="#submissao">submission form</a>.',
    'inscricao.s4': 'Wait for the organizers\' confirmation by email.',
    'inscricao.botao': 'Open registration form',
    'inscricao.nota': 'Submitting the form does not guarantee a spot until the organizers confirm it. The form is in Portuguese.',
    'inscricao.solidariaTag': 'Charity drive',
    'inscricao.solidariaText': 'The event invites participants to donate to Projeto Mãos Dadas, run by the NGO Escritório do Bem, which supports vulnerable families in Capão do Leão and Pelotas.',
    'inscricao.copiar': 'Copy PIX key',
    'inscricao.copiado': 'PIX key copied!',
    'inscricao.doacaoNota': 'Donations are voluntary, are not required for registration, and are not received or managed by the event organizers, UFPel or FAPERGS.',

    'local.eyebrow': 'Venue',
    'local.title': 'Meteorology Auditorium',
    'local.subtitle': 'Federal University of Pelotas (UFPel) — Capão do Leão Campus, RS, Brazil',
    'local.enderecoAria': 'Address: Meteorology Auditorium, UFPel, Capão do Leão Campus. Open directions options',
    'local.endereco': 'Address',
    'local.auditorio': 'Meteorology Auditorium',
    'local.enderecoLinhas': 'UFPel — Capão do Leão Campus<br>Av. Eliseu Maciel · Capão do Leão&nbsp;–&nbsp;RS, Brazil',
    'local.comoChegar': 'Getting there',
    'local.onibus': 'Santa Silvana bus',
    'local.onibusInfo': 'Timetable for the Pelotas – Capão do Leão Campus line',
    'local.apoio': 'UFPel shuttle (Transporte de Apoio)',
    'local.apoioInfo': 'For UFPel students, staff and faculty',
    'local.ondeFicar': 'Where to stay',
    'local.hospedagem': 'Most accommodation options are in Pelotas.',
    'local.hoteis': 'Hotels',
    'local.hoteisInfo': 'Suggestions on Google',
    'local.airbnbInfo': 'Stays in Pelotas (Nov 16–18)',
    'local.mapa': 'Map of the Capão do Leão Campus',
    'local.mapaSrc': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13576.840673419996!2d-52.42000000000001!3d-31.780000000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b5e5a2b3b895%3A0x868b4d834bc6d3e8!2sUniversidade%20Federal%20de%20Pelotas%20-%20Campus%20Cap%C3%A3o%20do%20Le%C3%A3o!5e0!3m2!1sen!2sbr!4v1700000000000!5m2!1sen!2sbr',
    'local.sheetSub': 'Meteorology Auditorium — UFPel',
    'local.verRota': 'Get directions',
    'local.navegar': 'Navigate there',
    'local.corrida': 'Request a ride',

    'org.eyebrow': 'Team',
    'org.title': 'Organization',
    'org.coordenacao': 'Event coordination',
    'org.profa': 'Prof.',
    'org.comissao': 'Organizing committee',
    'org.comite': 'Scientific committee',
    'org.nacionais': 'Brazilian institutions',
    'org.internacionais': 'International institutions',
    'org.eua': 'USA',

    'apoio.realizacao': 'Organized by',
    'apoio.gpn': 'Neurobiotechnology Research Group (GPN)',
    'apoio.financiamento': 'Support and funding',
    'apoio.abc': 'Brazilian Academy of Sciences',
    'apoio.parceiras': 'Partner institutions',
    'apoio.patrocinio': 'Sponsorship',
    'apoio.emBreve': 'Coming soon',

    'footer.title': 'Contact us',
    'footer.text': 'Questions and information about NeuroMicrobioma 2026.',
    'footer.copy': '&copy; 2026 NeuroMicrobioma · Neurobiotechnology Research Group (GPN) · UFPel',

    'geral.fechar': 'Close'
  };

  const LANGS = ['pt', 'en'];
  const STORAGE_KEY = 'nm-lang';
  const originals = new Map(); // element -> { html, attrs } in Portuguese
  const listeners = [];

  function detect() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* storage blocked */ }
    return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  let lang = detect();

  function original(el) {
    if (!originals.has(el)) originals.set(el, { html: el.innerHTML, attrs: {} });
    return originals.get(el);
  }

  function apply() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const pt = original(el).html;
      const en = EN[el.dataset.i18n];
      const next = lang === 'en' && en != null ? en : pt;
      if (el.innerHTML !== next) el.innerHTML = next;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const store = original(el).attrs;
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (!(attr in store)) store[attr] = el.getAttribute(attr);
        const en = EN[key];
        el.setAttribute(attr, lang === 'en' && en != null ? en : store[attr]);
      });
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });
  }

  function set(next) {
    if (!LANGS.includes(next) || next === lang) return;
    lang = next;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage blocked */ }

    // Keep the choice in the URL so a shared link opens in the same language
    const url = new URL(location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);

    apply();
    listeners.forEach(fn => fn(lang));
  }

  window.i18n = {
    get lang() { return lang; },
    set,
    // UI string by key (Portuguese fallback given by the caller)
    t: (key, pt) => (lang === 'en' && EN[key] != null ? EN[key] : pt),
    // JSON value: plain string, or { "pt": "...", "en": "..." }
    tr: value => {
      if (value == null) return '';
      if (typeof value !== 'object') return String(value);
      return value[lang] ?? value.pt ?? value.en ?? '';
    },
    onChange: fn => listeners.push(fn)
  };

  // Scripts load at the end of <body>, so the markup is already parsed here
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => set(btn.dataset.lang));
  });
  apply();
})();
