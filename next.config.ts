import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep fewer compiled pages in memory during dev to reduce cache corruption.
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  webpack: (config, { dev }) => {
    if (dev && process.platform === "win32") {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/.next/**", "**/node_modules/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
