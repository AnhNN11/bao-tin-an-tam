"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function PerformanceInsights() {
  return <SpeedInsights beforeSend={(event) => {
    // Check each event, including queued events after withdrawal or expiry.
    try {
      const saved = JSON.parse(localStorage.getItem("btat:privacy:v1") || "null");
      if (saved?.version !== 2 || saved?.performance !== true || saved.expiresAt <= Date.now()) return null;
      const url = new URL(event.url);
      url.search = "";
      url.hash = "";
      return { ...event, url: url.toString() };
    } catch { return null; }
  }} />;
}
