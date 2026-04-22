/**
 * Vite (and modern tooling) needs Node >= 14.18.0 because Buffer 'base64url'
 * encoding was added in 14.18.0. Older 14.x (e.g. 14.17.x) throws:
 *   TypeError [ERR_UNKNOWN_ENCODING]: Unknown encoding: base64url
 * Node 18+ LTS is recommended.
 */
const parts = process.versions.node.split(".").map(Number);
const major = parts[0] ?? 0;
const minor = parts[1] ?? 0;

/** Need >= 14.18.0 — 14.17.x throws ERR_UNKNOWN_ENCODING base64url in Vite */
const below1418 = major < 14 || (major === 14 && minor < 18);

if (below1418) {
  console.error("");
  console.error("  \x1b[31m✖\x1b[0m  Node version is too old for this project.");
  console.error("");
  console.error(`     Current:  ${process.version}`);
  console.error("     Required: >= 14.18.0  (Node 20 LTS recommended)");
  console.error("");
  console.error("  Fix (pick one):");
  console.error("    • Install Node 20 LTS: https://nodejs.org/");
  console.error("    • nvm-windows:  nvm install 20 && nvm use 20");
  console.error("    • Then: close terminal → reopen → npm install → npm run dev");
  console.error("");
  process.exit(1);
}
