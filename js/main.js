/* ============================================================
   RENDER + BEHAVIOR — you shouldn't need to edit this file.
   All editable content lives in js/config.js
   ============================================================ */

/* ---------------- render text/hero fields ---------------- */
document.getElementById('cfgHeroName').firstChild.textContent = CONFIG.name;
document.getElementById('cfgRole').textContent = "// " + CONFIG.role.toLowerCase();
document.getElementById('cfgDesc').textContent = CONFIG.description;
document.getElementById('cfgAvailability').textContent = CONFIG.availability;
document.getElementById('cfgCerts').textContent = CONFIG.certs
  .filter(c => c.status === 'earned')
  .map(c => c.name.replace('CompTIA ', ''))
  .join(' · ');
document.getElementById('githubBtn').href = CONFIG.socials.github;
if (CONFIG.resumeUrl) {
  const resumeBtn = document.getElementById('resumeBtn');
  resumeBtn.href = CONFIG.resumeUrl;
  resumeBtn.style.display = '';
}

/* ---------------- stat strip ---------------- */
document.getElementById('statStrip').innerHTML = CONFIG.stats.map(s => `
  <div class="stat"><div class="num">${s.num}</div><div class="lbl">${s.label}</div></div>
`).join('');

/* ---------------- reusable "show more" helper ----------------
   Renders only the first `initialCount` items into `gridEl`. If there
   are more than that, `btnEl` is revealed — clicking it renders the
   full list and hides the button. Used by both the certs grid and the
   projects grid so long lists don't dump everything on the visitor
   at once. */
function renderWithShowMore(gridEl, btnEl, items, renderItem, initialCount) {
  if (!gridEl) return;
  const showAll = () => {
    gridEl.innerHTML = items.map(renderItem).join('');
    // these are appearing because of a click, not a scroll into view, so
    // mark them revealed immediately instead of waiting on the scroll observer
    gridEl.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    if (btnEl) btnEl.style.display = 'none';
  };
  if (items.length <= initialCount) {
    showAll();
    return;
  }
  gridEl.innerHTML = items.slice(0, initialCount).map(renderItem).join('');
  if (btnEl) {
    btnEl.style.display = 'block';
    btnEl.addEventListener('click', showAll, { once: true });
  }
}

/* ---------------- certifications ---------------- */
function renderCertCard(c) {
  return `
    <div class="cert-card reveal">
      <span class="cert-status ${c.status}">${c.status}</span>
      <div class="cert-icon">${c.icon}</div>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
      <div class="cert-date">${c.date}</div>
      ${c.link && c.link !== '#' ? `
      <a class="cert-link" href="${c.link}" target="_blank" rel="noopener">
        Verify credential
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
      </a>` : ''}
    </div>
  `;
}
renderWithShowMore(
  document.getElementById('certGrid'),
  document.getElementById('certShowMoreBtn'),
  CONFIG.certs,
  renderCertCard,
  4
);

/* ---------------- skills ---------------- */
document.getElementById('skillGroups').innerHTML = CONFIG.skills.map(g => `
  <div class="skill-group reveal">
    <h4>${g.group}</h4>
    <ul>${g.items.map(i => `<li>${i}</li>`).join('')}</ul>
  </div>
`).join('');

/* ---------------- projects / ops log ---------------- */
function renderProjectCard(p, i) {
  return `
    <div class="proj-card reveal">
      <div class="proj-top">
        <h3>${p.title}</h3>
      </div>
      <p>${p.desc}</p>
      <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <button class="proj-link" type="button" data-project-idx="${i}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        View details
      </button>
    </div>
  `;
}
renderWithShowMore(
  document.getElementById('projGrid'),
  document.getElementById('projShowMoreBtn'),
  CONFIG.projects,
  renderProjectCard,
  3
);

/* ---------------- project details modal ---------------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalPanel = document.getElementById('modalPanel');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

/* Turns a YouTube link (any common format) into its embeddable URL.
   Anything else (an already-embeddable link, or a direct video file)
   is passed straight through. */
function toEmbedUrl(url) {
  const shortLink = url.match(/youtu\.be\/([\w-]+)/);
  const watchLink = url.match(/[?&]v=([\w-]+)/);
  if (shortLink) return `https://www.youtube.com/embed/${shortLink[1]}`;
  if (watchLink) return `https://www.youtube.com/embed/${watchLink[1]}`;
  return url;
}
function isDirectVideoFile(url) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}
function renderVideoEmbed(url) {
  if (!url) return '';
  const player = isDirectVideoFile(url)
    ? `<video controls src="${url}"></video>`
    : `<iframe src="${toEmbedUrl(url)}" title="Project demo video" loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
  return `
    <div class="m-section">
      <h4>Demo</h4>
      <div class="m-video">${player}</div>
    </div>
  `;
}

function openProjectModal(p) {
  const d = p.details || {};
  modalPanel.classList.remove('modal-wide');
  modalContent.innerHTML = `
    <div class="m-eyebrow">${p.tags.join(' · ')}</div>
    <h3 id="modalTitle">${p.title}</h3>
    <div class="m-section">
      <h4>Overview</h4>
      <p>${p.desc}</p>
    </div>
    ${renderVideoEmbed(d.video)}
    ${d.approach ? `
    <div class="m-section">
      <h4>Approach</h4>
      <p>${d.approach}</p>
    </div>` : ''}
    ${d.tools && d.tools.length ? `
    <div class="m-section">
      <h4>Tools used</h4>
      <div class="m-tools">${d.tools.map(t => `<span>${t}</span>`).join('')}</div>
    </div>` : ''}
    ${d.learnings ? `
    <div class="m-section">
      <h4>What I learned</h4>
      <p>${d.learnings}</p>
    </div>` : ''}
    ${p.link && p.link !== '#' ? `
    <div class="m-section">
      <a class="btn primary" href="${p.link}" target="_blank" rel="noopener">Open full write-up</a>
    </div>` : `
    <div class="m-note">This is sample detail content — swap it out with your own approach, tools, and takeaways in js/config.js (each project's "details" field), and point "link" at your real write-up or repo.</div>`}
  `;
  openModal();
}
function openModal() {
  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.getElementById('projGrid').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-project-idx]');
  if (!btn) return;
  const project = CONFIG.projects[Number(btn.dataset.projectIdx)];
  if (project) openProjectModal(project);
});
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------------- write-ups & notes (folder cards) ----------------
   Each folder (defined in CONFIG.writeupFolders) renders as a small card.
   Clicking it opens the modal with every write-up tagged with that
   folder's id — so "TryHackMe Write-Ups" and "Field Notes" stay in
   their own separate lists instead of one long combined feed. */
function writeupsInFolder(folderId) {
  return CONFIG.writeups.filter(w => w.folder === folderId);
}

/* ---------------- markdown renderer ---------------- */
function renderMarkdown(markdown) {

  if (!markdown) return '';

  return markdown
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')

    // Headings
    .replace(/^### (.*)$/gm, '<h5>$1</h5>')
    .replace(/^## (.*)$/gm, '<h4>$1</h4>')
    .replace(/^# (.*)$/gm, '<h3>$1</h3>')

    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')

    // Bullet points
    .replace(/^- (.*)$/gm, '<li>$1</li>')

    // Separate paragraphs
    .replace(/\n\n/g, '</p><p>')

    // Single line breaks
    .replace(/\n/g, '<br>');
}


document.getElementById('folderColumns').innerHTML = CONFIG.writeupFolders.map((f, i) => {
  const count = writeupsInFolder(f.id).length;
  return `
    <div class="folder-column reveal">
      <h3 class="folder-heading">${f.label}</h3>
      <button class="folder-card" type="button" data-folder-idx="${i}">
        <div class="folder-icon">${f.icon}</div>
        <p>${f.desc}</p>
        <div class="folder-count">${count} entr${count === 1 ? 'y' : 'ies'}</div>
      </button>
    </div>
  `;
}).join('');

function openFolderModal(folder) {

  const items = writeupsInFolder(folder.id);

  modalPanel.classList.add('modal-wide');

  /* Show the list of Field Notes */

  modalContent.innerHTML = `
    <div class="m-eyebrow">
      ${items.length} entr${items.length === 1 ? 'y' : 'ies'}
    </div>

    <h3 id="modalTitle">${folder.label}</h3>

    <div class="folder-modal-list">

      ${items.map((w, i) => `
        <button
          class="writeup-card"
          type="button"
          data-note-idx="${i}"
        >

          <div class="writeup-head">

            <h3>${w.title}</h3>

            <span class="writeup-date">
              ${w.date}
            </span>

          </div>

          <p>
            ${w.summary}
          </p>

          <div class="writeup-foot">

            <div class="proj-tags">

              ${w.tags
                .map(t => `<span>${t}</span>`)
                .join('')}

            </div>

            <span class="proj-link">

              Read Field Note

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>

            </span>

          </div>

        </button>
      `).join('')}

    </div>
  `;


  /* ---------------- open individual Field Note ---------------- */

  modalContent
    .querySelectorAll('[data-note-idx]')
    .forEach(button => {

      button.addEventListener('click', () => {

        const note = items[
          Number(button.dataset.noteIdx)
        ];

        if (!note) return;


        /* Render the actual Field Note */

        modalContent.innerHTML = `

          <div class="m-eyebrow">
            ${note.date}
          </div>

          <h3 id="modalTitle">
            ${note.title}
          </h3>

          <div class="field-note-content">

            ${renderMarkdown(note.content)}

          </div>


          ${note.tags && note.tags.length ? `

            <div class="m-section">

              <div class="proj-tags">

                ${note.tags
                  .map(t => `<span>${t}</span>`)
                  .join('')}

              </div>

            </div>

          ` : ''}


          ${note.link && note.link !== '#' ? `

            <div class="m-section">

              <a
                class="btn primary"
                href="${note.link}"
                target="_blank"
                rel="noopener"
              >
                View on GitHub
              </a>

            </div>

          ` : ''}

        `;

      });

    });


  openModal();

}

document.getElementById('folderColumns').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-folder-idx]');
  if (!btn) return;
  const folder = CONFIG.writeupFolders[Number(btn.dataset.folderIdx)];
  if (folder) openFolderModal(folder);
});

/* ---------------- experience ---------------- */
document.getElementById('expList').innerHTML = CONFIG.experience.map(e => `
  <div class="timeline-entry reveal">
    <div class="timeline-head">
      <div><h3>${e.title}</h3><div class="org">${e.org}</div></div>
      <div class="when">${e.when}</div>
    </div>
    <p>${e.desc}</p>
    ${e.bullets ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
  </div>
`).join('');

/* ---------------- education ---------------- */
document.getElementById('eduList').innerHTML = CONFIG.education.map(e => `
  <div class="timeline-entry reveal">
    <div class="timeline-head">
      <div><h3>${e.title}</h3><div class="org">${e.org}</div></div>
      <div class="when">${e.when}</div>
    </div>
    <p>${e.desc}</p>
  </div>
`).join('');

/* ---------------- socials ---------------- */
const socialIcons = {
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.96.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`,
  tryhackme: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>`
};
document.getElementById('socialRow').innerHTML = Object.keys(CONFIG.socials).map(key => `
  <a class="social-btn" href="${CONFIG.socials[key]}" target="_blank" rel="noopener" aria-label="${key}">${socialIcons[key] || ''}</a>
`).join('');

/* ---------------- terminal type effect ---------------- */
const typedEl = document.getElementById('typedCmd');
const cmdText = "cat incident_0417.log";
let ci = 0;
function typeCmd() {
  if (ci <= cmdText.length) {
    typedEl.textContent = cmdText.slice(0, ci);
    ci++;
    setTimeout(typeCmd, 55);
  }
}
typeCmd();

/* ---------------- cached accent colors (avoids recomputing getComputedStyle every animation frame) ---------------- */
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
let cachedColors = { mode: 'light', a: hexToRgb('#a3241c'), b: hexToRgb('#2b3a4a') };
function refreshModeColors() {
  const cs = getComputedStyle(document.body);
  cachedColors = {
    mode: document.body.getAttribute('data-mode') || 'analyst',
    a: hexToRgb(cs.getPropertyValue('--accent').trim() || '#2dd4bf'),
    b: hexToRgb(cs.getPropertyValue('--accent-2').trim() || '#4f9fff')
  };
}

/* ---------------- MODE CYCLE: analyst -> redteam -> light -> analyst ---------------- */
const MODES = ['analyst', 'redteam', 'light'];
const MODE_META = {
  analyst: {
    label: 'ANALYST MODE',
    foot: 'actively being resolved',
    brand: 'CASE FILE // ACTIVE',
    term: 'soc-console — incident #0417 — bash'
  },
  redteam: {
    label: 'RED TEAM MODE',
    foot: 'actively exploiting the case',
    brand: 'CASE FILE // BREACH IN PROGRESS',
    term: 'attack-console — operation #0417 — bash'
  },
  light: {
    label: 'DECLASSIFIED MODE',
    foot: 'case file released to public',
    brand: 'CASE FILE // DECLASSIFIED',
    term: 'archive-console — case #0417 — read-only'
  }
};

const body = document.body;
const modeToggle = document.getElementById('modeToggle');
const modeLabel = document.getElementById('modeLabel');
const footStatus = document.getElementById('footStatus');
const modeDots = document.querySelectorAll('.mode-toggle .dots span');
const modeHint = document.getElementById('modeHint');
const brandText = document.getElementById('brandText');
const termTitle = document.getElementById('termTitle');
const HINT_DISMISSED_KEY = 'portfolio-mode-hint-dismissed';

function dismissHint() {
  if (!modeHint) return;
  modeHint.classList.add('mode-hint-out');
  modeToggle.classList.remove('hint-active');
  localStorage.setItem(HINT_DISMISSED_KEY, '1');
  setTimeout(() => { modeHint.style.display = 'none'; }, 400);
}

if (modeHint) {
  if (localStorage.getItem(HINT_DISMISSED_KEY)) {
    modeHint.style.display = 'none';
  } else {
    modeToggle.classList.add('hint-active');
  }
}

function setMode(mode) {
  body.setAttribute('data-mode', mode);
  modeLabel.textContent = MODE_META[mode].label;
  footStatus.textContent = MODE_META[mode].foot;
  if (brandText) brandText.textContent = MODE_META[mode].brand;
  if (termTitle) termTitle.textContent = MODE_META[mode].term;
  modeDots.forEach((d, i) => d.classList.toggle('active', MODES[i] === mode));
  localStorage.setItem('portfolio-mode', mode);
  refreshModeColors();
}
modeToggle.addEventListener('click', () => {
  dismissHint();
  const current = body.getAttribute('data-mode');
  const next = MODES[(MODES.indexOf(current) + 1) % MODES.length];
  setMode(next);
});
setMode(localStorage.getItem('portfolio-mode') || 'light');

/* ---------------- mobile nav ---------------- */
const navToggleBtn = document.getElementById('navToggleBtn');
const navLinksEl = document.querySelector('.nav-links');
if (navToggleBtn && navLinksEl) {
  navToggleBtn.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('mobile-open');
    navToggleBtn.classList.toggle('open', isOpen);
    navToggleBtn.setAttribute('aria-expanded', String(isOpen));
  });
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('mobile-open');
      navToggleBtn.classList.remove('open');
      navToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------- scroll reveal ---------------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ---------------- scroll hint (bottom-fixed reminder) ---------------- */
const scrollHint = document.getElementById('scrollHint');
if (scrollHint) {
  scrollHint.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  });
  function updateScrollHint() {
    const scrollY = window.scrollY;
    const nearTop = scrollY < window.innerHeight * 0.4;
    const docH = document.documentElement.scrollHeight;
    const nearBottom = (scrollY + window.innerHeight) > docH - 100;
    scrollHint.classList.toggle('is-hidden', !nearTop || nearBottom);
  }
  window.addEventListener('scroll', updateScrollHint, { passive: true });
  window.addEventListener('resize', updateScrollHint);
  updateScrollHint();
}

/* ---------------- background scan canvas ---------------- */
const canvas = document.getElementById('scan-canvas');
const ctx = canvas.getContext('2d');
let W, H, dpr;
let mouseX = -1000, mouseY = -1000;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
  // capping at 1.5 instead of the device's real ratio (often 2-3 on phones/
  // retina screens) keeps the canvas from rendering 4x+ the pixels for a
  // background effect that doesn't need to be pixel-perfect
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  buildGrid();
}
window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

let gridPts = [];
function currentSpacing() {
  // wider spacing (fewer dots to draw per frame) on smaller viewports,
  // since those are usually phones/tablets with weaker GPUs
  if (W < 500) return 90;
  if (W < 900) return 72;
  return 60;
}
function buildGrid() {
  gridPts = [];
  const SPACING = currentSpacing();
  const cols = Math.ceil(W / SPACING) + 1;
  const rows = Math.ceil(H / SPACING) + 1;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      gridPts.push({
        x: i * SPACING,
        y: j * SPACING,
        base: Math.random() * Math.PI * 2,
        mix: Math.random()          // stable per-dot blend between accent & accent-2
      });
    }
  }
  buildPackets();
}

/* traveling "packet" comets that drift across the grid independent of the mouse */
let packets = [];
function buildPackets() {
  const count = Math.max(4, Math.min(9, Math.round((W * H) / 190000)));
  packets = Array.from({ length: count }, () => spawnPacket());
}
function spawnPacket() {
  const edge = Math.floor(Math.random() * 4);
  const speed = 0.6 + Math.random() * 0.9;
  let x, y, vx, vy;
  if (edge === 0) { x = Math.random() * W; y = -20; vx = (Math.random() - 0.5) * 0.6; vy = speed; }
  else if (edge === 1) { x = W + 20; y = Math.random() * H; vx = -speed; vy = (Math.random() - 0.5) * 0.6; }
  else if (edge === 2) { x = Math.random() * W; y = H + 20; vx = (Math.random() - 0.5) * 0.6; vy = -speed; }
  else { x = -20; y = Math.random() * H; vx = speed; vy = (Math.random() - 0.5) * 0.6; }
  return { x, y, vx, vy, mix: Math.random(), trail: [] };
}

let sweepAngle = 0;
function lerpRgb(c1, c2, t) {
  return {
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t
  };
}
function rgbStr(c, a) { return `rgba(${c.r | 0},${c.g | 0},${c.b | 0},${a})`; }

function draw(t) {
  ctx.clearRect(0, 0, W, H);
  const { mode, a: accent, b: accent2 } = cachedColors;
  const isLight = mode === 'light';
  const cx = W / 2, cy = H * 0.38;

  // mode-flavored motion: analyst calm, red team sharper/faster, declassified quiet
  const sweepSpeed = mode === 'redteam' ? 0.0062 : mode === 'light' ? 0.0028 : 0.0042;
  const sweepAlpha = isLight ? 0.075 : 0.14;
  ctx.globalCompositeOperation = isLight ? 'multiply' : 'lighter';

  // radar sweep wedge, gradient-blended from accent -> accent-2 across its span
  sweepAngle += sweepSpeed;
  const sweepR = Math.max(W, H) * 0.75;
  const span = 0.5;
  const slices = 10;
  for (let i = 0; i < slices; i++) {
    const t0 = i / slices, t1 = (i + 1) / slices;
    const a1 = sweepAngle + t0 * span, a2 = sweepAngle + t1 * span;
    const col = lerpRgb(accent, accent2, t0);
    const fade = (1 - t0) * sweepAlpha; // brightest at the leading edge
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, sweepR, a1, a2);
    ctx.closePath();
    ctx.fillStyle = rgbStr(col, fade);
    ctx.fill();
  }

  // grid dots, mouse-reactive, colored on a per-dot accent/accent-2 blend
  for (const p of gridPts) {
    const dx = p.x - mouseX, dy = p.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const influence = Math.max(0, 1 - dist / 220);
    const pulse = (Math.sin(t * 0.001 + p.base) + 1) / 2;
    const alpha = (isLight ? 0.09 : 0.065) + pulse * 0.05 + influence * (isLight ? 0.55 : 0.85);
    const r = 1.3 + influence * 2.7;
    const col = lerpRgb(accent, accent2, p.mix);

    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgbStr(col, Math.min(alpha, 0.9));
    ctx.fill();
  }

  // traveling packet comets — drift across the whole canvas independent of the mouse
  for (const pk of packets) {
    pk.trail.push({ x: pk.x, y: pk.y });
    if (pk.trail.length > 10) pk.trail.shift();
    pk.x += pk.vx;
    pk.y += pk.vy;
    if (pk.x < -40 || pk.x > W + 40 || pk.y < -40 || pk.y > H + 40) {
      Object.assign(pk, spawnPacket());
    }
    const col = lerpRgb(accent, accent2, pk.mix);
    for (let k = 1; k < pk.trail.length; k++) {
      const a0 = pk.trail[k - 1], a1 = pk.trail[k];
      const trailA = (k / pk.trail.length) * (isLight ? 0.4 : 0.55);
      ctx.beginPath();
      ctx.moveTo(a0.x, a0.y);
      ctx.lineTo(a1.x, a1.y);
      ctx.strokeStyle = rgbStr(col, trailA);
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(pk.x, pk.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = rgbStr(col, isLight ? 0.7 : 0.95);
    ctx.fill();
  }

  ctx.globalCompositeOperation = 'source-over';

  if (!prefersReducedMotion && !document.hidden) requestAnimationFrame(draw);
}
resize();
requestAnimationFrame(draw);
if (prefersReducedMotion) draw(0);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !prefersReducedMotion) requestAnimationFrame(draw);
});