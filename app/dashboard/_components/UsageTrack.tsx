"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { useUserSubscription } from '@/app/(context)/UserSubscriptionContext';

function UsageTrack() {
    const { 
        isSubscribed, 
        totalWords
    } = useUserSubscription();
    
    const creditLimit = isSubscribed ? 100000 : 10000;
    const progressPercentage = Math.min((totalWords / creditLimit) * 100, 100);

    return (
        <div className='m-0'>
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white rounded-lg shadow-lg'>
                <h2 className='font-medium'>Credits</h2>
                <div className='h-2 bg-gray-200/30 w-full rounded-full mt-3'>
                    <div
                        className='h-2 bg-white rounded-full shadow-inner transition-all duration-300'
                        style={{
                            width: `${progressPercentage}%`,
                            backgroundColor: progressPercentage > 90 ? '#ef4444' : '#ffffff'
                        }}
                    ></div>
                </div>
                <div className='flex justify-between text-sm mt-2'>
                    <span>Used: {totalWords.toLocaleString()}</span>
                    <span>Limit: {creditLimit.toLocaleString()}</span>
                </div>
            </div>
            <Button
                className="w-full my-3 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                onClick={() => window.location.href = '/dashboard/billing'}
            >
                <Crown size={18} className="mr-2" />
                {isSubscribed ? 'Manage Subscription' : 'Upgrade Now'}
             </Button>
        </div>
    )
}

export default UsageTrack
