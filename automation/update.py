import subprocess
import sys


def run_step(name, command):
    print(f"\n{'=' * 60}")
    print(name)
    print(f"{'=' * 60}\n")

    result = subprocess.run(command)

    if result.returncode != 0:
        print(f"\n[FAIL] {name}")
        sys.exit(result.returncode)

    print(f"\n[PASS] {name}")


run_step(
    "Sync portfolio",
    [sys.executable, "automation/sync.py"]
)

run_step(
    "Validate portfolio",
    [sys.executable, "automation/validate.py"]
)

print("\n" + "=" * 60)
print("LOCAL CHECK PASSED")
print("=" * 60)