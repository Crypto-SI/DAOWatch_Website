/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { 
    unoptimized: true,
    domains: ['i.ytimg.com', 'yt3.ggpht.com'],
  },
  output: 'export',
  assetPrefix: './',
  trailingSlash: true,
  
  // Add a webpack function to copy static assets
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] }
  },
  webpack: (config, { isServer }) => {
    // Only run this on client builds
    if (!isServer) {
      // Log our Arweave key during build
      console.log('Building with Arweave config:');
      try {
        import('./src/config/arweave-config.mjs').then(arweaveConfig => {
          console.log('YouTube API key:', arweaveConfig.default.YOUTUBE_API_KEY);
        }).catch(e => {
          console.error('Error loading Arweave config:', e);
        });
      } catch (e) {
        console.error('Error loading Arweave config:', e);
      }
    }
    
    return config;
  },
  async headers() {
    const longTermCache = {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    };

    return [
      {
        source: '/fonts/:all*(woff2|woff|ttf|otf|eot)',
        headers: [longTermCache]
      },
      {
        source: '/images/:all*(jpg|jpeg|png|webp|svg)',
        headers: [longTermCache]
      },
      {
        source: '/_next/static/:path*',
        headers: [longTermCache]
      }
    ];
  }
}

module.exports = nextConfig 
