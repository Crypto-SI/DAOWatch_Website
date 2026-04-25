import { BLOG_IMAGE_FALLBACK } from './media';

const MEDIUM_FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cryptosixxx';

interface MediumFeedItem {
  title: string;
  content: string;
  categories: string[];
  pubDate: string;
  author: string;
  link: string;
}

interface MediumFeedResponse {
  items?: MediumFeedItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  link: string;
  tags: string[];
}

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

function extractFirstImage(content: string) {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch?.[1] || BLOG_IMAGE_FALLBACK;
}

function isDaoWatchPost(item: MediumFeedItem) {
  return (
    item.content.includes('#DAOWATCH') ||
    item.categories.some((category) => {
      const normalizedCategory = category.toLowerCase();
      return normalizedCategory === 'daowatch' || normalizedCategory === '#daowatch';
    })
  );
}

function isMediumFeedItem(item: unknown): item is MediumFeedItem {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const candidate = item as Partial<MediumFeedItem>;
  return (
    typeof candidate.title === 'string' &&
    typeof candidate.content === 'string' &&
    Array.isArray(candidate.categories) &&
    candidate.categories.every((category) => typeof category === 'string') &&
    typeof candidate.pubDate === 'string' &&
    typeof candidate.author === 'string' &&
    typeof candidate.link === 'string'
  );
}

function mapMediumItemToBlogPost(item: MediumFeedItem, index: number): BlogPost {
  const plainTextContent = stripHtml(item.content);

  return {
    id: index.toString(),
    title: item.title,
    slug: slugifyTitle(item.title),
    excerpt: `${plainTextContent.substring(0, 150)}...`,
    content: item.content,
    date: item.pubDate,
    author: item.author,
    image: extractFirstImage(item.content),
    link: item.link,
    tags: item.categories.length > 0 ? item.categories : ['DAO'],
  };
}

export async function fetchMediumPosts(limit?: number) {
  const response = await fetch(MEDIUM_FEED_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch Medium posts');
  }

  const data = (await response.json()) as MediumFeedResponse;
  const items = Array.isArray(data.items) ? data.items.filter(isMediumFeedItem) : [];
  const posts = items.filter(isDaoWatchPost).map(mapMediumItemToBlogPost);

  return typeof limit === 'number' ? posts.slice(0, limit) : posts;
}

export async function fetchMediumPostBySlug(slug: string) {
  const posts = await fetchMediumPosts();
  return posts.find((post) => post.slug === slug) || null;
}

