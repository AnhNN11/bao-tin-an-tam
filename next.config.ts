import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 85],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
    // Originals top out at 1536px: avoid requesting oversized 3840px variants.
    deviceSizes: [640, 750, 828, 1024, 1080, 1200, 1536, 1920],
  },
};

export default nextConfig;
