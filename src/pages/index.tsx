import { Box, Container, Skeleton, SkeletonText } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import LazySection from '../components/LazySection';
import PageHead from '../components/PageHead';
import HomeNarrative from '../components/HomeNarrative';

const BlogPosts = dynamic(() => import('../components/BlogPosts'), { ssr: false });
const Episodes = dynamic(() => import('../components/Episodes'), { ssr: false });
const Community = dynamic(() => import('../components/Community'), { ssr: false });
const Videos = dynamic(() => import('../components/Videos'), { ssr: false });
const BookPromo = dynamic(() => import('../components/BookPromo'), { ssr: false });

const SectionSkeleton = ({ title }: { title: string }) => (
  <Box py={{ base: 12, md: 20 }} bg="brand.black">
    <Container maxW="container.xl">
      <Skeleton height="32px" width="220px" mb={6} />
      <SkeletonText noOfLines={4} spacing={4} />
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
        <HomeNarrative />
        <LazySection placeholder={<SectionSkeleton title="Latest Reads" />}>
          <BlogPosts />
        </LazySection>
        <LazySection placeholder={<SectionSkeleton title="Recent Episodes" />}>
          <Episodes />
        </LazySection>
        <LazySection placeholder={<SectionSkeleton title="Community Highlights" />}>
          <Community />
        </LazySection>
        <LazySection placeholder={<SectionSkeleton title="DAO Watch Videos" />}>
          <Videos />
        </LazySection>
        <LazySection placeholder={<SectionSkeleton title="Book Promotion" />}>
          <BookPromo />
        </LazySection>
      </Layout>
    </>
  );
} 
