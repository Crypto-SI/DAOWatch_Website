import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Image, 
  Tag, 
  VStack, 
  HStack, 
  Flex,
  Button,
  Divider,
  Center,
  Spinner
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  link: string;
  tags: string[];
}

interface BlogPostProps {
  slug: string;
}

export default function BlogPostPage({ slug }: BlogPostProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Fetch all posts from Medium
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cryptosixxx');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Medium posts');
        }
        
        const data = await response.json();
        
        // Filter to find the specific post that matches the slug
        const allPosts = data.items
          .filter((item: any) => {
            // Check if the content includes #DAOWATCH
            return item.content.includes('#DAOWATCH') || 
                   item.categories.some((category: string) => 
                     category.toLowerCase() === 'daowatch' || 
                     category.toLowerCase() === '#daowatch'
                   );
          })
          .map((item: any, index: number) => {
            // Extract first image from content or use fallback
            const imgRegex = /<img[^>]+src="([^">]+)"/;
            const imgMatch = item.content.match(imgRegex);
            const image = imgMatch ? imgMatch[1] : '/images/placeholder.jpg';
            
            // Create excerpt by stripping HTML and limiting to 150 chars
            const excerpt = item.content
              .replace(/<[^>]*>?/gm, '')
              .substring(0, 150) + '...';
            
            // Create slug from title
            const postSlug = item.title.toLowerCase()
              .replace(/[^\w\s]/gi, '')
              .replace(/\s+/g, '-');
            
            return {
              id: index.toString(),
              title: item.title,
              slug: postSlug,
              excerpt: excerpt,
              content: item.content,
              date: item.pubDate,
              author: item.author,
              image: image,
              link: item.link,
              tags: item.categories.length > 0 ? item.categories : ['DAO']
            };
          });
        
        // Find the post with the matching slug
        const foundPost = allPosts.find((p: BlogPost) => p.slug === slug);
        setPost(foundPost || null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError("Failed to load the blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <Container maxW="container.xl" py={20} textAlign="center">
          <Center py={10}>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Center>
        </Container>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <Container maxW="container.xl" py={20} textAlign="center">
          <Heading mb={6}>Blog Post Not Found</Heading>
          <Text mb={8}>{error || "The blog post you're looking for doesn't exist."}</Text>
          <Button
            leftIcon={<FaArrowLeft />}
            colorScheme="blue"
            onClick={() => router.push('/blog')}
          >
            Back to Blog
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box w="100%">
        <Image 
          src={post.image} 
          alt={post.title}
          w="100%"
          h={{ base: "300px", md: "400px" }}
          objectFit="cover"
          fallbackSrc="/images/placeholder.jpg"
        />
      </Box>
      
      <Container maxW="container.lg" py={10}>
        <Link href="/blog">
          <Button 
            leftIcon={<FaArrowLeft />} 
            variant="ghost" 
            mb={8}
          >
            Back to Blog
          </Button>
        </Link>
        
        <VStack spacing={6} align="flex-start">
          <Heading as="h1" size="2xl">{post.title}</Heading>
          
          <HStack>
            <Text color="gray.600">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text>•</Text>
            <Text color="gray.600">{post.author}</Text>
          </HStack>
          
          <Flex wrap="wrap" gap={2}>
            {post.tags.map((tag, index) => (
              <Tag key={`${index}-${tag}`} colorScheme="blue" size="md">
                {tag}
              </Tag>
            ))}
          </Flex>
          
          <Divider my={6} />
          
          <Box 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
            w="100%"
            sx={{
              'h2': {
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mt: 8,
                mb: 4,
              },
              'h3': {
                fontSize: '1.4rem',
                fontWeight: 'bold',
                mt: 6,
                mb: 3,
              },
              'p': {
                mb: 4,
                lineHeight: 1.8,
              },
              'ul, ol': {
                pl: 6,
                mb: 4,
              },
              'li': {
                mb: 2,
              },
              'strong': {
                fontWeight: 'bold',
              },
              'img': {
                maxWidth: '100%',
                height: 'auto',
                my: 4,
                borderRadius: 'md',
              },
              'a': {
                color: 'blue.500',
                textDecoration: 'none',
                _hover: {
                  textDecoration: 'underline',
                }
              },
              'blockquote': {
                borderLeftWidth: '4px',
                borderLeftColor: 'blue.200',
                pl: 4,
                py: 1,
                my: 4,
                fontStyle: 'italic',
                color: 'gray.700',
              }
            }}
          />

          <Divider my={6} />
          
          <HStack spacing={4}>
            <Link href="/blog">
              <Button variant="outline" colorScheme="blue">
                Back to All Posts
              </Button>
            </Link>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <Button colorScheme="blue">
                Read on Medium
              </Button>
            </a>
          </HStack>
        </VStack>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  
  return {
    props: {
      slug,
    },
  };
}; 