import Head from 'next/head';
import { useRouter } from 'next/router';

interface PageHeadProps {
  title: string;
  description?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  keywords?: string[] | string;
  robots?: string;
}

const SITE_NAME = 'DAO Watch';
const DEFAULT_DESCRIPTION =
  'DAO Watch curates trusted DAO resources, episodes, and guides so you can explore decentralized governance with confidence.';
const SITE_URL = 'https://dao-watch-website.vercel.app';
const DEFAULT_KEYWORDS = [
  'DAO Watch',
  'decentralized governance',
  'DAO resources',
  'DAO education',
  'Web3 governance',
  'crypto communities'
];

const normalizeTitle = (title?: string) => {
  if (!title) return SITE_NAME;
  const containsSiteName = title.toLowerCase().includes(SITE_NAME.toLowerCase());
  return containsSiteName ? title : `${title} | ${SITE_NAME}`;
};

export default function PageHead({ title, description, structuredData, keywords, robots }: PageHeadProps) {
  const router = useRouter();
  const fullTitle = normalizeTitle(title);
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const dataArray = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : [];
  const canonicalPath = router?.asPath?.split('#')[0]?.split('?')[0] || '/';
  const normalizedPath =
    canonicalPath === '/' ? '/' : `${canonicalPath.replace(/\/$/, '')}/`;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`.replace(/([^:]\/)\/+/g, '$1');
  const keywordList = Array.isArray(keywords)
    ? keywords
    : typeof keywords === 'string'
      ? keywords.split(',').map(keyword => keyword.trim()).filter(Boolean)
      : DEFAULT_KEYWORDS;
  const keywordContent = keywordList.join(', ');
  const robotsValue = robots || 'index,follow';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywordContent} />
      <meta name="robots" content={robotsValue} />
      <meta httpEquiv="X-Robots-Tag" content={robotsValue} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {dataArray.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  );
}
