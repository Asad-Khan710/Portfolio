# Security Analyst Portfolio — Case File Theme

Plain HTML/CSS/JavaScript. No React, no build tools, no `npm install`. Open `index.html` in a browser and it just works.

## Folder structure

```
portfolio/
├── index.html        ← page structure (you shouldn't need to touch this)
├── css/
│   └── style.css      ← all styling, including the 3 color modes
└── js/
    ├── config.js       ← EDIT THIS — your name, certs, projects, socials
    └── main.js         ← rendering + interactivity (you shouldn't need to touch this)
```

## The only file you need to edit: `js/config.js`

Everything on the page reads from the `CONFIG` object in that one file. It's
pre-filled with sample data everywhere (certs, projects, write-ups, experience,
education) so you can open the site right now and see exactly how every
feature behaves before you touch anything. Swap the sample text out for your
own info whenever you're ready — no HTML knowledge required, just edit the
text between quotes.

### Certifications (`CONFIG.certs`)
- Flip a cert's `status` from `"planned"` to `"earned"` once you pass the exam.
- Set `link` to your credential's public verify page (Credly badge, CompTIA
  verify URL, etc) and a **"Verify credential"** button appears on that card
  automatically. Leave `link` out entirely and the button just won't show —
  no dead links by accident.
- If you list more than 4 certs, a **"Show more certifications"** button
  appears automatically so the page doesn't dump your whole list on visitors
  at once.

### Projects (`CONFIG.projects`)
This is your Ops Log — it's meant for real builds (home labs, tools, scripts),
not individual TryHackMe rooms. Those live in the Write-Ups & Notes folders
instead, so nothing gets shown twice.
- More than 3 projects automatically get a **"Show more projects"** button.
- Each project's `details` object can include a `video` field — paste a
  YouTube link (any format works: `youtu.be/...` or `watch?v=...`) or a
  direct `.mp4`/`.webm` file URL, and it renders as an embedded demo player
  inside that project's "View details" popup. Leave it out if you don't have
  a demo recording.

### Write-Ups & Notes (`CONFIG.writeupFolders` + `CONFIG.writeups`)
These render as folder cards instead of one long list. Each folder is
defined once in `writeupFolders` (give it an `id`, a `label`, a short `icon`
badge, and a description), then every entry in `writeups` gets tagged with a
matching `folder` id to say which folder it belongs in. Click a folder on
the live site and a popup lists everything tagged with that id.

Want a third folder (e.g. "CTF Write-Ups")? Add a new object to
`writeupFolders` with a new `id`, then tag entries in `writeups` with that
same id — that's the whole process.

### Resume (`CONFIG.resumeUrl`)
Set this to a link to your resume/CV — either a PDF you drop into this folder
(e.g. `"resume.pdf"`) or a share link (Google Drive, Dropbox, etc). A
**"Resume"** button appears in the hero next to "View Ops Log" automatically.
Leave it as `""` and the button just stays hidden — no dead link by accident.

### Everything else
`experience`, `education`, `skills`, `stats`, and `socials` all work the same
way they did before — plain arrays of objects, edit the text between quotes.
`availability` is the one line that shows in the hero ticket instead of
repeating your name a second time — good uses: what you're looking for,
or your location.

## The three modes

Click the toggle in the top-right nav to cycle:

1. **Analyst mode** (default) — dark, teal/blue, defensive posture
2. **Red Team mode** — dark, amber/red, offensive posture, sharper corners
3. **Declassified mode** — light "printed case file" theme (manila background,
   stamp graphic, redaction-red accent) instead of a generic white light mode

Your last choice is remembered via `localStorage` on return visits.

## Hosting it (pick one, both free, ~10 minutes)

### Option A — GitHub Pages (recommended, since you'll want the repo link anyway)
1. Create a new repo named exactly `yourusername.github.io`
2. Upload the whole `portfolio` folder's **contents** (index.html, css/, js/) to
   the root of that repo — not nested inside another folder
3. Settings → Pages → Source: `main` branch, `/ (root)` → Save
4. Live in about a minute at `https://yourusername.github.io`

### Option B — Netlify Drop (fastest, no git required)
1. Go to https://app.netlify.com/drop
2. Drag the entire `portfolio` folder onto the page
3. Done — you get a live URL immediately (can rename it in site settings)

## Notes
- Two Google Fonts (Space Grotesk, JetBrains Mono) load from Google's CDN — the
  only external dependency. Everything else is self-contained.
- Icons (GitHub, LinkedIn, TryHackMe, email) are inline SVG — no icon library
  or extra requests needed.
- Respects `prefers-reduced-motion` and is responsive down to mobile widths.
- The animated background canvas caches its colors instead of recalculating
  them every frame, and pauses entirely when the tab isn't visible — so it
  stays smooth without draining battery in a background tab.
