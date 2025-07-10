import { createClient } from "next-sanity";
import { cache } from "react";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-06-25",
  useCdn: true,
  perspective: 'published',
  stega: {
    enabled: false,
  },
});

export const cachedFetch = cache(async (query: string) => {
  return await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-06-25/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`,
    {
      cache: 'force-cache',
      next: { 
        tags: ['sanity'] 
      }
    }
  ).then(res => res.json());
});

const originalFetch = client.fetch.bind(client);
client.fetch = cache(originalFetch);