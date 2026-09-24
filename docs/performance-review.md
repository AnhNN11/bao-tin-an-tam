# Performance review — 24 September 2026

Production build, local `next start`, Chrome headless, new browser context per viewport, DPR 2, viewport height 900, network idle + 800ms, no scrolling. Body-byte measurements from Resource Timing, not Lighthouse scores or real-user latency guarantees. Identical procedure before/after; Chrome may lazy-load nearby below-fold images.

| Viewport | Initial image bytes before | After | Reduction |
| --- | ---: | ---: | ---: |
| 390px | 460,774 | 319,576 | 30.6% |
| 1440px | 817,328 | 425,736 | 47.9% |

Initial script encoded bytes: 151,181 → 147,366 (2.5% reduction), including the new consent controls, excluding the opt-in Speed Insights SDK/script.

Changes: limit image variants to practical source sizes, add a 512px card candidate and 1024px portrait candidate; correct compact card and editorial image sizes; hero uses quality 75 and still high fetch priority; cap wide-screen hero size to its actual CSS width. Keep original image assets unchanged. Pass only card/select product fields into client components instead of importing complete product copy/FAQs into both client bundles.

Speed Insights v2 is split into a dynamically imported client component, uses the Next integration and only mounts after performance-specific opt-in. Consent v2 invalidates legacy choices without granting measurement. Every beforeSend checks the current choice/expiry, redacts query and hash, and blocks events after withdrawal. Revocation reloads the page to remove the previously loaded third-party runtime. No server-side durable consent registry is implemented; preference evidence remains local.

Validation: lint and production build; production image/request measurements; opt-in script injection, URL redaction and withdrawal browser checks; navigation/filter/contact validation regression checks. Vercel dashboard enablement and deployed Core Web Vitals must be verified on the actual Vercel project after push; no live performance score is claimed.

Sources:
- https://vercel.com/docs/speed-insights/quickstart
- https://vercel.com/docs/speed-insights/privacy-policy
- https://vercel.com/docs/speed-insights/package
