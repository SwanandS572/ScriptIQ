import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button } from '@/components/ui/button';
import { Copy, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

interface Props {
  aiOutput: string;
  loading?: boolean;
}

const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
});

const OutputSection = ({ aiOutput, loading = false }: Props) => {
  const editorRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !aiOutput) return;

    const initializeEditor = async () => {
      try {
        const editor = editorRef.current?.getInstance();
        if (!editor) return;

        // Initialize editor with content
        editor.setMarkdown(aiOutput);
        
        // Force WYSIWYG mode after a short delay
        setTimeout(() => {
          try {
            editor.changeMode('wysiwyg', true);
            
            // Fix scrolling issues
            const scrollContainer = document.querySelector('.toastui-editor-contents') || 
                                 document.querySelector('.toastui-editor-md-preview') ||
                                 document.querySelector('.toastui-editor-ww-container');
            
            if (scrollContainer) {
              scrollContainer.scrollTop = 0;
            }
            
            // Scroll window to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch (e) {
            console.error('Error initializing editor:', e);
          }
        }, 100);
      } catch (error) {
        console.error('Error in OutputSection:', error);
      }
    };

    initializeEditor();
  }, [aiOutput, isClient]);

  const copyAiOutput = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getInstance();
      if (editor) {
        const markdown = editor.getMarkdown();
        navigator.clipboard.writeText(markdown);
      }
    }
  };

  return (
    <div className='bg-white shadow-sm rounded-lg border'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button
          className='flex gap-2 cursor-pointer hover:opacity-90 transition-opacity'
          onClick={copyAiOutput}
        >
          <Copy className='h-4 w-4' /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue=" "
        initialEditType='WYSIWYG'    // Use WYSIWYG mode
        previewStyle="vertical"      // Preview on right side in vertical split
        height="500px"
        useCommandShortcut={true}
        placeholder=""
      />
    </div>
  );
};

export default OutputSection;
