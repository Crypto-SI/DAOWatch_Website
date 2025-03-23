import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Container,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  Skeleton,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Define navigation links
const Links = [
  { name: 'Home', href: '/' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
];

// Client-side only rotating logo component
const RotatingLogo = dynamic(() => Promise.resolve(() => {
  // Use the GIF logo from branding folder
  return (
    <Image
      src="./branding/rotatinglogos/GIF-1(Black)-DAO-Watch-logo-version-1-(cryptosi).gif"
      alt="DAO Watch Logo"
      width={40}
      height={40}
      style={{ marginRight: "10px" }}
    />
  );
}), { ssr: false });

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg="brand.black"
      boxShadow="sm"
      py={4}
    >
      <Container maxW="container.xl">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Link href="/">
              <Box 
                w={{ base: "280px", md: "400px" }} 
                h={{ base: "70px", md: "100px" }} 
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {mounted ? (
                  <RotatingLogo />
                ) : (
                  <Skeleton w="100%" h="100%" />
                )}
              </Box>
            </Link>
          </Flex>

          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <Link key={link.name} href={link.href}>
                <Box 
                  px={2}
                  py={1}
                  fontWeight="bold"
                  textTransform="uppercase"
                  position="relative"
                  color="white"
                  _hover={{
                    color: 'brand.blue',
                    textDecoration: 'none',
                  }}
                >
                  {link.name}
                </Box>
              </Link>
            ))}
          </HStack>

          <Flex alignItems="center">
            <Box display={{ base: 'none', md: 'block' }} mr={4}>
              <InputGroup size="sm">
                <Input placeholder="Search for:" borderRadius="md" bg="whiteAlpha.200" color="white" _placeholder={{ color: "whiteAlpha.600" }} />
                <InputRightElement>
                  <SearchIcon color="whiteAlpha.700" />
                </InputRightElement>
              </InputGroup>
            </Box>

            <IconButton
              aria-label="Open Menu"
              display={{ base: 'flex', md: 'none' }}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={isOpen ? onClose : onOpen}
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
            />
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }} mt={4}>
            <Flex as="nav" direction="column" gap={4}>
              {Links.map((link) => (
                <Link key={link.name} href={link.href}>
                  <Box 
                    px={2}
                    py={1}
                    rounded={'md'}
                    color="white"
                    _hover={{
                      textDecoration: 'none',
                      bg: 'whiteAlpha.200',
                    }}
                  >
                    {link.name}
                  </Box>
                </Link>
              ))}
            </Flex>
          </Box>
        )}
      </Container>
    </Box>
  );
} 