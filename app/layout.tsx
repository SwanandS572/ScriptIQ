import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

// Configure Poppins font with all weights needed
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Content Generator | Create Amazing Content with AI",
  description: "Generate high-quality, engaging content in seconds with our AI-powered content generator. Perfect for blogs, social media, emails, and more.",
  keywords: ["AI content generator", "content creation", "AI writing", "blog generator", "social media content"],
  authors: [{ name: "AI Content Gen Team" }],
  // Favicon configuration
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "AI Content Generator | Create Amazing Content with AI",
    description: "Generate high-quality, engaging content in seconds with our AI-powered content generator.",
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "AI Content Generator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${poppins.className} antialiased bg-white text-gray-900`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}