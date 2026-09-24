// NeuroMicrobioma 2026 - Renders speakers and program from data/*.json
// Paths are relative so they work on GitHub Pages project sites (/<repo>/).
// Text fields may be a plain string or { "pt": "...", "en": "..." } (see js/i18n.js).

(function () {
  const { tr, t } = window.i18n;

  const TIPOS = {
    'palestra':       { label: { pt: 'Palestra', en: 'Talk' },                 icon: 'bi-mic' },
    'mesa-redonda':   { label: { pt: 'Mesa-redonda', en: 'Round table' },      icon: 'bi-people' },
    'pitch':          { label: 'Scientific Pitch',                             icon: 'bi-lightning-charge' },
    'poster':         { label: { pt: 'Pôsteres', en: 'Posters' },              icon: 'bi-easel' },
    'abertura':       { label: { pt: 'Abertura', en: 'Opening' },              icon: 'bi-flag' },
    'encerramento':   { label: { pt: 'Encerramento', en: 'Closing' },          icon: 'bi-trophy' },
    'intervalo':      { label: { pt: 'Intervalo', en: 'Break' },               icon: 'bi-cup-hot' },
    'discussao':      { label: { pt: 'Discussão', en: 'Discussion' },          icon: 'bi-chat-dots' },
    'credenciamento': { label: { pt: 'Credenciamento', en: 'Check-in' },       icon: 'bi-person-badge' },
    'outro':          { label: { pt: 'Atividade', en: 'Activity' },            icon: 'bi-calendar-event' }
  };

  // Short items shown as a single compact line
  const MINOR = ['discussao'];

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const safeUrl = url => /^https?:\/\//i.test(url || '') ? url : '';

  const initials = name => String(name || '')
    .split(/\s+/).filter(Boolean)
    .map(part => part[0]).filter((_, i, all) => i === 0 || i === all.length - 1)
    .join('').toUpperCase();

  const fullName = s => [tr(s.tratamento), s.nome].filter(Boolean).join(' ');

  // Photo with initials fallback (missing field or broken path)
  function avatar(speaker, className) {
    const fallback = `<span class="${className} avatar-initials" aria-hidden="true">${esc(initials(speaker.nome))}</span>`;
    if (!speaker.foto) return fallback;
    return `<img class="${className}" src="${esc(speaker.foto)}" alt="" loading="lazy"
      onerror="this.outerHTML=this.dataset.fallback" data-fallback="${esc(fallback)}">`;
  }

  async function loadJson(path) {
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return response.json();
  }

  function renderSpeakers(container, speakers, program) {
    // Talk titles come from the program, so each title is written only once
    const talksBySpeaker = {};
    (program || []).forEach(day => (day.atividades || []).forEach(a => {
      (a.palestrantes || []).forEach(id => (talksBySpeaker[id] = talksBySpeaker[id] || []).push(tr(a.titulo)));
    }));

    container.innerHTML = speakers.map(s => {
      const place = [s.instituicao, tr(s.pais)].filter(Boolean).join(' — ');
      const link = safeUrl(s.link);
      return `
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <article class="speaker-card" id="palestrante-${esc(s.id)}">
            ${avatar(s, 'speaker-img')}
            <h3 class="speaker-name">${esc(fullName(s))}</h3>
            ${place ? `<p class="speaker-inst">${esc(place)}</p>` : ''}
            ${(talksBySpeaker[s.id] || []).map(title => `<p class="speaker-talk">${esc(title)}</p>`).join('')}
            ${tr(s.bio) ? `<p class="speaker-bio">${esc(tr(s.bio))}</p>` : ''}
            ${link ? `<a class="speaker-link" href="${esc(link)}" target="_blank" rel="noopener">${t('palestrantes.cv', 'Currículo')} <i class="bi bi-arrow-up-right"></i></a>` : ''}
          </article>
        </div>`;
    }).join('');
  }

  function dayLabel(isoDate) {
    const [y, m, d] = String(isoDate).split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (isNaN(date)) return { short: esc(isoDate), long: '' };
    const locale = window.i18n.lang === 'en' ? 'en-US' : 'pt-BR';
    return {
      short: date.toLocaleDateString(locale, { day: 'numeric', month: 'short' }).replace('.', ''),
      long: date.toLocaleDateString(locale, { weekday: 'long' })
    };
  }

  function renderActivity(a, speakersById) {
    const tipo = TIPOS[a.tipo] || TIPOS.outro;
    const time = [a.inicio, a.fim].filter(Boolean).join(' – ');
    const title = tr(a.titulo) || tr(tipo.label);

    if (MINOR.includes(a.tipo)) {
      return `
        <li class="program-item is-minor">
          <div class="program-time">${esc(time)}</div>
          <div class="program-body"><span class="program-minor"><i class="bi ${tipo.icon}"></i> ${esc(title)}</span></div>
        </li>`;
    }

    const people = (a.palestrantes || []).map(id => speakersById[id]).filter(Boolean);
    const typeLabel = tr(tipo.label);
    return `
      <li class="program-item${a.tipo === 'intervalo' ? ' is-break' : ''}">
        <div class="program-time">${esc(time)}</div>
        <div class="program-body">
          ${typeLabel !== title ? `<span class="program-type"><i class="bi ${tipo.icon}"></i> ${esc(typeLabel)}</span>` : ''}
          <h3 class="program-title">${esc(title)}</h3>
          ${people.length ? `<div class="program-speakers">${people.map(p => `
            <a class="program-speaker" href="#palestrante-${esc(p.id)}">
              ${avatar(p, 'program-avatar')}
              <span><strong>${esc(fullName(p))}</strong>${p.instituicao ? `<small>${esc(p.instituicao)}</small>` : ''}</span>
            </a>`).join('')}</div>` : ''}
          ${tr(a.descricao) ? `<p class="program-desc">${esc(tr(a.descricao))}</p>` : ''}
          ${tr(a.local) ? `<p class="program-place"><i class="bi bi-geo-alt"></i> ${esc(tr(a.local))}</p>` : ''}
        </div>
      </li>`;
  }

  let activeDay = 0;

  function renderProgram(container, days, speakersById) {
    const tabs = days.map((day, i) => {
      const label = dayLabel(day.data);
      return `<button type="button" role="tab" class="day-tab" id="dia-tab-${i}"
        aria-controls="dia-${i}" aria-selected="${i === activeDay}">
        <strong>${esc(label.short)}</strong><span>${esc(label.long)}</span></button>`;
    }).join('');

    const panels = days.map((day, i) => `
      <div class="program-day" role="tabpanel" id="dia-${i}" aria-labelledby="dia-tab-${i}" ${i === activeDay ? '' : 'hidden'}>
        ${tr(day.tema) ? `<p class="program-day-theme"><span>${t('programacao.dia', 'Dia')} ${i + 1}</span>${esc(tr(day.tema))}</p>` : ''}
        <ol class="program-list">
          ${(day.atividades || []).map(a => renderActivity(a, speakersById)).join('')}
        </ol>
      </div>`).join('');

    container.innerHTML = `<div class="day-tabs" role="tablist">${tabs}</div>${panels}`;

    container.querySelectorAll('.day-tab').forEach((tab, i) => {
      tab.addEventListener('click', () => {
        activeDay = i;
        container.querySelectorAll('.day-tab').forEach((t, j) => t.setAttribute('aria-selected', i === j));
        container.querySelectorAll('.program-day').forEach((p, j) => { p.hidden = i !== j; });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const speakersEl = document.getElementById('speakers-list');
    const programEl = document.getElementById('program-content');

    const [speakersData, programData] = await Promise.all([
      loadJson('data/palestrantes.json').catch(err => { console.warn(err); return null; }),
      loadJson('data/programacao.json').catch(err => { console.warn(err); return null; })
    ]);

    const speakersOn = Boolean(speakersData && speakersData.publicado);
    const programOn = Boolean(programData && programData.publicado);
    const speakers = speakersOn ? (speakersData.palestrantes || []) : [];
    const days = programOn ? (programData.dias || []) : [];
    const speakersById = Object.fromEntries(speakers.map(s => [s.id, s]));

    function render() {
      if (speakers.length) renderSpeakers(speakersEl, speakers, days);
      if (days.length) renderProgram(programEl, days, speakersById);
    }

    render();
    window.i18n.onChange(render);
  });
})();
