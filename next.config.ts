import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/learn_english',
  trailingSlash: true,
  // Disable image optimization (no server needed)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
