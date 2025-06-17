'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="container mx-auto px-0 py-1 flex justify-between items-center min-h-10">
      <Link href="/" className="flex items-center h-18">
        <div className="relative w-40 h-40 mt-2">
          <Image
            src={'/Logo 2.png'}
            alt="ScriptIQ logo"
            width={400}
            height={200}
            priority
            className="w-auto h-full object-contain"
            style={{
              objectPosition: 'left center',
              maxHeight: '100%',
              width: 'auto',
              height: '100%',
              display: 'block'
            }}
          />
        </div>
      </Link>

      <div className="flex items-center space-x-4">
        {!isSignedIn ? (
          <>
            <Link href="/sign-in">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </nav>
  );
}
