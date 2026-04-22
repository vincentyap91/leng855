# Node version for this project (Option B)

This app needs **Node ≥ 14.18** (we use **20 LTS**). Your other project can stay on **14.17.2** — use **Volta** or **fnm** so each folder gets the right Node automatically.

---

## Volta (recommended: pins version in `package.json`)

Already set in this repo:

```json
"volta": { "node": "20.18.0" }
```

### Install (Windows)

- [Volta — Getting Started](https://docs.volta.sh/guide/getting-started) (installer or `winget install Volta.Volta`)
- Restart the terminal after install.

### Use

From this project folder:

```powershell
volta install
```

After that, any `node` / `npm` you run **here** uses Node 20. Other folders without a Volta pin keep using your default (e.g. 14.17).

---

## fnm (reads `.node-version` / `.nvmrc`)

This repo includes `.node-version` and `.nvmrc` with `20.18.0`.

### Install (Windows)

- [fnm — Windows](https://github.com/Schniz/fnm#windows)

### One-time: use Node when you `cd` into the project

PowerShell profile (`notepad $PROFILE`):

```powershell
fnm env --use-on-cd | Out-String | Invoke-Expression
```

Restart the terminal. When you `cd` into `Leng855`, fnm switches to **20.18.0**; when you leave, it can restore the previous version (depending on fnm settings).

### Manual

```powershell
cd C:\Users\vince\OneDrive\Desktop\Leng855
fnm use
npm install
npm run dev
```

---

## Check

```powershell
node -v
```

In this folder you should see **v20.18.0** (or another 20.x if you change the pin). In your legacy project folder, use **14.17.2** as before.
