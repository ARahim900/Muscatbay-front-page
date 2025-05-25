/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Experimental features that might help with SSR issues
  experimental: {
    optimizePackageImports: ['recharts']
  },
  // Configure for potential deployment issues
  output: 'standalone',
  // Image optimization
  images: {
    domains: [],
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fix for recharts SSR issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;