import { Metadata } from 'next';
import { siteConfig } from './site-config';

interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export function createMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title = siteConfig.title,
    description = siteConfig.description,
    keywords = siteConfig.keywords,
    images = [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.title.default }],
    canonicalUrl,
  } = options;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [...siteConfig.authors],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    
    openGraph: {
      title,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images,
      locale: 'tr_TR',
      type: 'website',
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map(img => img.url),
      creator: '@ConstMert', 
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    
    category: 'technology',
    
    other: {
      'google': 'notranslate',
    },
  };

  return metadata;
}

export function createHomeMetadata(): Metadata {
  return createMetadata({
    title: siteConfig.title.default,
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    canonicalUrl: siteConfig.url,
  });
}

export function createGitHubMetadata(): Metadata {
  return createMetadata({
    title: siteConfig.pages.github.title,
    description: siteConfig.pages.github.description,
    keywords: [...siteConfig.keywords, ...siteConfig.pages.github.keywords],
    canonicalUrl: `${siteConfig.url}/github`,
  });
}

export function createLetterboxdMetadata(): Metadata {
  return createMetadata({
    title: siteConfig.pages.letterboxd.title,
    description: siteConfig.pages.letterboxd.description,
    keywords: [...siteConfig.keywords, ...siteConfig.pages.letterboxd.keywords],
    canonicalUrl: `${siteConfig.url}/letterboxd`,
  });
}

export function createStackMetadata(): Metadata {
  return createMetadata({
    title: siteConfig.pages.stack.title,
    description: siteConfig.pages.stack.description,
    keywords: [...siteConfig.keywords, ...siteConfig.pages.stack.keywords],
    canonicalUrl: `${siteConfig.url}/stack`,
  });
} 