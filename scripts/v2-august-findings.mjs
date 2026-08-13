// Write the 12 and 13 August 2026 findings into the v2 pages.
//
// The approved design was authored against the early-August site. Its copy is
// therefore correct about the record and silent about everything found since.
// v2-content-corrections.mjs fixed the record-level facts (dates, counts, DOIs).
// This file adds the SCIENCE.
//
// Every insertion is anchored to an existing element and asserts its hit count;
// the script aborts rather than silently skipping. Markup matches the design's
// own inline vocabulary exactly -- no new classes, no stylesheet changes.
//
// Run: node scripts/v2-august-findings.mjs <extracted-dir>

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIR = process.argv[2];
if (!DIR) { console.error("usage: v2-august-findings.mjs <dir>"); process.exit(1); }

// ---- the design's own inline vocabulary, lifted verbatim -------------------
const H2 = 'margin:44px 0 0;font:500 24px/1.26 Inter,system-ui,sans-serif;letter-spacing:-.016em;color:#e9e9ed';
const H2W = 'margin:44px 0 0;max-width:74ch;font:500 24px/1.26 Inter,system-ui,sans-serif;letter-spacing:-.016em;color:#e9e9ed';
const P = "margin:14px 0 0;max-width:70ch;font:400 16px/1.66 'Source Serif 4',Georgia,serif;color:rgba(233,233,237,.8)";
const CARD = 'margin-top:24px;max-width:74ch;border:1px solid rgba(233,233,237,.12);border-radius:8px;overflow:hidden';
const CARDIN = 'padding:20px 24px';
const CARDFOOT = 'padding:16px 24px;background:rgba(233,233,237,.035);border-top:1px solid rgba(233,233,237,.09)';
const CHIPROW = 'display:flex;align-items:baseline;gap:10px';
const CHIPBAR = 'width:14px;height:2px;background:#9184d9;display:block;margin-bottom:4px';
const CHIP = 'font:500 10px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:#d2cefd';
const CTITLE = 'margin:12px 0 0;font:500 17px/1.5 Inter,system-ui,sans-serif;color:#e9e9ed';
const CBODY = "margin:10px 0 0;font:400 15px/1.62 'Source Serif 4',Georgia,serif;color:rgba(233,233,237,.78)";
const SUBLAB = 'font:500 9.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:rgba(233,233,237,.45)';
const FOOTP = 'margin:9px 0 0;font:400 14.5px/1.6 Inter,system-ui,sans-serif;color:rgba(233,233,237,.72)';
const STATROW = 'display:flex;flex-wrap:wrap;gap:20px 40px;margin-top:26px;padding-top:22px;border-top:1px solid rgba(233,233,237,.09)';
const STATCELL = 'flex:1 1 170px;min-width:150px';
const STATNUM = 'font:400 24px/1 ui-monospace,Menlo,monospace;color:#e9e9ed';
const STATLAB = 'margin-top:7px;font:400 12px/1.5 Inter,system-ui,sans-serif;color:rgba(233,233,237,.52)';
const LISTWRAP = 'padding-left:14px;border-left:1px solid rgba(233,233,237,.14);display:flex;flex-direction:column;gap:14px;margin-top:16px';
const LISTITEM = 'display:flex;gap:12px;align-items:baseline';
const LISTMARK = 'font:400 11px/1.6 ui-monospace,Menlo,monospace;color:rgba(233,233,237,.35)';
const LISTTITLE = 'font:500 15.5px/1.45 Inter,system-ui,sans-serif;color:#e9e9ed';
const LISTBODY = "margin:5px 0 0;font:400 14.5px/1.6 'Source Serif 4',Georgia,serif;color:rgba(233,233,237,.72)";
const HROW = 'display:grid;grid-template-columns:118px 1fr;gap:20px;padding:18px 0;border-top:1px solid rgba(233,233,237,.1)';
const HROW2 = 'display:grid;grid-template-columns:118px 1fr;gap:20px;padding:18px 0;border-top:1px solid rgba(233,233,237,.07)';
const HDATE = 'font:400 11.5px/1.6 ui-monospace,Menlo,monospace;color:rgba(233,233,237,.45)';
const HTITLE = 'font:500 15.5px/1.45 Inter,system-ui,sans-serif;color:#e9e9ed';
const HBODY = "margin:6px 0 0;font:400 14.5px/1.62 'Source Serif 4',Georgia,serif;color:rgba(233,233,237,.72)";

const item = (mark, title, body) =>
  `<div style="${LISTITEM}"><span style="${LISTMARK}">${mark}</span><div><div style="${LISTTITLE}">${title}</div><p style="${LISTBODY}">${body}</p></div></div>`;
const hrow = (date, title, body, first) =>
  `<div style="${first ? HROW : HROW2}"><div style="${HDATE}">${date}</div><div><div style="${HTITLE}">${title}</div><p style="${HBODY}">${body}</p></div></div>`;
const stat = (n, l) => `<div style="${STATCELL}"><div style="${STATNUM}">${n}</div><div style="${STATLAB}">${l}</div></div>`;

// =====================================================================
// EXPERIMENTS: the third experiment, and the cost finding that reframes the ask
// =====================================================================
const EXPERIMENTS = `
<h2 style="${H2}">A third experiment, and it is the cheap one</h2>
<p style="${P}">On 12 August 2026 a professor of physiology in Bern agreed, in writing and within five hours, that the argument above holds: the standard whole cell measurement cannot separate the two explanations. He then named the measurement that can, which is recording from single channels rather than from a whole cell. Nobody had checked whether that would work for this variant, and nobody had costed it. Both are now done.</p>
<p style="${P}">It works, and it does something the whole cell assay cannot. The share of channel openings that happen in step with a partner depends on how much broken protein is at the surface, and it does not depend on how badly that protein interferes. So it is a second, independent reading of the same unknowns. It separates a third possibility that whole cell current is completely blind to, where the broken copy reaches the surface and interferes with nothing, by about 32 percent. It has one blind spot, at the extreme where the broken copy silences its partner completely, and the surface protein measurement already costed here bounds that case.</p>
<div style="${CARD}">
<div style="${CARDIN}">
<div style="${CHIPROW}"><span style="${CHIPBAR}"></span><span style="${CHIP}">Costed, not run</span></div>
<p style="${CTITLE}">Single channel recording, in a cell line, 4,776 dollars</p>
<p style="${CBODY}">No stem cells, no differentiation, no mass spectrometry, and about 33 days of recording. It would be the first measurement of its kind on this variant in any system. It is heterologous, which is the limitation the professor named himself, so it cannot settle the question in a human heart cell. It is small enough to be a favour rather than a project.</p>
</div>
<div style="${CARDFOOT}">
<div style="${SUBLAB}">The same measurement in heart cells</div>
<p style="${FOOTP}">7,132 dollars as an arm added to the mechanism experiment below, which is 16 percent more money for a reading that experiment cannot otherwise make. On its own it is 52,474, because it then has to pay for the cells itself.</p>
</div>
</div>

<h2 style="${H2}">The cost is the cells, not the measurement</h2>
<p style="${P}">This was worth checking and the answer changed what to ask for. The single channel arm was derived and costed specifically because it might be cheaper than the surface protein arm. It is. It moves the total by 16 percent, because the readout was never where the money goes.</p>
<div style="${STATROW}">
${stat('72%', 'of the mechanism experiment is cell lines and growing them, before any measurement is taken')}
${stat('15,500', 'dollars for the three cell lines themselves, of which 1,500 buys the benchmark line')}
${stat('4', 'further readings the same cells would answer once they exist')}
</div>
<p style="${P}">So no cheaper readout can move the constraint, and this was tested rather than assumed. The thing to fund is the three cell lines. Once they exist every measurement in this project costs between four and fifteen thousand dollars against a substrate paid for once, and the cells survive the experiment while the experiment does not. A funder buying the mechanism experiment buys one answer. A funder buying the cell lines buys the substrate for five.</p>
<p style="${P}">The cheapest item with real scientific value is the benchmark line, at 1,500 dollars. It is the internal control that decides whether the main experiment is interpretable at all: if the line built to read 50 percent does not read 50 percent, the scale is broken and neither comparison means anything. Nobody has requested it.</p>

<h2 style="${H2}">Two corrections to the numbers on this page</h2>
<p style="${P}">Concluding that two things are the same needs more cells than concluding they differ, and the sample sizes for that arm were computed against the retired comparator. Recomputed against 45.8 they are 63, 98, 174 and 390 cells per group at margins of 12.5, 10, 7.5 and 5 percentage points, down from 75, 117, 207 and 464. They move down, so that arm is slightly cheaper, and the cost of the experiment is dominated by building the cells rather than by counting them.</p>
<p style="${P}">The second correction is unresolved and is left visible. The whole calculation assumes cell to cell variability of 52 percent, which had never been checked against per cell data. It has now been checked twice and the two answers disagree. One published laboratory's deposited per cell recordings give 57 to 89 percent across seven arms, which would need 1.8 times more cells. A second deposited dataset, in heart cells rather than a cell line, gives 25 and 18 percent, which is below the assumption. Variability depends on the preparation more than on the assumption, and the pilot costed above is the only thing that settles it for the cells this experiment would actually use.</p>
`;

// =====================================================================
// ROUTES: four route level changes, one new candidate, one withdrawal
// =====================================================================
const ROUTES = `
<h2 style="${H2W}">What changed in the second week of August</h2>
<p style="${P}">Four of these lines moved, one gained a candidate that had been sitting unread in this project's own literature collection, and one number that had been quoted with confidence was withdrawn rather than corrected. None of it makes any route live. Most of it is the ordinary work of finding that a published thing was read too quickly, including by me.</p>
<div style="${LISTWRAP}">
${item('01', 'A number was withdrawn, and the correction runs in the route\'s favour', 'This project had put the only drug that exists for the interaction route at 85 percent of the way to abolishing the interference, and concluded it fell short. That figure came from a summary of a paper rather than from the paper. The paper prints the quantity in a table: the drug delivered two and a half times the current, not one and a half, which is more than complete abolition. But a fraction that exceeds one falsifies the model that defines it, and the paper\'s own statistics mark no current comparison as significant. So the claim is withdrawn rather than replaced with a new number. The route stays closed, for want of a target, which is not what the number was about.')}
${item('02', 'A magnitude recorded as unreadable is readable, and it clears the bar', 'One route had a deliverable small molecule with a current measurement whose size this project had recorded as impossible to read off the figure. Digitised from the published article: the treated cells recover to 87 percent of control, a rescue of about 1.8 fold against a requirement of 1.46. So the objection that the deliverable agent was never measured on current is now doubly wrong. The route does not move, because magnitude was never what blocked it. Neither of the published patient cell lines carries this variant, and that is the objection that binds.')}
${item('03', 'The gene replacement route has a failure mode nobody has looked for', 'The published construct splits the gene across two vectors joined by a short piece of spacer sequence. That spacer is 133 bases, which is not divisible by three, so a copy that fails to join correctly shifts the reading frame and produces a half channel of about 121 kilodaltons. In the genome such fragments are destroyed before they are built; in a vector that safeguard is absent. The fragment keeps the part that lets channels associate and loses the part that conducts, which is the shape of a poison. The published test could not have seen it: the membrane was cut at 130 kilodaltons to run a loading control, and the fragment falls below the cut.')}
${item('04', 'A candidate with the smallest cargo of anything here, and it is human', 'A 2016 paper, retrieved by this project\'s own search and never read because it sits behind a paywall, reports that the first 132 amino acids of this channel, delivered alone as a free peptide, raise the amount of channel at the cell surface. That is about 400 bases against the 6,048 of the whole gene, and it is a fragment of the patient\'s own protein rather than a bacterial one. It also raises a second, potassium current, which is the same objection this project used against another route and must be applied with the same force. Recorded as a candidate, unnumbered, and not promising.')}
</div>
<div style="${LISTWRAP}">
${item('05', 'A second heart cell model declines to reproduce the published result', 'The surrogate channel route rests on a published simulation in which adding a small bacterial channel restores a Brugada heart cell to normal. Re-running that claim in a second, independently developed model of a heart cell gives no such restoration: the part of the beat that the published work says is rescued is left untouched in every arm, including the healthy control. Two models built by different groups from different data both decline to host the published effect. That is a fact about the specification rather than about either model, and it is a negative result against a route this project had already recorded as a candidate rather than a plan.')}
${item('06', 'The interaction route now has the target list its closure said did not exist', 'That route is closed for want of anything to aim a drug at. A 2023 study that has been in this project\'s literature collection the whole time lists sixty proteins that stick to this channel in heart tissue, two of them with the current measurement to show they matter, and it was found by opening a supplementary file rather than by reading the paper. The channel also appears in its own list, ranked third, which is independent biochemical support for the pairing the whole route depends on. It does not reopen the route. Sticking to something is not the same as gating with it, which is the correction a researcher made to this project in the same week, and the route stays closed.')}
</div>

<p style="${P}">One more, on the chaperone route. A reply from the laboratory that developed it establishes that the therapy works by recruiting more of the healthy copy rather than by repairing the broken one. Under that mechanism the arithmetic has no harmful branch at all: adding healthy channel raises the total and dilutes the broken fraction at the same time, so there is no threshold to clear. That is a better shape than the model this project had been using. It does not make the route live, and it sharpens rather than removes the concern about variants that interfere, which is the case the reply was not asked about.</p>
`;

// =====================================================================
// OPEN: the correspondence
// =====================================================================
const OPEN = `
<h2 style="${H2}">Five researchers were asked, and four answered</h2>
<p style="${P}">Between 9 and 13 August 2026 this project wrote to researchers whose published work it had cited, disputed or depended on, with specific technical questions and no request attached. Four replied, three of them within about two hours. None of what follows is an endorsement of this work. Each answered one question, and the answers are recorded here because two of them changed something.</p>
<div style="${LISTWRAP}">
${item('01', 'The measurement argument was conceded', 'A professor of physiology agreed that the whole cell recording cannot separate the two explanations, which is the central claim of one of the papers listed here, and named single channel recording as the measurement that would. He also corrected the letter\'s reading of his own result, which had treated a negative finding about one thing as a negative finding about another. That correction stands and is the more useful half of the reply.')}
${item('02', 'A drug programme is further along than published', 'The senior author of both papers behind the chaperone route confirmed that it works on a variant whose defect is not purely a trafficking failure, which reframes how it works, and volunteered that the programme is raising funds to move from mice toward human trials. It is an active translational effort rather than a paper in a drawer.')}
${item('03', 'There is a route to correcting the database record, and it is not the one assumed', 'A member of the committee that reviews expert panels explained that a conflicting classification is usually fixed only when the submitting laboratory reassesses, that the dissenting submitter here may no longer be funded to do so, and that a small group he sits on can flag a submission as outdated so it stops counting. That would move this record to concordant. He offered to raise it. He also agreed that the comparison with the equivalent position in related genes should count as evidence of harm, while noting it is written into no guideline.')}
${item('04', 'No competing measurement is underway', 'The laboratory that built the large scale assay this project\'s variant list is a poor substitute for confirmed it is not doing the same for this gene, which is the answer that keeps that list useful, and pointed at the person who would know.')}
</div>
<p style="${P}">The fifth is on leave. His laboratory\'s table is the one that withdrew a number on the routes page, and the sharper question that produced is waiting rather than sent.</p>
`;

// =====================================================================
// HISTORY: the August entries
// =====================================================================
const HISTORY =
  hrow('13 Aug 2026', 'A number this site quoted was withdrawn, not corrected',
    'The efficiency of the only drug that exists for the interaction route had been derived from a summary of a paper rather than from the paper. Its own table gives a figure two and a half times larger. That would move the conclusion in this project\'s favour, and it is still not quoted, because the corrected value breaks the model that defines it and the source marks no such comparison as significant. Withdrawing is the honest move where replacing would be the flattering one.', true) +
  hrow('13 Aug 2026', 'Two figures recorded as unreadable were read',
    'Two magnitudes this project had written down as impossible to recover from published figures were recovered, one from a table that had been there all along and one by measuring the figure properly. A third parameter, which every sample size on the experiments page had been guessed around, was read exactly from a supplementary file because the panel turned out to be drawn as vector rather than as an image.') +
  hrow('12 Aug 2026', 'The whole tree was read, and the pointers were the problem',
    'Every human readable file in the project was read. The defects found were almost all pointers rather than numbers: an index naming files that no longer exist, a tracking record contradicting the thing it tracked, a note warning about a defect that had already been fixed. The habit of correcting a figure and dating the correction works. What it does not catch is a corrected figure sitting above arithmetic that was never recomputed.') +
  hrow('13 Aug 2026', 'Every identifier on this site moved to its permanent form',
    'The site had been citing version specific identifiers for ten of the papers. Those pin a superseded version. They are now the permanent identifiers, which resolve to whichever version is current and cannot go stale in this way again.');

// =====================================================================
// LIMITATIONS: what the new work does not establish
// =====================================================================
const LIMITATIONS = `
<h2 style="${H2}">What the August work does and does not establish</h2>
<p style="${P}">The single channel measurement described on the experiments page has been derived and costed. It has not been run, and no part of it has been through a laboratory. Its central parameter was read from one published figure in one laboratory\'s hands, in a cell line, and is used to size an experiment rather than to make a claim. The whole derivation assumes that channels pair with each other at random, which is an assumption in this project, in the paper it argues against, and in the published literature generally. Nobody has measured it for any variant of this channel.</p>
<p style="${P}">The route changes are readings of other people\'s published data, two of them digitised from figures rather than taken from tables. A value measured off a plotted figure supports about one decimal place, and both are quoted that way here. Where a paper\'s own statistics mark a comparison as not significant, that is stated rather than smoothed over, even where the comparison would help.</p>
<p style="${P}">The correspondence answers specific technical questions and nothing broader. Where a researcher corrected this project, the correction is recorded on the page it affects. None of them has reviewed this work, and none should be read as endorsing it.</p>
`;

// ---- apply -----------------------------------------------------------------
const PLAN = [
  ["experiments.html", `<h2 style="${H2}">What I am asking for</h2>`, EXPERIMENTS],
  ["routes.html", `<h2 style="${H2W}">Why nobody has done this already</h2>`, ROUTES],
  ["open.html", `<h2 style="${H2}">If you can move any of this</h2>`, OPEN],
  ["limitations.html", `<h2 style="margin:40px 0 0;font:500 24px/1.26 Inter,system-ui,sans-serif;letter-spacing:-.016em;color:#e9e9ed">Not peer reviewed</h2>`, LIMITATIONS],
];

console.log("AUGUST FINDINGS — inserting, asserting every anchor\n");
for (const [file, anchor, block] of PLAN) {
  const p = join(DIR, file);
  const t = await readFile(p, "utf8");
  const n = t.split(anchor).length - 1;
  if (n !== 1) { console.error(`ABORT: ${file}: expected 1 anchor, found ${n}`); process.exit(1); }
  await writeFile(p, t.replace(anchor, block.trim() + "\n\n" + anchor), "utf8");
  console.log(`  ok  ${file.padEnd(20)} +${block.length.toLocaleString()} bytes`);
}

// history: prepend the August rows to the top of the timeline, and demote the
// old first row's border so the rule stays continuous.
{
  const p = join(DIR, "history.html");
  let t = await readFile(p, "utf8");
  const n = t.split(HROW).length - 1;
  if (n !== 1) { console.error(`ABORT: history: expected 1 top row, found ${n}`); process.exit(1); }
  t = t.replace(HROW, HROW2);                 // old top row loses the heavy rule
  const anchor = `<div style="${HROW2}">`;
  t = t.replace(anchor, HISTORY + anchor);    // new rows go above it
  await writeFile(p, t, "utf8");
  console.log(`  ok  history.html         +${HISTORY.length.toLocaleString()} bytes, 4 dated rows`);
}

console.log("\nall anchors matched; nothing skipped");
