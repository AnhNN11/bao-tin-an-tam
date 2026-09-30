import { site, staticPages } from "../lib/seo";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function BusinessSchema() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "InsuranceAgency", "@id": `${site.url}/#organization`,
        name: site.name, legalName: site.legalName, url: site.url,
        logo: `${site.url}${site.logo}`, image: `${site.url}${site.logo}`,
        telephone: site.phone, email: site.email,
        address: { "@type": "PostalAddress", streetAddress: "750/9/9A Nguyễn Kiệm, Phường Đức Nhuận", addressLocality: "Thành phố Hồ Chí Minh", addressCountry: "VN" },
        contactPoint: { "@type": "ContactPoint", telephone: site.phone, email: site.email, contactType: "customer service", availableLanguage: "Vietnamese" },
      },
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, alternateName: "Bảo Tín Insurance", inLanguage: "vi-VN", publisher: { "@id": `${site.url}/#organization` } },
    ],
  }} />;
}

export function PageSchema({ path, title, description, type = "WebPage", image, parent, service }: {
  path: string; title: string; description: string; type?: string; image?: string;
  parent?: { path: string; title: string }; service?: boolean;
}) {
  const url = `${site.url}${path}`;
  const crumbs = [{ name: "Trang chủ", item: `${site.url}/` }, ...(parent ? [{ name: parent.title, item: `${site.url}${parent.path}` }] : []), { name: title, item: url }];
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": type, "@id": `${url}#page`, url, name: title, headline: type === "Article" ? title : undefined, author: type === "Article" ? { "@id": `${site.url}/#organization` } : undefined, mainEntityOfPage: type === "Article" ? url : undefined, description, inLanguage: "vi-VN", isPartOf: { "@id": `${site.url}/#website` }, publisher: { "@id": `${site.url}/#organization` }, image: image ? `${site.url}${image}` : undefined, breadcrumb: { "@id": `${url}#breadcrumb` } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, ...crumb })) },
    ...(service ? [{ "@type": "Service", "@id": `${url}#service`, name: `Tư vấn ${title.toLowerCase()}`, serviceType: title, description, url, provider: { "@id": `${site.url}/#organization` } }] : []),
  ] }} />;
}

export function StaticPageSchema({ path }: { path: string }) {
  const page = staticPages.find((page) => page.path === path);
  if (!page) return null;
  return <PageSchema path={path} title={page.title} description={page.description} type={path === "/lien-he" ? "ContactPage" : path === "/ve-chung-toi" ? "AboutPage" : ["/san-pham", "/cam-nang", "/cau-chuyen"].includes(path) ? "CollectionPage" : "WebPage"} />;
}
