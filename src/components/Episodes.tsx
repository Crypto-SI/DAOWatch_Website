import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  Flex,
  LinkBox,
  LinkOverlay,
  Stack,
  Skeleton,
  AspectRatio,
  Center,
  Spinner,
  HStack,
  IconButton
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

// Create motion components
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionFlex = motion.create(Flex);

// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  publishedAt: string;
}

export default function Episodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const episodesPerPage = 3; // Show 3 episodes per page
  
  // Get YouTube API key and playlist ID from environment variables
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const playlistId = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID || "PLmFN-F-XHywbuA_JAhE5zcTGtUH44VC3w";
  
  useEffect(() => {
    setMounted(true);
    
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        
        // Check if API key is available
        if (!apiKey) {
          throw new Error('YouTube API key not found. Please set NEXT_PUBLIC_YOUTUBE_API_KEY in your environment variables.');
        }
        
        const maxResults = 12; // Fetch up to 12 episodes but display fewer
        
        // Proxy the request through a CORS proxy if needed
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch episodes');
        }
        
        const data = await response.json();
        
        // Transform the data into our Episode interface
        const fetchedEpisodes = data.items.map((item: any) => {
          const snippet = item.snippet;
          return {
            id: item.id,
            title: snippet.title,
            description: snippet.description,
            thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
            videoId: snippet.resourceId.videoId,
            publishedAt: snippet.publishedAt
          };
        });
        
        setEpisodes(fetchedEpisodes);
      } catch (err) {
        console.error('Error fetching YouTube playlist:', err);
        
        // For demo purposes, create some fallback episodes if API fails
        const fallbackEpisodes = [
          {
            id: "1",
            title: "Introduction to DAOWatch: Understanding Decentralized Autonomous Organizations",
            description: "In this inaugural episode, we explore the fundamentals of DAOs and why they matter.",
            thumbnail: "/images/video-placeholder.jpg",
            videoId: "example1",
            publishedAt: "2023-01-15T00:00:00Z"
          },
          {
            id: "2",
            title: "DAO Governance Models: Comparing Different Approaches",
            description: "We analyze various governance structures in the DAO ecosystem.",
            thumbnail: "/images/video-placeholder.jpg",
            videoId: "example2",
            publishedAt: "2023-02-01T00:00:00Z"
          },
          {
            id: "3",
            title: "The Future of DAOs in DeFi",
            description: "Exploring how DAOs are revolutionizing decentralized finance.",
            thumbnail: "/images/video-placeholder.jpg",
            videoId: "example3",
            publishedAt: "2023-02-15T00:00:00Z"
          },
          {
            id: "4",
            title: "DAOs and Legal Frameworks",
            description: "Understanding the legal challenges and solutions for DAOs.",
            thumbnail: "/images/video-placeholder.jpg",
            videoId: "example4",
            publishedAt: "2023-03-01T00:00:00Z"
          },
          {
            id: "5",
            title: "Building Community Through DAOs",
            description: "How DAOs can foster strong, engaged communities.",
            thumbnail: "/images/video-placeholder.jpg",
            videoId: "example5",
            publishedAt: "2023-03-15T00:00:00Z"
          },
          {
            id: "6",
            title: "DAO Treasury Management Best Practices",
            description: "Expert strategies for managing DAO treasuries effectively.",
            thumbnail: "/images/video-placeholder.jpg",
            videoId: "example6",
            publishedAt: "2023-04-01T00:00:00Z"
          }
        ];
        
        setEpisodes(fallbackEpisodes);
        setError("Unable to load episodes from YouTube. Showing sample content instead.");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil((episodes.length - 1) / episodesPerPage));

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  // Get featured episode (most recent) and remaining episodes
  const featuredEpisode = episodes.length > 0 ? episodes[0] : null;
  
  // Get current page episodes (excluding the featured one)
  const currentEpisodes = episodes.length > 1 
    ? episodes
        .slice(1) // Skip the featured episode
        .slice(
          currentPage * episodesPerPage,
          (currentPage * episodesPerPage) + episodesPerPage
        )
    : [];

  return (
    <Box 
      py={{ base: 12, md: 20 }}
      position="relative"
      overflow="hidden"
      width="100%"
      bg="#010B19" // Darker blue base
      color="white"
    >
      {/* Dynamic animated gradient background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        opacity="0.2"
        bgGradient="linear(to-tr, #001F3F, #000000, #1a365d)"
        backgroundSize="200% 200%"
        animation={mounted ? `${gradientShift} 15s ease infinite` : "none"}
        sx={{
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: 
              "radial-gradient(circle at 30% 20%, rgba(61, 121, 251, 0.5) 0%, transparent 40%), " +
              "radial-gradient(circle at 70% 80%, rgba(107, 70, 193, 0.3) 0%, transparent 50%)",
          }
        }}
      />
      
      {/* Floating orbs effect */}
      <Box
        position="absolute"
        top="15%"
        right="10%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(61, 121, 251, 0.4) 0%, transparent 70%)"
        filter="blur(50px)"
        opacity={mounted ? "0.5" : "0"}
        transition="opacity 1s ease-in-out"
      />
      
      <Box
        position="absolute"
        bottom="10%"
        left="5%"
        width="250px"
        height="250px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(107, 70, 193, 0.4) 0%, transparent 70%)"
        filter="blur(40px)"
        opacity={mounted ? "0.4" : "0"}
        transition="opacity 1s ease-in-out"
      />
      
      <Container maxW="container.xl" position="relative" zIndex="1">
        <Stack spacing={4} mb={12} textAlign="center">
          <MotionHeading 
            as="h2" 
            size="2xl"
            bgGradient="linear(to-r, brand.blue, white)"
            backgroundClip="text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Past Episodes
          </MotionHeading>
          <MotionText 
            fontSize="xl" 
            maxW="2xl" 
            mx="auto"
            opacity="0.9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Catch up on our previous deep dives into the world of DAOs and decentralized governance
          </MotionText>
        </Stack>

        {loading ? (
          <Center py={10}>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Center>
        ) : error ? (
          <Box textAlign="center" mb={6} color="yellow.300">
            <Text>{error}</Text>
          </Box>
        ) : (
          <>
            {/* Featured Episode - Larger and prominent */}
            {featuredEpisode && (
              <MotionBox
                mb={16}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Stack spacing={2} mb={6} textAlign="center">
                  <Heading as="h3" size="lg">
                    Latest Episode
                  </Heading>
                  <Text 
                    fontSize="xl" 
                    fontWeight="medium"
                    color="whiteAlpha.900"
                  >
                    {featuredEpisode.title}
                  </Text>
                </Stack>
                <Flex 
                  direction={{ base: "column", md: "row" }}
                  bg="blackAlpha.600"
                  backdropFilter="blur(8px)"
                  boxShadow="xl"
                  borderRadius="lg"
                  overflow="hidden"
                  height={{ base: "auto", md: "450px" }}
                >
                  <Box 
                    width={{ base: "100%", md: "60%" }}
                    height={{ base: "300px", md: "100%" }}
                    position="relative"
                  >
                    {isPlaying ? (
                      <AspectRatio ratio={16/9} height="100%">
                        <iframe
                          title={featuredEpisode.title}
                          src={`https://www.youtube.com/embed/${featuredEpisode.videoId}?autoplay=1`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </AspectRatio>
                    ) : (
                      <>
                        <AspectRatio ratio={16/9} height="100%">
                          {mounted ? (
                            <Image
                              src={featuredEpisode.thumbnail}
                              alt={featuredEpisode.title}
                              objectFit="cover"
                              width="100%"
                              height="100%"
                              fallbackSrc="/images/video-placeholder.jpg"
                            />
                          ) : (
                            <Skeleton height="100%" width="100%" />
                          )}
                        </AspectRatio>
                        
                        {/* Play button overlay */}
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          width="100%"
                          height="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          bg="blackAlpha.300"
                          transition="all 0.3s"
                          _hover={{ bg: "blackAlpha.500" }}
                          onClick={() => setIsPlaying(true)}
                          cursor="pointer"
                        >
                          <Box
                            width="80px"
                            height="80px"
                            borderRadius="full"
                            bg="rgba(255, 0, 0, 0.8)"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            boxShadow="lg"
                          >
                            <Box
                              borderLeft="30px solid white"
                              borderTop="15px solid transparent"
                              borderBottom="15px solid transparent"
                              ml={2}
                            />
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                  
                  <Stack p={8} flex="1" justifyContent="center" overflowY="auto" maxHeight={{ base: "none", md: "450px" }}>
                    <Heading as="h4" size="xl" lineHeight="1.2" mb={4}>
                      {featuredEpisode.title}
                    </Heading>
                    
                    <Text fontSize="md" color="whiteAlpha.700" mb={4}>
                      {new Date(featuredEpisode.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                    
                    <Text 
                      fontSize="lg" 
                      mb={6} 
                      color="whiteAlpha.900"
                      whiteSpace="pre-line"
                      css={{
                        '&': {
                          lineHeight: '1.6',
                        },
                        'p': {
                          marginBottom: '1rem',
                        }
                      }}
                    >
                      {featuredEpisode.description
                        .replace(/\\n/g, '\n')
                        .replace(/\n\n/g, '\n')
                        .replace(/\r\n/g, '\n')}
                    </Text>
                    
                    <Button
                      colorScheme="red"
                      size="lg"
                      width="fit-content"
                      onClick={() => {
                        if (!isPlaying) {
                          setIsPlaying(true);
                        } else {
                          window.open(`https://www.youtube.com/watch?v=${featuredEpisode.videoId}`, '_blank');
                        }
                      }}
                    >
                      {isPlaying ? 'Watch on YouTube' : 'Watch Now'}
                    </Button>
                  </Stack>
                </Flex>
              </MotionBox>
            )}

            {/* Other Episodes - Grid layout */}
            <Box mt={10}>
              <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Heading as="h3" size="lg">
                  More Episodes
                </Heading>
                
                {/* Pagination Controls */}
                {episodes.length > 4 && (
                  <HStack spacing={4}>
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
                )}
              </Flex>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {currentEpisodes.map((episode) => (
                  <MotionBox
                    key={episode.id}
                    borderRadius="lg"
                    overflow="hidden"
                    bg="blackAlpha.600"
                    backdropFilter="blur(8px)"
                    boxShadow="lg"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.5)",
                      transition: { duration: 0.3 } 
                    }}
                  >
                    <LinkBox height="100%">
                      <AspectRatio ratio={16/9}>
                        {mounted ? (
                          <Image
                            src={episode.thumbnail}
                            alt={episode.title}
                            objectFit="cover"
                            fallbackSrc="/images/video-placeholder.jpg"
                          />
                        ) : (
                          <Skeleton height="100%" width="100%" />
                        )}
                      </AspectRatio>
                      
                      <Stack p={5} flex="1">
                        <LinkOverlay href={`https://www.youtube.com/watch?v=${episode.videoId}`} isExternal>
                          <Heading as="h3" size="md" lineHeight="1.3" mb={2}>
                            {episode.title}
                          </Heading>
                        </LinkOverlay>
                        
                        <Text fontSize="sm" color="whiteAlpha.700" mb={3}>
                          {new Date(episode.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Text>
                        
                        <Text noOfLines={2} color="whiteAlpha.900">
                          {episode.description}
                        </Text>
                      </Stack>
                    </LinkBox>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </Box>
          </>
        )}

        <Flex justify="center" mt={16}>
          <Button
            colorScheme="red"
            size="lg"
            rounded="md"
            px={8}
            onClick={() => window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank')}
          >
            View Full Playlist
          </Button>
        </Flex>
      </Container>
    </Box>
  );
} 