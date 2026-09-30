import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "./lib/seo";
import { BusinessSchema } from "./components/structured-data";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import "./globals.css";
import "./refinements.css";
import "./brand-theme.css";
const font = Manrope({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  title: {
    default: "Bảo Tín An Tâm | Đại lý bảo hiểm MIC & PVI",
    template: "%s | Bảo Tín An Tâm",
  },
  description:
    "Giải pháp bảo hiểm ô tô, sức khỏe, du lịch và doanh nghiệp từ MIC, PVI. Bảo Tín An Tâm tư vấn tận tâm, đồng hành cùng bạn. 0906 818 357.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={font.variable}>
      <body>
        <BusinessSchema />
        <SiteHeader />
        <main id="noi-dung">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
