import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  webpack: (config: any) => {
    // PDF.js worker configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    
    config.externals = config.externals || [];
    config.externals.push('canvas');
    
    return config;
  },
  
  // Static export for FTP deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
