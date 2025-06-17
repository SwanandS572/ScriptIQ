import { NextResponse } from 'next/server';

export async function GET() {
  // Check if the API key is loaded
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  // Return a success response with the first 5 characters of the key (for verification)
  return NextResponse.json({
    success: true,
    keyConfigured: true,
    keyPrefix: apiKey.substring(0, 5) + '...',
    keyLength: apiKey.length
  });
}
