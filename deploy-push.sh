#!/usr/bin/env bash
# Mr. Falcon — one-shot deploy push helper.
# Usage:  bash deploy-push.sh
# Prompts for a GitHub PAT, configures git credential store, pushes, then
# scrubs the token from the remote URL so it never persists in config.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

REMOTE_URL="$(git remote get-url origin)"
if [[ "$REMOTE_URL" != https://github.com/* ]]; then
  echo "Unexpected remote: $REMOTE_URL" >&2
  exit 1
fi

# Persist credentials for this machine (credential.helper store)
git config --global credential.helper store

read -r -s -p "GitHub Personal Access Token (paste, hidden): " TOKEN
echo
if [[ -z "$TOKEN" ]]; then
  echo "No token provided." >&2
  exit 1
fi

# Build a token-embedded URL for this single push only.
TOKEN_URL="https://${TOKEN}@github.com/e42art-arge/mrfalcon.git"

# Write credentials to the store so future pushes don't prompt.
# (helper store reads from stdin: protocol host username password)
{
  echo "protocol=https"
  echo "host=github.com"
  echo "username=$(git config --global user.name || echo x-access-token)"
  echo "password=$TOKEN"
} | git credential approve

# Temporarily point origin at the token URL, push, then restore.
git remote set-url origin "$TOKEN_URL"
trap 'git remote set-url origin "$REMOTE_URL"' EXIT

echo "Pushing master..."
git push origin master

echo "Push done. Remote restored (token not persisted in remote URL)."
