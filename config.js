/* ============================================================
   PORTFOLIO CONTENT. This is the only file you need to edit.
   Everything on the page is generated from DATA. Colors and fonts are in styles.css.
   - Add a project: copy one object in `projects` and change it.
   - Filter chips are built from the `tags` you use. Nothing else to touch.
   - Social icons: fill in `url` in profile.socials. Delete an entry to remove it. Types with an icon: github, linkedin, medium, tryhackme.
   - Give a project a `sim` block to show an animated sample-output panel inside its card.
   - Give a project a `media` block to show a picture or video inside its card (see the example inside the Home SOC Lab project).
   - Project links: fill in any of github, medium, tryhackme, demo, linkedin, link in a project's `links`. Only links with a URL get a button, so leave the rest as "".
     Add extra ones with the key `link` and an optional label, e.g. links: { link: "https://...", linkLabel: "Slides" }.
   ============================================================ */
const DATA = {
  profile: {
    short: "asad.khan",
    name: "Muhammad Asad Khan",
    role: "Cybersecurity | SOC Analyst | IT Support",
    summary: "Computer Science student at Dalhousie University with CompTIA Security+, Network+ and A+. I build small labs, detection rules and Python tools so I can practise investigating what shows up in the logs.",
    status: "Open to SOC analyst, cybersecurity and IT support roles",
    email: "asadkhan10c@gmail.com",
    phone: "+1 902-402-3126",
    cardTitle: "At a glance", cardSub: "CompTIA certified \u00b7 Class of 2026",
    resume: "",     // optional: link to your resume PDF
    socials: [      // paste each profile URL; entries with no URL show as dashed placeholders
      { type: "github", label: "GitHub", url: "" },
      { type: "linkedin", label: "LinkedIn", url: "" },
      { type: "medium", label: "Writeups", url: "" },
      { type: "tryhackme", label: "TryHackMe", url: "" }
    ]
  },
  education: { degree: "Bachelor of Computer Science", school: "Dalhousie University", when: "Expected Dec 2026" },
  projects: [
    {
      title: "Home SOC Lab",
      kind: "Lab",
      featured: true,
      summary: "A segmented virtual network with Kali Linux, Windows and Ubuntu behind pfSense. Windows and Linux telemetry plus Suricata alerts all land in Wazuh.",
      stack: ["Wazuh", "pfSense", "Sysmon", "Suricata", "Kali Linux", "VMware"],
      tags: ["SIEM", "Detection Engineering", "Incident Response"],
      bullets: [
        "Ran controlled SSH login, Nmap reconnaissance, Windows authentication and file-integrity scenarios, then investigated the logs, alerts and detection gaps.",
        "Wrote custom Wazuh rules for repeated SSH failures, configuration-file changes and encoded PowerShell. Tested alert thresholds and reviewed false positives.",
        "Documented simulated incident timelines, detection evidence and recommendations to improve visibility and response."
      ],
      /* Picture or video slot. Uncomment, then point src at your file.
         On your own site: put the file in the assets folder and use its path, e.g. "assets/soc-lab.mp4".
         Image: media: { type: "image", src: "assets/soc-lab.png", alt: "Wazuh dashboard", caption: "Wazuh alerts from the lab" },
         Video: media: { type: "video", src: "assets/soc-lab.mp4", poster: "assets/soc-lab.png", caption: "30 second walkthrough" },
         (Videos play muted with controls. Keep files small so the page loads fast.) */
      media: null,
      links: { github: "", medium: "", tryhackme: "", demo: "" }
    },
    {
      title: "Wireshark Traffic Analysis",
      kind: "Analysis",
      summary: "Packet captures from Nmap and ARP-spoofing lab exercises, worked through with display filters.",
      stack: ["Wireshark", "Nmap"],
      tags: ["Packet Analysis", "Networking"],
      bullets: [
        "Used display filters to pick out unusual ARP traffic, SYN activity and unauthorized connections.",
        "Documented packet-level findings with screenshots and recommended controls such as firewall rules and ARP protections."
      ],
      links: { github: "", medium: "", tryhackme: "", demo: "" }
    },
    {
      title: "Failed Login Detector",
      kind: "Tool",
      summary: "A Python tool that flags 5 or more failed logins from one IP inside a configurable 60-second window.",
      /* Demo panel. Each line can carry a flag {level: "med" | "high", text} that raises an alert row and the state chip. */
      sim: {
        title: "failed_login_detector.py", idle: "MONITORING",
        note: "Sample lab log. Private IP, no real traffic. Rule: 5+ failures in 60s = MEDIUM, 8+ = HIGH.",
        lines: Array.from({ length: 8 }, (_, i) => ({
          t: "10:41:" + String(2 + i * 5).padStart(2, "0"),
          m: "sshd: Failed password for invalid user admin from 10.0.2.15", n: "#" + (i + 1),
          flag: i === 4 ? { level: "med", text: "ALERT MEDIUM \u00b7 10.0.2.15 \u00b7 5 failures in 60s" }
              : i === 7 ? { level: "high", text: "ALERT HIGH \u00b7 10.0.2.15 \u00b7 8 failures in 60s" } : null
        }))
      },
      stack: ["Python"],
      tags: ["Python", "Detection Engineering"],
      bullets: [
        "Classifies alerts as MEDIUM (5 to 7 failures) or HIGH (8 or more) and saves detections to an alerts file for review.",
        "Validates timestamps and malformed log entries before analysis.",
        "Per-IP time-window analysis separates bursts of failed logins from isolated authentication errors."
      ],
      links: { github: "", medium: "", tryhackme: "", demo: "" }
    },
    {
      title: "Network Reconnaissance Tool",
      kind: "Tool",
      summary: "A menu-driven scanner for port, service/version and OS detection, built on Nmap for authorized testing.",
      sim: {
        title: "Network Reconnaissance Tool", idle: "SCANNING",
        note: "Illustrative sample output on a private lab address, not a real scan.",
        lines: [
          { t: "10:52:01", m: "target 10.0.2.20 validated, ports 1-1024", n: "" },
          { t: "10:52:03", m: "22/tcp   open  ssh", n: "" },
          { t: "10:52:04", m: "23/tcp   open  telnet", n: "", flag: { level: "high", text: "RISK HIGH \u00b7 Telnet exposed, traffic is cleartext" } },
          { t: "10:52:05", m: "21/tcp   open  ftp", n: "", flag: { level: "med", text: "RISK MEDIUM \u00b7 FTP exposed" } },
          { t: "10:52:06", m: "80/tcp   open  http", n: "" },
          { t: "10:52:07", m: "445/tcp  open  microsoft-ds", n: "", flag: { level: "med", text: "RISK MEDIUM \u00b7 SMB exposed" } },
          { t: "10:52:09", m: "report saved: timestamped TXT + JSON", n: "" }
        ]
      },
      stack: ["Python", "Nmap"],
      tags: ["Python", "Networking"],
      bullets: [
        "Validates targets and supports configurable port selection.",
        "Parses Nmap results into open ports and detected services, and flags risky exposure such as Telnet, FTP and SMB.",
        "Writes timestamped TXT and JSON reports and keeps scan history so tests are repeatable."
      ],
      links: { github: "https://github.com/Asad-Khan710/Network-Reconnaissance-Tool", medium: "", tryhackme: "", demo: "" }
    }
  ],
  skills: [
    { group: "Security and monitoring", items: ["Wazuh SIEM", "Sysmon", "Suricata IDS", "Wireshark", "Log analysis", "Alert investigation", "FIM", "Custom rules"] },
    { group: "Networking and infrastructure", items: ["Nmap", "pfSense", "TCP/IP", "Firewalls", "Active Directory", "VMware", "Windows", "Ubuntu", "Kali Linux"] },
    { group: "Programming and tools", items: ["Python", "Bash", "Git", "GitHub", "JSON", "HTML/CSS", "MySQL", "Excel"] }
  ],
  experience: [
    {
      role: "IT Intern", org: "Burjeel Medical Hospital", place: "Abu Dhabi, UAE", when: "Jun 2024 to Aug 2024",
      bullets: [
        "Provisioned and maintained employee accounts in Active Directory, keeping user IDs, email addresses and onboarding records accurate.",
        "Built audit sheets and removed redundant records to make IT data better organized and more accurate.",
        "Coordinated laptop and network switch distribution across hospital departments to support daily IT operations."
      ]
    }
  ],
  certs: [   // paste each credential's verification link into `verify` to turn on its Verify button
    { name: "Security+", issuer: "CompTIA", verify: "" },
    { name: "Network+", issuer: "CompTIA", verify: "" },
    { name: "A+", issuer: "CompTIA", verify: "" }
  ],
  contact: { title: "Let's talk", text: "If you are hiring for a SOC, security or IT support role, email is the fastest way to reach me." }
};
