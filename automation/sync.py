"""
Portfolio generator.

Reads:
    portfolio-data/profile.json
    portfolio.yml files from your GitHub repositories
    Markdown files from content/field-notes/

Generates:
    js/config.js

IMPORTANT:
    This script NEVER reads or modifies README.md files.
"""

import json
import base64
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

import yaml


# ============================================================
# SETTINGS
# ============================================================

GITHUB_USERNAME = "Asad-Khan710"

ROOT = Path(__file__).resolve().parent.parent

PROFILE_FILE = ROOT / "portfolio-data" / "profile.json"
FIELD_NOTES_DIR = ROOT / "content" / "field-notes"
OUTPUT_FILE = ROOT / "js" / "config.js"


# ============================================================
# GITHUB API
# ============================================================

def github_request(url):
    """Make a read-only request to GitHub's public API."""

    request = Request(
        url,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "Asad-Khan710-Portfolio-Automation"
        }
    )

    with urlopen(request) as response:
        return json.loads(response.read().decode("utf-8"))


def get_repositories():
    """Get repositories belonging to the GitHub account."""

    url = (
        f"https://api.github.com/users/"
        f"{GITHUB_USERNAME}/repos"
        f"?type=owner&per_page=100"
    )

    print(f"Connecting to GitHub: {GITHUB_USERNAME}")

    return github_request(url)


def get_portfolio_file(repo):
    """
    Look for portfolio.yml in the root of a repository.

    README.md is deliberately NOT requested.
    """

    owner = repo["owner"]["login"]
    name = repo["name"]

    url = (
        f"https://api.github.com/repos/"
        f"{owner}/{name}/contents/portfolio.yml"
    )

    try:
        return github_request(url)

    except HTTPError as error:
        if error.code == 404:
            return None

        raise


# ============================================================
# PROJECT PROCESSING
# ============================================================

def load_project(repo, portfolio_file):
    """Convert portfolio.yml into the format used by config.js."""

    encoded_content = portfolio_file["content"]
    decoded_content = base64.b64decode(encoded_content).decode("utf-8")

    data = yaml.safe_load(decoded_content)

    if not data:
        return None

    project = {
        "title": data.get("title", repo["name"]),
        "difficulty": data.get("difficulty", "medium"),
        "desc": data.get("description", repo.get("description") or ""),
        "tags": data.get("tags", []),

        # GitHub URL is automatically taken from the repository.
        "link": repo["html_url"],

        "details": {
            "approach": data.get("approach", ""),
            "tools": data.get("tools", []),
            "learnings": data.get("learnings", "")
        }
    }

    return project


def find_projects():
    """Find all GitHub repositories containing portfolio.yml."""

    repositories = get_repositories()

    projects = []

    print(f"Repositories found: {len(repositories)}")
    print("\nChecking repositories for portfolio.yml...\n")

    for repo in repositories:

        # Ignore forks.
        if repo.get("fork"):
            continue

        print(f"Checking: {repo['name']}")

        portfolio_file = get_portfolio_file(repo)

        if portfolio_file is None:
            continue

        print("  -> portfolio.yml FOUND")

        project = load_project(repo, portfolio_file)

        if project:
            projects.append(project)

    return projects


# ============================================================
# FIELD NOTES
# ============================================================

def parse_front_matter(content):
    """
    Read YAML front matter from a Markdown file.

    Expected format:

    ---
    title: "Example"
    date: "Sep 2026"
    summary: "Example summary"
    tags:
      - Example
    ---

    Markdown content follows here.
    """

    lines = content.splitlines()

    if not lines or lines[0].strip() != "---":
        return None

    end_index = None

    for i in range(1, len(lines)):

        if lines[i].strip() == "---":
            end_index = i
            break

    if end_index is None:
        return None

    front_matter_text = "\n".join(lines[1:end_index])

    data = yaml.safe_load(front_matter_text)

    if not data:
        return None

    return data


def load_field_note(note_file):
    """Convert one Markdown Field Note into the format used by config.js."""

    print(f"Checking Field Note: {note_file.name}")

    try:
        content = note_file.read_text(encoding="utf-8")

    except Exception as error:
        print(f"  -> Could not read file: {error}")
        return None

    data = parse_front_matter(content)

    if data is None:
        print("  -> INVALID front matter")
        return None

    title = data.get("title")

    if not title:
        print("  -> SKIPPED: missing title")
        return None

    note = {
        "folder": "notes",
        "title": title,
        "date": data.get("date", ""),
        "summary": data.get("summary", ""),
        "tags": data.get("tags", []),

        # For now, the link points to the Markdown file
        # inside the portfolio repository.
        "link": f"https://github.com/{GITHUB_USERNAME}/"
                f"Portfolio/blob/main/content/field-notes/"
                f"{note_file.name}"
    }

    print(f"  -> Field Note FOUND: {title}")

    return note


def find_field_notes():
    """Find all Markdown files inside content/field-notes/."""

    field_notes = []

    if not FIELD_NOTES_DIR.exists():
        print("\nField Notes directory does not exist.")
        return field_notes

    print("\nChecking Field Notes...\n")

    markdown_files = sorted(FIELD_NOTES_DIR.glob("*.md"))

    print(f"Field Note files found: {len(markdown_files)}")

    for note_file in markdown_files:

        note = load_field_note(note_file)

        if note:
            field_notes.append(note)

    return field_notes


# ============================================================
# PROFILE
# ============================================================

def load_profile():
    """Load global portfolio information."""

    with open(PROFILE_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


# ============================================================
# CONFIG GENERATION
# ============================================================

def javascript_value(value):
    """Convert Python data into valid JavaScript data."""

    return json.dumps(
        value,
        indent=2,
        ensure_ascii=False
    )


def generate_config(profile, projects, field_notes):

    config = profile.copy()

    # Replace the projects section with
    # projects discovered from GitHub.
    config["projects"] = projects

    # Combine any manually defined write-ups from profile.json
    # with automatically discovered Field Notes.
    existing_writeups = profile.get("writeups", [])

    config["writeups"] = existing_writeups + field_notes

    javascript = (
        "/* ============================================================\n"
        "   GENERATED FILE — DO NOT EDIT MANUALLY\n"
        "   Generated by automation/sync.py\n"
        "\n"
        "   Edit:\n"
        "   - portfolio-data/profile.json\n"
        "   - project repositories' portfolio.yml files\n"
        "   - content/field-notes/*.md\n"
        "\n"
        "   README.md files are NEVER modified by this automation.\n"
        "   ============================================================ */\n\n"
        "const CONFIG = "
        + javascript_value(config)
        + ";\n"
    )

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        file.write(javascript)


# ============================================================
# MAIN
# ============================================================

def main():

    print("====================================")
    print("      PORTFOLIO SYNC")
    print("====================================")

    print("\nLoading profile...")

    profile = load_profile()

    print("\nSearching GitHub for projects...")

    projects = find_projects()

    print(f"\nProjects found: {len(projects)}")

    print("\nSearching for Field Notes...")

    field_notes = find_field_notes()

    print(f"\nField Notes found: {len(field_notes)}")

    print("\nGenerating config.js...")

    generate_config(
        profile,
        projects,
        field_notes
    )

    print("\nDone.")
    print(f"Updated: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()