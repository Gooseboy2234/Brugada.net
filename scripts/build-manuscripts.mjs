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

await mkdir(out, { recursive: true });

const files = (await readdir(src)).filter((f) => f.endsWith(".md")).sort();
for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const md = await readFile(join(src, file), "utf8");
  const heading = md.match(/^#\s+(.+)$/m);
  const title = heading ? heading[1].trim() : slug;
  const body = marked.parse(md, { gfm: true });
  await writeFile(join(out, `${slug}.html`), page({ slug, title, body }));
}

console.log(`rendered ${files.length} manuscripts to public/m/`);
