'use client';

import { UserButton } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import React from 'react';

// Import the SearchInput component with SSR disabled
const SearchInput = dynamic(
  () => import('./SearchInput'),
  { ssr: false }
);

function Header() {
  return (
    <header className='px-6 py-3 bg-white border-b'>
      <div className='flex justify-between items-center'>
        <div className='flex-1 max-w-2xl'>
          <SearchInput />
        </div>
        <div className="ml-4 transform scale-125">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-14 h-14', // Avatar size
                userButtonPopoverCard: 'rounded-lg shadow-lg', // Optional: improve dropdown style
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header
