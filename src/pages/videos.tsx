import { Box, Container, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import PageHead from '../components/PageHead';
import Videos from '../components/Videos';

export default function VideosPage() {
  return (
    <>
      <PageHead
        title="DAO Watch Videos | Weekly DAO Briefings"
        description="Stream DAO Watch video briefings that summarize governance proposals, tooling reviews, and contributor onboarding wins."
        keywords={[
          'DAO videos',
          'DAO Watch briefings',
          'web3 governance videos',
          'DAO onboarding explainers'
        ]}
      />
      <Layout>
        <Box bg="brand.black" color="white" py={{ base: 16, md: 20 }}>
          <Container maxW="container.xl">
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
              DAO Watch Videos
            </Heading>
            <Text fontSize="xl" maxW="3xl">
              Dive into short video debriefs that highlight standout proposals, tooling releases, and treasury updates.
              Every briefing comes with takeaways you can relay to stakeholders and community members.
            </Text>
          </Container>
        </Box>
        <Videos />
      </Layout>
    </>
  );
}
