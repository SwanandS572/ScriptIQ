"use client"
import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'
import Link from 'next/link'

function SideNav() {

  const MenuList = [
    {
      name: 'Home',
      icon: Home,
      path: '/dashboard'
    },
    {
      name: 'History',
      icon: FileClock,
      path: '/dashboard/history'
    },
    {
      name: 'Billing',
      icon: WalletCards,
      path: '/dashboard/billing'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/Settings'
    },
  ]

  const path = usePathname();
  useEffect(() => {
    console.log(path)
  }, [])


  return (
    <div className='h-screen relative p-6 shadow-lg bg-gradient-to-b from-white to-blue-50 border-r border-gray-200 w-64'>
      <div className='flex justify-center mt-0 px-2'>
        <div className='relative w-full flex items-start justify-center overflow-visible group' style={{ height: '100px' }}>
          <div className="pointer-events-none mt-1.5">
            <Image
              src={'/Logo 2.png'}
              alt="ScriptIQ logo"
              width={360}
              height={180}
              priority
              className='w-auto h-[160px] object-contain'
              style={{
                objectPosition: 'top',
                transformOrigin: 'top center',
                maxWidth: '100%',
                marginTop: '-70px',
                marginRight: '35px',
                maxHeight: '100%'
              }}
            />
          </div>
        </div>

      </div>
      <div className='space-y-1 mt-0'>
        {MenuList.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex gap-3 mb-1 p-3 hover:bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-white rounded-xl cursor-pointer items-center transition-all duration-200 ${path === menu.path
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
              : 'text-gray-700 hover:shadow-md'
              }`}
          >
            <menu.icon className={`h-5 w-5 ${path === menu.path ? 'text-white' : 'text-blue-600'}`} />
            <h2 className='text-base font-medium'>{menu.name}</h2>
          </Link>
        ))}
      </div>
      <div className='absolute bottom-8 w-full px-5 left-0'>
        <div className='p-4 bg-white rounded-xl shadow-sm border border-gray-100'>
          <UsageTrack />
        </div>
      </div>
    </div>
  )
}
export default SideNav
