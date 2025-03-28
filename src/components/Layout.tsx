import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex 
      direction="column" 
      minH="100vh"
    >
      <Header />
      <Box flex="1" width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
} 