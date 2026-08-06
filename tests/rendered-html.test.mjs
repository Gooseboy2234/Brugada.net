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

test("no page describes a published identifier as pending", async () => {
  for (const path of ["/", "/papers", "/data", "/open"]) {
    const body = await html(path);
    assert.doesNotMatch(body, /DOI pending/, `${path} still says DOI pending`);
    assert.doesNotMatch(body, /Pending deposit/, `${path} still says pending`);
  }
});
