// NeuroMicrobioma 2026 - Renders speakers and program from data/*.json
// Paths are relative so they work on GitHub Pages project sites (/<repo>/).

(function () {
  const TIPOS = {
    'palestra':       { label: 'Palestra',       icon: 'bi-mic' },
    'mesa-redonda':   { label: 'Mesa-redonda',   icon: 'bi-people' },
    'pitch':          { label: 'Scientific Pitch', icon: 'bi-lightning-charge' },
    'poster':         { label: 'Pôsteres',       icon: 'bi-easel' },
    'abertura':       { label: 'Abertura',       icon: 'bi-flag' },
    'encerramento':   { label: 'Encerramento',   icon: 'bi-flag' },
    'intervalo':      { label: 'Intervalo',      icon: 'bi-cup-hot' },
    'credenciamento': { label: 'Credenciamento', icon: 'bi-person-badge' },
    'outro':          { label: 'Atividade',      icon: 'bi-calendar-event' }
  };

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const safeUrl = url => /^https?:\/\//i.test(url || '') ? url : '';

  const initials = name => String(name || '')
    .replace(/^(dr|dra|prof|profa)\.?\s+/i, '')
    .split(/\s+/).filter(Boolean)
    .map(part => part[0]).filter((_, i, all) => i === 0 || i === all.length - 1)
    .join('').toUpperCase();

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

  function renderSpeakers(container, speakers, talksBySpeaker) {
    container.innerHTML = speakers.map(s => {
      const talks = talksBySpeaker[s.id] || [];
      const place = [s.instituicao, s.pais].filter(Boolean).join(' — ');
      const link = safeUrl(s.link);
      return `
        <div class="col-sm-6 col-lg-3">
          <article class="speaker-card" id="palestrante-${esc(s.id)}">
            ${avatar(s, 'speaker-img')}
            <h3 class="speaker-name">${esc(s.nome)}</h3>
            ${place ? `<p class="speaker-inst">${esc(place)}</p>` : ''}
            ${talks.map(t => `<p class="speaker-talk">${esc(t)}</p>`).join('')}
            ${s.bio ? `<p class="speaker-bio">${esc(s.bio)}</p>` : ''}
            ${link ? `<a class="speaker-link" href="${esc(link)}" target="_blank" rel="noopener">Currículo <i class="bi bi-arrow-up-right"></i></a>` : ''}
          </article>
        </div>`;
    }).join('');
  }

  function dayLabel(isoDate) {
    const [y, m, d] = String(isoDate).split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (isNaN(date)) return { short: esc(isoDate), long: esc(isoDate) };
    return {
      short: date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', ''),
      long: date.toLocaleDateString('pt-BR', { weekday: 'long' })
    };
  }

  function renderActivity(a, speakersById, showSpeakers) {
    const tipo = TIPOS[a.tipo] || TIPOS.outro;
    const time = [a.inicio, a.fim].filter(Boolean).join(' – ');
    const people = showSpeakers
      ? (a.palestrantes || []).map(id => speakersById[id]).filter(Boolean)
      : [];
    return `
      <li class="program-item${a.tipo === 'intervalo' ? ' is-break' : ''}">
        <div class="program-time">${esc(time)}</div>
        <div class="program-body">
          <span class="program-type"><i class="bi ${tipo.icon}"></i> ${tipo.label}</span>
          <h3 class="program-title">${esc(a.titulo)}</h3>
          ${people.length ? `<div class="program-speakers">${people.map(p => `
            <a class="program-speaker" href="#palestrante-${esc(p.id)}">
              ${avatar(p, 'program-avatar')}
              <span><strong>${esc(p.nome)}</strong>${p.instituicao ? `<small>${esc(p.instituicao)}</small>` : ''}</span>
            </a>`).join('')}</div>` : ''}
          ${a.descricao ? `<p class="program-desc">${esc(a.descricao)}</p>` : ''}
          ${a.local ? `<p class="program-place"><i class="bi bi-geo-alt"></i> ${esc(a.local)}</p>` : ''}
        </div>
      </li>`;
  }

  function renderProgram(container, days, speakersById, showSpeakers) {
    const tabs = days.map((day, i) => {
      const label = dayLabel(day.data);
      return `<button type="button" role="tab" class="day-tab" id="dia-tab-${i}"
        aria-controls="dia-${i}" aria-selected="${i === 0}">
        <strong>${label.short}</strong><span>${label.long}</span></button>`;
    }).join('');

    const panels = days.map((day, i) => `
      <ol class="program-list" role="tabpanel" id="dia-${i}" aria-labelledby="dia-tab-${i}" ${i === 0 ? '' : 'hidden'}>
        ${(day.atividades || []).map(a => renderActivity(a, speakersById, showSpeakers)).join('')}
      </ol>`).join('');

    container.innerHTML = `<div class="day-tabs" role="tablist">${tabs}</div>${panels}`;

    container.querySelectorAll('.day-tab').forEach((tab, i) => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.day-tab').forEach((t, j) => t.setAttribute('aria-selected', i === j));
        container.querySelectorAll('.program-list').forEach((p, j) => { p.hidden = i !== j; });
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
    const speakersById = Object.fromEntries(speakers.map(s => [s.id, s]));

    // Talk titles come from the program, so each title is written only once
    const talksBySpeaker = {};
    if (programOn) {
      (programData.dias || []).forEach(day => (day.atividades || []).forEach(a => {
        (a.palestrantes || []).forEach(id => (talksBySpeaker[id] = talksBySpeaker[id] || []).push(a.titulo));
      }));
    }

    if (speakersOn && speakers.length) renderSpeakers(speakersEl, speakers, talksBySpeaker);
    if (programOn && (programData.dias || []).length) renderProgram(programEl, programData.dias, speakersById, speakersOn);
  });
})();
