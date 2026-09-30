import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

const base = process.argv[2] || 'http://localhost:3100';
const canonicalOrigin = 'https://www.baotininsurance.vn';
const decode = (s) => s.replaceAll('&amp;', '&').replaceAll('&quot;', '"');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const sitemap = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemap.status, 200, 'Sitemap must respond 200');
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
assert.equal(urls.length, 19, 'Sitemap must contain all 19 published pages');
assert.equal(new Set(urls).size, urls.length, 'No duplicate sitemap URLs');
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
assert(robots.includes('Allow: /'));
const results = [], links = new Set(), images = new Set();
for (const url of urls) {
  assert(url.startsWith(canonicalOrigin), `Unexpected sitemap origin ${url}`);
  const path = new URL(url).pathname;
  const res = await fetch(`${base}${path}`);
  assert.equal(res.status, 200, path);
  const html = await res.text();
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0]));
  const value = (key) => meta.find((m) => m.name === key || m.property === key)?.content;
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title && title.length > 15, `Title missing ${path}`);
  assert(value('description')?.length > 60, `Description missing ${path}`);
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0])).find((m) => m.rel === 'canonical')?.href;
  assert.equal(new URL(canonical).href, new URL(url).href, `Canonical ${path}`);
  assert.equal(new URL(value('og:url')).href, new URL(url).href, `OG URL ${path}`);
  assert(value('og:image')?.startsWith(canonicalOrigin), `OG image ${path}`);
  assert.equal(value('twitter:card'), 'summary_large_image');
  assert(!value('robots')?.includes('noindex'), `Unexpected noindex ${path}`);
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, `H1 count ${path}`);
  assert(!/0985.?775.?836|baotinantam@gmail.com/.test(html), `Old contact details ${path}`);
  assert(html.includes('tel:0906818357'), `Phone ${path}`);
  assert(html.includes('mailto:baotinantam.ad@gmail.com'), `Email ${path}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
  const nodes = schemas.flatMap((s) => s['@graph'] || [s]);
  const org = nodes.find((n) => n['@type'] === 'InsuranceAgency');
  assert.equal(org?.telephone, '+84906818357');
  assert.equal(org?.email, 'baotinantam.ad@gmail.com');
  assert(nodes.some((n) => n['@type'] === 'WebSite'));
  if (path !== '/') {
    const breadcrumb = nodes.find((n) => n['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumb?.itemListElement.at(-1).item, url, `Breadcrumb ${path}`);
  }
  if (path.startsWith('/san-pham/')) assert(nodes.some((n) => n['@type'] === 'Service'));
  if (path.startsWith('/cam-nang/')) assert(nodes.some((n) => n['@type'] === 'Article'));

  for (const img of [...html.matchAll(/<img\b[^>]*>/g)].map((m) => attrs(m[0]))) {
    assert('alt' in img, `Missing alt ${path}`);
    if (img.src) images.add(img.src);
  }
  for (const a of [...html.matchAll(/<a\b[^>]*>/g)].map((m) => attrs(m[0]))) {
    if (a.href?.startsWith('/') && !a.href.startsWith('//')) links.add(new URL(a.href, base).pathname);
  }
  images.add(new URL(value('og:image')).pathname);
  results.push({path, status:res.status, title, description:value('description'), canonical, schemas:schemas.flatMap((s) => s['@graph'] || [s]).map((s) => s['@type'])});
}
assert.equal(new Set(results.map((r) => r.title)).size, results.length, 'All titles unique');
assert.equal(new Set(results.map((r) => r.description)).size, results.length, 'All descriptions unique');
for (const path of links) assert.equal((await fetch(`${base}${path}`)).status, 200, `Broken internal link ${path}`);
for (const src of images) {
  const res = await fetch(new URL(src, base));
  assert.equal(res.status, 200, `Broken image ${src}`);
}
for (const path of ['/san-pham/not-a-product','/cam-nang/not-an-article','/cau-chuyen/not-a-story','/not-a-page']) {
  const res = await fetch(`${base}${path}`);
  assert.equal(res.status, 404, `Missing 404 for ${path}`);
  assert((await res.text()).includes('noindex'), `404 should not be indexed ${path}`);
}
const queryHtml = await (await fetch(`${base}/lien-he?san-pham=bao-hiem-o-to`)).text();
assert(queryHtml.includes(`rel="canonical" href="${canonicalOrigin}/lien-he"`), 'Query variant canonical');
const report = {checkedAt: new Date().toISOString(), base, pages:results, internalLinksChecked:links.size, imagesChecked:images.size, status:'passed'};
writeFileSync(process.argv[3] || '/tmp/bao-tin-seo-audit.json', JSON.stringify(report,null,2));
console.log(`PASS: ${results.length} pages, ${links.size} internal routes, ${images.size} images; metadata, canonical, social, schema, contact, robots, sitemap, 404 and query canonical.`);
