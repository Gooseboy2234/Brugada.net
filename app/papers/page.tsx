import type { Metadata } from "next";
import { PAPERS, SITE } from "../content";

export const metadata: Metadata = {
  title: "Papers",
  description:
    "Ten preprints on SCN5A R104Q and the N-terminal domain of the cardiac sodium channel, each with a plain-language summary. Five report negative results.",
  alternates: { canonical: "/papers" },
};

export default function Papers() {
  const negatives = PAPERS.filter((p) => p.negative).length;

  return (
    <div className="wrap">
      <p className="eyebrow">Papers</p>

      <h1 className="page-title">
        {PAPERS.length} preprints, {negatives} of them negative results.
      </h1>

      <p className="standfirst">
        Each one has a plain summary underneath the title. A preprint is a paper
        posted publicly before peer review, so that the reasoning can be checked
        by anyone rather than only by two anonymous reviewers.
      </p>

      <div className="notice">
        <b>None of these has been peer reviewed.</b> Posting before review is
        deliberate: it puts the reasoning and any errors in the open. Treat
        every claim as provisional until other people have checked it.
      </div>

      {PAPERS.map((paper) => (
        <article className="paper" id={paper.slug} key={paper.slug}>
          <span className="paper-n">Paper {paper.n}</span>
          <h2 className="paper-title" style={{ border: 0, padding: 0 }}>
            {paper.title}
          </h2>
          <p className="paper-plain">{paper.plain}</p>
          <p className="paper-meta">
            {paper.negative ? (
              <span className="state state-dead">Negative result</span>
            ) : (
              <span className="state state-known">Positive result</span>
            )}
            <span>{paper.venue}</span>
            <span className="pending">DOI pending</span>
          </p>
        </article>
      ))}

      <h2>Why the negatives are here</h2>

      <p>
        Five of these report that something did not work, including one that
        closed a route this project had spent months pursuing and another that
        found my own prediction method missed three of the four cases it should
        have caught.
      </p>

      <p>
        A record that reports only what worked is not a record, it is a
        selection. The negatives are the reason to trust the rest.
      </p>

      <h2>Citing this work</h2>

      <p>
        Every paper is sole-authored by {SITE.author}, ORCID{" "}
        <a href={SITE.orcidUrl}>{SITE.orcid}</a>. Once each preprint is posted
        it receives a permanent identifier, and this page will carry it. Until
        then the identifiers are marked pending rather than estimated.
      </p>

      <div className="next">
        <a href="/data">The deposited data tables</a>
        <a href="/limitations">What these results cannot establish</a>
      </div>
    </div>
  );
}
