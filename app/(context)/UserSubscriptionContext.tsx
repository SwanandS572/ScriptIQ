"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface UserSubscriptionContextType {
  isSubscribed: boolean;
  totalWords: number;
  setIsSubscribed: (value: boolean) => void;
  updateTotalWords: (newCount: number) => void;
  fetchTotalWords: () => Promise<number>;
}

export const UserSubscriptionContext = createContext<UserSubscriptionContextType | null>(null);

export const useUserSubscription = () => {
  const context = useContext(UserSubscriptionContext);
  if (!context) {
    throw new Error('useUserSubscription must be used within a UserSubscriptionProvider');
  }
  return context;
};

export const UserSubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [totalWords, setTotalWords] = useState(0);

  const fetchTotalWords = useCallback(async (): Promise<number> => {
    try {
      console.log('Fetching word count from /api/history...');
      const res = await fetch('/api/history', {
        cache: 'no-store', // Prevent caching to get fresh data
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const responseData = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        console.error('Error response from /api/history:', {
          status: res.status,
          statusText: res.statusText,
          error: responseData.error || 'No error details',
          details: responseData.details || 'No details',
          response: responseData
        });
        throw new Error(responseData.error || `Failed to fetch word count: ${res.status} ${res.statusText}`);
      }
      
      console.log('Received history data:', responseData);
      
      if (!responseData.success) {
        throw new Error(responseData.error || 'Invalid response from server');
      }
      
      const words = Number(responseData.totalWords) || 0;
      setTotalWords(words);
      return words;
      
    } catch (error: unknown) {
      const errorObj = error as Error & { [key: string]: unknown };
      console.error('Error in fetchTotalWords:', {
        name: errorObj?.name || 'UnknownError',
        message: errorObj?.message || 'Unknown error',
        stack: errorObj?.stack ? errorObj.stack.split('\n').slice(0, 3).join('\n') : 'No stack trace',
        fullError: JSON.stringify(errorObj, Object.getOwnPropertyNames(errorObj) || [])
      });
      return 0; // Return 0 on error to prevent UI breakage
    }
  }, []);

  const updateTotalWords = useCallback((newCount: number) => {
    setTotalWords(prev => prev + newCount);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTotalWords();
  }, [fetchTotalWords]);

  return (
    <UserSubscriptionContext.Provider 
      value={{ 
        isSubscribed, 
        totalWords,
        setIsSubscribed,
        updateTotalWords,
        fetchTotalWords
      }}
    >
      {children}
    </UserSubscriptionContext.Provider>
  );
};