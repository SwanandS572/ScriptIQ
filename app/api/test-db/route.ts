import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL!);
    
    // Query to list all tables in the public schema
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;
    
    return NextResponse.json({ 
      success: true, 
      tables: result 
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
