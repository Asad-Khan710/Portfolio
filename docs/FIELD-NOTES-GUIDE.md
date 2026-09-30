# Field Notes Guide

Field Notes are Markdown files stored in:

`content/field-notes/`

The portfolio automation automatically detects these files and adds them to the portfolio.

## Creating a New Field Note

1. Copy `content/field-notes/TEMPLATE.md`
2. Rename the copy.
3. Change the front matter.
4. Write the actual notes.
5. Save the file.
6. Commit and push to GitHub.

**Do not manually edit `js/config.js`.**

`config.js` is generated automatically.

---

## Required Front Matter

Every Field Note needs these fields:

```yaml
---
title: "Your Field Note Title"
date: "Sep 2026"
summary: "A short description of the note."
tags:
  - Tool
  - Topic
  - Skill
---
```

### `title`

The title displayed on the portfolio.

Example:

```yaml
title: "Nmap Service Enumeration"
```

### `date`

The date displayed on the portfolio.

For now, use:

```yaml
date: "Sep 2026"
```

Update the month/year when creating a new note.

### `summary`

A short description shown before opening the note.

Keep it around 1–2 sentences.

Example:

```yaml
summary: "Notes on using Nmap for service discovery and basic enumeration."
```

### `tags`

Use 2–5 tags that describe the note.

Example:

```yaml
tags:
  - Nmap
  - Networking
  - Enumeration
```

---

## Suggested Tags

Use existing tags when they fit instead of constantly creating new variations.

### Networking

* Networking
* TCP/IP
* DNS
* DHCP
* Wireshark
* Nmap

### Security

* Cybersecurity
* Threat Detection
* Incident Response
* Log Analysis
* Vulnerability Assessment
* Reconnaissance
* Enumeration

### Systems

* Linux
* Windows
* Active Directory
* PowerShell
* Bash

### Programming

* Python
* Java
* JavaScript

### Security Tools

* Nmap
* Wireshark
* Burp Suite
* Metasploit

---

## Writing the Note

After the front matter, write normal Markdown.

Example:

````markdown
# Nmap Service Enumeration

## What I Learned

Nmap can be used to identify open ports and services
running on a target.

## Commands / Examples

```bash
nmap -sV 192.168.1.10
````

## Key Takeaways

* `-sV` attempts to identify service versions.
* Open ports can reveal available services.
* Enumeration should come after basic host discovery.

````

Use headings, lists, code blocks, and short explanations to make the notes easy to read.

---

## Important Rules

### Do

- Use `.md` files.
- Keep the front matter at the very top.
- Use the required fields.
- Keep tags relevant.
- Write your own notes and explanations.
- Use clear filenames such as:
  - `nmap-service-enumeration.md`
  - `windows-event-logs.md`
  - `dns-enumeration.md`

### Don't

- Edit `js/config.js` manually.
- Remove the `---` lines around front matter.
- Change `folder` manually.
- Add unnecessary front matter fields unless the automation is updated to support them.
- Put unrelated topics into the tags.
- Use `*` for YAML tag lists. Use `-`.

---

## Markdown Formatting

Field Notes currently support common Markdown formatting such as:

- Headings
- Bold text
- Inline code
- Bullet lists
- Fenced code blocks
- Paragraphs

For the cleanest display, avoid complex Markdown such as tables, nested lists, and other formatting that may not be supported by the portfolio renderer.

---

## How the Automation Works

```text
Field Note (.md)
       ↓
Git push
       ↓
GitHub Actions
       ↓
automation/sync.py
       ↓
js/config.js
       ↓
Portfolio
````

The Markdown file is the source.

`config.js` is the generated output.

Therefore:

**Edit the Markdown, not `config.js`.**
