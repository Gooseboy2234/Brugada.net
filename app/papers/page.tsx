import type { Metadata } from "next";
import { DEPOSIT, DIVERGENCE, NEGATIVE_COUNT, PAPERS, SITE } from "../content";

export const metadata: Metadata = {
  title: "Papers",
  description:
    "Ten preprints on SCN5A R104Q and the N-terminal domain of the cardiac sodium channel, each with a plain-language summary. Seven report negative results.",
  alternates: { canonical: "/papers" },
};

const label: Record<string, { text: string; cls: string }> = {
  negative: { text: "Negative result", cls: "state-dead" },
  mixed: { text: "Mixed result", cls: "state-believed" },
  constructive: { text: "Constructive", cls: "state-known" },
};

// Shown against the manuscripts whose text on this site is not the text at
// their identifier. The wording is deliberately blunt about which of the two is
// wrong, because in the corrective cases it is the published one.
//
// Corrected 6 August 2026: the corrective line said the record contained
// arithmetic that is wrong. That covered papers 4 and 6 and was false of papers
// 2, 5 and 10, whose deposited versions are wrong in a worse way, by stating
// things that are untrue rather than by miscalculating.
const divergence: Record<string, string> = {
  corrective:
    "The copy on this site is corrected and the deposited version is not. The record at this identifier is wrong, was corrected here after the deposit, and no conclusion changed. In two cases the record miscalculates. In four it states something untrue: that no expert panel exists for this gene, that named tables are in the data archive when they are not, and a count that the same document contradicts two subsections later. The manuscript opens with the full list.",
  additive:
    "The copy on this site is ahead of the deposited version. A paper published after the deposit was folded in on 6 August 2026, and the record at this identifier does not contain it. No conclusion changed. The manuscript opens with what was added.",
};

export default function Papers() {
  return (
    <div className="wrap">
      <p className="eyebrow">Papers</p>

      <h1 className="page-title">
        {PAPERS.length} preprints, {NEGATIVE_COUNT} of them negative results.
      </h1>

      <p className="standfirst">
        Each has a plain summary under the title. A preprint is a paper posted
        publicly before peer review, so the reasoning can be checked by anyone
        rather than only by two anonymous reviewers.
      </p>

      <div className="notice">
        <b>None of these has been peer reviewed.</b> Posting before review is
        deliberate: it puts the reasoning and any errors in the open. Treat every
        claim as provisional until other people have checked it.
        <p style={{ margin: "0.7rem 0 0" }}>
          All ten are archived on Zenodo with permanent identifiers, published{" "}
          {DEPOSIT.publishedLong}. Each is also readable in full on this site.
        </p>
        <p style={{ margin: "0.7rem 0 0" }}>
          <b>
            {DIVERGENCE.divergent} of the ten copies on this site differ from
            the record at their identifier, and each says so at the top of its
            own page.
          </b>{" "}
          {DIVERGENCE.corrective} of those {DIVERGENCE.divergent} were corrected
          after the deposit because the deposited version is wrong. Two of them
          miscalculate. The other four state something untrue, which is the
          worse defect, because a reader can catch a wrong number by recomputing
          it and cannot catch a false statement about what is in an archive
          without downloading the archive and finding nothing there. Four papers
          named derived tables as deposited that the archive does not hold, and
          an audit on 6 August 2026 found that same defect in six of the eleven.
          The identifier stays the thing to cite, because it is the fixed public
          record, and this site serves the corrected text because serving
          something known to be wrong without saying so is worse. No conclusion
          in any paper changed. Nothing has been re-uploaded, and no record has a
          version 2.
        </p>
        <p style={{ margin: "0.7rem 0 0" }}>
          <b>An eleventh paper exists and is not here.</b> It is finished and it
          has never been deposited, so it has no identifier, and every manuscript
          on this site names the identifier that is its version of record. Until
          it has one there is nothing to name. It is recorded here rather than
          left silent, because a list of ten that does not mention the eleventh
          is the same kind of omission the eleventh paper is about.
        </p>
      </div>

      {PAPERS.map((paper) => {
        const l = label[paper.result];
        return (
          <article className="paper" id={paper.slug} key={paper.slug}>
            <span className="paper-n">Paper {paper.n}</span>
            <h2 className="paper-title" style={{ border: 0, padding: 0 }}>
              {paper.title}
            </h2>
            <p className="paper-plain">{paper.plain}</p>
            {paper.resultNote && (
              <p className="small" style={{ marginTop: "0.6rem" }}>
                {paper.resultNote}
              </p>
            )}
            {paper.bearsOn && (
              <p className="small" style={{ marginTop: "0.6rem" }}>
                {paper.bearsOn}.
              </p>
            )}
            {paper.postDeposit && (
              <p className="small" style={{ marginTop: "0.6rem" }}>
                <b>This copy is not the text at that identifier. </b>
                {divergence[paper.postDeposit]}
              </p>
            )}
            <p className="paper-meta">
              <span className={`state ${l.cls}`}>{l.text}</span>
              <a href={`/m/${paper.slug}.html`}>Read the manuscript</a>
              {paper.doi && (
                <a href={`https://doi.org/${paper.doi}`}>
                  Cite it: {paper.doi}
                </a>
              )}
              <span className="pending">
                {paper.venue} submission pending
              </span>
            </p>
          </article>
        );
      })}

      <h2>Why the negatives are the point</h2>

      <p>
        Seven of these report that something did not work. One closed the route
        this project had spent months on and most wanted to succeed. Another
        found that a prediction method I had been relying on identified one of
        the four cases it should have caught, which means a reassuring score from
        it carries no information at all in this part of the gene.
      </p>

      <p>
        A record that reports only what worked is not a record, it is a
        selection. The negatives are the reason to trust the rest.
      </p>

      <h2>Every claim carries what would refute it</h2>

      <p>
        Each paper names, in its own limitations section, the result that would
        prove it wrong. That is unusual and it is deliberate. Several also
        correct earlier versions of themselves in the open rather than quietly
        revising, including one that retires an explanation I had published in an
        earlier paper.
      </p>

      <h2>Citing this work</h2>

      <p>
        Every paper is sole-authored by {SITE.author}, ORCID{" "}
        <a href={SITE.orcidUrl}>{SITE.orcid}</a>. Cite the identifier printed
        beside each one above. Those are version identifiers; Zenodo also minted
        a second one per paper that resolves to all versions, and the version
        identifier is the one to use.
      </p>

      <h2>Which copy you are reading</h2>

      <p>
        The manuscripts on this site are the source files the deposited versions
        were built from, copied without alteration and prefixed with a note
        saying which identifier is the version of record and how the text
        differs from it. For six of the ten there is no difference. For four
        there is, and the note names every change with the date it was made.
      </p>

      <p>
        On two of those four, papers 4 and 6, the difference is a correction
        rather than an addition, and it runs against the published record: the
        deposited versions carry figures computed by mixing a corrected baseline
        with a retired comparator, and a reader checking their arithmetic gets a
        different answer from the printed result. Those figures were recomputed
        on 6 August 2026. Every corrected value is worse for the therapy than
        the one it replaces, so both negative results are strengthened rather
        than weakened, and neither conclusion moves. Nothing has been deposited
        as a version 2, because a deposit is a deliberate act rather than a side
        effect of a website update.
      </p>

      <p>
        If a number here disagrees with the same number at the identifier, the
        copy here is the corrected one. If you are citing, cite the identifier
        and read the note.
      </p>

      <p>
        The data behind every one of them is deposited separately, under{" "}
        {DEPOSIT.licence}, at{" "}
        <a href={DEPOSIT.url} className="mono">
          {DEPOSIT.doi}
        </a>
        . That is the address each data availability statement gives, and{" "}
        <a href="/data">the data page</a> lists what is in it.
      </p>

      <p>
        What is still pending is the preprint servers. Posting to bioRxiv and
        medRxiv needs an account login that has not been completed, so those
        submissions are marked pending rather than described as done.
      </p>

      <p>
        If you find an error in any of them, I would rather hear it than not:{" "}
        <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>.
      </p>

      <div className="next">
        <a href="/data">The deposited data tables</a>
        <a href="/limitations">What these results cannot establish</a>
      </div>
    </div>
  );
}
