# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Jekyll** static site (Korean personal blog "Minmul", theme `jekyll-theme-chirpy`). There is no backend, database, or Docker requirement — everything is static/client-side.

### Environment
- Ruby is installed system-wide (Ruby 3.2 via apt; CI uses 3.3 but 3.2 works fine). `bundler` is installed system-wide.
- Gems are installed **project-locally** into `vendor/bundle` (configured via `bundle config set --local path 'vendor/bundle'`, stored in the gitignored `.bundle/config`). The startup update script re-applies this config and runs `bundle install`, so all `bundle` commands work without extra flags.

### Run / build / test (all from repo root)
- **Dev server:** `bundle exec jekyll serve -l -H 0.0.0.0 --force_polling` (serves on port `4000`, live-reload on `35729`). `bash tools/run.sh` is the repo wrapper but binds to `127.0.0.1`; use `-H 0.0.0.0` when you need to reach it from outside the VM. `--force_polling` is needed for live reload to work reliably in containers.
- **Build + link check (lint/test):** `bash tools/test.sh` — production build to `_site/` then `html-proofer`. This is the only "test" the repo has (no unit tests).

### Notes
- The `_plugins/posts-lastmod-hook.rb` plugin runs `git log` on posts during build, so the git repo must be present (it always is).
- The `assets/lib` git submodule (chirpy-static-assets) is optional; the theme gem supplies assets, so the site builds and serves fine without initializing it.
