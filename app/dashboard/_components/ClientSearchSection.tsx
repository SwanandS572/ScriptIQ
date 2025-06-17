'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

function ClientSearchSection({ onSearchInput }: { onSearchInput: (value: string) => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-800 to-blue-700 flex flex-col justify-center items-center text-white opacity-0'>
        <h2 className='text-3xl font-bold'>Loading...</h2>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchInput(value);
  };

  return (
    <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-800 to-blue-700 flex flex-col justify-center items-center text-white'>
      <h2 className='text-3xl font-bold'>Browse All Templates</h2>
      <p>What would you like to create today?</p>
      <div className='w-full flex justify-center'>
        <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-full md:w-[50%]'>
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleInputChange}
            className="bg-transparent w-full outline-none text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default ClientSearchSection;
