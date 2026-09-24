"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const PerformanceInsights = dynamic(() => import("./performance-insights"), { ssr: false });
import { useEffect, useRef, useState } from "react";
import Icon from "./ui-icon";

const KEY = "btat:privacy:v1";
const VERSION = 2;
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;

// Performance measurement requires a separate opt-in; old preferences never enable it.
export default function CookiePreferences() {
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [performance, setPerformance] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const running = useRef(false);
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const restore = () => {
      let valid = false;
      let allowed = false;
      try {
        const raw = localStorage.getItem(KEY);
        const saved = raw ? JSON.parse(raw) : null;
        valid = saved?.version === VERSION && ["necessary-only", "performance"].includes(saved?.mode) &&
          typeof saved?.savedAt === "number" && saved.savedAt <= Date.now() &&
          saved.expiresAt === saved.savedAt + MAX_AGE && saved.expiresAt > Date.now();
        allowed = valid && saved.performance === true;
        if (raw && !valid) localStorage.removeItem(KEY);
      } catch {
        try { localStorage.removeItem(KEY); } catch { /* Storage may be blocked. */ }
      }
      if (running.current && !allowed) { window.location.reload(); return; }
      running.current = allowed;
      setEnabled(allowed);
      setPerformance(allowed);
      setRemember(valid);
      setVisible(!valid);
    };
    restore();
    const sync = (e: StorageEvent) => { if (e.key === KEY || e.key === null) restore(); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  function close() {
    dialog.current?.close();
    opener.current?.focus();
  }
  function open() {
    opener.current = document.activeElement as HTMLElement;
    dialog.current?.showModal();
  }
  function save(persist: boolean, allowPerformance = false) {
    let stored = false;
    try {
      if (persist) {
        const savedAt = Date.now();
        localStorage.setItem(KEY, JSON.stringify({version: VERSION, mode: allowPerformance ? "performance" : "necessary-only", performance: allowPerformance, savedAt, expiresAt: savedAt + MAX_AGE}));
        stored = true;
      } else localStorage.removeItem(KEY);
    } catch { /* Do not make access conditional on browser storage. */ }
    const allowed = stored && allowPerformance;
    const revoked = running.current && !allowed;
    running.current = allowed;
    setEnabled(allowed);
    setPerformance(allowed);
    setRemember(stored);
    setVisible(false);
    setMessage(stored ? (allowed ? "Đã bật đo hiệu năng website." : "Đã ghi nhớ lựa chọn: không đo hiệu năng.") : "Không lưu lựa chọn trên thiết bị. Bạn vẫn có thể sử dụng toàn bộ website.");
    close();
    if (revoked) window.location.reload();
  }

  return <>
    {enabled && <PerformanceInsights />}
    <button type="button" className="cookie-settings-link" onClick={open}>Cài đặt cookie</button>
    {visible && <section className="cookie-banner" aria-labelledby="cookie-title">
      <span className="cookie-emblem"><Icon name="shield" size={24} /></span>
      <div className="cookie-copy">
        <h2 id="cookie-title">An tâm với quyền riêng tư.</h2>
        <p>Website không sử dụng cookie quảng cáo. Bạn có thể bật đo tốc độ tải trang bằng Vercel Speed Insights trong Tùy chỉnh. Mặc định tính năng này tắt; lựa chọn được ghi nhớ trong 180 ngày. <Link href="/chinh-sach-cookie">Tìm hiểu thêm</Link></p>
        <div className="cookie-actions">
          <button type="button" onClick={() => save(false)}>Không ghi nhớ</button>
          <button type="button" onClick={() => save(true)}>Đồng ý & ghi nhớ</button>
          <button type="button" className="cookie-text-button" onClick={open}>Tùy chỉnh</button>
        </div>
      </div>
    </section>}
    <dialog ref={dialog} className="cookie-dialog" aria-labelledby="cookie-settings-title" onClose={() => opener.current?.focus()}>
      <div className="cookie-dialog-heading"><span className="cookie-emblem"><Icon name="shield" size={24} /></span><button type="button" aria-label="Đóng cài đặt cookie" onClick={close}>×</button></div>
      <h2 id="cookie-settings-title">Bạn làm chủ lựa chọn.</h2>
      <p>Việc đóng bảng hoặc tiếp tục lướt web không được xem là đồng ý. Bạn có thể dùng website mà không lưu lựa chọn.</p>
      <label className="cookie-category"><span><strong>Ghi nhớ lựa chọn</strong><small>Lưu trên trình duyệt trong 180 ngày, không gửi về máy chủ.</small></span><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /></label>
      <label className="cookie-category"><span><strong>Đo hiệu năng website</strong><small>Cho phép Vercel nhận chỉ số tốc độ, đường dẫn trang và thông tin kỹ thuật thiết bị. Không gửi nội dung biểu mẫu. Bật mục này sẽ ghi nhớ lựa chọn trong 180 ngày.</small></span><input type="checkbox" checked={performance} onChange={e => setPerformance(e.target.checked)} /></label>
      <p><Link href="/chinh-sach-cookie">Chính sách cookie và lưu trữ trên thiết bị</Link></p>
      <div className="cookie-actions"><button type="button" onClick={() => save(false)}>Xóa lựa chọn đã lưu</button><button type="button" onClick={() => save(remember || performance, performance)}>Lưu lựa chọn</button></div>
    </dialog>
    <p className="cookie-feedback" role="status">{message}</p>
  </>;
}
