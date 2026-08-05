import type { MetadataRoute } from "next";
import { NAV, PAPERS, SITE } from "./content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.updated);

  // The home page is not in NAV, because the wordmark is what links to it.
  // Listing NAV alone therefore left the most important URL out of the sitemap.
  const pages = [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...NAV.map((item) => ({
      url: `${SITE.url}${item.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  // The rendered manuscripts. Ten more indexable pages, which matters when the
  // site is otherwise nine URLs.
  const manuscripts = PAPERS.map((paper) => ({
    url: `${SITE.url}/m/${paper.slug}.html`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...pages, ...manuscripts];
}
