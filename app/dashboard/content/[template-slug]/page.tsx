'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useRefresh } from '@/contexts/RefreshContext';
import { useUserSubscription } from '@/app/(context)/UserSubscriptionContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModal';
import { db } from '@/utils/db';
import { aiOutput } from '@/utils/schema';
import { sql } from 'drizzle-orm';
import moment from 'moment';
import Templates from '@/app/(data)/Templates';
import type { TEMPLATE } from '@/types/template';
import FormSection from './_components/FormSection';
import OutputSection from './_components/OutputSection';

// interface PageParams {
//   'template-slug': string;
// }

// interface PROPS {
//   params: Promise<PageParams>; // now handled as async
// }

function CreateNewContent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { triggerRefresh } = useRefresh();
  const router = useRouter();
  const [aiOutput, setAiOutput] = useState<string>('');
  const { user } = useUser();
  const params = useParams();
  const templateSlug = params?.['template-slug'] as string;


  //   const params = use(props.params); // unwrap async params safely
  //   const templateSlug = params['template-slug'];
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
  );
  const { isSubscribed, totalWords, updateTotalWords } = useUserSubscription();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const GenerateAIContent = async (formData: any) => {
    const creditLimit = isSubscribed ? 100000 : 10000;
    if (totalWords >= creditLimit) {
      alert('You have reached your credit limit. Please upgrade your plan to continue.');
      router.push('/dashboard/billing');
      return;
    }
    
    setLoading(true);
    try {
      // 1. Generate AI content
      const SelectedPrompt = selectedTemplate?.aiPrompt;
      const FinalAIPrompt = `${JSON.stringify(formData)}, ${SelectedPrompt}`;
      const result = await chatSession(FinalAIPrompt);
      
      // 2. Save to database
      const savedItem = await SaveInDb(formData, selectedTemplate?.slug, result);
      
      if (savedItem) {
        // 3. Update UI with the result
        setAiOutput(result);
        
        // 4. Update word count in context
        const newWordCount = result.trim().split(/\s+/).length;
        updateTotalWords(newWordCount);
      } else {
        throw new Error('Failed to save generated content');
      }
      
    } catch (error) {
      console.error('Content generation error:', {
        error,
        template: selectedTemplate?.slug,
        formData: formData ? Object.keys(formData) : 'no form data'
      });
      alert('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const wordCount = aiResp.trim().split(/\s+/).length;
      const slugValue = (slug || 'unknown').slice(0, 255);
      const userId = user.id.slice(0, 255);
      
      // Ensure formData is a valid JSON string
      let formDataString = '{}';
      try {
        formDataString = typeof formData === 'string' ? formData : JSON.stringify(formData || {});
      } catch (e) {
        console.error('Error stringifying formData:', e);
        formDataString = '{}';
      }

      // Truncate aiResponse if it's too large for the database
      const maxAiResponseLength = 10000; // Adjust based on your database column size
      const truncatedAiResponse = aiResp.length > maxAiResponseLength 
        ? aiResp.substring(0, maxAiResponseLength) + '... [truncated]' 
        : aiResp;

      console.log('Preparing to save to database:', {
        userId,
        slug: slugValue,
        wordCount,
        hasFormData: !!formData,
        formDataLength: formDataString.length,
        aiResponseLength: truncatedAiResponse.length
      });

      try {
        // Use raw SQL for more control and better error messages
        const query = `
          INSERT INTO "ai_output" 
            ("formData", "templatesluq", "aiResponse", "wordCount", "createdBy")
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        `;
        
        const params = [
          formDataString,
          slugValue,
          truncatedAiResponse,
          wordCount,
          userId
        ];

        console.log('Executing SQL query:', {
          query: query.replace(/\s+/g, ' ').trim(),
          params: params.map(p => 
            typeof p === 'string' 
              ? `"${p.substring(0, 20)}${p.length > 20 ? '...' : ''}" (${p.length} chars)`
              : p
          )
        });


        // Execute the raw query using the correct drizzle-orm method
        const now = new Date().toISOString();
        const result = await db.execute(
          sql`INSERT INTO "aiOutput" ("formData", "templatesluq", "aiResponse", "wordCount", "createdBy", "CreatedAt")
              VALUES (${formDataString}, ${slugValue}, ${truncatedAiResponse}, ${wordCount}, ${userId}, ${now})
              RETURNING *`
        );
        console.log('Database insert successful:', result);
        // Trigger a refresh of the history
        triggerRefresh();
        // Optionally redirect to history page
        // router.push('/dashboard/history');
        return result.rows[0];
      } catch (error) {
        const dbError = error as Error & {
          code?: string;
          detail?: string;
          constraint?: string;
        };
        
        console.error('Database insert error:', {
          message: dbError.message,
          code: dbError.code,
          detail: dbError.detail,
          constraint: dbError.constraint,
          stack: dbError.stack
        });
        throw new Error(`Database save failed: ${dbError.message}`);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Database save error:', {
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
        userId: user?.id,
        slug: (slug || 'unknown').slice(0, 20) + '...',
        formDataKeys: formData ? Object.keys(formData) : 'no form data',
        aiRespLength: aiResp?.length || 0
      });
      
      // Re-throw with more context
      throw new Error(`Failed to save content: ${errorMessage}`);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-5">
      <Link href="/dashboard">
        <Button className="cursor-pointer hover:opacity-90 transition-opacity">
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* FormSection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={GenerateAIContent}
          loading={loading}
        />
        {/* OutputSection */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
