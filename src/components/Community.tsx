import { 
  Box, 
  Container, 
  Heading, 
  Flex, 
  Link as ChakraLink,
  SimpleGrid,
  Text,
  Icon
} from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaGlobe, FaInstagram, FaYoutube, FaTelegram, FaLinkedin } from 'react-icons/fa';
import { ReactNode, useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

// Define animation keyframes
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Motion components
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionBox = motion.create(Box);

// Helper function for social links
interface SocialLinkProps {
  icon: ReactNode;
  label: string;
  href: string;
  color?: string;
}

function SocialLink({ icon, label, href, color = "whiteAlpha.200" }: SocialLinkProps) {
  return (
    <ChakraLink 
      href={href} 
      isExternal 
      _hover={{ textDecoration: 'none' }}
      width="100%"
    >
      <Box 
        bg={color}
        p={5} 
        borderRadius="lg"
        transition="all 0.3s"
        _hover={{ 
          bg: 'whiteAlpha.300', 
          transform: 'translateY(-5px)',
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
        textAlign="center"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex justify="center" mb={3}>
          {icon}
        </Flex>
        <Text fontWeight="bold">{label}</Text>
      </Box>
    </ChakraLink>
  );
}

export default function Community() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box 
      py={{ base: 12, md: 20 }}
      color="white" 
      position="relative"
      overflow="hidden"
      width="100%"
    >
      {/* Dynamic animated gradient background - purple variant */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        opacity="0.9"
        bgGradient="linear(to-r, #331c6e, #6B46C1, #4c1d95)"
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
              "radial-gradient(circle at 20% 30%, rgba(61, 121, 251, 0.5) 0%, transparent 40%), " +
              "radial-gradient(circle at 80% 70%, rgba(107, 70, 193, 0.6) 0%, transparent 60%)",
          }
        }}
      />
      
      {/* Floating orbs effect */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(61, 121, 251, 0.4) 0%, transparent 70%)"
        filter="blur(50px)"
        opacity={isMounted ? "0.5" : "0"}
        transition="opacity 1s ease-in-out"
      />
      
      <Container maxW="container.xl" position="relative" zIndex="1">
        <Box textAlign="center" mb={10}>
          <MotionHeading 
            as="h2" 
            size="2xl" 
            mb={6}
            bgGradient="linear(to-r, white, purple.200)"
            backgroundClip="text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Connect With CryptoSI
          </MotionHeading>
          <MotionText 
            fontSize="xl" 
            maxW="2xl" 
            mx="auto" 
            mb={8}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Follow us on social media to stay updated with the latest news, events, and insights from CryptoSI DAO.
          </MotionText>
        </Box>
        
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={6}>
          <MotionBox 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <SocialLink 
              icon={<Icon as={FaTwitter} boxSize={8} color="#1DA1F2" />} 
              label="Twitter (X)" 
              href="https://x.com/Crypto_SI" 
              color="rgba(255, 255, 255, 0.05)"
            />
          </MotionBox>
          
          <MotionBox 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SocialLink 
              icon={<Icon as={FaGithub} boxSize={8} color="white" />} 
              label="GitHub" 
              href="https://github.com/Crypto-SI" 
              color="rgba(255, 255, 255, 0.05)"
            />
          </MotionBox>
          
          <MotionBox 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <SocialLink 
              icon={<Icon as={FaGlobe} boxSize={8} color="#4299E1" />} 
              label="Website" 
              href="https://www.cryptosi.com/" 
              color="rgba(255, 255, 255, 0.05)"
            />
          </MotionBox>
          
          <MotionBox 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <SocialLink 
              icon={<Icon as={FaInstagram} boxSize={8} color="#E1306C" />} 
              label="Instagram" 
              href="https://www.instagram.com/cryptosi.eth/" 
              color="rgba(255, 255, 255, 0.05)"
            />
          </MotionBox>
          
          <MotionBox 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <SocialLink 
              icon={<Icon as={FaYoutube} boxSize={8} color="#FF0000" />} 
              label="YouTube" 
              href="https://www.youtube.com/@smartreach5326" 
              color="rgba(255, 255, 255, 0.05)"
            />
          </MotionBox>
          
          <MotionBox 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <SocialLink 
              icon={<Icon as={FaTelegram} boxSize={8} color="#0088cc" />} 
              label="Telegram" 
              href="https://t.me/cryptosi" 
              color="rgba(255, 255, 255, 0.05)"
            />
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
} 