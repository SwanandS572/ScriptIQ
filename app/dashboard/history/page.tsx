'use client'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { aiOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import Image from 'next/image';
import { RotateCw } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import { useRefresh } from '@/contexts/RefreshContext';
import { CopyButton } from './_components/CopyButton'
import Link from 'next/link'
// import { TEMPLATE } from './_components/TemplateListSection'
// TODO: Ensure the correct path and export for TEMPLATE. If TEMPLATE is a type or interface, define it here as a temporary fix:
export interface TEMPLATE {
    slug: string;
    name: string;
    // Add other properties as needed
}

export interface HISTORY {
    id: Number,
    formData: string,
    aiResponse: string,
    templateSlug: string,
    createdBy: string,
    createdAt: string
}

function getTemplateMeta(templateSlug?: string | null) {
    if (!templateSlug) {
        console.log('No template slug provided');
        return { name: 'Unknown', icon: '' };
    }

    // First try to find exact match by slug
    const template = Templates.find((item) => 
        item.slug.toLowerCase() === templateSlug.toLowerCase().trim()
    );

    if (template) {
        return { 
            name: template.name, 
            icon: template.icon 
        };
    }

    // If no exact match, try to find a partial match
    const partialMatch = Templates.find((item) => 
        templateSlug.toLowerCase().includes(item.slug.toLowerCase()) ||
        item.name.toLowerCase().includes(templateSlug.toLowerCase())
    );

    if (partialMatch) {
        return { 
            name: partialMatch.name, 
            icon: partialMatch.icon 
        };
    }

    // Fallback to a default icon and the original slug as name
    console.log('No template found for slug:', templateSlug);
    return { 
        name: templateSlug, 
        icon: 'https://cdn-icons-png.flaticon.com/128/1159/1159633.png' 
    };
}

function wordCount(text?: string | null): number {
    if (!text || typeof text !== 'string') return 0;
    const trimmed = text.trim();
    return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
}

function formatDate(dateStr: string) {
    // Try to parse DD/MM/YYYY, fallback to showing as is
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    if (day && month && year) {
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }
    return dateStr;
}

interface HistoryItem {
    id: number;
    formData: string;
    aiResponse: string | null;
    templatesluq: string;
    wordCount: number;
    createdBy: string;
    CreatedAt: string | null;
}

export default function HistoryPage() {
    const { user, isLoaded: isUserLoaded } = useUser();
    const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { refreshKey, triggerRefresh } = useRefresh();

    const fetchHistory = useCallback(async () => {
        if (!isUserLoaded) return;
        if (!user) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/history');
            const data = await res.json();
            
            if (!res.ok) {
                const errorMessage = data?.error || `Failed to fetch history: ${res.statusText}`;
                const errorDetails = data?.details || 'No additional details available';
                console.error('API Error:', { status: res.status, errorMessage, details: errorDetails });
                throw new Error(`${errorMessage} (Status: ${res.status})`);
            }
            
            if (data.success) {
                if (Array.isArray(data.historyList)) {
                    setHistoryList(data.historyList);
                } else {
                    console.warn('Expected historyList to be an array, received:', data.historyList);
                    setHistoryList([]);
                }
            } else {
                console.error('API returned success: false with data:', data);
                throw new Error(data.error || 'Failed to load history');
            }
        } catch (err) {
            console.error('Error fetching history:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setHistoryList([]);
        } finally {
            setIsLoading(false);
        }
    }, [user, isUserLoaded]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory, refreshKey]); // Add refreshKey as a dependency

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="font-bold text-3xl mb-1">History</h2>
                        <p className="text-gray-500">Search your previously generated AI content</p>
                    </div>
                    <button
                        onClick={fetchHistory}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TEMPLATE</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI RESP</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WORDS</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COPY</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-red-500">
                                            Error loading history: {error}
                                        </td>
                                    </tr>
                                ) : !Array.isArray(historyList) || historyList.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-gray-400">
                                            No history found. Try generating some content first!
                                        </td>
                                    </tr>
                                ) : (
                                    historyList.map((item) => {
                                        if (!item) return null;
                                        const { name, icon } = getTemplateMeta(item?.templatesluq || '');
                                        const aiResponse = item?.aiResponse || '';
                                        const createdAt = item?.CreatedAt || '';
                                        
                                        return (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                                                    {icon && <Image src={icon} alt={name} width={24} height={24} className="rounded" />}
                                                    <span>{name || 'Unknown Template'}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate text-gray-700">
                                                    {aiResponse ? `${aiResponse.slice(0, 80)}${aiResponse.length > 80 ? '...' : ''}` : 'No content'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {createdAt ? formatDate(createdAt) : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                    {item.wordCount || wordCount(aiResponse)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <CopyButton text={aiResponse} />
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}