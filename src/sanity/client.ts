import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  console.warn(
    '[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. ' +
    'Create a .env.local file with your Sanity project credentials. ' +
    'See .env.example for reference.'
  );
}

export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2025-04-25',
  useCdn: process.env.NODE_ENV === 'production',
});
