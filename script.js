/* Rendering code. You normally never need to edit this file. All content is in config.js. */
/* ============================================================ rendering ============================================================ */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const P = DATA.profile;

/* brand icons used by the card resume and project cards */
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function verifyBtn(c) {
  return c.verify ? `<a class="vbtn" href="${esc(c.verify)}" target="_blank" rel="noopener">${CHECK}Verify</a>`
                  : `<span class="vbtn off" title="Add this link as verify in the certs config">${CHECK}Verify</span>`;
}
const ICON = {
  github: { b: "var(--ink)", f: "var(--bg)", svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>` },
  linkedin: { b: "#0A66C2", f: "#fff", svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="1" width="22" height="22" rx="4" fill="#fff"/><rect x="4.4" y="9.4" width="3.2" height="10" fill="#0A66C2"/><circle cx="6" cy="5.9" r="1.9" fill="#0A66C2"/><path fill="#0A66C2" d="M10.4 9.4h3v1.4c.5-.9 1.6-1.7 3.2-1.7 3 0 3.7 2 3.7 4.6v5.7h-3.2v-5c0-1.2 0-2.7-1.7-2.7s-1.8 1.300-1.800 2.600v5.100h-3.200z"/></svg>` },
  medium: { b: "#111111", f: "#fff", svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="7" cy="12" rx="5.5" ry="6" fill="#fff"/><ellipse cx="16.800" cy="12" rx="2.800" ry="5.600" fill="#fff"/><ellipse cx="22" cy="12" rx="1" ry="4.800" fill="#fff"/></svg>` },
  demo: { b: "linear-gradient(135deg, var(--accent), var(--accent2))", f: "#fff", svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  tryhackme: { b: "#1C2538", f: "#fff", svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="1" width="22" height="22" rx="5" fill="#88CC14"/><path d="M9.500 7.500 5 12l4.500 4.500M14.500 7.500 19 12l-4.500 4.500" fill="none" stroke="#1C2538" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
};

$("brand").textContent = P.short;
$("name").textContent = P.name;
$("role").textContent = P.role;
$("summary").textContent = P.summary;
$("kicker").innerHTML = `<span>${esc(P.status)}</span>`;
$("footL").textContent = P.name;
$("footR").textContent = DATA.education.school + " · " + DATA.education.when;

/* hero buttons */
const cta = [`<a class="btn primary" href="#projects">See projects</a>`];
if (P.resume) cta.push(`<a class="btn" href="${esc(P.resume)}" target="_blank" rel="noopener">Resume</a>`);
cta.push(`<a class="btn" href="#contact">Contact</a>`);
$("cta").innerHTML = cta.join("");

/* hero facts, computed from the data */
$("facts").innerHTML = [
  [DATA.projects.length, "Security projects"],
  [DATA.education.when.replace("Expected ", ""), "Graduation"]
].map(([v, l]) => `<div><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join("");

/* projects + tag filter */
const allTags = [...new Set(DATA.projects.flatMap((p) => p.tags))];
let activeTag = "All";
var simTimers = [];
function renderFilters() {
  $("filters").innerHTML = ["All", ...allTags].map((t) =>
    `<button type="button" class="chip-btn" data-tag="${esc(t)}" aria-pressed="${t === activeTag}">${esc(t)}</button>`).join("");
}
function renderProjects() {
  const list = DATA.projects
    .filter((p) => activeTag === "All" || p.tags.includes(activeTag))
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  $("projEyebrow").textContent = activeTag === "All"
    ? `${DATA.projects.length} projects`
    : `${list.length} of ${DATA.projects.length} projects · ${activeTag}`;
  $("projGrid").innerHTML = list.length ? list.map((p) => {
    const links = [];
    const L = p.links || {};
    const LABEL = { github: "View on GitHub", medium: "Read the writeup", tryhackme: "TryHackMe room", demo: "Live demo", linkedin: "LinkedIn post" };
    ["github", "medium", "tryhackme", "demo", "linkedin"].forEach((k) => {
      if (!L[k]) return;
      const ic = ICON[k] || ICON.demo;
      links.push(`<a class="btn sm lnk" style="--b:${ic.b};--f:${ic.f}" href="${esc(L[k])}" target="_blank" rel="noopener">${ic.svg}${LABEL[k]}</a>`);
    });
    if (L.link) links.push(`<a class="btn sm lnk" style="--b:${ICON.demo.b};--f:${ICON.demo.f}" href="${esc(L.link)}" target="_blank" rel="noopener">${ICON.demo.svg}${esc(L.linkLabel || "Open link")}</a>`);
    return `<article class="card" data-kind="${esc(p.kind)}">
      <div class="card-top"><span>${esc(p.kind)}</span>${p.featured ? `<span class="flag">Featured</span>` : ""}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      <div class="stack">${p.stack.map((s) => `<span class="tool">${esc(s)}</span>`).join("")}</div>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      ${links.length ? `<div class="links">${links.join("")}</div>` : ""}
      ${p.media ? mediaMarkup(p.media) : ""}
      ${p.sim ? simMarkup(p.sim, DATA.projects.indexOf(p)) : ""}
      <details><summary>What I did</summary><ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></details>
    </article>`;
  }).join("") : `<p class="empty">No projects with that tag yet.</p>`;
  startSims();
}
$("filters").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-tag]");
  if (!b) return;
  activeTag = b.dataset.tag;
  renderFilters(); renderProjects();
});
renderFilters(); renderProjects();

/* skills */
$("skillGrid").innerHTML = DATA.skills.map((g) =>
  `<div class="skill-group"><h3>${esc(g.group)}</h3><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

/* experience */
$("jobs").innerHTML = DATA.experience.map((j) =>
  `<div class="job"><div class="when">${esc(j.when)}</div><div><h3>${esc(j.role)}</h3><div class="org">${esc(j.org)} · ${esc(j.place)}</div><ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div></div>`).join("");

/* certs + education */
$("certEyebrow").textContent = `${DATA.certs.length} credentials`;
$("certGrid").innerHTML = DATA.certs.map((c) =>
  `<div class="cert"><span class="iss">${esc(c.issuer)}</span><h3>${esc(c.name)}</h3>${verifyBtn(c)}</div>`).join("");
$("edu").innerHTML = `<div><div class="eyebrow">Studying</div><h3>Education</h3></div><div class="edu-row"><b>${esc(DATA.education.degree)}, ${esc(DATA.education.school)}</b><span>${esc(DATA.education.when)}</span></div>`;

/* contact */
$("contactTitle").textContent = DATA.contact.title;
$("contactText").textContent = DATA.contact.text;
const reach = [[P.email, "Email"], [P.phone, "Phone"]].filter(([v]) => v).map(([v, l]) =>
  `<div class="row"><span data-copy>${esc(v)}</span><button class="btn sm" type="button" data-label="${esc(l)}">Copy</button></div>`);
P.socials.filter((x) => x.url).forEach((x) => reach.push(`<div class="row"><span>${esc(x.label)}</span><a class="btn sm" href="${esc(x.url)}" target="_blank" rel="noopener">Open</a></div>`));
$("reach").innerHTML = reach.join("");
$("reach").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-label]");
  if (!b) return;
  const span = b.parentElement.querySelector("[data-copy]");
  const select = () => { const r = document.createRange(); r.selectNodeContents(span); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
  const done = (t) => { b.textContent = t; setTimeout(() => (b.textContent = "Copy"), 1600); };
  try {
    navigator.clipboard.writeText(span.textContent).then(() => done("Copied"), () => { select(); done("Selected"); });
  } catch (err) { select(); done("Selected"); }
});

/* theme toggle (remembered per viewer when storage is available) */
const root = document.documentElement;
/* light is the default; a viewer's saved choice wins */
root.setAttribute("data-theme", "light");
try { const t = localStorage.getItem("theme"); if (t === "dark" || t === "light") root.setAttribute("data-theme", t); } catch (e) {}
function syncThemeLabel() { $("theme").setAttribute("aria-label", root.getAttribute("data-theme") === "dark" ? "Switch to light theme" : "Switch to dark theme"); }
syncThemeLabel();
$("theme").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  syncThemeLabel();
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* card resume */
$("idcard").innerHTML = `
  <div class="id-top"><div class="mono-badge">${esc(P.name.split(" ").filter((w, i, a) => i === 1 || i === a.length - 1).map((w) => w[0]).join("") || P.name[0])}</div>
    <div><b>${esc(P.cardTitle)}</b><span>${esc(P.cardSub)}</span></div></div>
  <div class="id-roles">${P.role.split("|").map((r) => `<span class="tag">${esc(r.trim())}</span>`).join("")}</div>
  <div class="id-sec"><div class="id-label">Certifications</div>
    <div class="cert-pills">${DATA.certs.map((c) => `<div class="cert-pill"><b>${esc(c.name)}</b><i>${esc(c.issuer)}</i>${verifyBtn(c)}</div>`).join("")}</div></div>
  <div class="id-sec id-two">
    <div class="id-col"><div class="id-label">Education</div><b>${esc(DATA.education.short || DATA.education.degree)}</b><span>${esc(DATA.education.school)} · ${esc(DATA.education.when)}</span></div>
    <div class="id-col"><div class="id-label">Experience</div><b>${esc(DATA.experience[0].role)}</b><span>${esc(DATA.experience[0].org)} · ${esc(DATA.experience[0].when)}</span></div>
  </div>
  <div class="id-sec"><div class="id-label">Find me on</div>
    <div class="socs">${P.socials.map((x) => {
      const k = ICON[x.type] || { b: "var(--ink)", f: "var(--bg)", svg: "" };
      const st = `style="--b:${k.b};--f:${k.f}"`;
      return x.url ? `<a class="soc" ${st} href="${esc(x.url)}" target="_blank" rel="noopener">${k.svg}<span>${esc(x.label)}</span></a>`
                   : `<span class="soc off" ${st} title="Add this link in profile.socials">${k.svg}<span>${esc(x.label)}</span></span>`;
    }).join("")}</div></div>`;

/* ---------- picture / video slot inside a project card ---------- */
function mediaMarkup(m) {
  const cap = m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : "";
  const body = m.type === "video"
    ? `<video controls muted playsinline preload="metadata" ${m.poster ? `poster="${esc(m.poster)}"` : ""} src="${esc(m.src)}"></video>`
    : `<img src="${esc(m.src)}" alt="${esc(m.alt || "")}" loading="lazy">`;
  return `<figure class="media">${body}${cap}</figure>`;
}

/* ---------- demo panel inside a project card ---------- */
function simMarkup(h, idx) {
  return `<div class="panel sim" data-sim="${idx}" aria-label="Animated sample output for ${esc(h.title)}">
    <div class="panel-top"><b>${esc(h.title)}</b><span class="pt-right"><button class="replay" type="button" data-replay aria-label="Replay the demo"><svg viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M2 1l9 5-9 5z"/></svg>Replay demo</button><span class="state" data-state>${esc(h.idle)}</span></span></div>
    <div class="log" data-log></div>
    <div class="panel-foot">${esc(h.note)}</div></div>`;
}

function startSims() {
  simTimers.forEach(clearInterval); simTimers = [];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-sim]").forEach((el) => {
    const h = DATA.projects[+el.dataset.sim].sim, log = el.querySelector("[data-log]"), st = el.querySelector("[data-state]");
    const draw = (n) => {
      let html = "", level = "";
      h.lines.slice(0, n).forEach((l) => {
        html += `<div class="ln"><span class="t">${esc(l.t)}</span><span class="m">${esc(l.m)}</span><span class="n">${esc(l.n || "")}</span></div>`;
        if (l.flag) {
          html += `<div class="al ${l.flag.level}">${esc(l.flag.text)}</div>`;
          if (level !== "high") level = l.flag.level;
        }
      });
      log.innerHTML = html;
      st.className = "state" + (level ? " " + level : "");
      st.textContent = level === "high" ? "HIGH" : level === "med" ? "MEDIUM" : h.idle;
    };
    const play = () => {
      if (reduce) { draw(h.lines.length); return; }
      let n = 0; draw(0);
      const t = setInterval(() => { n++; draw(n); if (n >= h.lines.length) clearInterval(t); }, 600);
      simTimers.push(t);
    };
    const rb = el.querySelector("[data-replay]");
    rb.addEventListener("click", () => { rb.classList.add("used"); simTimers.forEach(clearInterval); play(); });
    /* play once automatically the first time the panel scrolls into view */
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); play(); } }, { threshold: 0.6 });
      io.observe(el);
    }
    draw(h.lines.length); /* complete at rest, replay on demand */
  });
}
