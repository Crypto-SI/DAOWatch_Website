import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';

// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export default function BookPromo() {
  const imageSize = useBreakpointValue({ base: "250px", md: "300px", lg: "350px" });
  // Use client-side rendering to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <Box 
      py={{ base: 12, md: 20 }}
      color="white"
      position="relative"
      overflow="hidden"
      width="100%"
    >
      {/* Dynamic animated gradient background - dark blue variant */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        opacity="0.95"
        bgGradient="linear(to-bl, #000000, #1e3a8a, #000000)"
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
              "radial-gradient(circle at 30% 20%, rgba(61, 121, 251, 0.6) 0%, transparent 50%), " +
              "radial-gradient(circle at 80% 80%, rgba(107, 70, 193, 0.4) 0%, transparent 60%)",
          }
        }}
      />
      
      {/* Floating orbs effect */}
      <Box
        position="absolute"
        top="60%"
        right="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(61, 121, 251, 0.5) 0%, transparent 70%)"
        filter="blur(50px)"
        opacity={mounted ? "0.6" : "0"}
        transition="opacity 1s ease-in-out"
      />
      
      <Container maxW="container.xl" position="relative" zIndex="1">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={{ base: 10, md: 0 }}
        >
          <Stack maxW={{ base: "100%", md: "50%" }} spacing={6}>
            <Heading as="h2" size="2xl">
              Master the DAO Ecosystem
            </Heading>
            <Text fontSize="xl">
              Our comprehensive book guides you through every aspect of Decentralized Autonomous Organizations, 
              from technical foundations to governance best practices.
            </Text>
            <Box>
              <Button
                onClick={() => window.open('https://www.amazon.co.uk/Ultimate-DAO-Handbook-Decentralized-Organizations-ebook/dp/B0C3J58TCY', '_blank')}
                size="lg"
                colorScheme="blue"
                rounded="md"
                px={8}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
              >
                Get the Book
              </Button>
            </Box>
          </Stack>
          
          <Box 
            width={imageSize} 
            height={imageSize}
            position="relative"
            transform="rotate(3deg)"
            transition="transform 0.3s ease"
            _hover={{
              transform: "rotate(0deg) scale(1.05)",
            }}
          >
            {mounted ? (
              <Image
                src="/images/book.jpg"
                alt="Cover of The Ultimate DAO Handbook shown on a glowing pedestal"
                fallbackSrc="/images/fallback.svg"
                objectFit="cover"
                boxShadow="dark-lg"
                borderRadius="md"
                width="100%"
                height="100%"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Box 
                width="100%" 
                height="100%" 
                bg="gray.700" 
                borderRadius="md"
                boxShadow="dark-lg"
              />
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
} 
