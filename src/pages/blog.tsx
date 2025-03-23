import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Tag,
  Flex,
  Spinner,
  Center,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Badge,
  Avatar
} from '@chakra-ui/react';
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Motion components
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionFlex = motion.create(Flex);

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  link: string;
  tags: string[];
}

export default function Blog() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 6;
  
  // Fetch Medium posts with the DAOWATCH tag
  useEffect(() => {
    setIsMounted(true);
    
    const fetchMediumPosts = async () => {
      try {
        setLoading(true);
        // Using the RSS feed approach since Medium doesn't have a public API
        // We're using a CORS proxy to avoid CORS issues
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cryptosixxx');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Medium posts');
        }
        
        const data = await response.json();
        
        // Filter posts that have the DAOWATCH tag/category
        const filteredPosts = data.items
          .filter((item: any) => {
            // Check if the content includes #DAOWATCH
            return item.content.includes('#DAOWATCH') || 
                   item.categories.some((category: string) => 
                     category.toLowerCase() === 'daowatch' || 
                     category.toLowerCase() === '#daowatch'
                   );
          })
          .map((item: any, index: number) => {
            // Extract first image from content or use fallback
            const imgRegex = /<img[^>]+src="([^">]+)"/;
            const imgMatch = item.content.match(imgRegex);
            const image = imgMatch ? imgMatch[1] : '/images/placeholder.jpg';
            
            // Create excerpt by stripping HTML and limiting to 150 chars
            const excerpt = item.content
              .replace(/<[^>]*>?/gm, '')
              .substring(0, 150) + '...';
            
            // Create slug from title
            const slug = item.title.toLowerCase()
              .replace(/[^\w\s]/gi, '')
              .replace(/\s+/g, '-');
            
            return {
              id: index.toString(),
              title: item.title,
              slug: slug,
              image: image,
              excerpt: excerpt,
              date: item.pubDate,
              author: item.author,
              link: item.link,
              tags: item.categories.length > 0 ? item.categories.slice(0, 3) : ['DAO']
            };
          });
        
        setPosts(filteredPosts);
      } catch (err) {
        console.error('Error fetching Medium posts:', err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate visible posts based on current page
  const paginatedPosts = filteredPosts.slice(
    currentPage * postsPerPage, 
    (currentPage * postsPerPage) + postsPerPage
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <Layout>
      <Box 
        position="relative"
        overflow="hidden"
        color="white"
        width="100%"
        minHeight="100vh"
      >
        {/* Dynamic animated gradient background for the entire page */}
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          opacity="0.95"
          bgGradient="linear(to-bl, #000000, #6B46C1, #000000)"
          backgroundSize="200% 200%"
          animation={isMounted ? `${gradientShift} 15s ease infinite` : "none"}
          sx={{
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: 
                "radial-gradient(circle at 30% 20%, rgba(61, 121, 251, 0.4) 0%, transparent 50%), " +
                "radial-gradient(circle at 70% 80%, rgba(107, 70, 193, 0.5) 0%, transparent 50%)",
            }
          }}
          zIndex="-1"
        />
        
        {/* Floating orbs effect */}
        <Box
          position="fixed"
          top="30%"
          right="15%"
          width="300px"
          height="300px"
          borderRadius="full"
          bgGradient="radial(circle at center, rgba(61, 121, 251, 0.4) 0%, transparent 70%)"
          filter="blur(50px)"
          opacity={isMounted ? "0.6" : "0"}
          transition="opacity 1s ease-in-out"
          zIndex="-1"
        />

        {/* Hero section */}
        <Box py={{ base: 12, md: 20 }}>
          <Container maxW="container.xl">
            <VStack spacing={6} align="center" textAlign="center">
              <MotionHeading 
                as="h1" 
                size="2xl"
                fontWeight="bold"
                bgGradient="linear(to-r, white, purple.200)"
                backgroundClip="text"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                DAO Watch Blog
              </MotionHeading>
              <MotionText 
                fontSize={{ base: "lg", md: "xl" }} 
                maxW="2xl" 
                mb={4}
                opacity="0.9"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Latest insights, analysis, and news about the world of Decentralized Autonomous Organizations.
              </MotionText>

              {/* Search bar */}
              <MotionBox 
                w={{ base: "90%", md: "400px" }} 
                mt={4}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="purple.200" />
                  </InputLeftElement>
                  <Input 
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(0); // Reset to first page on search
                    }}
                    bg="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: "whiteAlpha.700" }}
                    _hover={{ bg: "whiteAlpha.300" }}
                    _focus={{ bg: "whiteAlpha.300", borderColor: "purple.300" }}
                    borderColor="whiteAlpha.300"
                    rounded="md"
                  />
                </InputGroup>
              </MotionBox>
            </VStack>
          </Container>
        </Box>

        {/* Blog post content section */}
        <Box py={{ base: 10, md: 16 }}>
          <Container maxW="container.xl">
            {loading ? (
              <Center py={10}>
                <Spinner size="xl" thickness="4px" speed="0.65s" color="purple.500" />
              </Center>
            ) : error ? (
              <Center py={10}>
                <Text color="red.500">{error}</Text>
              </Center>
            ) : filteredPosts.length === 0 ? (
              <Center py={10}>
                <Text color="white">
                  {searchTerm 
                    ? "No posts match your search. Try a different term." 
                    : "No DAOWATCH blog posts found. Check back later!"}
                </Text>
              </Center>
            ) : (
              <>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                  {paginatedPosts.map((post, index) => (
                    <MotionBox
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link href={post.link} target="_blank" rel="noopener noreferrer">
                        <Box 
                          borderRadius="xl" 
                          overflow="hidden" 
                          boxShadow="xl"
                          height="100%"
                          bg="rgba(0, 0, 0, 0.5)"
                          backdropFilter="blur(10px)"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          _hover={{
                            transform: 'translateY(-8px)',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                            borderColor: "whiteAlpha.300"
                          }}
                          transition="all 0.3s"
                          cursor="pointer"
                          display="flex"
                          flexDirection="column"
                        >
                          <Box 
                            height="200px" 
                            position="relative"
                          >
                            <Image
                              src={post.image}
                              alt={post.title}
                              fallbackSrc="/images/placeholder.jpg"
                              objectFit="cover"
                              width="100%"
                              height="100%"
                            />
                            <Box 
                              position="absolute" 
                              top="0" 
                              left="0" 
                              width="100%" 
                              height="100%"
                              bgGradient="linear(to-t, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)"
                            />
                            <Box position="absolute" bottom="3" left="3" right="3">
                              <HStack>
                                {post.tags.map(tag => (
                                  <Badge
                                    key={tag}
                                    px={2}
                                    py={1}
                                    bg="purple.500"
                                    color="white"
                                    rounded="md"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    fontWeight="semibold"
                                    letterSpacing="wider"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </HStack>
                            </Box>
                          </Box>
                          
                          <VStack p={5} align="start" spacing={3} flex="1">
                            <Heading 
                              as="h3" 
                              size="md" 
                              color="white"
                              noOfLines={2}
                            >
                              {post.title}
                            </Heading>
                            
                            <Text 
                              color="whiteAlpha.800"
                              noOfLines={3}
                              fontSize="sm"
                            >
                              {post.excerpt}
                            </Text>
                            
                            <Box mt="auto" pt={3} width="100%">
                              <HStack justify="space-between" width="100%">
                                <HStack>
                                  <Avatar size="xs" name={post.author} />
                                  <Text fontSize="xs" color="whiteAlpha.800">
                                    {post.author}
                                  </Text>
                                </HStack>
                                <Text fontSize="xs" color="whiteAlpha.600">
                                  {formatDate(post.date)}
                                </Text>
                              </HStack>
                            </Box>
                          </VStack>
                        </Box>
                      </Link>
                    </MotionBox>
                  ))}
                </SimpleGrid>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <MotionFlex 
                    justify="center" 
                    mt={10} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <HStack spacing={4}>
                      <IconButton
                        icon={<ChevronLeftIcon />}
                        onClick={handlePrevious}
                        isDisabled={currentPage === 0}
                        aria-label="Previous page"
                        colorScheme="purple"
                        variant="outline"
                        _hover={{
                          bg: "purple.600",
                          color: "white"
                        }}
                      />
                      <Text color="white">
                        Page {currentPage + 1} of {totalPages}
                      </Text>
                      <IconButton
                        icon={<ChevronRightIcon />}
                        onClick={handleNext}
                        isDisabled={currentPage === totalPages - 1}
                        aria-label="Next page"
                        colorScheme="purple"
                        variant="outline"
                        _hover={{
                          bg: "purple.600",
                          color: "white"
                        }}
                      />
                    </HStack>
                  </MotionFlex>
                )}
              </>
            )}
          </Container>
        </Box>
      </Box>
    </Layout>
  );
} 