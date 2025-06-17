import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/utils/db';
import { aiOutput } from '@/utils/schema';
import { eq, sql, desc } from 'drizzle-orm';

function wordCount(text: string) {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

export async function GET(req: NextRequest) {
  console.log('History API called');
  try {
    const authData = await auth();
    const userId = authData.userId;
    
    console.log('Auth data:', { userId, hasUserId: !!userId });
    
    if (!userId) {
      console.log('Unauthorized access attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      console.log('Fetching history for user:', userId);
      
      // First check if we can connect to the database
      try {
        console.log('Database connection test - attempting to query aiOutput table...');
        
        // Safely log table information
        console.log('aiOutput table reference:', aiOutput);
        const tableInfo = {
          tableName: 'ai_output', // The table name in the database
          columns: Object.keys(aiOutput).filter(key => 
            !key.startsWith('_') && 
            !['sql', 'getSQL', 'as', 'alias'].includes(key)
          )
        };
        console.log('Table info:', tableInfo);
        
        // Test the query
        const testResult = await db.select().from(aiOutput).limit(1);
        console.log('Database connection successful. Test query result length:', testResult.length);
        
        // Log database connection details (without sensitive credentials)
        try {
          const dbUrl = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;
          if (dbUrl) {
            const url = new URL(dbUrl);
            console.log('Database connection details:', {
              host: url.hostname,
              port: url.port || '5432',
              database: url.pathname.replace(/^\/+/, ''),
              user: url.username || 'not specified'
            });
          }
        } catch (urlError) {
          console.warn('Could not parse database URL:', urlError);
        }
      } catch (dbError) {
        // Safely extract error details
        const errorObj = dbError as Error & { 
          code?: string; 
          detail?: string; 
          hint?: string; 
          position?: string;
        };
        
        const errorDetails = {
          message: errorObj?.message || 'Unknown error',
          name: errorObj?.name,
          code: errorObj?.code,
          detail: errorObj?.detail,
          hint: errorObj?.hint,
          position: errorObj?.position,
          // Safely get table name without accessing potentially undefined properties
          tableName: 'aiOutput',
          // Get column names from the schema
          tableColumns: ['id', 'formData', 'aiResponse', 'templatesluq', 'wordCount', 'createdBy', 'CreatedAt'],
          // Get a partial stack trace
          stack: errorObj?.stack ? errorObj.stack.split('\n').slice(0, 5).join('\n') : 'No stack trace'
        };
        
        console.error('Database connection test failed with details:', JSON.stringify(errorDetails, null, 2));
        
        // Re-throw with more context
        const enhancedError = new Error(`Database connection failed: ${errorObj?.message}`);
        (enhancedError as any).details = errorDetails;
        throw enhancedError;
      }
      
      // Get history list
      interface HistoryItem {
        id: number;
        formData: string;
        aiResponse: string | null;
        templatesluq: string;
        wordCount: number;
        createdBy: string;
        CreatedAt: string | null; // Matches the database schema (uppercase C)
      }
      
      let historyList: HistoryItem[] = [];
      let totalWords = 0;
      
      try {
        console.log('Fetching history list...');
        historyList = await db
          .select()
          .from(aiOutput)
          .where(eq(aiOutput.createdBy, userId))
          .orderBy(desc(aiOutput.CreatedAt))
          .limit(50);

        console.log(`Fetched ${historyList.length} history items`);
        
        // Get total word count using SQL aggregation
        console.log('Calculating total word count...');
        const result = await db
          .select({ 
            totalWords: sql<number>`COALESCE(SUM("wordCount"), 0)`
          })
          .from(aiOutput)
          .where(eq(aiOutput.createdBy, userId));

        totalWords = Number(result[0]?.totalWords) || 0;
        console.log(`Total words: ${totalWords}`);
        
      } catch (queryError) {
        const errorObj = queryError as Error & { 
          code?: string; 
          detail?: string;
        };
        
        console.error('Query error details:', {
          message: errorObj?.message || 'Unknown query error',
          code: errorObj?.code,
          detail: errorObj?.detail,
          stack: errorObj?.stack ? errorObj.stack.split('\n').slice(0, 5).join('\n') : 'No stack trace'
        });
        
        // Return empty results instead of failing completely
        console.warn('Returning empty history due to query error');
      }
      
      return NextResponse.json({ 
        success: true,
        historyList: historyList || [],
        totalWords 
      });
      
    } catch (dbError) {
      console.error('Database error in history API:', {
        message: dbError instanceof Error ? dbError.message : String(dbError),
        stack: dbError instanceof Error ? dbError.stack : undefined,
        name: dbError instanceof Error ? dbError.name : 'UnknownError'
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database error',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    // Log the full error object and its stack if available
    console.error('Unexpected error in history API:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'UnknownError'
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}
