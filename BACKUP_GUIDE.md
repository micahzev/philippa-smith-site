# Backup & Restore Guide

How to make archive backups of your Sanity data and restore them if needed.

## What a backup contains

A Sanity dataset export is a single `.tar.gz` file containing:
- Every Project and Work document (as NDJSON)
- Every uploaded image and video asset
- All asset metadata

This is a complete, portable snapshot. You can use it to migrate to another Sanity project, or restore after an accidental deletion.

---

## Creating a backup

From the `sanity/` directory:

```bash
npm run backup
```

This runs `sanity dataset export production backups/backup-YYYY-MM-DD.tar.gz` — a dated file is placed inside `sanity/backups/`.

**If you get "no such file or directory: backups"**, create the folder first:
```bash
mkdir -p backups
npm run backup
```

### Manual command (more options)

```bash
# Full export including all assets
npx sanity dataset export production backups/my-backup.tar.gz

# Documents only (much smaller, no image files)
npx sanity dataset export production backups/docs-only.tar.gz --raw --no-assets

# Specific types only
npx sanity dataset export production backups/projects-only.tar.gz --types=project,work
```

---

## Recommended backup schedule

- **Before any major content change** — manually run `npm run backup`
- **Monthly** — set a calendar reminder, or automate with a cron job / GitHub Action
- **Store off-machine** — copy the `.tar.gz` to a cloud drive (Dropbox, Google Drive, iCloud) or external disk. Don't rely only on the local backups folder.

### Automating with GitHub Actions (optional)

Create `.github/workflows/backup.yml` in your repo:

```yaml
name: Weekly Sanity backup
on:
  schedule:
    - cron: '0 3 * * 0'   # Every Sunday at 03:00 UTC
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Export dataset
        working-directory: sanity
        env:
          SANITY_AUTH_TOKEN: ${{ secrets.SANITY_AUTH_TOKEN }}
        run: |
          npm install
          mkdir -p backups
          npx sanity dataset export production backups/backup-$(date +%Y-%m-%d).tar.gz
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: sanity-backup-${{ github.run_id }}
          path: sanity/backups/*.tar.gz
          retention-days: 90
```

To create `SANITY_AUTH_TOKEN`: go to https://www.sanity.io/manage → your project → API → Tokens → Add new token with **Viewer** permission (read-only is enough for exports). Paste the token into your repo's Settings → Secrets.

---

## Restoring from a backup

### Into the same dataset (overwrite)

```bash
npx sanity dataset import backups/backup-2025-01-15.tar.gz production --replace
```

⚠️ `--replace` will replace documents with the same IDs. To be safer:

```bash
# Missing-only: only imports documents that don't already exist
npx sanity dataset import backups/backup-2025-01-15.tar.gz production --missing
```

### Into a fresh staging dataset (safest way to inspect a backup)

```bash
# Create a fresh dataset
npx sanity dataset create staging

# Import the backup into it
npx sanity dataset import backups/backup-2025-01-15.tar.gz staging

# Temporarily point the Studio at 'staging' by editing sanity.config.ts,
# verify everything looks right, then promote or discard.
```

---

## Verifying a backup

You can inspect a backup without importing it — it's just a gzipped tarball:

```bash
tar -tzf backups/backup-2025-01-15.tar.gz | head
# You'll see: data.ndjson, assets.json, images/, files/

# Peek at the document count:
tar -xzOf backups/backup-2025-01-15.tar.gz data.ndjson | wc -l
```

---

## Frontend backups

The frontend is simple static files with no database — just keep it in version control (GitHub, GitLab, etc.) and you have a full backup. To "restore", you just redeploy from the repo.
