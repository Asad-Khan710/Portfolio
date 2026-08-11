/* ============================================================
   EDIT THIS FILE — everything on the page reads from CONFIG.
   You should never need to touch index.html, style.css, or
   main.js just to update your name, certs, or projects.

   Every section below has real sample data in it right now so
   you can see exactly how the site behaves (including things
   like "show more" buttons and folder cards) BEFORE you swap in
   your own info. Replace values between quotes — don't touch
   the field names on the left (name:, date:, etc).
   ============================================================ */
const CONFIG = {
  name: "Muhammad Asad Khan",
  role: "Aspiring SOC / Security Analyst",
  description: "Building hands-on offense & defense skills through TryHackMe, backed by CompTIA's core trinity. This page is the incident report on my own progress — updated as the case develops.",

  // Shown in the hero ticket instead of repeating your name a second time.
  // Good uses: what you're looking for, your timeline, or your location.
  availability: "Open to internships & entry-level SOC/analyst roles",

  socials: {
    github:    "https://github.com/yourusername",
    linkedin:  "https://linkedin.com/in/yourusername",
    tryhackme: "https://tryhackme.com/p/yourusername",
    email:     "mailto:you@example.com"
  },

  // Link to your resume/CV (a PDF in this folder, e.g. "resume.pdf", or a
  // Google Drive/Dropbox share link). Leave this as "" and the "Resume"
  // button in the hero just won't render — no dead link by accident.
  resumeUrl: "",

  // Shown as the stat strip under the terminal
  stats: [
    { num: "3",      label: "CompTIA Certs" },
    { num: "40+",    label: "TryHackMe Rooms" },
    { num: "Top 5%", label: "THM Ranking" },
    { num: "5 mo",   label: "To Graduation" }
  ],

  /* ---------------------------------------------------------
     CERTIFICATIONS
     "link" should point at your credential's public verify page
     (Credly badge, CompTIA verification URL, etc). Leave it out
     (or set it to "#") and the "Verify credential" button just
     won't render for that card — no dead links by accident.

     There are 8 sample certs here on purpose, so you can see the
     "Show more" button in action. Once you're down to your real
     list, feel free to delete however many you don't need.
     --------------------------------------------------------- */
  certs: [
    { name: "CompTIA A+",        status: "earned",  date: "Earned 2025",  icon: "A+",  desc: "Core hardware, OS, troubleshooting & support fundamentals.", link: "https://www.credly.com/badges/example-a-plus" },
    { name: "CompTIA Network+",  status: "earned",  date: "Earned 2025",  icon: "N+",  desc: "Networking infrastructure, protocols, and operations.", link: "https://www.credly.com/badges/example-network-plus" },
    { name: "CompTIA Security+", status: "earned",  date: "Earned 2025",  icon: "S+",  desc: "Core security concepts, risk, and threat management.", link: "https://www.credly.com/badges/example-security-plus" },
    { name: "CompTIA CySA+",     status: "planned", date: "Planned",      icon: "CySA", desc: "Behavioral threat detection and security analytics." }
  ],

  skills: [
    { group: "Networking",      items: ["TCP/IP", "Subnetting", "DNS/DHCP", "VLANs", "Wireshark"] },
    { group: "Security Ops",    items: ["SIEM basics", "Log analysis", "Threat detection", "Incident response"] },
    { group: "Offensive (THM)", items: ["Nmap", "Burp Suite", "Metasploit", "Linux privesc", "Enumeration"] },
    { group: "Systems",         items: ["Linux CLI", "Windows admin", "Active Directory basics", "Bash"] },
    { group: "Cloud",           items: ["Azure fundamentals", "IAM basics", "Cloud shared responsibility model"] }
  ],

  /* ---------------------------------------------------------
     PROJECTS (Ops Log)
     This is what a recruiter sees first, so it's meant for real
     builds — not individual TryHackMe rooms (those live in the
     Write-Ups & Notes folders below, so they're not duplicated
     here).

     Each project can have a "video" inside its "details" object —
     paste a YouTube link (any format, e.g. youtu.be or watch?v=)
     or a direct .mp4/.webm file URL and it'll embed automatically
     as a demo player inside the "View details" popup. Leave it
     out entirely if you don't have a demo recording yet.
     --------------------------------------------------------- */
  projects: [
    {
      title: "Home Lab — SOC Simulation",
      difficulty: "hard",
      desc: "Personal lab running a SIEM to practice log correlation and detection writing.",
      tags: ["SIEM", "Home Lab"],
      link: "#",
      details: {
        approach: "Spun up a small SIEM on a spare machine, forwarded logs from a couple of VMs, then simulated basic attacks against them (brute force, port scans) to see what actually shows up and how to write a detection rule for it.",
        tools: ["Security Onion", "VirtualBox", "Suricata"],
        learnings: "Getting log ingestion actually configured correctly was harder than writing the detection rules — most of the 'hard' part of SOC work is plumbing, not analysis.",
        video: "https://www.youtube.com/embed/aqz-KE-bpKQ"
      }
    },
    {
      title: "Log Triage Script",
      difficulty: "medium",
      desc: "Python tool that parses raw auth/system logs and flags suspicious patterns (repeated failed logins, odd login hours, new admin accounts).",
      tags: ["Python", "Automation"],
      link: "#",
      details: {
        approach: "Started with a single regex-based parser for auth.log, then generalized it to accept any log format via a small config file so it could be pointed at different sources without rewriting the core logic.",
        tools: ["Python", "Regex", "Pandas"],
        learnings: "Most 'detection logic' is really just good pattern definitions — the hard part was deciding what counted as suspicious vs. normal noise."
      }
    },
    {
      title: "Network Traffic Dashboard",
      difficulty: "medium",
      desc: "Small web dashboard that visualizes captured packet data (protocol breakdown, top talkers, flagged connections) from a Wireshark capture.",
      tags: ["Networking", "Dashboard"],
      link: "#",
      details: {
        approach: "Exported packet captures to CSV, then built a lightweight dashboard to chart protocol distribution and highlight the noisiest hosts on the network.",
        tools: ["Wireshark", "Python", "Chart.js"],
        learnings: "Visualizing traffic made patterns jump out immediately that were easy to miss scrolling through raw packet lists."
      }
    },
    {
      title: "Vulnerable VM Build",
      difficulty: "easy",
      desc: "Deliberately misconfigured Linux VM built from scratch to practice enumeration and privilege escalation techniques on a target I fully understand.",
      tags: ["Linux", "CTF"],
      link: "#",
      details: {
        approach: "Built the VM by intentionally recreating common misconfigurations (weak sudo rules, writable cron jobs, exposed credentials) so I could practice finding — and understand — each one from both sides.",
        tools: ["VirtualBox", "LinPEAS", "Nmap"],
        learnings: "Building the vulnerabilities myself made the privilege escalation paths click in a way that just solving other people's boxes hadn't."
      }
    },
    {
      title: "Phishing Email Analysis Toolkit",
      difficulty: "medium",
      desc: "Command-line tool that inspects raw email headers and attachments to flag common phishing indicators (spoofed sender domains, suspicious links, mismatched reply-to).",
      tags: ["Python", "Email Security"],
      link: "#",
      details: {
        approach: "Collected a batch of real phishing samples from public archives, then wrote header-parsing logic to check SPF/DKIM alignment and flag mismatched display names before adding link and attachment analysis.",
        tools: ["Python", "email library", "VirusTotal API"],
        learnings: "Header analysis alone caught a surprising number of samples — most phishing attempts don't bother spoofing the technical layer as carefully as the visible email content."
      }
    },
    {
      title: "Password Policy Auditor",
      difficulty: "easy",
      desc: "Script that checks a list of hashed passwords against common weak-password lists and reports which accounts need a forced reset.",
      tags: ["Python", "Auditing"],
      link: "#",
      details: {
        approach: "Started with a simple wordlist comparison, then added hash-cracking speed benchmarks so the report could estimate how quickly each weak password would actually fall to a real attacker.",
        tools: ["Python", "Hashcat", "rockyou.txt"],
        learnings: "Estimating crack time (not just flagging 'weak') made the report far more persuasive when presenting findings to non-technical stakeholders."
      }
    }
  ],

  /* ---------------------------------------------------------
     WRITE-UPS & NOTES
     These render as folder cards. Each folder is defined once in
     "writeupFolders" below, then every entry in "writeups" gets
     tagged with a matching "folder" id to say which folder it
     belongs in. Add a new folder any time you want a new category
     (e.g. "ctf" for CTF competitions) — just give it an id, then
     tag entries with that same id.
     --------------------------------------------------------- */
  writeupFolders: [
    { id: "tryhackme", label: "TryHackMe Write-Ups", icon: "TH", desc: "Room walkthroughs & methodology" },
    { id: "notes",      label: "Field Notes",         icon: "FN", desc: "Personal notes & checklists" }
  ],



  writeups: [
    {
      folder: "tryhackme",
      title: "Breaking Down THM: Overpass",
      date: "Jun 2026",
      summary: "Walkthrough of a classic web + privilege escalation box — from an SQL injection foothold to a full root shell, with the reasoning behind each step.",
      tags: ["Web", "Privesc"],
      link: "#"
    },
    {
      folder: "tryhackme",
      title: "TryHackMe: Network Fundamentals",
      date: "Mar 2026",
      summary: "Notes from completing the core networking room path — subnetting, the OSI model, and packet analysis basics.",
      tags: ["Networking"],
      link: "#"
    },
    {
      folder: "tryhackme",
      title: "TryHackMe: Offensive Security Path",
      date: "Feb 2026",
      summary: "Working through enumeration, exploitation, and privilege escalation rooms — methodology and lessons per room.",
      tags: ["Pentesting"],
      link: "#"
    },
    {
      folder: "tryhackme",
      title: "TryHackMe: Active Directory Basics",
      date: "Dec 2025",
      summary: "First pass through an AD-focused room — enumerating users and groups, then chaining a Kerberoasting attack to a domain admin shell.",
      tags: ["Active Directory", "Windows"],
      link: "#"
    },
    {
      folder: "tryhackme",
      title: "TryHackMe: Web Fundamentals",
      date: "Oct 2025",
      summary: "Core web room covering HTTP basics, common injection points, and how to read a request/response cycle like an attacker.",
      tags: ["Web", "HTTP"],
      link: "#"
    },
    {
      folder: "notes",
      title: "Notes on Enumeration Methodology",
      date: "May 2026",
      summary: "A personal checklist for approaching an unknown target — the order I run scans in and why, distilled from a dozen TryHackMe rooms.",
      tags: ["Methodology", "Nmap"],
      link: "#"
    },
    {
      folder: "notes",
      title: "First Home Lab SIEM Build",
      date: "Apr 2026",
      summary: "What broke, what worked, and what I'd do differently setting up log ingestion for a small home lab SOC simulation.",
      tags: ["SIEM", "Home Lab"],
      link: "#"
    },
    {
      folder: "notes",
      title: "Cheatsheet: Common Linux Privesc Checks",
      date: "Jan 2026",
      summary: "A running list of the first ten things I check on any fresh Linux shell before reaching for LinPEAS.",
      tags: ["Linux", "Privesc"],
      link: "#"
    },
    {
      folder: "notes",
      title: "Notes on Reading Wireshark Captures Fast",
      date: "Nov 2025",
      summary: "The filters and display columns I set up first on any new capture so I'm not scrolling through raw packets looking for a needle.",
      tags: ["Wireshark", "Networking"],
      link: "#"
    },
    {
      folder: "notes",
      title: "SIEM Alert Triage Checklist",
      date: "Sep 2025",
      summary: "A personal step-by-step for working through a new SIEM alert — what to check first, and when to escalate versus close it as a false positive.",
      tags: ["SIEM", "Triage"],
      link: "#"
    }
  ],

  experience: [
    {
      title: "Cybersecurity Intern",
      org: "Burjeel Hospital",
      when: "2024 — Present",
      desc: "Brief description of responsibilities and impact.",
      bullets: [
        "NEED TO FIX",
        "NEED TO FIX"
      ]
    },
    {
      title: "Help Desk Volunteer",
      org: "NMC Hospital",
      when: "2023 — 2024",
      desc: "Supported students and staff with hardware, account, and connectivity issues.",
      bullets: [
        "NEED TO FIX",
        "NEED TO FIX"
      ]
    },
  
  ],

  education: [
    {
      title: "Bachelor in Computer Science",
      org: "Dalhousie University",
      when: "Expected — 5 months",
      desc: "Relevant coursework, honors, or focus areas go here."
    },
    
    {
      title: "High School Diploma",
      org: "SABIS",
      when: "2022",
      desc: "Include if it's relevant (early CS/IT coursework, a club, a notable project) — otherwise feel free to delete this entry."
    }
  ]
};
