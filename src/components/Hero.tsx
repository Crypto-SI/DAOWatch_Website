import { 
  Box, 
  Container, 
  Heading,
  Text, 
  Button, 
  VStack,
  Flex
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import NextLink from 'next/link';

// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export default function Hero() {
  return (
    <Box 
      bg="brand.black" 
      color="white" 
      py={{ base: 16, md: 28 }}
      position="relative"
      overflow="hidden"
      width="100%"
    >
      {/* Dynamic animated gradient background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        opacity="0.15"
        bgGradient="linear(to-br, #3d79fb, #000000, #3d79fb)"
        backgroundSize="200% 200%"
        animation={`${gradientShift} 15s ease infinite`}
        sx={{
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: 
              "radial-gradient(circle at 20% 30%, rgba(61, 121, 251, 0.7) 0%, transparent 30%), " +
              "radial-gradient(circle at 80% 70%, rgba(107, 70, 193, 0.5) 0%, transparent 40%)",
          }
        }}
      />
      
      {/* Floating orbs effect */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(61, 121, 251, 0.4) 0%, transparent 70%)"
        filter="blur(40px)"
        opacity="0.6"
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
        opacity="0.5"
      />
      
      <Container maxW="container.xl" position="relative" zIndex="1">
        <VStack spacing={{ base: 6, md: 10 }} align="center" textAlign="center">
          <Box 
            w={{ base: "300px", md: "500px" }} 
            maxW="100%"
            mb={{ base: 4, md: 6 }}
          >
            <picture>
              <source
                srcSet="/images/hero-1000.webp"
                media="(min-width: 768px)"
                type="image/webp"
              />
              <source
                srcSet="/images/hero-500.webp"
                type="image/webp"
              />
              <source
                srcSet="/images/hero-1000.jpg"
                media="(min-width: 768px)"
                type="image/jpeg"
              />
              <img
                src="/images/hero-500.jpg"
                alt="Collage of DAO Watch interviews, governance dashboards, and community workshops"
                width={500}
                height={295}
                loading="eager"
                fetchPriority="high"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '1.5rem',
                }}
              />
            </picture>
          </Box>
          
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            maxW="4xl"
            lineHeight="1.2"
            letterSpacing="tight"
          >
            Navigate the DAO universe with trustable research, tutorials, and stories.
          </Heading>

          <Text 
            fontSize={{ base: "xl", md: "2xl" }} 
            maxW="3xl"
            opacity="0.95"
          >
            Your comprehensive guide to Decentralized Autonomous Organizations.
            Learn, explore, and participate in the future of collaborative governance.
          </Text>
          
          <Flex 
            direction={{ base: "column", sm: "row" }} 
            gap={4} 
            mt={8}
            w={{ base: "100%", sm: "auto" }}
          >
            <Button
              as={NextLink}
              href="/resources"
              size="lg"
              rounded="full"
              px={8}
              fontWeight="bold"
              boxShadow="lg"
              bgGradient="linear(to-r, #3d79fb, #6b46c1)"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
                bgGradient: "linear(to-r, #3d79fb, #6b46c1)",
                opacity: 0.9,
                textDecoration: "none"
              }}
            >
              Explore DAO Governance Resources
            </Button>
            <Button
              as={NextLink}
              href="/blog"
              size="lg"
              variant="outline"
              colorScheme="whiteAlpha"
              rounded="full"
              px={8}
              fontWeight="bold"
              _hover={{
                bg: "whiteAlpha.200",
                textDecoration: "none"
              }}
            >
              Read the DAO Watch Blog
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
} 
