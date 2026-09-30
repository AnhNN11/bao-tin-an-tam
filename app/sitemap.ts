import type { MetadataRoute } from "next";
import { site, staticPages } from "./lib/seo";
import { products } from "./lib/products";
import { guides } from "./lib/guides";
import { stories } from "./lib/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map(({ path }) => ({ url: `${site.url}${path}` })),
    ...products.map(({ slug, image }) => ({ url: `${site.url}/san-pham/${slug}`, images: [`${site.url}${image}`] })),
    ...guides.map(({ slug, image }) => ({ url: `${site.url}/cam-nang/${slug}`, images: [`${site.url}${image}`] })),
    ...stories.map(({ slug, image }) => ({ url: `${site.url}/cau-chuyen/${slug}`, images: [`${site.url}${image}`] })),
  ];
}
