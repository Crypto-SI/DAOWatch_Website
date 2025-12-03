import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
  Heading,
  Flex,
  Image,
  Icon,
  Divider
} from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading
      as="h4"
      fontWeight="bold"
      fontSize="lg"
      mb={2}
    >
      {children}
    </Heading>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      bg="brand.black"
      color="white"
    >
      <Container as={Stack} maxW="container.xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box 
              w={{ base: "420px", md: "600px" }} 
              h={{ base: "105px", md: "150px" }} 
              mb={2}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              bg="black"
              borderRadius="md"
              p={1}
            >
              <Box boxSize={{ base: "40px", md: "50px" }}>
                <Image
                  src="./branding/rotatinglogos/GIF-1(Black)-DAO-Watch-logo-version-1-(cryptosi).gif"
                  alt="Animated DAO Watch logomark in monochrome palette"
                  objectFit="contain"
                  w="100%"
                  h="100%"
                  fallbackSrc="./images/fallback.svg"
                  loading="lazy"
                  decoding="async"
                />
              </Box>
            </Box>
            <Text fontSize="sm" maxW="300px">
              DAO Watch is your comprehensive guide to Decentralized Autonomous Organizations,
              providing resources, news, and insights on the future of collaborative governance.
            </Text>
            <Stack direction="row" spacing={6}>
              <Link href="https://twitter.com/Crypto_SI" isExternal>
                <Icon as={FaTwitter} w={5} h={5} />
              </Link>
              <Link href="https://github.com/Crypto-SI" isExternal>
                <Icon as={FaGithub} w={5} h={5} />
              </Link>
              <Link href="https://linkedin.com/" isExternal>
                <Icon as={FaLinkedin} w={5} h={5} />
              </Link>
              <Link href="https://discord.gg/" isExternal>
                <Icon as={FaDiscord} w={5} h={5} />
              </Link>
            </Stack>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Navigation</ListHeader>
            <Link href="/">DAO Watch Home</Link>
            <Link href="/resources">Resources Hub</Link>
            <Link href="/episodes">Governance Episodes</Link>
            <Link href="/videos">Video Briefings</Link>
            <Link href="/blog">Insights Blog</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Resources</ListHeader>
            <Link href="/resources">All Resources</Link>
            <Link href="/resources#books">Books</Link>
            <Link href="/resources#videos">Videos</Link>
            <Link href="/resources#tools">Tools</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Legal</ListHeader>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookie Policy</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      
      <Divider borderColor="whiteAlpha.300" />
      
      <Box py={4}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}
          >
            <Text>© {currentYear} DAO Watch. All rights reserved.</Text>
            <Text mt={{ base: 2, md: 0 }}>
              Made with ❤️ for the DAO community
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
} 
