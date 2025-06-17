"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import TemplateListSection from './_components/TemplateListSection';

// Import the ClientSearchSection component with SSR disabled
const ClientSearchSection = dynamic(
  () => import('./_components/ClientSearchSection'),
  { ssr: false }
);

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>('');
  
  return (
    <div>
      {/* Search Section */}
      <ClientSearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      
      {/* Template List Section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;