import { StaticPageSchema } from "../components/structured-data";
import { staticMetadata } from "../lib/seo";
export const metadata = staticMetadata("/lien-he");
import Icon from "../components/ui-icon";
import ContactForm from "../components/contact-form";
import { Breadcrumb, Eyebrow } from "../components/ui";
import { products, productOptions } from "../lib/products";
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const slug = typeof query["san-pham"] === "string" ? query["san-pham"] : "";
  const selected = products.some((p) => p.slug === slug) ? slug : "";
  return (
    <>
    <StaticPageSchema path="/lien-he" />
    <section className="contact-page gradient-surface">
      <div className="container">
        <Breadcrumb current="Liên hệ tư vấn" />
        <div className="contact-layout">
          <div className="contact-copy">
            <Eyebrow>MỘT CUỘC TRÒ CHUYỆN NHỎ</Eyebrow>
            <h1>
              Bạn chia sẻ. <br />
              <span className="gradient-text">Chúng tôi lắng nghe.</span>
            </h1>
            <p>
              Chưa cần có tất cả câu trả lời. <br />
              Hãy bắt đầu từ điều bạn quan tâm.
            </p>
            <div className="contact-methods">
              <a href="tel:0906818357">
                <span className="feature-icon mint">
                  <Icon name="phone" size={23} />
                </span>
                <span>
                  Trò chuyện trực tiếp<strong>0906 818 357</strong>
                </span>
                <Icon name="arrow" size={18} />
              </a>
              <a href="mailto:baotinantam.ad@gmail.com">
                <span className="feature-icon blue">
                  <Icon name="file" size={23} />
                </span>
                <span>
                  Gửi email cho chúng tôi<strong>baotinantam.ad@gmail.com</strong>
                </span>
                <Icon name="arrow" size={18} />
              </a>
              <div>
                <span className="feature-icon lavender">
                  <Icon name="building" size={23} />
                </span>
                <span>
                  Địa chỉ công ty
                  <strong>
                    750/9/9A Nguyễn Kiệm, Phường Đức Nhuận, Thành phố Hồ Chí
                    Minh
                  </strong>
                </span>
              </div>
            </div>
            <div className="contact-promise">
              <Icon name="check" size={16} /> Tư vấn miễn phí <span>·</span> Lựa
              chọn là của bạn
            </div>
          </div>
          <ContactForm products={productOptions} key={selected} initialProduct={selected} />
        </div>
      </div>
    </section>
    </>
  );
}
