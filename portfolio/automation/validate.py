"""
Portfolio validator.

Checks:
    - profile.json
    - generated config.js
    - project data inside config.js

This script does NOT modify:
    - README.md
    - GitHub repositories
    - index.html
    - style.css
    - main.js
"""

import json
from pathlib import Path


# ============================================================
# PATHS
# ============================================================

ROOT = Path(__file__).resolve().parent.parent

PROFILE_FILE = ROOT / "portfolio-data" / "profile.json"
CONFIG_FILE = ROOT / "js" / "config.js"


# ============================================================
# REQUIRED PROFILE FIELDS
# ============================================================

REQUIRED_PROFILE_FIELDS = [
    "name",
    "role",
    "description",
    "socials",
    "certs",
    "skills",
    "writeupFolders",
    "writeups",
    "experience",
    "education"
]


# ============================================================
# FILE CHECK
# ============================================================

def check_file_exists(file_path, name):
    """Check that a required file exists."""

    if not file_path.exists():
        print(f"[FAIL] {name} does not exist.")
        return False

    print(f"[PASS] {name} exists.")
    return True


# ============================================================
# PROFILE CHECK
# ============================================================

def check_profile():

    print("\nChecking profile.json...")

    try:
        with open(PROFILE_FILE, "r", encoding="utf-8") as file:
            profile = json.load(file)

    except json.JSONDecodeError:
        print("[FAIL] profile.json contains invalid JSON.")
        return False

    except Exception as error:
        print(f"[FAIL] Could not read profile.json: {error}")
        return False

    valid = True

    for field in REQUIRED_PROFILE_FIELDS:

        if field not in profile:
            print(f"[FAIL] Missing field: {field}")
            valid = False
        else:
            print(f"[PASS] Field exists: {field}")

    return valid


# ============================================================
# CONFIG CHECK
# ============================================================

def load_config():

    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as file:
            content = file.read()

    except Exception as error:
        print(f"[FAIL] Could not read config.js: {error}")
        return None

    # Remove the JavaScript part before the JSON object.
    prefix = "const CONFIG ="

    if prefix not in content:
        print("[FAIL] config.js does not contain 'const CONFIG ='.")
        return None

    json_text = content.split(prefix, 1)[1].strip()

    # Remove the final semicolon.
    if json_text.endswith(";"):
        json_text = json_text[:-1]

    try:
        return json.loads(json_text)

    except json.JSONDecodeError as error:
        print(f"[FAIL] Generated config.js contains invalid data: {error}")
        return None


def check_config():

    print("\nChecking generated config.js...")

    config = load_config()

    if config is None:
        return False

    required_fields = [
        "name",
        "role",
        "description",
        "socials",
        "certs",
        "skills",
        "projects",
        "writeupFolders",
        "writeups",
        "experience",
        "education"
    ]

    valid = True

    for field in required_fields:

        if field not in config:
            print(f"[FAIL] config.js missing: {field}")
            valid = False
        else:
            print(f"[PASS] config.js contains: {field}")

    return valid


# ============================================================
# PROJECT CHECK
# ============================================================

def check_projects():

    print("\nChecking projects...")

    config = load_config()

    if config is None:
        return False

    projects = config.get("projects", [])

    print(f"Projects found in generated config: {len(projects)}")

    valid = True

    for project in projects:

        title = project.get("title", "")

        if not title:
            print("[FAIL] Project is missing a title.")
            valid = False
            continue

        print(f"[PASS] Project: {title}")

        required_fields = [
            "difficulty",
            "desc",
            "tags",
            "link",
            "details"
        ]

        for field in required_fields:

            if field not in project:
                print(
                    f"[FAIL] {title} is missing field: {field}"
                )
                valid = False

        # Check project details.
        details = project.get("details", {})

        required_details = [
            "approach",
            "tools",
            "learnings"
        ]

        for field in required_details:

            if field not in details:
                print(
                    f"[FAIL] {title} is missing details.{field}"
                )
                valid = False

    return valid


# ============================================================
# MAIN
# ============================================================

def main():

    print("====================================")
    print("      PORTFOLIO VALIDATOR")
    print("====================================")

    valid = True

    print("\nChecking required files...")

    if not check_file_exists(
        PROFILE_FILE,
        "profile.json"
    ):
        valid = False

    if not check_file_exists(
        CONFIG_FILE,
        "config.js"
    ):
        valid = False

    if valid:

        if not check_profile():
            valid = False

        if not check_config():
            valid = False

        if not check_projects():
            valid = False

    print("\n====================================")

    if valid:
        print("VALIDATION PASSED")
        print("====================================")
        print("\nYour portfolio passed all checks.")
    else:
        print("VALIDATION FAILED")
        print("====================================")
        print("\nFix the problems above before deploying.")


if __name__ == "__main__":
    main()