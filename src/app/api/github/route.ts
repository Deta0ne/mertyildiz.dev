import { NextRequest, NextResponse } from 'next/server';
import { getGitHubProfile, fetchGitHubProfile } from '@/lib/github-service';

export const runtime = 'nodejs';
export const revalidate = 600; // 10 minutes

/**
 * GitHub API Route Handler
 * Simple endpoint for GitHub profile data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh') === 'true';

    const data = refresh ? await fetchGitHubProfile() : await getGitHubProfile();

    return NextResponse.json(
      { success: true, data, timestamp: new Date().toISOString() },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800',
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