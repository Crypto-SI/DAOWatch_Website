import createImageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

/**
 * Build an optimized image URL from a Sanity image reference.
 * @param source - A Sanity image asset reference
 * @returns A URL builder chain — call `.url()`, `.width()`, `.height()`, etc.
 *
 * @example
 * ```ts
 * urlFor(post.mainImage).width(800).height(400).url()
 * ```
 */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
