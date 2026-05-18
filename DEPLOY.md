# DEPLOY — xra1.com + GitHub Pages

Single push to `main` → GH Pages publishes + Dreamhost auto-syncs via GitHub Action.

## One-time setup (Dreamhost SSH secrets)

Add at `https://github.com/imclab/xra1/settings/secrets/actions`:

| Secret | Value | Where to find |
|---|---|---|
| `DREAMHOST_SSH_KEY` | Private key (ed25519 preferred) | Generate: `ssh-keygen -t ed25519 -f ~/.ssh/xra1_deploy -N ""`; paste contents of `~/.ssh/xra1_deploy` |
| `DREAMHOST_HOST` | sftp host | Dreamhost Panel → Users → Manage Users → server column (e.g. `iad1-shared-b7-44.dreamhost.com`) |
| `DREAMHOST_USER` | shell user | Same row, username |
| `DREAMHOST_PATH` | absolute remote path | e.g. `/home/<user>/xra1.com` (per Dreamhost domain setup) |
| `DREAMHOST_PORT` | optional, defaults `22` | Skip unless non-standard |

Then on Dreamhost: Panel → Users → Manage SSH Keys → paste **public** half (`~/.ssh/xra1_deploy.pub`).

Verify: `ssh -i ~/.ssh/xra1_deploy -p 22 <user>@<host> "ls $REMOTE"` from local box.

## Push flow

```bash
git add -A && git commit -m "..." && git push origin main
```

That triggers:
1. **GitHub Pages** — auto-builds at `https://imclab.github.io/xra1/` (legacy source, branch `main` `/`).
2. **GH Action** `deploy-dreamhost.yml` — builds blog (`node blog/build.mjs`), rsyncs entire repo (excluding `.git/`, `.github/`, `__tests__/`, `node_modules/`, `.DS_Store`) to Dreamhost.

Both leg targets serve the same commit. GH Pages works immediately on first push; Dreamhost waits for the 4 secrets above.

## Verify after push

```bash
# GH Pages (immediate)
curl -sI https://imclab.github.io/xra1/ | head -3

# Dreamhost (after action completes, ~60s)
curl -sI https://xra1.com/ | head -3

# Blog
curl -s https://xra1.com/blog/ | grep -o '<title>[^<]*'

# Action status
gh run list --repo imclab/xra1 --workflow deploy-dreamhost.yml --limit 1
```

## Rollback

```bash
git revert HEAD && git push origin main
# Action re-runs, syncs previous state to Dreamhost.
```

## Notes

- `.nojekyll` is committed → GH Pages skips Jekyll processing.
- No `CNAME` file → GH Pages uses `imclab.github.io/xra1/`. xra1.com is served by Dreamhost only.
- `_headers` / `_redirects` files are Cloudflare Pages syntax and inert on both GH Pages and Apache (Dreamhost). Future: convert to `.htaccess` if needed.
- Blog source: `blog/posts/*.md` → builder writes `blog/*.html` + `blog/index.html` + `blog/rss.xml`.
- The action skips `__tests__/`; run Playwright locally if needed (`npm run test:browser`).
