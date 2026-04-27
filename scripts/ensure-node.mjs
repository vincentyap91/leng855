/**
 * Vite (and modern tooling) needs Node >= 14.18.0 because Buffer 'base64url'
 * encoding was added in 14.18.0. Older 14.x (e.g. 14.17.x) throws:
 *   TypeError [ERR_UNKNOWN_ENCODING]: Unknown encoding: base64url
 * Node 18+ LTS is recommended.
 *
 * `npm run dev` / `build` / `preview` use `scripts/run-vite.mjs`, which can pick
 * Volta's Node on Windows. This file remains for one-off: `node scripts/ensure-node.mjs`
 */
import { isNodeSufficient, printNodeTooOld } from "./node-version.mjs";

if (!isNodeSufficient(process.version)) {
  printNodeTooOld();
  process.exit(1);
}
