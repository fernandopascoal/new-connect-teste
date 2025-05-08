import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'cdn.pixabay.com', 'dummyimage.com', 'cdn.weblock.global'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'], // Suporte para importar SVG como componentes React
    });
    return config;
  },
};


module.exports = nextConfig;
