/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'yt3.ggpht.com' },
    ],
  },
  // Conditional static export: only for Arweave builds
  ...(process.env.BUILD_MODE === 'arweave' ? { output: 'export' } : {}),
  outputFileTracingRoot: __dirname,
  trailingSlash: true,
  
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] }
  },

  transpilePackages: ['sanity'],
}

module.exports = nextConfig 
