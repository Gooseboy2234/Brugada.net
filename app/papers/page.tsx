import type { Metadata } from "next";
import { NEGATIVE_COUNT, PAPERS, SITE } from "../content";

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
          Each manuscript is readable in full here, until it is posted to a
          preprint server and receives a permanent identifier.
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
            <p className="paper-meta">
              <span className={`state ${l.cls}`}>{l.text}</span>
              <a href={`/m/${paper.slug}.html`}>Read the manuscript</a>
              {paper.doi && (
                <a href={`https://doi.org/${paper.doi}`}>
                  Cite it: {paper.doi}
                </a>
              )}
              <span>{paper.venue}</span>
              <span className="pending">DOI pending</span>
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
        <a href={SITE.orcidUrl}>{SITE.orcid}</a>. Once each preprint is posted it
        receives a permanent identifier, and this page will carry it. Until then
        the identifiers are marked pending rather than estimated.
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
