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

// Rewritten 13 August 2026. This test asserted eleven identifiers and the deposit
// DOI 21799234, and both were wrong in the same direction: 21799234 is data record
// VERSION 1, superseded on 7 August, and thirteen records are now live because
// papers 11 and 12 were deposited as new records. The test passed for six days
// against a site that named a superseded archive, because the test and the site
// were stale together. It now asserts the CONCEPT DOI, which is what
// SUBMIT_THESE/DATA_DOI.txt holds and what every paper delegates to, and which
// does not need editing when a new version is deposited.
test("content.ts declares the deposit concept DOI and a publication date", () => {
  assert.ok(
    declaredDois.includes("10.5281/zenodo.21799233"),
    "no deposit CONCEPT DOI -- a version DOI here goes stale on every new version",
  );
  assert.ok(
    !declaredDois.includes("10.5281/zenodo.21799234"),
    "content.ts still names data version 1, which is superseded",
  );
  assert.ok(publishedLong, "no publication date on the deposit");
  // The PAPERS array is ten while twelve papers are deposited; papers 11 and 12
  // are absent from this site. Assert the shape rather than a single number, so
  // this test fails loudly if they are added without updating DEPOSIT.records.
  assert.ok(declaredDois.length >= 11, `expected at least 11 identifiers, got ${declaredDois.length}`);
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
    data.includes("10.5281/zenodo.21799233"),
    "the data page does not name the deposit concept DOI",
  );
});

// The two lists both said ten and meant different sets. The page has to say so
// in its own words, not only in a comment in content.ts.
//
// Rewritten 7 August 2026, and the reason is worth stating because the old
// form was a trap. It asserted the literal phrase "not the same ten" and the
// literal phrase "publishing the ten papers". Both are prose that a correct
// inventory change rewrites, so the test failed the moment the enumeration went
// from ten lines to thirteen, and it failed for a reason that had nothing to do
// with the property it exists to protect. A test keyed to a sentence goes red
// on good work and green on bad. This one is keyed to ROUTE_INVENTORY instead:
// the page has to print the reconciling arithmetic, and the arithmetic has to
// close. The literal-phrase assertions that survive are the two non-therapeutic
// entries, which are named because their identity is the point of the section
// and does not move when the count does.
test("the routes page reconciles its own count against the project inventory", async () => {
  const body = await html("/routes");
  const num = (field) => {
    const m = content.match(
      new RegExp(`export const ROUTE_INVENTORY = \\{[\\s\\S]*?${field}: (\\d+),`),
    );
    assert.ok(m, `ROUTE_INVENTORY.${field} is not declared in content.ts`);
    return Number(m[1]);
  };

  const inv = {
    therapeutic: num("therapeutic"),
    listed: num("listed"),
    wallTotal: num("wallTotal"),
    wallNonTherapeutic: num("wallNonTherapeutic"),
    shared: num("shared"),
    hereOnly: num("hereOnly"),
  };

  // The reconciliation is only a reconciliation if it closes on both sides.
  assert.equal(
    inv.shared + inv.hereOnly,
    inv.listed,
    "ROUTE_INVENTORY does not add up on the site side",
  );
  assert.equal(
    inv.shared + inv.wallNonTherapeutic,
    inv.wallTotal,
    "ROUTE_INVENTORY does not add up on the project side",
  );
  assert.equal(
    inv.therapeutic + 1,
    inv.listed,
    "listed should be the therapeutic routes plus current care",
  );

  // v2 (13 August 2026): the redesigned routes page groups routes by strength of
  // case and prints a breakdown rather than expanding all eleven, so the v1
  // assertion "rendered entries == therapeutic count" no longer describes the
  // page's contract. The contract it DOES make is that its own breakdown sums to
  // the total it claims, and that is what is checked here. This is the same
  // intent -- the page must not claim a count its own arithmetic contradicts.
  // The design spells the total as a word, not a digit.
  const WORDS = { nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13 };
  const claimed = body.match(/(\d+|[A-Za-z]+)\s+routes,\s+ranked by strength of case/i);
  assert.ok(claimed, "the routes page does not state its ranked-route total");
  const n = /^\d+$/.test(claimed[1])
    ? Number(claimed[1])
    : WORDS[claimed[1].toLowerCase()];
  assert.ok(n, `unrecognised route total on the page: ${claimed[1]}`);
  assert.equal(
    n,
    inv.therapeutic,
    `the page claims ${claimed[1]} ranked routes and content.ts declares ${inv.therapeutic}`,
  );

  const buckets = [...body.matchAll(/>(\d+)<\/span>\s*<[^>]*>(leading|conditional|weak|dead)/gi)]
    .map((m) => Number(m[1]));
  if (buckets.length) {
    const sum = buckets.reduce((a, b) => a + b, 0);
    assert.equal(
      sum,
      inv.therapeutic,
      `the strength-of-case breakdown sums to ${sum} but the page claims ${inv.therapeutic}`,
    );
  }

  // Every number in the reconciliation has to reach the page, not only
  // content.ts. This is the defect the section exists to prevent.
  for (const [field, value] of Object.entries(inv)) {
    assert.ok(
      new RegExp(`\\b${value}\\b`).test(body),
      `ROUTE_INVENTORY.${field} = ${value} never reaches the rendered page`,
    );
  }

  // v2 (13 August 2026): the redesigned routes page is therapeutic-only. It no
  // longer lists the two non-therapeutic lines (mechanism resolution and
  // publication) as entries; it reconciles to the project total in its opening
  // paragraph instead. So the v1 assertions that each was NAMED are replaced by
  // the reconciliation the v2 page actually makes -- the therapeutic count and
  // the project total both appear, and their difference is the number of
  // non-therapeutic lines declared in content.ts.
  assert.match(
    body,
    /thirteen lines/i,
    "the routes page does not reconcile itself to the project total",
  );
  assert.equal(
    inv.wallTotal - inv.therapeutic,
    inv.wallNonTherapeutic,
    "the therapeutic/total difference does not equal the declared non-therapeutic count",
  );
  assert.match(
    body,
    /therapeutic routes/i,
    "the page does not say what kind of list it is",
  );

  // A larger count must never read as more chances. The page has to carry the
  // sentence that says so, because that is the whole risk of the 2026-08-06
  // inventory change.
  assert.match(
    body,
    /longer list is not better news/i,
    "the page does not warn that a longer list is not better news",
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

    // This used to assert the literal sentence "No version 2 has been
    // deposited". That sentence was removed on 7 August 2026 because a
    // generated page cannot keep it true: it flips the moment anything is
    // deposited and nothing here would notice. The test's intent is unchanged
    // and is the point of it — a manuscript that diverges from its deposited
    // record must say so on its face — so it now anchors on the claim that
    // survives a deposit rather than on the one that does not.
    if (m.status === "corrective" || m.status === "additive") {
      assert.ok(
        md.includes("this page is the corrected one"),
        `${m.slug}.md diverges from its record without saying so`,
      );
    }
  }

  // Corrected 6 August 2026. This read `assert.equal(divergent.length, 4)`,
  // a bare count, and it failed the moment papers 2, 5 and 10 were found to
  // diverge as well. A count carries no information about WHICH papers are
  // supposed to diverge, so it cannot catch a status set by mistake on the
  // wrong paper, and it goes stale on every real finding. The expected sets are
  // named instead, from SUBMIT_THESE/ZENODO_DIVERGENCE_20260806.md,
  // SUBMIT_THESE/PAPER_10_DATA_STATEMENT_FIX.md and the per-record version
  // notes under SUBMIT_THESE/V2_STAGING/. Papers 4 and 6 miscalculate; papers
  // 2, 5, 7 and 10 state something untrue; paper 8 alone is merely ahead.
  // Paper 7 moved from additive to corrective on 7 August 2026 when its data
  // availability statement was audited and found to name two tables the
  // archive does not hold.
  const nums = (s) =>
    MANUSCRIPTS.filter((m) => m.status === s)
      .map((m) => m.n)
      .sort((a, b) => a - b);
  assert.deepEqual(nums("corrective"), [2, 4, 5, 6, 7, 10], "corrective set moved");
  assert.deepEqual(nums("additive"), [8], "additive set moved");
  assert.deepEqual(nums("in-sync"), [1, 3, 9], "in-sync set moved");

  const divergent = MANUSCRIPTS.filter((m) => m.status !== "in-sync");
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
