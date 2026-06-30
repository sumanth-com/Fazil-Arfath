import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      { source: "/about", destination: "/" },
      { source: "/experience", destination: "/" },
      { source: "/process", destination: "/" },
      { source: "/services", destination: "/" },
      { source: "/contact", destination: "/" },
    ];
  },
};

export default nextConfig;
