import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Link as ChakraLink
} from '@chakra-ui/react';
import NextLink from 'next/link';

const descriptiveLinks = [
  {
    href: '/resources',
    text: 'DAO governance resource library'
  },
  {
    href: '/episodes',
    text: 'long-form DAO Watch episodes'
  },
  {
    href: '/videos',
    text: 'bite-sized video debriefs'
  }
];

export default function HomeNarrative() {
  return (
    <Box bg="brand.gray.900" color="white" py={{ base: 10, md: 16 }}>
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" mb={6}>
          Why DAO Watch Matters for Decentralized Operators
        </Heading>
        <Stack spacing={6} fontSize="lg" lineHeight="tall">
          <Text>
            DAO Watch exists to translate decentralized governance experiments into practical guidance. 
            We continually analyze councils, token-voting experiments, and multisig leadership models so builders 
            can make confident choices about their own treasuries and communities. By pairing narrative explainers 
            with live benchmarking data, the site paints a truthful picture of how DAOs actually work in production.
            Our researchers interview facilitation teams, synthesize transcripts, and publish actionable checklists 
            that help communities avoid governance deadlocks.
          </Text>
          <Text>
            Every week we review proposals from major networks and highlight the strategies that lead to higher 
            contributor participation or faster incident response. Those insights flow into our{' '}
            <ChakraLink as={NextLink} href="/resources" textDecoration="underline" color="brand.blue">
              DAO governance resource library
            </ChakraLink>{' '}
            so new contributors can quickly upskill. We also summarize critical protocol votes inside{' '}
            <ChakraLink as={NextLink} href="/episodes" textDecoration="underline" color="brand.blue">
              long-form DAO Watch episodes
            </ChakraLink>{' '}
            that double as case studies for your next governance sprint. Each episode closes with a readiness rubric 
            you can adapt before presenting proposals to your stakeholders.
          </Text>
          <Text>
            For teams that prefer video or async recaps, the{' '}
            <ChakraLink as={NextLink} href="/videos" textDecoration="underline" color="brand.blue">
              bite-sized video debriefs
            </ChakraLink>{' '}
            deliver concise takeaways you can share with leadership or community members. We intentionally 
            annotate each clip with actionable recommendations—whether that&apos;s implementing quorum windows, 
            tightening treasury controls, or launching contributor onboarding cohorts. No matter how you learn, 
            DAO Watch keeps you aligned with the most resilient governance playbooks. Whether you run a small guild 
            or advise a nine-figure protocol, these summaries give you a constructive starting point for improving DAO health.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: descriptiveLinks.length }} spacing={6} mt={10}>
          {descriptiveLinks.map(({ href, text }) => (
            <Box
              key={href}
              borderWidth="1px"
              borderColor="whiteAlpha.400"
              borderRadius="md"
              p={6}
              transition="transform 0.2s ease, border-color 0.2s ease"
              _hover={{ transform: 'translateY(-4px)', borderColor: 'brand.blue' }}
            >
              <Heading as="h3" size="md" mb={2}>
                {text}
              </Heading>
              <Text>
                Visit our{' '}
                <ChakraLink as={NextLink} href={href} color="brand.blue" fontWeight="bold">
                  {text}
                </ChakraLink>{' '}
                to explore curated media, partner spotlights, and actionable checklists tailored for DAO operators.
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
