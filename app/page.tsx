"use client";

import { useEffect, useMemo, useState } from "react";

type Audience = "novice" | "research";
type Figure = { src: string; title: string; caption: string; note?: string };

const figures: Record<string, Figure> = {
  structure: {
    src: "/figures/fig_R104_structure.png",
    title: "R104 in the resolved Nav1.5 structure",
    caption: "PDB 8VYJ resolves the N-terminal domain and places R104 beside D84 in a buried aromatic core.",
  },
  microenvironment: {
    src: "/figures/fig_microenv_WT_vs_R104Q.png",
    title: "Wild type versus R104Q microenvironment",
    caption: "The substitution removes guanidinium charge and packing contacts around the buried site.",
  },
  threeway: {
    src: "/figures/fig3_md_mechanism.png",
    title: "Three-way mechanism test",
    caption: "WT, R104Q, and D84N separate salt-bridge occupancy from fold rigidity.",
    note: "Isolated NTD; one trajectory per construct. Formal replicate error bars remain a limitation.",
  },
  probe: {
    src: "/figures/probe_gate_scored.png",
    title: "The cheap probe-box screen",
    caption: "Agmatine looked unusually strong in the early isolated-domain gate. Later tests overturned that nomination.",
    note: "Historical result from 6 July 2026. It is not the current lead panel.",
  },
  graveyard: {
    src: "/figures/graveyard_escape_curves.png",
    title: "The graveyard: engagement is not residence",
    caption: "Early gripping compounds can escape late. Full trajectories prevented short favorable windows from becoming verdicts.",
    note: "Historical Stage-3/5 evidence. Named compounds in this plot are not the current PMF-backed hits.",
  },
  agmatine: {
    src: "/figures/pmf_agmatine_curve.png",
    title: "Agmatine’s free-energy reversal",
    caption: "Its minimum lies around 8.6 Å, outside the clip. The clip region sits on the repulsive wall.",
    note: "This corrected reading supersedes the early ‘favorable clip well’ label.",
  },
  coupling: {
    src: "/figures/fig_pore_ntd_coupling.png",
    title: "Pore-to-NTD coupling gate",
    caption: "The lesion is mechanically remote from the pore, supporting a folding/trafficking hypothesis rather than a pore-action claim.",
  },
  pmf: {
    src: "/figures/fig6_pmf_scoreboard.png",
    title: "The July 20 PMF scoreboard",
    caption: "Two deep clip-residence profiles separate from five shallow profiles by a wide empty region.",
    note: "Depth ranking is robust; absolute ΔG is not formally converged. REUS is in progress.",
  },
  evidence: {
    src: "/figures/fig_evidence_ladder.png",
    title: "Evidence ladder",
    caption: "Observed, computed, and still-unanswered claims are kept on separate rungs.",
  },
};

const pmfRows = [
  ["ZINC000016526277", -17.57, "candidate · n=2"],
  ["ZINC000004286767", -12.59, "confirmed · n=3"],
  ["ZINC000096027069", -1.03, "shallow"],
  ["ZINC000095117775", -0.43, "shallow"],
  ["ZINC000022241628", -0.06, "shallow"],
  ["ZINC000038185887", 2.44, "shallow"],
  ["ZINC002325760123", 5.43, "shallow"],
] as const;

function FigureButton({ figure, label = "Open the real figure", onOpen }: { figure: Figure; label?: string; onOpen: (figure: Figure) => void }) {
  return (
    <button className="figure-button" onClick={() => onOpen(figure)}>
      <span>{label}</span><span aria-hidden="true">↗</span>
    </button>
  );
}

function FigureModal({ figure, onClose }: { figure: Figure; onClose: () => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className="figure-modal" role="dialog" aria-modal="true" aria-label={figure.title} onMouseDown={onClose}>
      <button className="modal-close" onClick={onClose} aria-label="Close figure">×</button>
      <div className="modal-sheet" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-canvas"><img src={figure.src} alt={figure.title} /></div>
        <div className="modal-copy">
          <p className="mono-label">SOURCE FIGURE</p>
          <h2>{figure.title}</h2>
          <p>{figure.caption}</p>
          {figure.note && <p className="figure-note">{figure.note}</p>}
          <a href={figure.src} target="_blank" rel="noreferrer">Open full resolution ↗</a>
        </div>
      </div>
    </div>
  );
}

function ClipToy() {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`clip-toy ${broken ? "is-broken" : ""}`}>
      <div className="clip-controls" role="group" aria-label="Compare healthy and changed protein clip">
        <button className={!broken ? "active" : ""} onClick={() => setBroken(false)}>Before the change</button>
        <button className={broken ? "active" : ""} onClick={() => setBroken(true)}>After R104Q</button>
      </div>
      <div className="clip-world" aria-live="polite">
        <div className="simple-residue positive"><b>{broken ? "Q104" : "R104"}</b><small>{broken ? "no charge" : "positive"}</small></div>
        <div className="simple-bond"><i /><i /><i /></div>
        <div className="simple-residue negative"><b>D84</b><small>negative</small></div>
        <div className="wobble-ring" />
      </div>
      <p>{broken ? "The positive half is gone. The negative half is trapped inside, alone—and the little room wobbles." : "Opposite charges hold each other. The little room stays packed and steady."}</p>
    </div>
  );
}

function FunnelToy() {
  const [step, setStep] = useState(0);
  const stages = [
    ["200", "ideas", "Start with shapes made for the broken spot."],
    ["121", "survived motion", "Let atoms move. Throw away anything that cannot hold on."],
    ["~44", "stayed longer", "A visitor is not enough. Ask whether it becomes a resident."],
    ["16", "reached the final test", "Pull away in tiny steps and measure the landscape."],
    ["7", "received verdicts", "Only seven have a complete score so far."],
    ["2", "stood apart", "Two fell into a deep group. Five stayed shallow."],
  ];
  return (
    <div className="funnel-toy">
      <div className="funnel-steps" role="tablist" aria-label="Screening journey">
        {stages.map((item, index) => <button key={item[0]} className={step === index ? "active" : ""} onClick={() => setStep(index)} aria-selected={step === index}><span>{item[0]}</span></button>)}
      </div>
      <div className="funnel-readout">
        <strong>{stages[step][0]}</strong>
        <h3>{stages[step][1]}</h3>
        <p>{stages[step][2]}</p>
        <small>{step + 1} of {stages.length}</small>
      </div>
    </div>
  );
}

function NoviceJourney({ onOpen }: { onOpen: (figure: Figure) => void }) {
  const [answer, setAnswer] = useState<"dn" | "hi" | null>(null);
  return (
    <div className="novice-journey">
      <section className="novice-hero era" data-era="MAR · THE QUESTION">
        <div className="hero-orbit" aria-hidden="true"><i /><i /><i /><span>SCN5A</span></div>
        <p className="overline">A true story about one letter, one heartbeat, and one testable idea</p>
        <h1>We started with<br />“why?”</h1>
        <p className="hero-lede">Then we kept making the question harder until only two computer-made answers were left.</p>
        <a className="scroll-cue" href="#novice-start"><span>Begin at the beginning</span><b>↓</b></a>
      </section>

      <section className="story-beat clinical-beat era" id="novice-start" data-era="04 MAR · THE EVENT">
        <div className="date-stamp"><span>04</span><small>MARCH<br />2026</small></div>
        <div className="beat-copy">
          <p className="overline">Before there was a project</p>
          <h2>A fever made an invisible problem visible.</h2>
          <p>During a fever, the heart’s electrical pattern revealed Brugada syndrome. Doctors put in an ICD—the real, proven protection—and later found a change in a gene called <em>SCN5A</em>.</p>
          <details><summary>What is an ICD?</summary><p>A small implanted safety device. It watches the heartbeat and can act if a dangerous rhythm appears. Nothing on this website replaces it or changes medical care.</p></details>
        </div>
        <div className="pulse-card" aria-label="Illustration of an electrical heartbeat"><div className="pulse-line"><i /><i /><i /><i /><i /></div><p>The heart runs on electricity.<br />SCN5A helps start each beat.</p></div>
      </section>

      <section className="story-beat recipe-beat era" data-era="27 MAR · THE LETTER">
        <div className="beat-copy">
          <p className="overline">The genetic result</p>
          <h2>One recipe letter changed.</h2>
          <p>A gene is a recipe for building a protein. At position 104, the recipe swapped one building block for another:</p>
        </div>
        <div className="letter-swap"><div><small>EXPECTED</small><b>R</b><span>Arginine</span></div><i>→</i><div className="changed"><small>FOUND</small><b>Q</b><span>Glutamine</span></div></div>
        <p className="plain-caption">The name <strong>R104Q</strong> is simply the before, the address, and the after.</p>
      </section>

      <section className="story-beat clip-beat era" data-era="01–02 JUL · THE CLASP">
        <div className="beat-copy centered">
          <p className="overline">Zoom in far enough</p>
          <h2>The letter was part of a tiny clasp.</h2>
          <p>R104 normally carries a positive charge. It holds a negative piece named D84 inside a tightly packed room. The change removes that positive grip.</p>
        </div>
        <ClipToy />
        <div className="learn-more-row"><FigureButton figure={figures.structure} label="See where this sits in the real protein" onOpen={onOpen} /><FigureButton figure={figures.threeway} label="See the computer test" onOpen={onOpen} /></div>
      </section>

      <section className="story-beat question-beat era" data-era="03–05 JUL · THE IDEA">
        <div className="giant-question" aria-hidden="true">?</div>
        <div className="beat-copy">
          <p className="overline">The project’s bet</p>
          <h2>Could a tiny helper stand where the grip used to be?</h2>
          <p>Not a drug that changes the heartbeat directly. A temporary helper at the protein factory—something that might hold the broken room steady while the protein is being built.</p>
          <div className="analogy-pair"><div><span>Not this</span><b>Fix the door after it is installed</b></div><div><span>The idea</span><b>Hold the hinge while the door is built</b></div></div>
        </div>
      </section>

      <section className="story-beat reversal-beat era" data-era="06–08 JUL · THE REVERSAL">
        <div className="reversal-title"><p className="overline">The most important turn</p><h2>Our first “winner” lost.</h2><p>In a small, cheap test, agmatine looked wonderful. In a full membrane and a harder energy test, it let go. That was not embarrassing. That was the screen doing its job.</p></div>
        <div className="reversal-stage">
          <div className="molecule-window"><img src="/figures/render_agmatine.gif" alt="Rotating model of agmatine" /><span>AGMATINE · historical probe</span></div>
          <div className="verdict-flip"><div><small>6 JULY</small><strong>LOOKED GOOD</strong><span>short, simplified test</span></div><b>→</b><div className="no"><small>8 JULY</small><strong>LET GO</strong><span>full membrane · n=3</span></div></div>
        </div>
        <div className="learn-more-row"><FigureButton figure={figures.probe} label="See why it first looked good" onOpen={onOpen} /><FigureButton figure={figures.agmatine} label="See the test that reversed it" onOpen={onOpen} /></div>
      </section>

      <section className="story-beat gauntlet-beat era" data-era="09–20 JUL · THE GAUNTLET">
        <div className="beat-copy centered">
          <p className="overline">So we stopped trusting first impressions</p>
          <h2>Every answer had to keep earning the next test.</h2>
          <p>Tap through the actual journey. The numbers shrink because each harder question is allowed to say no.</p>
        </div>
        <FunnelToy />
        <p className="plain-caption">A computer score never got the final word. Motion, repetition, staying power, and energy each had a turn.</p>
      </section>

      <section className="story-beat split-beat era" data-era="20 JUL · TWO SIGNALS">
        <div className="beat-copy">
          <p className="overline">Where the evidence stands now</p>
          <h2>Five stayed shallow.<br />Two fell deep.</h2>
          <p>These are not medicines. They are two unusually strong computer signals worth carrying to a real cell experiment.</p>
        </div>
        <div className="simple-split" aria-label="Two deep results separated from five shallow results">
          <div className="deep-well"><i /><i /><span>2</span><small>deep signals</small></div>
          <div className="empty-gap"><span>wide empty space</span></div>
          <div className="shallow-pack"><i /><i /><i /><i /><i /><span>5</span><small>shallow signals</small></div>
        </div>
        <div className="honesty-card"><b>What we know</b><p>The two are far apart from the rest.</p><b>What we do not know</b><p>Whether either helps a living cell. The final energy numbers are also still being tightened.</p></div>
      </section>

      <section className="story-beat bench-beat era" data-era="NOW · THE HANDOFF">
        <div className="beat-copy centered">
          <p className="overline">The next page cannot be computed</p>
          <h2>Now the cells have to answer.</h2>
          <p>Before testing rescue, one question gates the whole plan: does the changed protein merely fail on its own, or can it interfere with the healthy copy too?</p>
        </div>
        <div className="experiment-choice">
          <button className={answer === "hi" ? "active" : ""} onClick={() => setAnswer("hi")}><span>IF</span><b>It only fails on its own</b><small>rescue may be sensible</small></button>
          <button className={answer === "dn" ? "active danger" : ""} onClick={() => setAnswer("dn")}><span>IF</span><b>It interferes with healthy protein</b><small>a chaperone could backfire</small></button>
        </div>
        <div className={`choice-answer ${answer ? "visible" : ""}`}>{answer === "dn" ? "That result would stop or redesign the rescue plan before candidates are tested." : answer === "hi" ? "That result would clear the way for the controlled surface-expression panel." : "Choose an outcome to see why Experiment Zero comes first."}</div>
        <div className="handoff-card"><span>THE HANDOFF</span><h3>Two candidates. Three controls. One falsifiable experiment.</h3><p>The nomination package is prepared for Dr. Prince Kannankeril at Vanderbilt Pediatric Cardiac EP. Computation nominates. The bench decides.</p><a href="/downloads/manuscript-r104q-v1.md">Read the complete manuscript →</a></div>
      </section>
    </div>
  );
}

function Metric({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return <div className={accent ? "metric accent" : "metric"}><strong>{value}</strong><span>{label}</span></div>;
}

function ResearchJourney({ onOpen }: { onOpen: (figure: Figure) => void }) {
  const [layer, setLayer] = useState<"wt" | "r104q" | "d84n">("r104q");
  const metrics = {
    wt: ["52.3%", "3.98 Å", "Wild type"],
    r104q: ["13.7%", "5.46 Å", "R104Q"],
    d84n: ["1.4%", "3.09 Å", "D84N"],
  };
  return (
    <div className="research-journey">
      <section className="research-hero era" data-era="AUDITED THROUGH 20 JUL">
        <div className="research-status"><i />ACTIVE COMPUTATIONAL RECORD · REUS IN PROGRESS</div>
        <p className="mono-label">SCN5A c.311G&gt;A · p.Arg104Gln · NTD cation-clip campaign</p>
        <h1>A mechanism was proposed.<br />Then forced to survive its own tests.</h1>
        <div className="research-abstract"><p>Three-way MD supports an orphaned buried D84 charge as the R104Q lesion. A geometry-gated, six-stage campaign produced one confirmed and one provisional deep clip-gripper from 200 designs.</p><p>The depth split is robust. Absolute free energy is not yet converged. No wet-lab rescue claim is made.</p></div>
        <div className="research-topline"><Metric value="200" label="designed" /><Metric value="121" label="gate-passed" /><Metric value="7" label="PMF-scored" /><Metric value="2" label="deep signals" accent /><Metric value="0" label="wet-lab validations" /></div>
      </section>

      <section className="research-event era" data-era="04–27 MAR · PHENOTYPE">
        <aside><time>04–27 MAR</time><span>Clinical anchor</span></aside>
        <div className="event-body">
          <div className="event-heading"><p className="mono-label">OBSERVED · NOT COMPUTED</p><h2>Phenotype → genotype</h2></div>
          <div className="evidence-grid">
            <article><span>ECG</span><strong>Type-1 Brugada pattern during febrile syncope</strong><p>ICD implanted as proven protection. Normal structural cardiac imaging.</p></article>
            <article><span>GENETICS</span><strong>SCN5A c.311G&gt;A, p.Arg104Gln</strong><p>Heterozygous; molecular laboratory classification pathogenic. Public ClinVar record remains conflicting.</p></article>
            <article><span>FUNCTION</span><strong>~0.29× WT current; none measurable in HEK293</strong><p>Gütter, Benndorf &amp; Zimmer 2013. Direct experimental loss-of-function evidence.</p></article>
            <article><span>POPULATION</span><strong>5 / ~1.46M; 0 homozygotes</strong><p>gnomAD v4. Neighbor R104W is ER-retained and dominant-negative.</p></article>
          </div>
          <p className="privacy-note">The public record uses only de-identified scientific facts. Clinical PDFs and identifiers are not served by this site.</p>
        </div>
      </section>

      <section className="research-event dark-event era" data-era="01–02 JUL · MECHANISM">
        <aside><time>01–02 JUL</time><span>Residue mechanism</span></aside>
        <div className="event-body">
          <div className="event-heading"><p className="mono-label">8VYJ · ISOLATED NTD MD</p><h2>The bridge breaks. The suppressor removes the charge.</h2></div>
          <div className="residue-console">
            <div className="console-tabs" role="tablist">{(["wt", "r104q", "d84n"] as const).map((key) => <button key={key} className={layer === key ? "active" : ""} onClick={() => setLayer(key)}>{metrics[key][2]}</button>)}</div>
            <div className={`console-structure ${layer}`}><div className="atom a">{layer === "wt" ? "R104+" : "Q104"}</div><div className="atomic-link"><i /><i /><i /></div><div className="atom b">{layer === "d84n" ? "N84" : "D84−"}</div></div>
            <div className="console-metrics"><div><span>bridge occupancy</span><strong>{metrics[layer][0]}</strong></div><div><span>core Cα RMSF · 55–85</span><strong>{metrics[layer][1]}</strong></div></div>
          </div>
          <div className="mechanism-proof"><p><strong>Discriminating observation:</strong> D84N has the lowest bridge occupancy and the lowest RMSF. Rigidity therefore tracks neutralization of the buried negative charge—not restoration of the original bridge.</p><p><strong>Scope:</strong> 3 × 100 ns means one 100 ns trajectory for each of three constructs, not three replicates per construct. Cα restraints and the isolated NTD constrain interpretation.</p></div>
          <div className="button-row"><FigureButton figure={figures.structure} onOpen={onOpen} /><FigureButton figure={figures.microenvironment} label="Open microenvironment analysis" onOpen={onOpen} /><FigureButton figure={figures.threeway} label="Open three-way MD" onOpen={onOpen} /></div>
        </div>
      </section>

      <section className="research-event era" data-era="03–05 JUL · HYPOTHESIS">
        <aside><time>03–05 JUL</time><span>Strategy gates</span></aside>
        <div className="event-body">
          <div className="event-heading"><p className="mono-label">MECHANISM SELECTION</p><h2>Pore action was tested and deprioritized.</h2></div>
          <div className="distance-diagram"><div className="site ntd"><b>R104 / D84</b><span>NTD lesion</span></div><div className="distance-line"><span>53 Å</span><i /></div><div className="site pore"><b>Local-anesthetic site</b><span>pore</span></div></div>
          <div className="research-callouts"><article><strong>3.9 × 10<sup>−5</sup></strong><span>pore→R104 path signal</span></article><article><strong>~4,000×</strong><span>weaker than a coupled pair</span></article><article><strong>p = 0.29</strong><span>docking failed to separate cationic controls</span></article></div>
          <p className="method-paragraph">The campaign therefore targeted ER folding/trafficking with a rigid cationic pharmacochaperone positioned for a bidentate D84 carboxylate grip. Docking placed poses; MD geometry, replication, residence, and PMF made decisions.</p>
          <FigureButton figure={figures.coupling} label="Open coupling analysis" onOpen={onOpen} />
        </div>
      </section>

      <section className="research-event correction-event era" data-era="06–08 JUL · FALSIFICATION">
        <aside><time>06–08 JUL</time><span>Lead reversal</span></aside>
        <div className="event-body">
          <div className="event-heading"><p className="mono-label">CORRECTION RECORD · DO NOT SMOOTH OVER</p><h2>Agmatine: nomination → benchmark.</h2></div>
          <div className="correction-table">
            <div className="table-head"><span>test</span><span>result</span><span>reading</span></div>
            <div><span>Probe box · n=1</span><strong>2.92 Å · occ 0.89</strong><em className="go">GO</em></div>
            <div><span>Full membrane · n=3</span><strong>6.14 ± 0.61 Å · occ 0.09 ± 0.12</strong><em>ESCAPE</em></div>
            <div><span>PMF</span><strong>minimum −1.9 kcal/mol at 8.6 Å</strong><em>NON-CLIP</em></div>
          </div>
          <p className="method-paragraph">The early isolated-domain assay overstated engagement. The corrected PMF reading places the minimum in a separated-contact state; the clip region is unfavorable. Agmatine remains only as an osmolyte control.</p>
          <div className="image-pair"><button onClick={() => onOpen(figures.probe)}><img src={figures.probe.src} alt="Probe box screen" /><span>EARLY SCREEN ↗</span></button><button onClick={() => onOpen(figures.agmatine)}><img src={figures.agmatine.src} alt="Agmatine PMF curve" /><span>FALSIFYING PMF ↗</span></button></div>
        </div>
      </section>

      <section className="research-event dark-event era" data-era="09–20 JUL · SIX STAGES">
        <aside><time>09–20 JUL</time><span>Campaign</span></aside>
        <div className="event-body">
          <div className="event-heading"><p className="mono-label">PRE-SPECIFIED ATTRITION</p><h2>The gauntlet is the receipt.</h2></div>
          <div className="raw-funnel">
            {[["01","PHARMACOPHORE","200","cationic + geometry-capable"],["02","CLAMPING DOCK","200","bidentate D84 placement"],["03","20 ns × 3","121","motion gate"],["04","REPLICATION","121","one seed is never a verdict"],["05","100 ns × n≥3","~44","second-half residence"],["06","PMF","16 → 7 → 2","22 windows · 3 replicas"]].map((row) => <div key={row[0]}><span>{row[0]}</span><b>{row[1]}</b><strong>{row[2]}</strong><small>{row[3]}</small></div>)}
          </div>
          <div className="graveyard-feature"><div><p className="mono-label">WHY FULL TRAJECTORIES MATTER</p><h3>Metformin left around 4–5 ns.<br />Famotidine around 14 ns.</h3><p>Short readouts would have promoted both. Extended observation retracted them.</p><FigureButton figure={figures.graveyard} label="Open escape trajectories" onOpen={onOpen} /></div><button onClick={() => onOpen(figures.graveyard)}><img src={figures.graveyard.src} alt="Late escape trajectories" /></button></div>
          <div className="compute-ledger"><span>28 GPUs at peak</span><span>~2,060 ns/day measured</span><span>260k-atom POPC systems</span><span>2.07 TB R2 evidence store</span><span>884 GB transport fragments removed</span><span>0.01 Å archive precision</span></div>
        </div>
      </section>

      <section className="research-event pmf-event era" data-era="20 JUL · PMF VERDICTS">
        <aside><time>20 JUL</time><span>Stage 6</span></aside>
        <div className="event-body">
          <div className="event-heading"><p className="mono-label">METRIC: WELL-DEPTH MEAN + SD · KCAL/MOL</p><h2>A bimodal result, not a padded shortlist.</h2></div>
          <div className="pmf-board">
            <div className="pmf-axis"><span>−20</span><span>−10</span><span>0</span><span>+6</span></div>
            <i className="threshold" />
            {pmfRows.map(([id, score, role]) => {
              const left = ((score + 20) / 26) * 100;
              const hit = score < -2;
              return <div className={`pmf-row ${hit ? "hit" : ""}`} key={id}><span><b>{id}</b><small>{role}</small></span><div><i style={{ left: `${left}%` }}><em>{score > 0 ? "+" : ""}{score.toFixed(2)}</em></i></div></div>;
            })}
          </div>
          <div className="hit-cards"><article><span>CONFIRMED · n=3</span><h3>ZINC000004286767</h3><strong>−16.97 ± 4.38</strong><p>mean + SD −12.59 · replicas −16.39 / −21.81 / −13.24 · barrier-out 21.59 kcal/mol</p></article><article><span>PROVISIONAL · n=2</span><h3>ZINC000016526277</h3><strong>−18.97 ± 1.40</strong><p>mean + SD −17.57 · deepest profile · replica 3 held out after NaN instability at window 12</p></article></div>
          <div className="convergence-warning"><span>CONVERGENCE HOLE</span><p>No PMF on the board formally meets the project’s convergence standard. Adjacent-window overlap is ~2–3%; target is 10–30%. The ~15 kcal/mol depth separation is larger than the observed uncertainty, so ranking is usable while absolute ΔG remains pending.</p><strong>REUS on both hits: in progress</strong></div>
          <FigureButton figure={figures.pmf} label="Open the audited PMF scoreboard" onOpen={onOpen} />
        </div>
      </section>

      <section className="research-event bench-event era" data-era="NOW · EXPERIMENT ZERO">
        <aside><time>NOW</time><span>Bench gate</span></aside>
        <div className="event-body">
          <div className="event-heading"><p className="mono-label">HANDOFF TO DR. PRINCE KANNANKERIL</p><h2>Resolve dominance before rescue.</h2></div>
          <div className="decision-tree"><div className="root"><span>EXPERIMENT ZERO</span><b>WT + R104Q co-expression</b><small>surface expression ± current</small></div><div className="branches"><article><span>HAPLOINSUFFICIENCY</span><b>Proceed to controlled rescue panel</b><p>Winner + candidate · D84N anchor · agmatine osmolyte · scaffold-negative</p></article><article className="stop"><span>DOMINANT-NEGATIVE</span><b>Stop or redesign</b><p>A chaperone could increase the abundance of an interfering subunit.</p></article></div></div>
          <div className="downloads"><a href="/downloads/canonical-facts.md"><span>Single source of truth</span><b>Canonical facts ↗</b></a><a href="/downloads/manuscript-r104q-v1.md"><span>Complete account</span><b>Manuscript ↗</b></a><a href="/downloads/master-scoreboard.md"><span>All seven verdicts</span><b>Scoreboard ↗</b></a><a href="/downloads/wetlab-assay-package.md"><span>Bench-ready design</span><b>Assay package ↗</b></a></div>
          <div className="final-contract"><p>Computation nominates.</p><p>The bench decides.</p><small>Not peer-reviewed · not a treatment · no result here changes clinical care</small></div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [audience, setAudience] = useState<Audience>("novice");
  const [progress, setProgress] = useState(0);
  const [era, setEra] = useState("START");
  const [activeFigure, setActiveFigure] = useState<Figure | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("brugada-audience");
    if (saved === "novice" || saved === "research") setAudience(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("brugada-audience", audience);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [audience]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      const sections = Array.from(document.querySelectorAll<HTMLElement>(".era"));
      const current = sections.filter((section) => section.getBoundingClientRect().top < window.innerHeight * .42).at(-1) ?? sections[0];
      if (current?.dataset.era) setEra(current.dataset.era);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [audience]);

  const modeDescription = useMemo(() => audience === "novice" ? "Plain-language journey" : "Computational record", [audience]);

  return (
    <main className={`site-shell mode-${audience}`}>
      <div className="top-progress"><i style={{ width: `${progress * 100}%` }} /></div>
      <header className="floating-header">
        <a className="wordmark" href="#top" aria-label="brugada.net home">brugada<span>.net</span></a>
        <div className="current-era"><span>{modeDescription}</span><b>{era}</b></div>
        <div className="audience-toggle" role="group" aria-label="Choose reading level">
          <button className={audience === "novice" ? "active" : ""} onClick={() => setAudience("novice")} aria-pressed={audience === "novice"}>New here</button>
          <button className={audience === "research" ? "active" : ""} onClick={() => setAudience("research")} aria-pressed={audience === "research"}>Research</button>
        </div>
      </header>
      <div id="top" />
      {audience === "novice" ? <NoviceJourney onOpen={setActiveFigure} /> : <ResearchJourney onOpen={setActiveFigure} />}
      <footer><a className="wordmark" href="#top">brugada<span>.net</span></a><p>Built from the audited 20 July 2026 submission package.</p><span>SCN5A R104Q · computational research</span></footer>
      {activeFigure && <FigureModal figure={activeFigure} onClose={() => setActiveFigure(null)} />}
    </main>
  );
}
