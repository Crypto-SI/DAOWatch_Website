import { VIDEO_IMAGE_FALLBACK } from './media';

export const DEFAULT_EPISODES_PLAYLIST_ID = 'PLmFN-F-XHywbuA_JAhE5zcTGtUH44VC3w';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@smartreach5326';
export const YOUTUBE_PLAYLIST_IDS = [
  'PLmFN-F-XHywb_fpyMN1ssv6-PswnqnT9b',
  'PLmFN-F-XHywaJ3z1buFymsszBtsWEuXVF',
  'PLmFN-F-XHywYSIC4QUvfpDi4zB-0aKYs8',
];

export interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  publishedAt: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

interface YouTubeThumbnail {
  url: string;
}

interface YouTubeSnippet {
  title: string;
  description?: string;
  publishedAt?: string;
  thumbnails?: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
  };
  resourceId?: {
    videoId?: string;
  };
}

interface YouTubeItem {
  id: string;
  snippet: YouTubeSnippet;
}

interface YouTubeResponse {
  items?: YouTubeItem[];
}

export const fallbackEpisodes: Episode[] = [
  {
    id: '1',
    title: 'Introduction to DAOWatch: Understanding Decentralized Autonomous Organizations',
    description: 'In this inaugural episode, we explore the fundamentals of DAOs and why they matter.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    videoId: 'example1',
    publishedAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'DAO Governance Models: Comparing Different Approaches',
    description: 'We analyze various governance structures in the DAO ecosystem.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    videoId: 'example2',
    publishedAt: '2023-02-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'The Future of DAOs in DeFi',
    description: 'Exploring how DAOs are revolutionizing decentralized finance.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    videoId: 'example3',
    publishedAt: '2023-02-15T00:00:00Z',
  },
  {
    id: '4',
    title: 'DAOs and Legal Frameworks',
    description: 'Understanding the legal challenges and solutions for DAOs.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    videoId: 'example4',
    publishedAt: '2023-03-01T00:00:00Z',
  },
  {
    id: '5',
    title: 'Building Community Through DAOs',
    description: 'How DAOs can foster strong, engaged communities.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    videoId: 'example5',
    publishedAt: '2023-03-15T00:00:00Z',
  },
  {
    id: '6',
    title: 'DAO Treasury Management Best Practices',
    description: 'Expert strategies for managing DAO treasuries effectively.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    videoId: 'example6',
    publishedAt: '2023-04-01T00:00:00Z',
  },
];

export const fallbackPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'DAO Governance Deep Dives',
    description:
      'Explore the intricacies of decentralized governance, voting mechanisms, and how DAOs make decisions in a trustless environment.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    url: `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_IDS[0]}`,
  },
  {
    id: '2',
    title: 'DAO Technical Implementation',
    description:
      'Dive into the technical aspects of DAO development including smart contract architecture, security considerations, and treasury management tools.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    url: `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_IDS[1]}`,
  },
  {
    id: '3',
    title: 'DAO Treasury & Token Economics',
    description:
      'Understanding the financial fundamentals of DAOs - from treasury diversification and token models to economic incentives for long-term sustainability.',
    thumbnail: VIDEO_IMAGE_FALLBACK,
    url: `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_IDS[2]}`,
  },
];

function getBestThumbnail(snippet: YouTubeSnippet) {
  return snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || VIDEO_IMAGE_FALLBACK;
}

function isYouTubeItem(item: unknown): item is YouTubeItem {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const candidate = item as Partial<YouTubeItem>;
  return typeof candidate.id === 'string' && Boolean(candidate.snippet);
}

export async function fetchEpisodes(apiKey: string, playlistId: string, maxResults = 12) {
  if (!apiKey) {
    return {
      episodes: fallbackEpisodes,
      warning: 'YouTube API key not configured. Showing sample content.',
    };
  }

  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch episodes');
  }

  const data = (await response.json()) as YouTubeResponse;
  const items = Array.isArray(data.items) ? data.items.filter(isYouTubeItem) : [];

  return {
    episodes: items.map((item) => {
      const { snippet } = item;

      return {
        id: item.id,
        title: snippet.title,
        description: snippet.description || '',
        thumbnail: getBestThumbnail(snippet),
        videoId: snippet.resourceId?.videoId || '',
        publishedAt: snippet.publishedAt || '',
      };
    }),
  };
}

async function fetchPlaylistDetails(apiKey: string, playlistId: string): Promise<Playlist> {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch playlist data for ${playlistId}`);
  }

  const data = (await response.json()) as YouTubeResponse;
  const playlist = data.items?.find(isYouTubeItem);

  if (!playlist) {
    throw new Error(`No playlist found with ID: ${playlistId}`);
  }

  const playlistItemsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlistId}&key=${apiKey}`
  );

  if (!playlistItemsResponse.ok) {
    throw new Error(`Failed to fetch playlist items for ${playlistId}`);
  }

  const playlistItemsData = (await playlistItemsResponse.json()) as YouTubeResponse;
  const firstVideoId = playlistItemsData.items?.find(isYouTubeItem)?.snippet.resourceId?.videoId;

  return {
    id: playlist.id,
    title: playlist.snippet.title,
    description: playlist.snippet.description || 'Explore our curated playlist of DAO-related content.',
    thumbnail: firstVideoId ? `https://i.ytimg.com/vi/${firstVideoId}/maxresdefault.jpg` : VIDEO_IMAGE_FALLBACK,
    url: `https://www.youtube.com/playlist?list=${playlistId}`,
  };
}

export async function fetchPlaylists(apiKey: string, playlistIds = YOUTUBE_PLAYLIST_IDS) {
  if (!apiKey) {
    return {
      playlists: fallbackPlaylists,
      warning: 'YouTube API key not configured. Showing placeholder content.',
    };
  }

  const playlists = await Promise.all(
    playlistIds.map(async (playlistId) => {
      try {
        return await fetchPlaylistDetails(apiKey, playlistId);
      } catch (error) {
        console.error(`Error fetching playlist details for ${playlistId}:`, error);
        return {
          id: playlistId,
          title: 'DAO Watch Playlist',
          description: 'Failed to load playlist details. Please visit our YouTube channel directly.',
          thumbnail: VIDEO_IMAGE_FALLBACK,
          url: `https://www.youtube.com/playlist?list=${playlistId}`,
        };
      }
    })
  );

  return { playlists };
}

