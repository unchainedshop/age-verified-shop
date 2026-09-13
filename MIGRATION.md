# Migrating age-verified-shop from Jenkins to Forgejo Actions

This repo's CI moves off Jenkins (`jenkins.ucc.dev`) onto **Forgejo Actions** at
`git.ucc.dev`. The pipeline (`.forgejo/workflows/ci.yml`) builds the two app
images, runs a **Trivy** vulnerability gate, and publishes to the **git.ucc.dev
package registry** — replacing the standalone `registry.ucc.dev`.

| | Old (Jenkins) | New (Forgejo Actions) |
|---|---|---|
| Runs on | `jenkins.ucc.dev` | `git.ucc.dev` runner (`runs-on: docker`) |
| engine image | `registry.ucc.dev/unchained/age-verified-shop/engine` | `git.ucc.dev/unchained/age-verified-shop/engine` |
| storefront image | `registry.ucc.dev/unchained/age-verified-shop/storefront` | `git.ucc.dev/unchained/age-verified-shop/storefront` |
| Tags | `:stable`, `:$GIT_COMMIT` | `:stable` (on `main`), `:sha-<short>`, `:<branch>-latest` |
| Vuln scan | none | Trivy `fs` gate (fixable HIGH/CRITICAL) |

Deploy behaviour is unchanged: a push to `main` publishes `:stable`, which
Gantry auto-redeploys.

---

## Phase 1 — Move to Forgejo Actions

### 1. Create the Forgejo repo

On `git.ucc.dev`, create **`unchained/age-verified-shop`** (New Migration → import
from `https://github.com/unchainedshop/age-verified-shop`, or an empty New
Repository you push into next).

### 2. Repoint git (origin switch)

Keep GitHub reachable as `github`; make Forgejo the new `origin`:

```bash
git remote rename origin github
git remote add origin ssh://git@git.ucc.dev/unchained/age-verified-shop.git
git push origin --all
git push origin --tags
```

Set the default branch on Forgejo to **`main`**.

### 3. Enable Actions

Repo **Settings → Actions → General → enable**. The org-wide runner (`scorpion-4`,
label `docker`) picks the jobs up automatically.

### 4. Add the Actions secret + variables

**Settings → Actions → Secrets and variables**:

| Kind | Name | Value |
|---|---|---|
| Secret | `REGISTRY_TOKEN` | a **`write:package`** PAT for the `unchained` org (used to `docker login git.ucc.dev`; the automatic Actions token cannot push packages). |
| Variable | `NEXT_PUBLIC_GRAPHQL_ENDPOINT` | `https://swiyu.unchained.wtf/graphql` |
| Variable | `UNCHAINED_ENDPOINT` | `https://swiyu.unchained.wtf/graphql` |

(Optional) set variable `REGISTRY_USER` if the login user should differ from the
commit author.

> The `NEXT_PUBLIC_*` values were previously hardcoded in the Jenkinsfile. They
> are public storefront endpoints, not secrets — Variables just keep them out of
> the workflow YAML and easy to change per environment.

### 5. Verify

- Open a PR → the **`trivy`** job runs and must pass.
- Push `main` → **`engine`** and **`storefront`** jobs build and push. Confirm the
  images appear under the repo's **Packages** tab as
  `git.ucc.dev/unchained/age-verified-shop/{engine,storefront}` with tags
  `stable`, `sha-<short>`, `main-latest`.

### 6. Cut the registry over

This PR already repoints the in-repo Swarm stack (`swiyu-stack.yml`) to
`git.ucc.dev`. The other consumer lives in the **infrastructure** repo and is a
separate follow-up:

- `pulumi/shared-dev/stacks/swiyu.ts` — `ENGINE_IMAGE_NAME` / `STOREFRONT_IMAGE_NAME`
  → `git.ucc.dev/...`, then `npm run up`.
- Ensure the Swarm managers can pull from `git.ucc.dev` (`docker login git.ucc.dev`
  + deploy with `--with-registry-auth`).

### 7. Decommission Jenkins

Once the Forgejo pipeline is green end-to-end and the stack pulls from
`git.ucc.dev`, disable/delete the `age-verified-shop` job in Jenkins. Keep it until
then as the rollback path.

---

## Phase 2 — Push-mirror Forgejo → GitHub

Keep the public GitHub repo alive as a **read-only downstream mirror** so the URL
and history stay available.

On `git.ucc.dev`: **Settings → Repository → Mirror Settings → Push Mirror**:

- **Git Remote Repository URL**: `https://github.com/unchainedshop/age-verified-shop.git`
- **Authorization**: a GitHub PAT (repo scope) as the mirror credential.
- Enable **"Sync when commits are pushed"** (and/or an interval, e.g. 8h).

After this, `git.ucc.dev` is the source of truth and every push fans out to GitHub.

**Caveats**

- The mirror is **one-way** — do **not** merge PRs on GitHub; they'd be overwritten
  on the next sync. Optionally branch-protect the GitHub default branch.
- Only git refs mirror (not packages/LFS).
- The GitHub PAT lives in Forgejo's mirror settings, not as an Actions secret.

---

## Notes / out of scope

- Jenkins ran no tests or lint here; parity is preserved. The engine has a real
  `tsc --noEmit` gate (`npm run lint`) that could be added as a `test` job later.
- Build: the `engine`/`storefront` jobs run plain `docker build`/`docker push` against
  the runner's host docker.sock (automount) — mirroring the infrastructure repo's build
  workflow — rather than the `docker/*` marketplace actions, which don't resolve on this
  instance's default actions registry (`code.forgejo.org`) and are unpinned wrappers
  ADR-003 disallows in a job holding a `write:package` PAT.
