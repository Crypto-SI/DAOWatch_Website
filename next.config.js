/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    unoptimized: true,
    domains: ['i.ytimg.com', 'yt3.ggpht.com'],
  },
  output: 'export',
  assetPrefix: './',
  trailingSlash: true,
  
  // Add a webpack function to copy static assets
  webpack: (config, { isServer }) => {
    // Only run this on client builds
    if (!isServer) {
      // Log our Arweave key during build
      console.log('Building with Arweave config:');
      try {
        const arweaveConfig = require('./src/config/arweave-config');
        console.log('YouTube API key:', arweaveConfig.YOUTUBE_API_KEY);
      } catch (e) {
        console.error('Error loading Arweave config:', e);
      }
    }
    
    return config;
  }
}

module.exports = nextConfig 