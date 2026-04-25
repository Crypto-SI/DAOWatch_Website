import { Box, Container } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import LazySection from '../components/LazySection';
import PageHead from '../components/PageHead';
import HomeNarrative from '../components/HomeNarrative';

// Temporarily disable BlogPosts section until the blog is restored.
// const BlogPosts = dynamic(() => import('../components/BlogPosts'), { ssr: false });
const Episodes = dynamic(() => import('../components/Episodes'), { ssr: false });
const Community = dynamic(() => import('../components/Community'), { ssr: false });
const Videos = dynamic(() => import('../components/Videos'), { ssr: false });
const BookPromo = dynamic(() => import('../components/BookPromo'), { ssr: false });

const SectionSkeleton = () => (
  <Box py={{ base: 12, md: 20 }} bg="brand.black">
    <Container maxW="container.xl">
      <Box height="32px" width="220px" mb={6} bg="whiteAlpha.300" borderRadius="md" />
      <Box height="8px" mb={4} bg="whiteAlpha.200" borderRadius="full" />
      <Box height="8px" mb={4} bg="whiteAlpha.200" borderRadius="full" />
      <Box height="8px" mb={4} bg="whiteAlpha.200" borderRadius="full" />
      <Box height="8px" width="70%" bg="whiteAlpha.200" borderRadius="full" />
    </Container>
  </Box>
);

export default function Home() {
  return (
    <>
      <PageHead
        title="DAO Watch | DAO Governance Resources & Media"
        description="DAO Watch curates resources, episodes, and videos that help you learn and participate in decentralized governance."
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DAO Watch',
            url: 'https://daowatch.io',
            sameAs: [
              'https://www.youtube.com/@smartreach5326'
            ],
            logo: 'https://daowatch.io/images/logo.png'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'DAO Watch',
            url: 'https://daowatch.io',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://daowatch.io/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          }
        ]}
        keywords={[
          'DAO Watch',
          'DAO podcasts',
          'DAO governance resources',
          'decentralized governance education',
          'Web3 community building',
          'DAO video series'
        ]}
      />
      <Layout>
        <Hero />
        {/* Blog section removed until the blog feed stabilizes */}
        {/* <LazySection placeholder={<SectionSkeleton title="Latest Reads" />}>
          <BlogPosts />
        </LazySection> */}
        <LazySection placeholder={<SectionSkeleton />}>
          <Episodes />
        </LazySection>
        <LazySection placeholder={<SectionSkeleton />}>
          <Community />
        </LazySection>
        <LazySection placeholder={<SectionSkeleton />}>
          <Videos />
        </LazySection>
        <LazySection placeholder={<SectionSkeleton />}>
          <BookPromo />
        </LazySection>
        <HomeNarrative />
      </Layout>
    </>
  );
} 
