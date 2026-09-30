import { pageMetadata } from "../../lib/seo";
import { PageSchema } from "../../components/structured-data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "../../lib/guides";
import { Breadcrumb, CTA, Eyebrow } from "../../components/ui";
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = guides.find((item) => item.slug === slug);
  if (!item) notFound();
  return pageMetadata(item.title, item.desc, `/cam-nang/${slug}`, item.image, true);
}
export default async function GuideDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  return (
    <>
      <PageSchema path={`/cam-nang/${slug}`} title={g.title} description={g.desc} image={g.image} parent={{ path: "/cam-nang", title: "Cẩm nang bảo hiểm" }} type="Article" />
      <section className="page-intro gradient-surface">
        <div className="container">
          <Breadcrumb
            current={g.title}
            parent={{ href: "/cam-nang", label: "Cẩm nang" }}
          />
          <Eyebrow>
            {g.category.toUpperCase()} · {g.readTime} PHÚT ĐỌC
          </Eyebrow>
          <h1>{g.title}</h1>
          <p>{g.desc}</p>
        </div>
      </section>
      <article className="section article-container">
        <div className="article-image">
          <Image
            src={g.image}
            alt="Hình minh họa nội dung bảo hiểm"
            fill
            priority
            sizes="(max-width:900px) 100vw, 850px"
          />
        </div>
        <div className="reading-content">
          <p className="legal-note">Biên soạn: <Link href="/ve-chung-toi">Bảo Tín An Tâm</Link> · Nội dung hướng dẫn tổng quan.</p>
          {g.sections.map((s, i) => (
            <section key={s.title}>
              <h2>
                {i + 1}. {s.title}
              </h2>
              <p>{s.text}</p>
            </section>
          ))}
          <div className="article-source">
            Nội dung mang tính hướng dẫn tổng quan, không thay thế điều khoản
            sản phẩm. Tham khảo{" "}
            <a href={g.source} target="_blank" rel="noreferrer">
              thông tin chính thức của nhà bảo hiểm
            </a>{" "}
            và hỏi tư vấn viên về trường hợp cụ thể.
          </div>
          <Link className="button" href="/lien-he">
            Trao đổi cùng Bảo Tín An Tâm
          </Link>
        </div>
      </article>
      <section className="section soft-section">
        <div className="container">
          <h2>Đọc tiếp trong cẩm nang bảo hiểm</h2>
          <div className="related-links">
            {guides.filter((guide) => guide.slug !== slug).map((guide) => <Link key={guide.slug} href={`/cam-nang/${guide.slug}`}>{guide.title}</Link>)}
            <Link href="/san-pham">Tìm hiểu các giải pháp bảo hiểm</Link>
            <Link href="/boi-thuong">Hướng dẫn hỗ trợ bồi thường</Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
