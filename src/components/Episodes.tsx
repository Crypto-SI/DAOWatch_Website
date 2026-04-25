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
import { useState, useEffect, useCallback } from 'react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import {
  DEFAULT_EPISODES_PLAYLIST_ID,
  Episode,
  fallbackEpisodes,
  fetchEpisodes,
} from '../lib/youtube';
import { VIDEO_IMAGE_FALLBACK } from '../lib/media';

// Create motion components
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export default function Episodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const episodesPerPage = 3; // Show 3 episodes per page
  
  // Use environment variable for API key - don't hardcode for GitHub
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
  const playlistId = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID || DEFAULT_EPISODES_PLAYLIST_ID;
  
  // Fetch episodes from the YouTube API
  const loadEpisodes = useCallback(async () => {
    setLoading(true);
    
    try {
      const { episodes: fetchedEpisodes, warning } = await fetchEpisodes(apiKey, playlistId);
      setEpisodes(fetchedEpisodes);
      setError(warning || "");
    } catch (err) {
      console.error('Error fetching YouTube playlist:', err);
      setEpisodes(fallbackEpisodes);
      setError("Unable to load episodes from YouTube. Showing sample content instead.");
    } finally {
      setLoading(false);
    }
  }, [apiKey, playlistId]);

  useEffect(() => {
    // Client-side check
    if (typeof window !== 'undefined') {
      setMounted(true);
      loadEpisodes();
    }
  }, [loadEpisodes]);

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

  // Skip rendering until client-side
  if (!mounted) {
    return (
      <Box py={8} bg="gray.50" id="episodes">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Loading Episodes...
          </Heading>
        </Container>
      </Box>
    );
  }

  return (
    <Box 
      py={{ base: 12, md: 20 }}
      position="relative"
      overflow="hidden"
      width="100%"
      bg="#050C1A"
      color="#F8FAFF"
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
            color="#F8FAFF"
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
            color="#E2E8F0"
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
        ) : (
          <>
            {error && (
              <Box textAlign="center" mb={6} color="yellow.300">
                <Text>{error}</Text>
              </Box>
            )}

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
                              fallbackSrc={VIDEO_IMAGE_FALLBACK}
                            />
                          ) : (
                            <Skeleton height="100%" width="100%" />
                          )}
                        </AspectRatio>
                        
                        {/* Play button overlay */}
                        <Button
                          aria-label={`Play ${featuredEpisode.title}`}
                          variant="unstyled"
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
                        >
                          <Box
                            width="80px"
                            height="80px"
                            borderRadius="full"
                            bg="rgba(255, 0, 0, 0.9)"
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
                              aria-hidden="true"
                            />
                          </Box>
                        </Button>
                      </>
                    )}
                  </Box>
                  
                  <Stack p={8} flex="1" justifyContent="center" overflowY="auto" maxHeight={{ base: "none", md: "450px" }}>
                    <Heading as="h4" size="xl" lineHeight="1.2" mb={4}>
                      {featuredEpisode.title}
                    </Heading>
                    
                    <Text fontSize="md" color="#CBD5F5" mb={4}>
                      {new Date(featuredEpisode.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                    
                    <Text 
                      fontSize="lg" 
                      mb={6} 
                      color="#F8FAFF"
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
                      bg="#F56565"
                      color="#0B1221"
                      _hover={{ bg: '#FC8181', color: '#0B1221' }}
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
                    bg="rgba(6, 15, 29, 0.95)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
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
                            fallbackSrc={VIDEO_IMAGE_FALLBACK}
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
                        
                        <Text fontSize="sm" color="#CBD5F5" mb={3}>
                          {new Date(episode.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Text>
                        
                        <Text noOfLines={2} color="#F8FAFF">
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
            bg="#F8FAFF"
            color="#0B1221"
            size="lg"
            rounded="md"
            px={8}
            fontWeight="bold"
            _hover={{
              bg: "#E2E8F0",
              color: "#050C1A"
            }}
            border="1px solid rgba(10, 20, 35, 0.2)"
            boxShadow="lg"
            onClick={() => window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank')}
          >
            View Full Playlist
          </Button>
        </Flex>
      </Container>
    </Box>
  );
} 
