import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Button,
  Link,
  VStack,
  HStack,
  Icon,
  Divider,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import { FaBook, FaVideo, FaGlobe, FaFileAlt, FaArrowRight } from 'react-icons/fa';
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
const MotionCard = motion.create(Card);

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  type: 'book' | 'video' | 'website' | 'document';
  tags: string[];
}

const resources: Resource[] = [
  {
    id: 1,
    title: "The Ultimate DAO Handbook",
    description: "Our comprehensive guide to understanding, participating in, and building successful DAOs.",
    url: "https://www.amazon.co.uk/Ultimate-DAO-Handbook-Decentralized-Organizations-ebook/dp/B0C3J58TCY",
    type: "book",
    tags: ["beginner", "guide", "comprehensive"]
  },
  {
    id: 2,
    title: "Introduction to DAOs",
    description: "Video explaining the fundamentals of Decentralized Autonomous Organizations.",
    url: "https://www.youtube.com/@smartreach5326",
    type: "video",
    tags: ["beginner", "explainer"]
  },
  {
    id: 3,
    title: "DAO Analytics Platform",
    description: "Track performance and metrics of various DAOs across different blockchain ecosystems.",
    url: "https://deepdao.io/",
    type: "website",
    tags: ["analytics", "metrics"]
  },
  {
    id: 4,
    title: "DAO Governance Models",
    description: "Detailed analysis of different governance structures for DAOs with case studies.",
    url: "https://ethereum.org/en/dao/",
    type: "document",
    tags: ["governance", "advanced"]
  },
  {
    id: 5,
    title: "Web3 & DAOs",
    description: "How DAOs fit into the larger Web3 ecosystem and why they're revolutionizing organizations.",
    url: "https://ethereum.org/en/web3/",
    type: "book",
    tags: ["web3", "ecosystem"]
  },
  {
    id: 6,
    title: "DAO Treasury Management",
    description: "Best practices for managing DAO treasuries and finances for long-term sustainability.",
    url: "https://medium.com/dehive-blog/dao-treasury-management-a44e5e31640d",
    type: "document",
    tags: ["finance", "treasury"]
  }
];

export default function Resources() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'book':
        return FaBook;
      case 'video':
        return FaVideo;
      case 'website':
        return FaGlobe;
      case 'document':
        return FaFileAlt;
      default:
        return FaGlobe;
    }
  };

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'book':
        return "purple.500";
      case 'video':
        return "red.500";
      case 'website':
        return "blue.500";
      case 'document':
        return "green.500";
      default:
        return "gray.500";
    }
  };

  const getTypeBg = (type: Resource['type']) => {
    switch (type) {
      case 'book':
        return "rgba(128, 90, 213, 0.1)";
      case 'video':
        return "rgba(229, 62, 62, 0.1)";
      case 'website':
        return "rgba(66, 153, 225, 0.1)";
      case 'document':
        return "rgba(72, 187, 120, 0.1)";
      default:
        return "rgba(160, 174, 192, 0.1)";
    }
  };

  const staggerDuration = 0.1;

  return (
    <Layout>
      <Box 
        py={{ base: 12, md: 20 }}
        position="relative"
        overflow="hidden"
        color="white"
        width="100%"
      >
        {/* Dynamic animated gradient background */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          opacity="0.95"
          bgGradient="linear(to-bl, #000000, #0d2b4e, #000000)"
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
                "radial-gradient(circle at 30% 20%, rgba(61, 121, 251, 0.3) 0%, transparent 50%), " +
                "radial-gradient(circle at 70% 80%, rgba(107, 70, 193, 0.3) 0%, transparent 50%)",
            }
          }}
        />
        
        {/* Floating orbs effect */}
        <Box
          position="absolute"
          top="40%"
          right="10%"
          width="300px"
          height="300px"
          borderRadius="full"
          bgGradient="radial(circle at center, rgba(61, 121, 251, 0.5) 0%, transparent 70%)"
          filter="blur(50px)"
          opacity={isMounted ? "0.6" : "0"}
          transition="opacity 1s ease-in-out"
        />
        
        <Container maxW="container.xl" position="relative" zIndex="1">
          <VStack spacing={6} mb={10} align="flex-start">
            <MotionHeading 
              as="h1" 
              size="2xl"
              bgGradient="linear(to-r, white, blue.200)"
              backgroundClip="text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              DAO Resources
            </MotionHeading>
            <MotionText 
              fontSize="xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Curated resources to help you learn about and participate in Decentralized Autonomous Organizations.
            </MotionText>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {resources.map((resource, index) => (
              <MotionCard 
                key={resource.id} 
                borderRadius="xl" 
                overflow="hidden" 
                boxShadow="xl"
                bg="rgba(0, 0, 0, 0.5)"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                _hover={{ 
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
                  borderColor: "whiteAlpha.300"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CardHeader 
                  bg={getTypeBg(resource.type)} 
                  p={5}
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.200"
                >
                  <HStack spacing={4}>
                    <Flex
                      align="center"
                      justify="center"
                      bg={getTypeColor(resource.type)}
                      w="40px"
                      h="40px"
                      borderRadius="lg"
                      color="white"
                    >
                      <Icon as={getIcon(resource.type)} boxSize={5} />
                    </Flex>
                    <Heading size="md" color="white">{resource.title}</Heading>
                  </HStack>
                </CardHeader>
                <CardBody p={5}>
                  <Text color="whiteAlpha.900" mb={4}>{resource.description}</Text>
                  <Flex flexWrap="wrap" gap={2}>
                    {resource.tags.map((tag) => (
                      <Box
                        key={tag}
                        as="span"
                        px={3}
                        py={1}
                        bg="whiteAlpha.200"
                        color="whiteAlpha.900"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="medium"
                        letterSpacing="wider"
                        textTransform="uppercase"
                      >
                        {tag}
                      </Box>
                    ))}
                  </Flex>
                </CardBody>
                <CardFooter p={5} pt={2}>
                  <Button
                    as="a"
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    colorScheme="blue"
                    size="md"
                    w="full"
                    rightIcon={<Icon as={FaArrowRight} />}
                    _hover={{
                      bg: "blue.600",
                      color: "white",
                      transform: "translateX(5px)"
                    }}
                  >
                    View Resource
                  </Button>
                </CardFooter>
              </MotionCard>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  );
} 