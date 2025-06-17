'use client';

import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            className="text-violet-700 hover:underline text-sm"
            onClick={async () => {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
            }}
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
} 