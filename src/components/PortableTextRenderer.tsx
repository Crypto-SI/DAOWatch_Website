import { Box, Image, Text, Link as ChakraLink, Heading, List, ListItem, Divider } from '@chakra-ui/react';
import { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '../sanity/image';

/**
 * Custom Portable Text components that match the DAO Watch Chakra UI theme.
 */
export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <Heading as="h2" size="lg" mt={8} mb={4} color="white">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" size="md" mt={6} mb={3} color="white">
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading as="h4" size="sm" mt={4} mb={2} color="white">
        {children}
      </Heading>
    ),
    normal: ({ children }) => (
      <Text mb={4} lineHeight={1.8} color="whiteAlpha.900" fontSize="md">
        {children}
      </Text>
    ),
    blockquote: ({ children }) => (
      <Box
        borderLeft="4px solid"
        borderLeftColor="purple.400"
        pl={4}
        py={1}
        my={4}
        fontStyle="italic"
        color="whiteAlpha.700"
      >
        {children}
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <List spacing={2} mb={4} pl={6} styleType="disc">
        {children}
      </List>
    ),
    number: ({ children }) => (
      <List spacing={2} mb={4} pl={6} styleType="decimal" as="ol">
        {children}
      </List>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <ListItem color="whiteAlpha.900" lineHeight={1.8}>
        {children}
      </ListItem>
    ),
    number: ({ children }) => (
      <ListItem color="whiteAlpha.900" lineHeight={1.8}>
        {children}
      </ListItem>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <ChakraLink
          href={href}
          color="purple.300"
          textDecoration="underline"
          _hover={{ color: 'purple.200' }}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </ChakraLink>
      );
    },
    strong: ({ children }) => (
      <Text as="strong" fontWeight="bold" color="white">
        {children}
      </Text>
    ),
    em: ({ children }) => (
      <Text as="em" fontStyle="italic">
        {children}
      </Text>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref && !value?.asset?._id) {
        return null;
      }
      const imageUrl = urlFor(value).width(800).fit('max').url();
      return (
        <Box my={6}>
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog image'}
            borderRadius="md"
            maxW="100%"
            h="auto"
          />
          {value.caption && (
            <Text fontSize="sm" color="whiteAlpha.600" mt={2} textAlign="center">
              {value.caption}
            </Text>
          )}
        </Box>
      );
    },
  },
};
