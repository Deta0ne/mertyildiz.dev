import { NextResponse } from 'next/server';
import { getGitHubProfile } from '@/lib/github-service';

export const runtime = 'nodejs';
export const revalidate = 3600; 

/**
 * GitHub API Route Handler
 * Simple endpoint for GitHub profile data
 */
export async function GET() {
  try {
    const data = await getGitHubProfile();

    return NextResponse.json(
      { success: true, data, timestamp: new Date().toISOString() },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
          'Content-Type': 'application/json',
        }
      }
    );
  } catch (error) {
    console.error('GitHub API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      }
    );
  }
} 