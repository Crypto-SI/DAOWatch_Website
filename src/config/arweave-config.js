// Config specifically for Arweave deployment
const arweaveConfig = {
  // YouTube API key - only available in the Arweave build
  YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
  YOUTUBE_PLAYLIST_ID: process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID || 'PLmFN-F-XHywbuA_JAhE5zcTGtUH44VC3w'
};

// For debugging - log to verify key is loaded during build
console.log('Arweave config loaded with key: [KEY HIDDEN]');

module.exports = arweaveConfig; 