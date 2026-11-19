// Writes src/types-code.ts, the agent-facing declaration the gatekeeper returns from
// getTypeScriptTypes(), from src/types.d.ts, which the implementation type-checks against. Run it
// after editing types.d.ts; `--check` fails instead of writing when the two differ.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const src = new URL("../src/", import.meta.url);
const declaration = readFileSync(new URL("types.d.ts", src), "utf8").replace(/\r\n/g, "\n");
const generated =
  "// Generated from types.d.ts by scripts/sync-types.mjs. Do not edit.\n" +
  `const TYPES_CODE = ${JSON.stringify(declaration)};\n\nexport default TYPES_CODE;\n`;

const target = new URL("types-code.ts", src);
if (process.argv.includes("--check")) {
  let current = "";
  try { current = readFileSync(target, "utf8").replace(/\r\n/g, "\n"); } catch {}
  if (current !== generated) {
    console.error(`${fileURLToPath(target)} is out of date: run \`pnpm run types:sync\`.`);
    process.exit(1);
  }
} else {
  writeFileSync(target, generated);
}
