// Render each manuscript to a standalone HTML page that uses the site's own
// stylesheet, so "Read the manuscript" opens something readable instead of
// downloading a file. It also makes ten more pages indexable, which matters
// because the site is otherwise nine URLs.
//
// Run: node scripts/build-manuscripts.mjs
// The markdown in public/papers/ stays, so the plain source is still fetchable.

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "papers");
const out = join(root, "public", "m");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function page({ slug, title, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — brugada.net</title>
<meta name="description" content="${esc(title).slice(0, 180)}">
<link rel="canonical" href="https://brugada.net/m/${esc(slug)}.html">
<link rel="icon" href="/favicon.svg">
<link rel="stylesheet" href="/manuscript.css">
</head>
<body>
<header class="masthead">
  <div class="masthead-inner">
    <a class="wordmark" href="/">brugada.net</a>
    <nav class="nav">
      <a href="/papers">All papers</a>
      <a href="/">Start here</a>
    </nav>
  </div>
</header>
<main class="wrap">
  <div class="notice">
    <b>Preprint, not peer reviewed.</b> Posted publicly before review so that the
    reasoning and any errors are both visible. Treat every claim as provisional.
    <a href="/papers/${esc(slug)}.md">Plain markdown source</a>.
  </div>
${body}
  <p class="backlink"><a href="/papers">Back to all ten papers</a></p>
</main>
</body>
</html>
`;
}

// --check re-renders in memory and compares, exit 1 on any drift.
//
// Added 6 August 2026, and the defect it guards is one this file caused. The
// rendered pages under public/m/ are build artifacts that are also committed,
// so correcting a manuscript under public/papers/ and committing it without
// running a build ships a corrected .md beside a stale .html. That happened:
// the paper 5 correction was committed with its markdown and without its
// rendered page, and /m/<slug>.html is the link a reader actually opens, while
// the .md is the raw source almost nobody fetches. So the visible copy was the
// stale one and every check passed, because scripts/check-site-rules.sh
// verified public/papers/ against SUBMIT_THESE and nothing verified public/m/
// against public/papers/.
const check = process.argv.includes("--check");

await mkdir(out, { recursive: true });

const files = (await readdir(src)).filter((f) => f.endsWith(".md")).sort();
let drift = 0;
for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const md = await readFile(join(src, file), "utf8");
  const heading = md.match(/^#\s+(.+)$/m);
  const title = heading ? heading[1].trim() : slug;
  const body = marked.parse(md, { gfm: true });
  const wanted = page({ slug, title, body });
  if (check) {
    const current = await readFile(join(out, `${slug}.html`), "utf8").catch(() => null);
    if (current !== wanted) {
      console.log(`  DRIFT: public/m/${slug}.html is not the render of public/papers/${file}`);
      drift++;
    }
    continue;
  }
  await writeFile(join(out, `${slug}.html`), wanted);
}

if (check) {
  if (drift) {
    console.log(`  FAIL: ${drift} rendered manuscript(s) are stale, run node scripts/build-manuscripts.mjs`);
    process.exit(1);
  }
  console.log(`  ok, all ${files.length} rendered manuscripts match public/papers/`);
} else {
  console.log(`rendered ${files.length} manuscripts to public/m/`);
}
