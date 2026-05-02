import { groq } from 'next-sanity';

/** All posts, ordered by publish date (newest first) */
export const allPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    publishedAt,
    "author": author->name,
    "authorImage": author->image.asset->url,
    "categories": categories[]->title
  }
`;

/** Paginated posts for the blog listing page */
export function paginatedPostsQuery(offset: number, limit: number) {
  return groq`
    *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [${offset}...${offset + limit}] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      publishedAt,
      "author": author->name,
      "authorImage": author->image.asset->url,
      "categories": categories[]->title
    }
  `;
}

/** Total post count for pagination */
export const postCountQuery = groq`
  count(*[_type == "post" && !(_id in path("drafts.**"))])
`;

/** Single post by slug */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    publishedAt,
    "author": author->{
      name,
      "image": image.asset->url,
      "slug": slug.current
    },
    "categories": categories[]->{
      title,
      "slug": slug.current,
      color
    }
  }
`;

/** All post slugs for static path generation */
export const allPostSlugsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] {
    "slug": slug.current
  }
`;

/** Featured posts for the homepage */
export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title
  }
`;

/** Latest posts (fallback if no featured posts) */
export const latestPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    publishedAt,
    "author": author->name,
    "authorImage": author->image.asset->url,
    "categories": categories[]->title
  }
`;
