import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * On-demand revalidation webhook for Sanity.
 *
 * Configure this URL in your Sanity project's webhook settings:
 *   https://daowatch.io/api/revalidate
 *
 * Body (sent by Sanity):
 * {
 *   _type: "post" | "author" | "category",
 *   _id: "document-id",
 *   slug: { current: "post-slug" }
 * }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify the webhook secret
  const secret = req.headers['sanity-webhook-secret'];
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const { _type, slug } = req.body;

    if (_type === 'post' && slug?.current) {
      // Revalidate the specific blog post page
      await res.revalidate(`/blog/${slug.current}`);
      console.log(`Revalidated /blog/${slug.current}`);
    }

    // Always revalidate the blog listing page when any content changes
    await res.revalidate('/blog');
    console.log('Revalidated /blog');

    // If it's a post change, also revalidate the homepage (featured posts)
    if (_type === 'post') {
      await res.revalidate('/');
      console.log('Revalidated /');
    }

    return res.status(200).json({ revalidated: true });
  } catch (err) {
    console.error('Revalidation error:', err);
    return res.status(500).json({ message: 'Error revalidating', error: String(err) });
  }
}
