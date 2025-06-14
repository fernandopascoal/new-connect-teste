import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
  reactStrictMode: true,
  basePath:
    process.env.NEXT_PUBLIC_BUILD_PATH &&
    process.env.NEXT_PUBLIC_BUILD_PATH != '/'
      ? process.env.NEXT_PUBLIC_BUILD_PATH
      : '',
  images: {
    domains: ['res.cloudinary.com', 'cdn.pixabay.com', 'dummyimage.com', 'cdn.weblock.global'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'], // Suporte para importar SVG como componentes React
      /* include: [
        path.resolve(__dirname, './node_modules/w3block-new-lib/src')
      ], */
    });
    return config;
  },
};


module.exports = nextConfig;
