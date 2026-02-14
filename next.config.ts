import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  serverExternalPackages: ['cloudinary'],
  experimental: {
    turbo: {
      resolveAlias: {
        'cloudinary': 'cloudinary'
      }
    }
  }
};

export default nextConfig;
