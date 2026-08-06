// Sync the ten manuscripts the site serves from the authoritative copies in
// SUBMIT_THESE/papers/, prepending the provenance header from
// scripts/manuscript-provenance.mjs.
//
// Run:  node scripts/sync-manuscripts.mjs
// Check: node scripts/sync-manuscripts.mjs --check     exit 1 on any drift
//
// The defect this exists to prevent: the website copies forked from the
// authoritative copies on 4 August 2026 and served the retired 34.1 percent
// rescaling until 6 August. Nothing checked them, because every rule in
// scripts/check-site-rules.sh was scoped to app/. This script makes the copy
// reproducible and --check makes the fork detectable.
//
// The source tree is outside this repository and outside the deploy. If it is
// not present, --check reports SKIP rather than failing, because a build host
// legitimately does not have it. Drift is caught wherever the source lives,
// which is the machine the manuscripts are written on.

import { readFile, writeFile, access } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { MANUSCRIPTS, SOURCE_DIR, OPEN_MARKER, CLOSE_MARKER, header } from "./manuscript-provenance.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, SOURCE_DIR);
const dest = join(root, "public", "papers");

const check = process.argv.includes("--check");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// Everything after the closing marker and the one blank line that follows it is
// the manuscript, byte for byte. A file with no marker is a pre-sync copy and
// counts as drift.
export function body(text) {
  const i = text.indexOf(CLOSE_MARKER);
  if (i === -1) return null;
  return text.slice(i + CLOSE_MARKER.length).replace(/^\r?\n\r?\n/, "");
}

if (!(await exists(src))) {
  if (check) {
    console.log(`  SKIP: ${SOURCE_DIR} is not present, cannot verify manuscript sync`);
    process.exit(0);
  }
  console.error(`cannot sync: ${src} does not exist`);
  process.exit(1);
}

let drift = 0;
let written = 0;

for (const m of MANUSCRIPTS) {
  const sourceText = await readFile(join(src, m.source), "utf8");
  const wanted = header(m) + sourceText;
  const target = join(dest, `${m.slug}.md`);
  const current = (await exists(target)) ? await readFile(target, "utf8") : null;

  if (check) {
    if (current === null) {
      console.log(`  DRIFT: public/papers/${m.slug}.md is missing`);
      drift++;
    } else if (!current.startsWith(OPEN_MARKER)) {
      console.log(`  DRIFT: public/papers/${m.slug}.md carries no provenance header`);
      drift++;
    } else if (body(current) !== sourceText) {
      console.log(
        `  DRIFT: public/papers/${m.slug}.md does not match ${m.source}`,
      );
      drift++;
    } else if (current !== wanted) {
      console.log(
        `  DRIFT: public/papers/${m.slug}.md has a stale provenance header`,
      );
      drift++;
    }
    continue;
  }

  if (current !== wanted) {
    await writeFile(target, wanted);
    written++;
    console.log(`  synced ${m.slug}.md  <-  ${m.source}  [${m.status}]`);
  }
}

if (check) {
  if (drift) {
    console.log(`  FAIL: ${drift} manuscript(s) differ from ${SOURCE_DIR}`);
    process.exit(1);
  }
  console.log(`  ok, all ${MANUSCRIPTS.length} manuscripts match ${SOURCE_DIR}`);
} else {
  console.log(
    `synced ${written} of ${MANUSCRIPTS.length} manuscripts from ${SOURCE_DIR}`,
  );
}
