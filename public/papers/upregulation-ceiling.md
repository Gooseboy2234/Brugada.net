# SCN5A lacks the non-productive mRNA reserve that antisense upregulation therapy would need in human heart

**Ethan Bradley**

Independent researcher, no institutional affiliation

ORCID: [0009-0008-8925-7975](https://orcid.org/0009-0008-8925-7975)

## Abstract

Raising total SCN5A output by blocking non-productive mRNA splicing is not a viable strategy in human heart, because the material this strategy needs to redirect is essentially absent from cardiac tissue. Splice-junction read counting across 827 GTEx v10 heart samples (371 left ventricle, 456 atrial appendage) puts the non-productive fraction of SCN5A mRNA at 0.0045 percent (69 of 1,545,656 reads, 95 percent Wilson confidence interval 0.0035 to 0.0056 percent). The same method applied to SCN1A in 491 brain cortex and frontal cortex samples, the tissue and gene in which this drug class already works clinically (zorevunersen, an antisense oligonucleotide approved for Dravet syndrome, *N Engl J Med* 2026;394(10):969-982, PMID 41780062), gives 1.388 percent. The gap is 308-fold (Mann-Whitney one-sided p = 1.6e-160). Even under a generous transcript-level estimate of 5.38 percent non-productive SCN5A mRNA, redirecting all of it with perfect efficiency raises output only 1.057-fold. The R104Q variant, whose heterozygous current is 34.1 percent of normal (O'Neill et al. 2022, PMID 35305865), needs roughly 1.5-fold to approach the 50 percent floor expected under simple haploinsufficiency. A frameshifting cassette exon with the structural signature this drug class targets does exist in the SCN5A annotation, but its splice junctions are undetectable anywhere in the GTEx v10 junction file. The strategy has no substrate in cardiac tissue as currently characterized.

## A key to the terms used here

- **SCN5A** is the gene for the heart's main sodium channel; **Nav1.5** is the protein. **R104Q** is the
  variant used as the worked example, arginine 104 replaced by glutamine.
- **Messenger RNA**, or **mRNA**, is the working copy a cell makes from a gene and reads to build
  protein. **Transcription** is making it; **expression** is how much gets made.
- **Splicing** is the cutting and rejoining that turns a raw transcript into a finished messenger RNA.
  **Exons** are the kept pieces, **introns** the removed ones, and a **junction** is a joint between two
  kept pieces.
- A **non-productive** transcript is one the cell makes and then discards without building protein from
  it: waste. **Upregulation therapy** aims to rescue that waste stream into working product, so the
  amount of waste sets the ceiling on how much extra protein is available. If almost nothing is being
  wasted, there is almost nothing to recover.
- A **poison exon** is an exon whose inclusion makes a transcript non-productive on purpose. Blocking
  it with a drug converts waste into product, which is the mechanism this paper tests for SCN5A. It has
  worked for other genes, which is why the question was worth asking.
- **NMD**, nonsense-mediated decay, is the cell's process for destroying transcripts carrying a
  premature stop signal.
- **GTEx** is a public atlas of gene expression across human tissues. **TPM**, transcripts per million,
  is its unit of abundance. **Long-read sequencing** reads whole transcripts end to end rather than in
  fragments, which is what would be needed to settle the question directly.
- **Headroom** here means how much more functional protein the mechanism could deliver at best.
- **Saturation** means a mechanism reaching its maximum, beyond which more drug adds nothing.

## Why raising output looked like the only mechanism-independent option

SCN5A encodes the cardiac sodium channel Nav1.5. R104Q (NM_000335.5:c.311G>A, p.Arg104Gln) is a Brugada syndrome variant, and whether it acts through simple loss of function or through active interference with the co-expressed wild-type channel is not established. That question gates most candidate interventions: a folding corrector only helps if the mutant protein is retained inside the cell, an interaction-blocking drug only helps if the mutant subunit actively suppresses the healthy one. Raising total transcript output is different. It helps regardless of which mechanism is operating, because more working mRNA means more working channel either way. That property made it worth testing before the mechanism question is resolved, and it is the reason a negative result here closes something rather than merely narrowing it.

The clinical motivation is straightforward. Most Brugada carriers are asymptomatic and do not meet implant criteria for a defibrillator, so they currently have no disease-modifying protection at all, and a defibrillator in any case terminates an arrhythmia rather than preventing one. A precedent for the mechanism exists: zorevunersen, an antisense oligonucleotide that increases productive SCN1A transcript by blocking non-productive splicing, treats Dravet syndrome, a disease caused primarily by SCN1A haploinsufficiency, and reached publication in the *New England Journal of Medicine* in 2026. The question this study asks is whether SCN5A in heart has the same kind of non-productive reserve that makes that drug class work in SCN1A and brain.

## Methods

**Gene and tissue definitions.** SCN5A, Ensembl ENSG00000183873, chr3:38548057-38649743, minus strand, GRCh38. SCN1A, Ensembl ENSG00000144285, used as the positive control gene because zorevunersen already demonstrates efficacy against it. Heart tissues: GTEx "Heart - Left Ventricle" and "Heart - Atrial Appendage". Brain tissues: GTEx "Brain - Cortex" and "Brain - Frontal Cortex (BA9)".

**Sequencing data.** GTEx v10, quantified against GENCODE v39. Two files were streamed in full and filtered to the two genes:

| File | Content | Dimensions |
|---|---|---|
| `GTEx_Analysis_v10_STARv2.7.10a_junctions.gct.gz` | Splice-junction read counts | 392,955 junctions by 19,788 samples |
| `GTEx_Analysis_v10_RSEMv1.3.3_transcripts_tpm.txt.gz` | Isoform-level transcripts-per-million estimates | 19,788 samples |

A third file, the GTEx v9 long-read isoform quantification (FLAIR pipeline, GENCODE v26 annotation, 92 samples total), was also examined and is reported separately because of a depth problem described below. No access date is recorded for these three files in the underlying records; the pipeline and reference versions above are as labelled in the file names themselves.

**Sample filtering.** Samples were required to pass a minimum sequencing-depth quality control flag recorded per sample in the derived counts table; the numeric cutoff for that flag is not separately stated in the records available. After filtering: junction analysis, 827 heart samples (371 left ventricle, 456 atrial appendage) and 491 brain samples (262 cortex, 229 frontal cortex); transcript analysis, 879 heart samples (420 left ventricle, 459 atrial appendage) and 528 brain samples (267 cortex, 261 frontal cortex).

**Transcript annotation.** Transcript biotypes and exon coordinates were retrieved from the Ensembl REST API, GRCh38, accessed 2026-08-04, for both genes. SCN5A has 21 annotated transcripts, of which 7 are non-productive by biotype: two nonsense-mediated-decay transcripts, ENST00000713730 (8,616 nt, longer than MANE Select at 8,528 nt) and ENST00000713731 (2,873 nt); four retained-intron transcripts, ENST00000491944 (1,382 nt), ENST00000476683 (774 nt), ENST00000718273 (687 nt), and ENST00000718272 (600 nt); and one protein_coding_CDS_not_defined transcript, ENST00000464652 (591 nt). SCN1A has 18 of 30 annotated transcripts classified non-productive by the same scheme. These are annotation counts, not abundance measurements, and are treated as such throughout.

**Junction classification and counting.** Every intron implied by every annotated transcript of both genes was derived from the Ensembl exon models, and each resulting junction was labelled by which transcripts contain it. A junction was classified non-productive-specific when every transcript containing it is non-productive. Reads spanning each classified junction were then summed directly from the STAR junction file, with no isoform-deconvolution step.

**Transcript-level estimation.** RSEM transcripts-per-million values were summed across the transcripts classified non-productive for each gene and divided by total gene TPM, per sample. This method requires software to assign short reads (76 to 150 bases in this dataset) to one of several highly similar isoforms, and its output was cross-checked against the junction counts rather than trusted on its own.

**Coordinate convention check.** GTEx junction identifiers were confirmed empirically, not assumed, to represent 1-based inclusive intron coordinates: SCN1A's MANE intron 1 was computed independently from Ensembl exon boundaries as chr2:165992423-165994145, which matched the GTEx junction identifier string `chr2:165992423-165994145:-` exactly.

**Statistics.** Wilson 95 percent confidence intervals were computed for the pooled non-productive fractions. A one-sided Mann-Whitney U test compared per-sample SCN5A-heart fractions against SCN1A-brain fractions.

**Electrophysiology baseline.** R104Q functional data are from O'Neill et al., 2022 (PMID 35305865, Supplementary Table 1, read from the open preprint 10.1101/2021.09.22.461398, page 29), using a Sleeping Beauty genomic-integration system in which wild-type current is undiluted: heterozygous R104Q current 68.3 ± 6.1 percent of a single wild-type allele (n = 34), homozygous 0.4 ± 0.2 percent (n = 22). Translating this to a heart in which two working alleles equal 100 percent gives an unaffected value of 100, a simple one-allele loss of 50, and a measured R104Q value of 34.1 percent.

## The junction count is direct, and it is close to zero

| Gene, tissue | n samples | Non-productive reads / total reads | Pooled fraction | 95% Wilson CI | Median per-sample fraction | 90th pct | Max |
|---|---:|---|---:|---|---:|---:|---:|
| SCN5A, left ventricle | 371 | | | | 0.000% | 0.000% | 0.386% |
| SCN5A, atrial appendage | 456 | | | | 0.000% | 0.000% | 0.935% |
| SCN5A, heart pooled | 827 | 69 / 1,545,656 | **0.0045%** | 0.0035-0.0056% | | | |
| SCN1A, cortex | 262 | | | | 1.818% | 3.957% | 9.52% |
| SCN1A, frontal cortex | 229 | | | | 1.031% | 2.900% | 10.13% |
| SCN1A, brain pooled | 491 | 2,194 / 158,063 | **1.388%** | 1.332-1.447% | | | |

The gap between the two pooled fractions is 308-fold. A one-sided Mann-Whitney test comparing per-sample SCN5A-heart fractions against SCN1A-brain fractions gives p = 1.6e-160. The distribution matters as much as the pooled number: the 90th percentile for SCN5A in both heart tissues is still 0.000 percent, and the single highest value across all 827 heart samples is 0.935 percent. There is no hidden subpopulation of high-splicing-waste hearts obscured by an average.

Sensitivity is not the explanation for the low number. All 27 annotated SCN5A MANE junctions were quantified at 19 to 107 reads per sample, with median per-sample junction depth of 1,173 to 1,947 reads depending on tissue and junction. The sequencing depth was adequate to detect a non-productive signal had one existed; none was found.

## The transcript-level estimate is less reliable, and here is the reason

| Gene, tissue | n | Median gene TPM | Median non-productive fraction | 90th pct | Max |
|---|---:|---:|---:|---:|---:|
| SCN5A, left ventricle | 420 | 22.1 | 3.73% | 8.70% | 32.7% |
| SCN5A, atrial appendage | 459 | 20.8 | 6.34% | 14.80% | 31.1% |
| SCN1A, cortex | 267 | 7.3 | 42.88% | 60.55% | 88.2% |
| SCN1A, frontal cortex | 261 | 11.3 | 37.53% | 65.87% | 90.8% |

Pooled across heart, the transcript-level method gives roughly 4.9 percent non-productive SCN5A mRNA against roughly 40.6 percent for SCN1A in brain, an 8.3-fold gap in the same direction as the junction result. But this method has a specific limitation for SCN5A: the RSEM reference used by GTEx v10 quantifies only 3 of the 7 transcripts classified non-productive (ENST00000464652, ENST00000476683, ENST00000491944). Both large nonsense-mediated-decay transcripts, including the one carrying the poison-exon candidate described below, are absent from that reference and could not have been counted regardless of their abundance. The three transcripts that do carry the transcript-level signal have median heart abundances of 0.47, 0.32, and 0.07 TPM and attract only the same 69 junction reads across 827 samples that the direct method already counted. They are short, 591 to 1,382 nucleotides, and mostly overlap the coding transcript, which is exactly the setting in which isoform-assignment software parks ambiguous reads. The junction method does not share this limitation, because a read spanning a splice seam is evidence for that seam regardless of which transcripts are annotated. For that reason the junction fraction, 0.0045 percent, is treated as the measurement, and the transcript-level fraction, generously rounded to 5.38 percent, is treated as an upper bound rather than an estimate to be believed on its own terms.

## A poison exon exists in the genome but heart does not use it

The long nonsense-mediated-decay transcript ENST00000713730 contains a 100-nucleotide cassette exon at chr3:38612802-38612901 that MANE Select splices past entirely, using one continuous intron at chr3:38609965-38613742. A 100-nucleotide insertion shifts the reading frame and destroys the protein, which is the same structural pattern zorevunersen blocks in SCN1A, and the exon shares a splice site with MANE Select, which would make it an attractive antisense target if it were used.

It is not detectably used in human heart. Neither inclusion junction, chr3:38612902-38613974 nor chr3:38609965-38612801, appears anywhere in the GTEx v10 junction file spanning 392,955 junctions and 19,788 samples. The MANE junction that skips the exon is present at a median of 19 reads per heart sample. In direct contrast, SCN1A's non-productive signal in brain concentrates in two specific junctions, chr2:166007294-166009718 and chr2:166002754-166007229, carrying 832 and 724 reads across brain cortex samples, where the same kind of poison-exon splicing is demonstrably active. The SCN5A element is annotated but silent in the tissue that matters.

## Long-read sequencing could not settle this

GTEx v9 long-read data (16 cardiac samples, full-length isoforms, no isoform-assignment guesswork) gave SCN5A non-productive fractions of 20 percent in left ventricle and 50 percent in atrial appendage, numbers that would have supported the strategy. They are not usable. Depth on SCN5A in this dataset is 1 to 10 long reads per sample, median 5.5, and technical replicates of the same sample disagree completely: sample GTEX-WY7C-1126 gave fractions of 0.20, 0.83, and 0.20 from 5, 6, and 5 reads respectively. No sample reaches 50 reads. The reference annotation used for this quantification is GENCODE v26, which predates the annotation of both ENST00000713730 and ENST00000713731 and so could not have counted the poison-exon transcript regardless of depth. This dataset is reported here for completeness and is not treated as evidence for or against the conclusion.

## What the ceiling means for R104Q

A drug in this class cannot exceed the theoretical maximum of redirecting every non-productive transcript into a working one, a boost of 1/(1 minus the non-productive fraction).

| Non-productive fraction used | Maximum possible boost | R104Q current (34.1% baseline) becomes |
|---|---:|---:|
| 0.0045% (junction, the measurement) | 1.0000x | 34.10% |
| 5.38% (transcript, generous upper bound) | 1.057x | 36.0% |

Applying a range of boost factors to the 34.1 percent baseline, under the assumption that suppression scales proportionally with allele output:

| Boost | If starting point were simple one-allele loss (50%) | If starting point is measured R104Q (34.1%) |
|---:|---:|---:|
| 1.5x | 75.0% | 51.2% |
| 2.0x | 100.0% | 68.2% |
| 2.5x | 125.0% | 85.2% |

The strategy needs roughly 1.5-fold to move R104Q current toward the 50 percent floor expected under simple haploinsufficiency; reaching exactly 50 percent would require 1.46-fold. The measurement caps the achievable boost at 1.057-fold under the most generous reading of the data and at essentially 1.0000-fold under the reliable one. The gap between what is needed and what is available is roughly an order of magnitude, using an efficiency assumption, perfect redirection of every non-productive transcript, that no real drug achieves.

## The saturation risk that outlives this negative

The headroom table above assumes suppression is proportional: a fixed fraction of wild-type current is removed regardless of absolute expression level, so scaling both alleles scales the surviving current by the same factor. That assumption is untested. If instead the mutant subunit interferes with a fixed absolute amount of channel complex rather than a fixed fraction, raising expression from both alleles delivers more interfering protein alongside more working protein, and the intervention could lower current rather than raise it. This applies to any future strategy that increases SCN5A output from both alleles without distinguishing wild-type from mutant transcript, independent of the present negative result, and it should be resolved before such a strategy is attempted again.

## What this search covered, and what it did not reach

This was a bounded search of specific named resources, not an exhaustive one. Reached and used in full: the GTEx v10 junction file, the GTEx v10 RSEM transcript file, the GTEx v9 long-read file, GTEx sample annotations, and the Ensembl REST API for transcript biotypes and exon structures. Not reached: recount3 (host duffel.rail.bio was not accessible from the environment used) and a generic Google Cloud Storage endpoint; no mirror was attempted for either. recount3 would have added an independent junction quantification from cohorts outside GTEx, which is the single most useful check not performed here. ENCODE heart RNA-seq was reachable but was not pulled, because GTEx already supplied roughly 900 heart samples at far greater depth than the long-read alternative and ENCODE's cardiac sample count is considerably smaller. Intron retention was not quantified directly from base-level coverage; the junction method captures splice-seam evidence only, and a direct coverage analysis of the four retained-intron biotypes specifically was not performed.

## What would falsify this

1. **Tissue and developmental stage.** GTEx is post-mortem bulk tissue from adults. If the poison exon or other non-productive splicing is used in fetal or diseased heart, or concentrated in a cell type diluted out in bulk tissue, this measurement would miss it. Single-nucleus or fetal cardiac RNA-seq showing meaningful poison-exon inclusion would overturn the conclusion.
2. **Turnover masking flux.** Nonsense-mediated-decay transcripts are degraded quickly, so a low steady-state level can hide a high rate of production. The decisive experiment is cardiomyocyte RNA-seq with nonsense-mediated decay inhibited, for example by UPF1 knockdown; a sharp rise in SCN5A poison-exon inclusion under that condition would mean this measurement understates the available substrate. This is a wet-lab experiment and was not performed here. Retained-intron transcripts are not degraded by this pathway and were also near zero, and the same turnover caveat applies to SCN1A in brain, where the corresponding signal is nonetheless 308-fold higher.
3. **Annotation dependence.** The non-productive set used here comes entirely from Ensembl biotype calls. An unannotated poison exon would not be counted by this method, though the junction file does contain unannotated junctions and a targeted search of those was not carried out.
4. **Structural blindness of the junction method.** A retained intron produces no junction read at all, so this method cannot see intron retention directly and can only undercount terminal splicing events. The transcript-level estimate partially covers this gap and it, too, came out low.
5. **Baseline tissue.** The 34.1 percent R104Q current figure comes from a heterologous cell line, not human heart. Whether the underlying dominant-negative mechanism, if one exists, operates the same way in cardiac tissue is unresolved and is not addressed by this measurement.

## Data availability

Public data used: GTEx v10 junction and transcript quantification files and GTEx v9 long-read quantification files, available from the GTEx Portal; Ensembl REST API annotations for ENSG00000183873 and ENSG00000144285, GRCh38, accessed 2026-08-04; O'Neill et al. 2022 electrophysiology data, PMID 35305865, Supplementary Table 1, and the corresponding preprint, doi 10.1101/2021.09.22.461398. All derived tables are deposited as a single archive with a permanent identifier. The identifier is
recorded in DATA_DOI.txt alongside this manuscript and should be cited as the data source. They comprise the per-sample junction and transcript classifications, the transcript biotype table, and the headroom calculations.

## Competing interests

I am a heterozygous carrier of the SCN5A R104Q variant examined in this study.

## References

1. O'Neill MJ, et al. 2022. PMID: 35305865. Supplementary Table 1, also available as preprint doi 10.1101/2021.09.22.461398.
2. Zorevunersen in children and adolescents with Dravet syndrome, phase 1-2a studies MONARCH and ADMIRAL. N Engl J Med. 2026;394(10):969-982. doi: 10.1056/NEJMoa2506295. PMID: 41780062.
3. Correspondence on zorevunersen in Dravet syndrome. N Engl J Med. 2026. PMID: 42308493.
4. GTEx Consortium. GTEx Analysis v10: splice-junction counts (STAR v2.7.10a) and transcript-level quantification (RSEM v1.3.3), quantified against GENCODE v39. GTEx Portal.
5. GTEx Consortium. GTEx v9 long-read RNA-seq quantification (FLAIR, GENCODE v26).
6. Ensembl. GRCh38 annotations for ENSG00000183873 (SCN5A) and ENSG00000144285 (SCN1A), accessed 2026-08-04.