import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, Eyebrow } from "../components/ui";

export const metadata: Metadata = { title: "Chính sách cookie" };
export default function CookiePolicy() {
  return <>
    <section className="page-intro gradient-surface"><div className="container"><Breadcrumb current="Chính sách cookie" /><Eyebrow>MINH BẠCH & TÔN TRỌNG</Eyebrow><h1>Quyền riêng tư của bạn.</h1><p>Thông tin rõ ràng. Lựa chọn trong tay bạn.</p></div></section>
    <section className="section"><article className="container reading-content cookie-policy">
      <p>Cập nhật ngày 24/09/2026 · Phiên bản 2</p>
      <h2>1. Website lưu những gì?</h2>
      <p>Phiên bản hiện tại của website Bảo Tín An Tâm không cài cookie quảng cáo, Google Analytics hoặc Meta Pixel. Vercel Speed Insights chỉ được tải khi bạn chủ động bật “Đo hiệu năng website” trong cài đặt cookie. Ảnh và phông chữ được phục vụ từ website; không có bản đồ hoặc video nhúng của bên thứ ba.</p>
      <p>Nếu chọn “Đồng ý & ghi nhớ” hoặc bật “Ghi nhớ lựa chọn”, website lưu một bản ghi trong localStorage của trình duyệt. Đây là lưu trữ trên thiết bị, không phải cookie HTTP và không tự động gửi theo yêu cầu tới máy chủ.</p>
      <dl className="cookie-inventory"><dt>Tên bản ghi</dt><dd>btat:privacy:v1</dd><dt>Mục đích</dt><dd>Ghi nhớ lựa chọn của bạn và việc có cho phép đo hiệu năng hay không, tránh hiển thị lại thông báo.</dd><dt>Nội dung</dt><dd>Phiên bản thông báo, chế độ lựa chọn, trạng thái cho phép đo hiệu năng, thời điểm lưu và thời điểm hết hạn. Không chứa tên, số điện thoại hoặc mã định danh quảng cáo.</dd><dt>Thời hạn</dt><dd>180 ngày từ khi lưu. Bản ghi hết hạn được xóa khi bạn truy cập lại website.</dd><dt>Nơi lưu</dt><dd>Trình duyệt trên thiết bị của bạn. Website không gửi bản ghi này về máy chủ hoặc đối tác bảo hiểm.</dd></dl>
      <h2>2. Thay đổi hoặc xóa lựa chọn</h2>
      <p>Chọn “Cài đặt cookie” ở cuối mọi trang để xem, thay đổi hoặc xóa bản ghi. Chọn “Không ghi nhớ” để tiếp tục mà không lưu lựa chọn; thông báo có thể xuất hiện lại khi tải lại trang. Bạn cũng có thể xóa dữ liệu website trong cài đặt trình duyệt.</p>
      <p>Đóng bảng, cuộn trang hoặc không phản hồi không được coi là đồng ý. Việc không lưu lựa chọn không hạn chế chức năng xem thông tin hoặc yêu cầu tư vấn.</p>
      <h2>3. Đo hiệu năng bằng Vercel Speed Insights</h2>
      <p>Khi bạn bật mục này, Vercel nhận các chỉ số Web Vitals (tốc độ hiển thị, độ ổn định bố cục, độ phản hồi), đường dẫn trang, loại thiết bị, trình duyệt, hệ điều hành, thông tin kết nối và quốc gia. Mục đích là phát hiện và cải thiện trang tải chậm. Website loại bỏ tham số truy vấn và phần sau dấu # khỏi URL trước khi gửi; không gửi tên, số điện thoại hoặc nội dung biểu mẫu.</p>
      <p>Theo tài liệu Vercel, các điểm đo không gắn với định danh người dùng và không dùng để dựng lại phiên duyệt web. Dữ liệu đo được gửi tới hạ tầng Vercel; thời hạn lưu tùy thuộc gói dịch vụ và chính sách của Vercel. Xem <a href="https://vercel.com/docs/speed-insights/privacy-policy" target="_blank" rel="noreferrer">thông tin dữ liệu Speed Insights</a> và <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">chính sách quyền riêng tư Vercel</a>.</p>
      <p>Bạn có thể tắt mục đo hiệu năng hoặc xóa lựa chọn bất kỳ lúc nào. Trang sẽ tải lại để dừng công cụ đã bật. Việc tắt không xóa ngược các số liệu tổng hợp đã được gửi; bạn có thể liên hệ chúng tôi nếu cần hỗ trợ. Lựa chọn ở phiên bản trước không tự động bật tính năng này.</p>
      <h2>4. Công cụ bổ sung trong tương lai</h2>
      <p>Nếu bổ sung phân tích, quảng cáo hoặc nội dung nhúng sử dụng dữ liệu cá nhân, chúng tôi sẽ cập nhật thông tin về nhà cung cấp, mục đích, dữ liệu và thời hạn lưu, đồng thời yêu cầu lựa chọn riêng trước khi kích hoạt công cụ cần sự đồng ý. Lựa chọn ghi nhớ hiện tại không cho phép các mục đích đó.</p>
      <h2>5. Thông tin tư vấn và liên kết ngoài</h2>
      <p>Biểu mẫu tư vấn tạo bản nháp trong ứng dụng email của bạn; bạn cần tự nhấn gửi. Lựa chọn cookie không phải là sự đồng ý nhận quảng cáo hoặc xử lý hồ sơ bảo hiểm. Không gửi giấy tờ định danh hay hồ sơ sức khỏe qua trường chia sẻ thông thường.</p>
      <p>Khi mở liên kết MIC, PVI hoặc ứng dụng email, chính sách của dịch vụ đó áp dụng. Chính sách này chỉ mô tả lưu trữ trong trình duyệt của website; không thay thế thông tin về xử lý hồ sơ bảo hiểm hoặc nhật ký kỹ thuật của đơn vị vận hành máy chủ.</p>
      <h2>6. Liên hệ về quyền riêng tư</h2>
      <p>CÔNG TY TNHH BẢO TÍN AN TÂM · Mã số doanh nghiệp 0319574619.<br />750/9/9A Nguyễn Kiệm, Phường Đức Nhuận, Thành phố Hồ Chí Minh.</p>
      <p>Gửi yêu cầu liên quan đến dữ liệu tới <a href="mailto:baotinantam@gmail.com">baotinantam@gmail.com</a> hoặc gọi <a href="tel:0985775836">0985 775 836</a>.</p>
      <p><Link href="/lien-he" className="text-link">Liên hệ Bảo Tín An Tâm →</Link></p>
    </article></section>
  </>;
}
