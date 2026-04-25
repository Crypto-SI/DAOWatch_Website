/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    unoptimized: true,
    domains: ['i.ytimg.com', 'yt3.ggpht.com'],
  },
  output: 'export',
  outputFileTracingRoot: __dirname,
  assetPrefix: './',
  trailingSlash: true,
  
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] }
  }
}

module.exports = nextConfig 
