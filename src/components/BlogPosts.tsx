import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  Flex,
  Stack,
  Tag,
  IconButton,
  HStack,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';
import { GetStaticProps } from 'next';
import { client } from '../sanity/client';
import { latestPostsQuery } from '../sanity/queries';
import { BLOG_IMAGE_FALLBACK } from '../lib/media';

// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Create motion components
const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionSimpleGrid = motion.create(SimpleGrid);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Card hover animation variants
const cardHoverVariants = {
  hover: {
    y: -8,
    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
    transition: {
      duration: 0.3,
    },
  },
};

interface SanityPostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  mainImage: string | null;
  mainImageAlt: string | null;
  publishedAt: string;
  author: string | null;
  authorImage: string | null;
  categories: string[] | null;
}

interface BlogPostsProps {
  posts?: SanityPostCard[];
}

export default function BlogPosts({ posts = [] }: BlogPostsProps) {
  const [mounted, setMounted] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;

  // Calculate visible posts based on current page
  const visiblePosts = posts.slice(
    currentPage * postsPerPage,
    currentPage * postsPerPage + postsPerPage
  );

  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Box
      py={{ base: 12, md: 20 }}
      position="relative"
      overflow="hidden"
      width="100%"
      bg="brand.black"
      color="white"
    >
      {/* Dynamic animated gradient background - matching hero style */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        opacity="0.15"
        bgGradient="linear(to-br, #3d79fb, #000000, #3d79fb)"
        backgroundSize="200% 200%"
        animation={mounted ? `${gradientShift} 15s ease infinite` : 'none'}
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(61, 121, 251, 0.7) 0%, transparent 30%), ' +
              'radial-gradient(circle at 80% 70%, rgba(107, 70, 193, 0.5) 0%, transparent 40%)',
          },
        }}
      />

      {/* Floating orbs effect - matching hero style */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(61, 121, 251, 0.4) 0%, transparent 70%)"
        filter="blur(40px)"
        opacity={mounted ? '0.6' : '0'}
        transition="opacity 1s ease-in-out"
      />

      <Box
        position="absolute"
        bottom="15%"
        right="10%"
        width="250px"
        height="250px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(107, 70, 193, 0.4) 0%, transparent 70%)"
        filter="blur(30px)"
        opacity={mounted ? '0.5' : '0'}
        transition="opacity 1s ease-in-out"
      />

      <Container maxW="container.xl" position="relative" zIndex="1">
        <MotionStack
          spacing={4}
          mb={12}
          textAlign="center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <MotionHeading
            as="h2"
            size="2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            bgGradient="linear(to-r, brand.blue, white)"
            backgroundClip="text"
          >
            Latest Blog Posts
          </MotionHeading>
          <MotionText
            fontSize="xl"
            maxW="2xl"
            mx="auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            opacity="0.9"
          >
            Stay up to date with the latest developments, insights, and best
            practices in the DAO ecosystem.
          </MotionText>
        </MotionStack>

        {posts.length === 0 ? (
          <Center py={10}>
            <Text>No blog posts found. Check back later!</Text>
          </Center>
        ) : (
          <>
            <MotionSimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={8}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {visiblePosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post._id}>
                  <MotionBox
                    borderRadius="lg"
                    overflow="hidden"
                    bg="whiteAlpha.200"
                    backdropFilter="blur(5px)"
                    boxShadow="md"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    cursor="pointer"
                    variants={itemVariants}
                    whileHover={cardHoverVariants.hover}
                  >
                    <Box position="relative" height="200px" width="100%">
                      {mounted ? (
                        <Image
                          src={post.mainImage || BLOG_IMAGE_FALLBACK}
                          alt={post.mainImageAlt || post.title}
                          objectFit="cover"
                          width="100%"
                          height="100%"
                          fallbackSrc={BLOG_IMAGE_FALLBACK}
                        />
                      ) : (
                        <Box width="100%" height="100%" bg="gray.200" />
                      )}
                    </Box>

                    <Stack p={5} flex="1">
                      <Heading
                        as="h3"
                        size="md"
                        lineHeight="1.3"
                        mb={2}
                        color="white"
                      >
                        {post.title}
                      </Heading>

                      <Text fontSize="sm" color="whiteAlpha.700" mb={1}>
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}{' '}
                        • {post.author || 'DAO Watch Team'}
                      </Text>

                      <Text noOfLines={3} mb={4} color="whiteAlpha.900">
                        {post.excerpt || 'Read more...'}
                      </Text>

                      <Flex wrap="wrap" gap={2} mt="auto">
                        {(post.categories || [])
                          .slice(0, 3)
                          .map((tag, index) => (
                            <MotionBox
                              key={`${post._id}-${index}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Tag colorScheme="blue" size="sm">
                                {tag}
                              </Tag>
                            </MotionBox>
                          ))}
                      </Flex>
                    </Stack>
                  </MotionBox>
                </Link>
              ))}
            </MotionSimpleGrid>

            {/* Slider Navigation */}
            {posts.length > postsPerPage && (
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <HStack justifyContent="center" mt={8} spacing={4}>
                  <IconButton
                    aria-label="Previous page"
                    icon={<ChevronLeftIcon w={6} h={6} />}
                    onClick={handlePrevious}
                    isDisabled={currentPage === 0}
                    variant="ghost"
                    colorScheme="blue"
                    size="lg"
                  />

                  <Text fontWeight="medium">
                    {currentPage + 1} / {totalPages}
                  </Text>

                  <IconButton
                    aria-label="Next page"
                    icon={<ChevronRightIcon w={6} h={6} />}
                    onClick={handleNext}
                    isDisabled={currentPage === totalPages - 1}
                    variant="ghost"
                    colorScheme="blue"
                    size="lg"
                  />
                </HStack>
              </MotionBox>
            )}
          </>
        )}

        <Flex justify="center" mt={12}>
          <Link href="/blog">
            <Button
              colorScheme="blue"
              size="lg"
              rounded="md"
              px={8}
            >
              View All Posts
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}

/**
 * Fetch posts for the homepage BlogPosts section.
 * Used by the index page's getStaticProps.
 */
export async function getBlogPostsForHomepage(): Promise<SanityPostCard[]> {
  return client.fetch<SanityPostCard[]>(latestPostsQuery);
}
