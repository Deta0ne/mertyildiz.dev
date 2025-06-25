import { NextRequest, NextResponse } from 'next/server';
import { getLetterboxdData, type LetterboxdResponse } from '@/lib/letterboxd-service';

export async function GET(request: NextRequest): Promise<NextResponse<LetterboxdResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'Aithra';
    const limit = parseInt(searchParams.get('limit') || '50');
    const forceRefresh = searchParams.get('refresh') === 'true';

    const result = await getLetterboxdData(username, limit, forceRefresh);
    
    if (!result.success) {
      let statusCode = 500;
      if (result.error?.includes('User not found') || result.error?.includes('private')) {
        statusCode = 404;
      } else if (result.error?.includes('timeout')) {
        statusCode = 408;
      } else if (result.error?.includes('Access denied')) {
        statusCode = 403;
      }
      
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(): Promise<NextResponse<{ success: boolean; message: string }>> {
  await getLetterboxdData('Aithra', 1, true);
  return NextResponse.json({
    success: true,
        message: 'Cache cleared successfully',
    });
}