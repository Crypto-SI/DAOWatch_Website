import { Box, Container, SimpleGrid, Heading, Text, Button, VStack, Divider } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import BlogPosts from '../components/BlogPosts';
import Videos from '../components/Videos';
import BookPromo from '../components/BookPromo';
import Community from '../components/Community';
import Episodes from '../components/Episodes';

// Define animation keyframes
const gradientPulse = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.4; }
  100% { opacity: 0.2; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Layout>
      <Hero />
      <BlogPosts />
      <Episodes />
      <Community />
      <Videos />
      <BookPromo />
    </Layout>
  );
} 