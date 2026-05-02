import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Tag,
  VStack,
  HStack,
  Flex,
  Button,
  Divider,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import PageHead from '../../components/PageHead';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '../../sanity/client';
import { postBySlugQuery, allPostSlugsQuery } from '../../sanity/queries';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { portableTextComponents } from '../../components/PortableTextRenderer';
import { BLOG_IMAGE_FALLBACK } from '../../lib/media';

interface SanityPostFull {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: PortableTextBlock[] | null;
  mainImage: string | null;
  mainImageAlt: string | null;
  publishedAt: string;
  author: {
    name: string | null;
    image: string | null;
    slug: string | null;
  } | null;
  categories: Array<{
    title: string;
    slug: string;
    color: string | null;
  }> | null;
}

interface BlogPostProps {
  post: SanityPostFull | null;
}

export default function BlogPostPage({ post }: BlogPostProps) {
  const router = useRouter();

  // If the page is a fallback (not yet generated), show loading
  if (router.isFallback) {
    return (
      <>
        <PageHead
          title="Loading... | DAO Watch"
          description="Loading DAO Watch article"
        />
        <Layout>
          <Container maxW="container.xl" py={20} textAlign="center">
            <Text color="white" fontSize="xl">
              Loading...
            </Text>
          </Container>
        </Layout>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <PageHead
          title="DAO Watch Blog | Article Not Found"
          description="We couldn't find the requested DAO Watch article."
        />
        <Layout>
          <Container maxW="container.xl" py={20} textAlign="center">
            <Heading mb={6} color="white">
              Blog Post Not Found
            </Heading>
            <Text mb={8} color="whiteAlpha.800">
              The blog post you're looking for doesn't exist.
            </Text>
            <Button
              leftIcon={<FaArrowLeft />}
              colorScheme="purple"
              onClick={() => router.push('/blog')}
            >
              Back to Blog
            </Button>
          </Container>
        </Layout>
      </>
    );
  }

  const metaTitle = `${post.title} | DAO Watch`;
  const metaDescription =
    post.excerpt || `Read "${post.title}" on DAO Watch`;
  const canonicalUrl = `https://daowatch.org/blog/${post.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: metaDescription,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
        }
      : undefined,
    datePublished: post.publishedAt,
    image: post.mainImage,
    mainEntityOfPage: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'DAO Watch',
      logo: {
        '@type': 'ImageObject',
            url: 'https://daowatch.org/images/logo.png',
      },
    },
  };

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        structuredData={structuredData}
      />
      <Layout>
        <Box w="100%">
          <Image
            src={post.mainImage || BLOG_IMAGE_FALLBACK}
            alt={post.mainImageAlt || post.title}
            w="100%"
            h={{ base: '300px', md: '400px' }}
            objectFit="cover"
            fallbackSrc={BLOG_IMAGE_FALLBACK}
          />
        </Box>

        <Container maxW="container.lg" py={10}>
          <Link href="/blog">
            <Button
              leftIcon={<FaArrowLeft />}
              variant="ghost"
              mb={8}
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              Back to Blog
            </Button>
          </Link>

          <VStack spacing={6} align="flex-start">
            <Heading as="h1" size="2xl" color="white">
              {post.title}
            </Heading>

            <HStack color="whiteAlpha.700">
              <Text>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Text>•</Text>
              <Text>{post.author?.name || 'DAO Watch Team'}</Text>
            </HStack>

            <Flex wrap="wrap" gap={2}>
              {(post.categories || []).map((category) => (
                <Tag
                  key={category.slug}
                  size="md"
                  bg={category.color || 'purple.500'}
                  color="white"
                  borderRadius="md"
                >
                  {category.title}
                </Tag>
              ))}
            </Flex>

            <Divider my={6} borderColor="whiteAlpha.200" />

            {/* Render Portable Text body */}
            {post.body && (
              <Box w="100%" className="blog-content">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </Box>
            )}

            <Divider my={6} borderColor="whiteAlpha.200" />

            <Flex justifyContent="space-between" w="100%" mt={8}>
              <Button
                leftIcon={<FaArrowLeft />}
                colorScheme="purple"
                variant="outline"
                onClick={() => router.push('/blog')}
              >
                Back to Blog
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch<Array<{ slug: string }>>(allPostSlugsQuery);

  const paths = slugs.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true, // Allow new posts to be generated on-demand
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const post = await client.fetch<SanityPostFull | null>(postBySlugQuery, {
    slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};
