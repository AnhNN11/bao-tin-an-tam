import type { Metadata } from "next";

export const site = {
  url: "https://www.baotininsurance.vn",
  name: "Bảo Tín An Tâm",
  legalName: "CÔNG TY TNHH BẢO TÍN AN TÂM",
  phone: "+84906818357",
  email: "baotinantam.ad@gmail.com",
  logo: "/images/logo-red-green.webp",
};

export function pageMetadata(title: string, description: string, path: string, image = "/images/family-hero-v2.webp", article = false): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: `${site.url}${path}` },
    openGraph: {
      title: fullTitle, description, url: `${site.url}${path}`,
      siteName: site.name, locale: "vi_VN", type: article ? "article" : "website",
      images: [{ url: `${site.url}${image}`, alt: title }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [`${site.url}${image}`] },
  };
}

export const staticPages = [
  { path: "/", title: "Đại lý bảo hiểm MIC & PVI", description: "Bảo Tín An Tâm tư vấn bảo hiểm ô tô, sức khỏe, du lịch và doanh nghiệp từ MIC, PVI. Tìm hiểu quyền lợi, điều kiện và hỗ trợ bồi thường. Gọi 0906 818 357." },
  { path: "/san-pham", title: "Bảo hiểm ô tô, sức khỏe, du lịch & doanh nghiệp", description: "Khám phá các giải pháp bảo hiểm MIC, PVI cùng Bảo Tín An Tâm. Tìm hiểu phạm vi, điều kiện tham gia và chuẩn bị thông tin để nhận tư vấn phù hợp." },
  { path: "/ve-chung-toi", title: "Về Bảo Tín An Tâm – Đại lý bảo hiểm tại TP.HCM", description: "Tìm hiểu Bảo Tín An Tâm, đại lý bảo hiểm MIC và PVI tại TP.HCM. Tư vấn theo nhu cầu, giải thích điều khoản và hỗ trợ kết nối với nhà bảo hiểm." },
  { path: "/lien-he", title: "Liên hệ tư vấn bảo hiểm – 0906 818 357", description: "Liên hệ Bảo Tín An Tâm qua 0906 818 357 hoặc baotinantam.ad@gmail.com để được tư vấn bảo hiểm. Địa chỉ: 750/9/9A Nguyễn Kiệm, Phường Đức Nhuận, TP.HCM." },
  { path: "/boi-thuong", title: "Hướng dẫn hồ sơ & hỗ trợ bồi thường bảo hiểm", description: "Các bước thông báo sự kiện, chuẩn bị chứng từ và theo dõi hồ sơ bồi thường MIC, PVI. Bảo Tín An Tâm hỗ trợ kết nối nhà bảo hiểm qua 0906 818 357." },
  { path: "/cam-nang", title: "Cẩm nang bảo hiểm – Lựa chọn, điều khoản & hồ sơ", description: "Hướng dẫn tìm hiểu bảo hiểm, đọc điều khoản và chuẩn bị hồ sơ bồi thường. Cẩm nang từ Bảo Tín An Tâm giúp bạn đặt đúng câu hỏi trước khi tham gia." },
  { path: "/cau-chuyen", title: "Góc an tâm – Tình huống tìm hiểu bảo hiểm", description: "Khám phá tình huống minh họa về bảo hiểm gia đình, ô tô, du lịch và doanh nghiệp. Hiểu nhu cầu bảo vệ cùng Bảo Tín An Tâm trước khi chọn sản phẩm." },
  { path: "/chinh-sach-cookie", title: "Chính sách cookie & quyền riêng tư", description: "Tìm hiểu cookie, lưu trữ cục bộ và lựa chọn đo hiệu suất trên website Bảo Tín An Tâm. Liên hệ baotinantam.ad@gmail.com về quyền riêng tư của bạn." },
];

export function staticMetadata(path: string): Metadata {
  const page = staticPages.find((page) => page.path === path);
  if (!page) throw new Error(`Missing SEO configuration: ${path}`);
  return pageMetadata(page.title, page.description, path);
}
