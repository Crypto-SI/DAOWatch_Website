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
  Center,
  Spinner
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { fetchPlaylists, Playlist, YOUTUBE_CHANNEL_URL } from '../lib/youtube';
import { VIDEO_IMAGE_FALLBACK } from '../lib/media';

// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Motion components
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionBox = motion.create(Box);

// Use environment variable for API key - don't hardcode for GitHub
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';

export default function Videos() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Only run on the client
    if (typeof window === 'undefined') {
      return;
    }

    setMounted(true);
    
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const { playlists: playlistsData, warning } = await fetchPlaylists(apiKey);
        setPlaylists(playlistsData);
        setError(warning || null);
      } catch (err) {
        console.error('Error fetching playlists:', err);
        setError('Failed to load playlist data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadPlaylists();
  }, []);

  // Skip rendering until client-side
  if (!mounted) {
    return (
      <Box py={8} bg="gray.50" id="videos">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Loading Videos...
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
      color="#F8FAFF"
      width="100%"
    >
      {/* Dynamic animated gradient background - darker variant */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        opacity="0.95"
        bgGradient="linear(to-bl, #000000, #192a56, #000000)"
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
              "radial-gradient(circle at 30% 20%, rgba(61, 121, 251, 0.4) 0%, transparent 50%), " +
              "radial-gradient(circle at 70% 80%, rgba(107, 70, 193, 0.3) 0%, transparent 50%)",
          }
        }}
      />
      
      {/* Floating orbs effect with deeper colors */}
      <Box
        position="absolute"
        bottom="10%"
        right="15%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(61, 121, 251, 0.3) 0%, transparent 70%)"
        filter="blur(50px)"
        opacity={mounted ? "0.5" : "0"}
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
            Learn About DAOs
          </MotionHeading>
          <MotionText 
            fontSize="xl" 
            maxW="2xl" 
            mx="auto" 
            color="#E2E8F0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore our curated playlists to understand how Decentralized Autonomous Organizations work.
          </MotionText>
        </Stack>

        {loading ? (
          <Center py={10}>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mt={10}>
            {playlists.map((playlist, index) => (
              <MotionBox 
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
            <LinkBox 
              borderRadius="lg"
              overflow="hidden"
                  bg="rgba(6, 15, 29, 0.95)"
                  border="1px solid rgba(255, 255, 255, 0.08)"
                  backdropFilter="blur(8px)"
                  boxShadow="lg"
              transition="all 0.3s"
              _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.5)",
              }}
              height="100%"
              display="flex"
              flexDirection="column"
            >
              <Box position="relative" height="0" pb="56.25%">
                    {mounted ? (
                  <Image
                        src={playlist.thumbnail}
                        alt={playlist.title}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    position="absolute"
                    top="0"
                    left="0"
                        fallbackSrc={VIDEO_IMAGE_FALLBACK}
                        onError={(e) => {
                          // If the high-res thumbnail fails, try a lower resolution one
                          const img = e.target as HTMLImageElement;
                          if (img.src.includes('maxresdefault')) {
                            img.src = img.src.replace('maxresdefault', 'hqdefault');
                          }
                        }}
                  />
                ) : (
                  <Skeleton 
                    width="100%" 
                    height="100%" 
                    position="absolute"
                    top="0"
                    left="0"
                  />
                )}
                    
                    {/* Playlist overlay with play icon */}
                    <Box
                      position="absolute"
                      bottom="10px"
                      right="10px"
                      bg="rgba(255, 0, 0, 0.8)"
                      color="white"
                      py={1}
                      px={3}
                      borderRadius="md"
                      fontWeight="bold"
                      fontSize="sm"
                    >
                      Playlist
                    </Box>
              </Box>

                  <Stack p={6} flex="1">
                    <LinkOverlay href={playlist.url} isExternal>
                      <Heading as="h3" size="md" lineHeight="1.3" mb={3} color="#F8FAFF">
                        {playlist.title}
                  </Heading>
                </LinkOverlay>
                    
                    <Text color="#CBD5F5" noOfLines={3}>
                      {playlist.description}
                    </Text>
              </Stack>
            </LinkBox>
              </MotionBox>
          ))}
        </SimpleGrid>
        )}

        {error && (
          <Box textAlign="center" mt={4} mb={8} color="yellow.300">
            <Text>{error}</Text>
          </Box>
        )}

        <Flex justify="center" mt={16}>
          <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            <Button
              colorScheme="red"
              size="lg"
              rounded="md"
              px={8}
            >
              Visit YouTube Channel
            </Button>
          </a>
        </Flex>
      </Container>
    </Box>
  );
} 
