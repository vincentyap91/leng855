/**
 * Shared Node version guard + Volta / common install path resolution.
 * Lets `npm run dev` work when the shell's default `node` is too old (e.g. 14.17)
 * but Node 20 exists via Volta.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

/** Need >= 14.18.0 (Vite uses base64url in older 14.x). */
export function isNodeSufficient(versionString) {
  const s = String(versionString).replace(/^v/i, "");
  const [major, minor] = s.split(".").map((x) => parseInt(x, 10) || 0);
  if (major < 14) return false;
  if (major === 14) return minor >= 18;
  return true;
}

/**
 * Return a path to a `node` binary that satisfies the project, or null.
 * Prefers current process if already OK, then common Volta locations on Windows.
 */
export function findSuitableNodeBin() {
  if (isNodeSufficient(process.version)) {
    return process.execPath;
  }

  const candidates = [];
  if (process.platform === "win32") {
    candidates.push("C:\\Program Files\\Volta\\node.exe");
    if (process.env.LOCALAPPDATA) {
      candidates.push(join(process.env.LOCALAPPDATA, "Volta", "bin", "node.exe"));
    }
  } else {
    if (process.env.HOME) {
      candidates.push(join(process.env.HOME, ".volta", "bin", "node"));
    }
  }
  if (process.env.VOLTA_HOME) {
    candidates.push(join(process.env.VOLTA_HOME, "bin", "node"));
    candidates.push(join(process.env.VOLTA_HOME, "bin", "node.exe"));
  }

  for (const c of candidates) {
    if (!c || !existsSync(c)) continue;
    const r = spawnSync(c, ["-e", "process.stdout.write(process.version)"], {
      encoding: "utf8",
    });
    if (r.error || r.status !== 0) continue;
    const v = (r.stdout || "").trim();
    if (v && isNodeSufficient(v)) {
      return c;
    }
  }
  return null;
}

export function printNodeTooOld() {
  console.error("");
  console.error("  \x1b[31m✖\x1b[0m  Node version is too old for this project.");
  console.error("");
  console.error(`     Current:  ${process.version}`);
  console.error("     Required: >= 14.18.0  (Node 20 LTS recommended)");
  console.error("");
  console.error("  Fix (pick one):");
  console.error("    • Add Volta to your PATH, then: volta install (uses package.json pin)");
  console.error("    • winget install OpenJS.NodeJS.LTS  (or install Node 20 from nodejs.org)");
  console.error("    • nvm-windows:  nvm install 20.18.0 && nvm use 20.18.0");
  console.error("    • Close the terminal, reopen, then: npm run dev");
  console.error("");
}
