import React from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { UserSubscriptionProvider } from '@/app/(context)/UserSubscriptionContext';
import { RefreshProvider } from '@/contexts/RefreshContext';

function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserSubscriptionProvider>
            <RefreshProvider>
                <div className='bg-slate-200'>
                    <div className='md:w-64 hidden md:block fixed'>
                        <SideNav />
                    </div>
                    <div className='md:ml-64'>
                        <Header />
                        {children}
                    </div>
                </div>
            </RefreshProvider>
        </UserSubscriptionProvider>
    );
}

export default Layout;
