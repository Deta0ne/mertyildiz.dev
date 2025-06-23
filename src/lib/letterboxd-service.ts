import Parser from 'rss-parser';

interface LetterboxdCustomFields {
  'letterboxd:filmTitle'?: string;
  'letterboxd:filmYear'?: string;
  'letterboxd:memberRating'?: string;
  'letterboxd:watchedDate'?: string;
  'letterboxd:rewatch'?: string;
  'tmdb:movieId'?: string;
}

interface LetterboxdRSSItem extends LetterboxdCustomFields {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  guid: string;
  isoDate: string;
}

interface LetterboxdFeed {
  title: string;
  description: string;
  link: string;
  items: LetterboxdRSSItem[];
}

export interface ProcessedFilmLog {
  title: string;
  year: string;
  link: string;
  pubDate: string;
  isoDate: string;
  watchedDate: string | null;
  rating: number;
  review: string;
  posterUrl: string;
  isRewatch: boolean;
  tmdbId: string | null;
}

export interface LetterboxdResponse {
  success: boolean;
  data?: ProcessedFilmLog[];
  feedInfo?: {
    title: string;
    description: string;
    link: string;
    totalItems: number;
  };
  error?: string;
  message?: string;
}

class LetterboxdProcessor {
  private static stripHTML(html: string): string {
    return html
      .replace(/<img[^>]*>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/gi, '') 
      .replace(/\s+/g, ' ')
      .trim();
  }

  private static extractRating(item: LetterboxdRSSItem): number {
    if (item['letterboxd:memberRating']) {
      const rating = parseFloat(item['letterboxd:memberRating']);
      return Math.round(rating);
    }

    const starMatch = item.title?.match(/★+/);
    return starMatch ? starMatch[0].length : 0;
  }

  private static extractPosterUrl(content: string): string {
    const posterPatterns = [
      /src="([^"]*ltrbxd\.com[^"]*(?:0-(?:70|150|230)-0-[^"]*)?\.jpg[^"]*)"/i,
      /src="([^"]*image\.tmdb\.org[^"]*)"/i
    ];

    for (const pattern of posterPatterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return '';
  }

  private static extractReview(item: LetterboxdRSSItem): string {
    if (!item.content) return '';

    const cleanContent = this.stripHTML(item.content);
    
    const reviewText = cleanContent
      .replace(/Watched on .*/gi, '')
      .replace(/★+/g, '')
      .replace(item.title || '', '')
      .trim();

    return reviewText.length > 10 ? reviewText : '';
  }

  static processItem(item: LetterboxdRSSItem): ProcessedFilmLog {
    const filmTitle = item['letterboxd:filmTitle'] || item.title?.replace(/★+/g, '').trim() || '';
    const filmYear = item['letterboxd:filmYear'] || '';
    const watchedDate = item['letterboxd:watchedDate'] || null;
    const isRewatch = item['letterboxd:rewatch'] === 'Yes';
    const tmdbId = item['tmdb:movieId'] || null;
    
    return {
      title: filmTitle,
      year: filmYear,
      link: item.link,
      pubDate: item.pubDate,
      isoDate: item.isoDate,
      watchedDate: watchedDate,
      rating: this.extractRating(item),
      review: this.extractReview(item),
      posterUrl: this.extractPosterUrl(item.content || ''),
      isRewatch: isRewatch,
      tmdbId: tmdbId
    };
  }
}

let cache: { data: ProcessedFilmLog[]; timestamp: number; feedInfo: any } | null = null;
const CACHE_DURATION = 10 * 60 * 1000;

export async function getLetterboxdData(
  username: string = 'Aithra', 
  limit: number = 50,
  forceRefresh: boolean = false
): Promise<LetterboxdResponse> {
  try {
    if (cache && !forceRefresh && Date.now() - cache.timestamp < CACHE_DURATION) {
      return {
        success: true,
        data: cache.data.slice(0, limit),
        feedInfo: {
          ...cache.feedInfo,
          totalItems: cache.data.length
        }
      };
    }

    const parser = new Parser({
      customFields: {
        item: [
          'letterboxd:watchedDate',
          'letterboxd:rewatch',
          'letterboxd:filmTitle',
          'letterboxd:filmYear',
          'letterboxd:memberRating',
          'tmdb:movieId'
        ]
      },
      timeout: 10000,
      maxRedirects: 5
    });

    const rssUrl = `https://letterboxd.com/${username}/rss/`;
    console.log(`Fetching Letterboxd RSS for user: ${username}`);

    const feed = await parser.parseURL(rssUrl) as LetterboxdFeed;

    if (!feed.items || feed.items.length === 0) {
      return {
        success: false,
        error: 'No items found in RSS feed',
        message: 'RSS feed is empty or user has no public activity'
      };
    }

    const filmLogs = feed.items
      .map(item => LetterboxdProcessor.processItem(item))
      .filter(log => log.title.length > 0);

    cache = {
      data: filmLogs,
      timestamp: Date.now(),
      feedInfo: {
        title: feed.title,
        description: feed.description,
        link: feed.link
      }
    };

    const limitedLogs = filmLogs.slice(0, limit);

    return {
      success: true,
      data: limitedLogs,
      feedInfo: {
        title: feed.title,
        description: feed.description,
        link: feed.link,
        totalItems: filmLogs.length
      }
    };

  } catch (error) {
    console.error('Letterboxd RSS fetch error:', error);
    
    let errorMessage = 'RSS feed could not be fetched';

    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        errorMessage = 'Request timeout - Letterboxd might be slow';
      } else if (error.message.includes('404')) {
        errorMessage = 'User not found or RSS feed is private';
      } else if (error.message.includes('403')) {
        errorMessage = 'Access denied - RSS feed might be private';
      }
    }

    return {
      success: false,
      error: errorMessage,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 