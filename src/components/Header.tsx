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
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import Image from 'next/image';

// Define navigation links
const Links = [
  { name: 'Home', href: '/' },
  { name: 'Resources', href: '/resources' },
  { name: 'Episodes', href: '/episodes' },
  { name: 'Videos', href: '/videos' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Link href="/" aria-label="DAO Watch home">
              <Box 
                w={{ base: "280px", md: "400px" }} 
                h={{ base: "70px", md: "100px" }} 
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/images/logo-160.webp"
                  alt="DAO Watch"
                  width={160}
                  height={60}
                  loading="eager"
                  style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
                />
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
                <Input
                  aria-label="Search DAO Watch"
                  placeholder="Search for:"
                  borderRadius="md"
                  bg="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: "whiteAlpha.800" }}
                />
                <InputRightElement>
                  <SearchIcon color="whiteAlpha.900" />
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
