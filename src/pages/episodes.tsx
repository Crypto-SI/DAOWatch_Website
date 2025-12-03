import { Box, Container, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import PageHead from '../components/PageHead';
import Episodes from '../components/Episodes';

export default function EpisodesPage() {
  return (
    <>
      <PageHead
        title="DAO Watch Episodes | Governance Case Studies"
        description="Watch DAO Watch episodes covering decentralized governance best practices, treasury management, and community operations."
        keywords={[
          'DAO podcast',
          'DAO Watch episodes',
          'decentralized governance stories',
          'DAO treasury lessons'
        ]}
      />
      <Layout>
        <Box bg="brand.black" color="white" py={{ base: 16, md: 20 }}>
          <Container maxW="container.xl">
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
              DAO Watch Episodes
            </Heading>
            <Text fontSize="xl" maxW="3xl">
              Browse in-depth discussions with builders, legal minds, and operators stewarding today&apos;s most
              resilient DAOs. Each episode distills governance experiments into templates you can apply immediately.
            </Text>
          </Container>
        </Box>
        <Episodes />
      </Layout>
    </>
  );
}
