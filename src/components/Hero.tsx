import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack,
  Flex,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        opacity={isMounted ? "0.6" : "0"}
        transition="opacity 1s ease-in-out"
        transform={isMounted ? "translateY(0)" : "translateY(20px)"}
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
        opacity={isMounted ? "0.5" : "0"}
        transition="opacity 1s ease-in-out, transform 1.5s ease-in-out"
        transform={isMounted ? "translateY(0)" : "translateY(30px)"}
      />
      
      <Container maxW="container.xl" position="relative" zIndex="1">
        <VStack spacing={{ base: 6, md: 10 }} align="center" textAlign="center">
          <Box 
            w={{ base: "300px", md: "500px" }} 
            maxW="100%"
            mb={{ base: 4, md: 6 }}
            transform={isMounted ? "translateY(0)" : "translateY(20px)"}
            opacity={isMounted ? 1 : 0}
            transition="transform 0.8s ease-out, opacity 0.8s ease-out"
          >
            <Image
              src="/branding/DAO-Watch-D-scaled.jpg"
              alt="DAO Watch"
              width="100%"
              height="auto"
              objectFit="contain"
            />
          </Box>
          
          <Text 
            fontSize={{ base: "xl", md: "2xl" }} 
            maxW="3xl"
            opacity={isMounted ? "0.9" : "0"}
            transform={isMounted ? "translateY(0)" : "translateY(20px)"}
            transition="transform 0.8s ease-out 0.2s, opacity 0.8s ease-out 0.2s"
          >
            Your comprehensive guide to Decentralized Autonomous Organizations.
            Learn, explore, and participate in the future of collaborative governance.
          </Text>
          
          <Flex 
            direction={{ base: "column", sm: "row" }} 
            gap={4} 
            mt={8}
            w={{ base: "100%", sm: "auto" }}
            opacity={isMounted ? 1 : 0}
            transform={isMounted ? "translateY(0)" : "translateY(20px)"}
            transition="transform 0.8s ease-out 0.4s, opacity 0.8s ease-out 0.4s"
          >
            <Link href="/resources">
              <Button
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
                  opacity: 0.9
                }}
              >
                Explore Resources
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="lg" 
                variant="outline" 
                colorScheme="whiteAlpha" 
                rounded="full" 
                px={8}
                fontWeight="bold"
                _hover={{
                  bg: "whiteAlpha.200",
                }}
              >
                Read Blog
              </Button>
            </Link>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
} 