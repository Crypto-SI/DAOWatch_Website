import Head from 'next/head';

interface PageHeadProps {
  title: string;
  description?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = 'DAO Watch';
const DEFAULT_DESCRIPTION =
  'DAO Watch curates trusted DAO resources, episodes, and guides so you can explore decentralized governance with confidence.';

export default function PageHead({ title, description, structuredData }: PageHeadProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const dataArray = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
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
