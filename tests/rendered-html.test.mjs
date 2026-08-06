// What the built worker actually serves.
//
// This file previously tested the vinext starter template: it asserted a
// "Your site is taking shape" loading skeleton and a react-loading-skeleton
// dependency, neither of which has existed here since the real site replaced
// them. Both of its tests failed on every run, and had done so before this
// change. Replaced rather than deleted, because a build that renders nothing
// should still fail something.
//
// content.ts is read as text rather than imported, because it is TypeScript and
// the test runner is not.

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const content = await readFile(
  new URL("../app/content.ts", import.meta.url),
  "utf8",
);

// Every DOI declared in content.ts, which is the only place they are allowed
// to be written down.
const declaredDois = [...content.matchAll(/doi:\s*"(10\.5281\/zenodo\.\d+)"/g)]
  .map((m) => m[1]);
const publishedLong = content.match(/publishedLong:\s*"([^"]+)"/)?.[1];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function html(path) {
  const response = await render(path);
  assert.equal(response.status, 200, `${path} did not return 200`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("content.ts declares eleven identifiers and a publication date", () => {
  assert.equal(declaredDois.length, 11, "expected ten papers and one deposit");
  assert.ok(declaredDois.includes("10.5281/zenodo.21799234"), "no deposit DOI");
  assert.ok(publishedLong, "no publication date on the deposit");
});

test("the home page renders the site, not the starter template", async () => {
  const body = await html("/");
  assert.match(body, /One letter in one gene/);
  assert.match(body, /SCN5A/);
  assert.doesNotMatch(body, /Your site is taking shape/);
  assert.doesNotMatch(body, /react-loading-skeleton/);
});

test("the home page says the work is published, and links to it", async () => {
  const body = await html("/");
  assert.ok(body.includes(publishedLong), "no publication date on the home page");
  assert.match(body, /href="\/papers"/);
});

test("every declared identifier reaches a page", async () => {
  const papers = await html("/papers");
  const data = await html("/data");
  for (const doi of declaredDois) {
    assert.ok(
      papers.includes(doi) || data.includes(doi),
      `${doi} is declared but appears on no page`,
    );
  }
  assert.ok(
    data.includes("10.5281/zenodo.21799234"),
    "the data page does not name the deposit",
  );
});

// The two lists both said ten and meant different sets. The page has to say so
// in its own words, not only in a comment in content.ts.
test("the routes page reconciles its ten against the project inventory", async () => {
  const body = await html("/routes");
  assert.match(body, /not the same ten/i, "no reconciliation section");
  assert.match(
    body,
    /resolving the mechanism/i,
    "the first non-therapeutic entry is not named",
  );
  assert.match(
    body,
    /publishing the ten papers/i,
    "the second non-therapeutic entry is not named",
  );
  assert.match(
    body,
    /therapeutic routes/i,
    "the page does not say what kind of list it is",
  );
});

// The defect this guards: seven manuscripts under public/papers/ served the
// retired rescaling for two days because nothing checked anything outside app/.
// scripts/check-site-rules.sh checks them against SUBMIT_THESE; this checks the
// rendered pages, which is what a reader actually opens.
test("every rendered manuscript names its version of record", async () => {
  const { MANUSCRIPTS } = await import("../scripts/manuscript-provenance.mjs");
  assert.equal(MANUSCRIPTS.length, 10, "expected ten manuscripts");

  for (const m of MANUSCRIPTS) {
    const md = await readFile(
      new URL(`../public/papers/${m.slug}.md`, import.meta.url),
      "utf8",
    );
    const rendered = await readFile(
      new URL(`../public/m/${m.slug}.html`, import.meta.url),
      "utf8",
    );

    assert.ok(
      md.includes(`Version of record: ${m.doi}`),
      `${m.slug}.md does not name its version of record`,
    );
    assert.ok(
      rendered.includes(m.doi),
      `/m/${m.slug}.html does not carry ${m.doi}`,
    );
    // The interim banners are gone, and no manuscript may go back to telling a
    // reader that everything in it is uncitable.
    assert.doesNotMatch(
      md,
      /SUPERSEDED REVISION/,
      `${m.slug}.md still carries the interim superseded banner`,
    );

    if (m.status === "corrective" || m.status === "additive") {
      assert.ok(
        md.includes("No version 2 has been deposited"),
        `${m.slug}.md diverges from its record without saying so`,
      );
    }
  }

  const divergent = MANUSCRIPTS.filter((m) => m.status !== "in-sync");
  assert.equal(divergent.length, 4, "expected four divergent manuscripts");
  const flagged = [...content.matchAll(/postDeposit:\s*"(\w+)"/g)].length;
  assert.equal(
    flagged,
    divergent.length,
    "content.ts and the manuscripts disagree on which papers diverge",
  );
});

test("no page describes a published identifier as pending", async () => {
  for (const path of ["/", "/papers", "/data", "/open"]) {
    const body = await html(path);
    assert.doesNotMatch(body, /DOI pending/, `${path} still says DOI pending`);
    assert.doesNotMatch(body, /Pending deposit/, `${path} still says pending`);
  }
});
