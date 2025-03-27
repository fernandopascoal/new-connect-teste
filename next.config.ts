import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'cdn.pixabay.com', 'dummyimage.com', 'cdn.weblock.global'],
  },
};

export default nextConfig;
