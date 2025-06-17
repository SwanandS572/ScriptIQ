import { UserProfile } from '@clerk/nextjs';
import React from 'react';

function Settings() {
  return (
    <div className='flex items-center justify-center h-full p-2'>
      <UserProfile 
        path="/dashboard/Settings" 
        routing="path" 
      />
    </div>
  );
}

export default Settings;
