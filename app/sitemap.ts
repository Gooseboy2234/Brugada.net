import type { MetadataRoute } from "next";
import { NAV, SITE } from "./content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.updated);
  return NAV.map((item) => ({
    url: `${SITE.url}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
