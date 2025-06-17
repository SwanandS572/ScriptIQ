import { NextResponse } from 'next/server';
import { chatSession } from '@/utils/AiModal';

export async function POST() {
  try {
    const testPrompt = 'Write a short test paragraph about AI';
    const result = await chatSession(testPrompt);
    
    return NextResponse.json({
      success: true,
      result: result || 'No result returned',
      resultLength: result?.length || 0
    });
  } catch (error) {
    console.error('AI Test Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
