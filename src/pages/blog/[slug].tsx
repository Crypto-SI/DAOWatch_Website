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
import PageHead from '../../components/PageHead';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
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
  fallbackData?: {
    title: string;
    content: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
  }
}

export default function BlogPostPage({ slug, fallbackData }: BlogPostProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // If we have fallback data, use it immediately
    if (fallbackData) {
      setPost({
        id: '0',
        title: fallbackData.title,
        slug: slug,
        excerpt: '',
        content: fallbackData.content,
        date: fallbackData.date,
        author: fallbackData.author,
        image: fallbackData.image,
        link: '',
        tags: fallbackData.tags
      });
      setLoading(false);
      return;
    }

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
  }, [slug, fallbackData]);

  const metaTitle = post?.title || fallbackData?.title || 'Blog Post';
  const metaDescription =
    post?.excerpt ||
    fallbackData?.content?.replace(/<[^>]*>?/gm, '').slice(0, 140) ||
    'DAO Watch article';
  const canonicalUrl = slug ? `https://daowatch.io/blog/${slug}` : 'https://daowatch.io/blog';
  const structuredData = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: metaDescription,
        author: {
          '@type': 'Person',
          name: post.author
        },
        datePublished: post.date,
        image: post.image,
        mainEntityOfPage: canonicalUrl,
        publisher: {
          '@type': 'Organization',
          name: 'DAO Watch',
          logo: {
            '@type': 'ImageObject',
            url: 'https://daowatch.io/images/logo.png'
          }
        }
      }
    : undefined;

  // Show a loading state while client-side fetching is happening
  if (loading) {
    return (
      <>
        <PageHead title={`Loading ${metaTitle}`} description={metaDescription} structuredData={structuredData} />
      <Layout>
        <Container maxW="container.xl" py={20} textAlign="center">
          <Center py={10}>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Center>
        </Container>
      </Layout>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <PageHead title="Blog Post Not Found" description="We couldn't load the requested DAO Watch article." />
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
      </>
    );
  }

  return (
    <>
      <PageHead title={metaTitle} description={metaDescription} structuredData={structuredData} />
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
          
          <Flex justifyContent="space-between" w="100%" mt={8}>
            <Button
              leftIcon={<FaArrowLeft />}
              colorScheme="blue"
              variant="outline"
              onClick={() => router.push('/blog')}
            >
              Back to Blog
            </Button>

            <Button
              as="a"
              href={post.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
            >
              Read on Medium
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Layout>
    </>
  );
}

// Use getStaticPaths to define the paths to pre-render at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Define a few default blog posts that will be pre-rendered
  const fallbackPosts = [
    {
      slug: 'introduction-to-daos',
    },
    {
      slug: 'the-future-of-dao-governance',
    },
    {
      slug: 'dao-treasury-management-best-practices',
    }
  ];

  const paths = fallbackPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    // Set fallback to false for static export
    fallback: false,
  };
};

// Use getStaticProps to fetch data at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Provide fallback data
  const fallbackData = {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    content: '<p>This content is generated statically. Updated content will be loaded client-side if available.</p>',
    date: new Date().toISOString(),
    author: 'DAO Watch Team',
    image: '/images/placeholder.jpg',
    tags: ['DAO', 'Web3'],
  };

  return {
    props: {
      slug,
      fallbackData,
    },
  };
}; 
