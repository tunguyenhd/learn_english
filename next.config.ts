import type { NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const withPwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
});

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/learn_english',
  trailingSlash: true,
  // Disable image optimization (no server needed)
  images: {
    unoptimized: true,
  },
};

export default withPwaConfig(nextConfig);
