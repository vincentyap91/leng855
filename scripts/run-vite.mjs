/**
 * Run Vite (dev / build / preview) and `tsc -b` (build) with a Node that satisfies
 * the project, even when the shell's `node` is too old and Volta/another Node
 * is installed elsewhere.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { findSuitableNodeBin, isNodeSufficient, printNodeTooOld } from "./node-version.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2] || "dev";

const nodeBin = findSuitableNodeBin();
if (!nodeBin) {
  if (!isNodeSufficient(process.version)) {
    printNodeTooOld();
  } else {
    console.error("Could not resolve a Node binary to run Vite.");
  }
  process.exit(1);
}

const viteJs = join(root, "node_modules", "vite", "bin", "vite.js");
const tscJs = join(root, "node_modules", "typescript", "lib", "tsc.js");

if (!existsSync(viteJs)) {
  console.error("Vite is not installed. Run: npm install");
  process.exit(1);
}

function run(args) {
  const r = spawnSync(nodeBin, args, { cwd: root, stdio: "inherit" });
  const code = r.status;
  if (code === null) process.exit(1);
  if (code !== 0) process.exit(code);
}

if (mode === "dev") {
  run([viteJs]);
} else if (mode === "build") {
  if (!existsSync(tscJs)) {
    console.error("TypeScript is not installed. Run: npm install");
    process.exit(1);
  }
  run([tscJs, "-b"]);
  run([viteJs, "build"]);
} else if (mode === "preview") {
  run([viteJs, "preview"]);
} else {
  console.error("Unknown target:", mode, "(use dev, build, or preview)");
  process.exit(1);
}
