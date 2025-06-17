'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchInput() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg opacity-0">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-transparent w-full"
          disabled
        />
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg">
      <Search className="text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        className="outline-none bg-transparent w-full"
      />
    </div>
  );
}
