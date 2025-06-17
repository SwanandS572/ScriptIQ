import Link from 'next/link';
import { ArrowRight, Sparkles, LayoutTemplate, Zap, Download } from 'lucide-react';
import Navbar from '../_components/Navbar';

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-blue-500" />,
    title: "AI-Powered Content",
    description: "Generate high-quality, engaging content in seconds using advanced AI technology."
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-purple-500" />,
    title: "Multiple Templates",
    description: "Choose from a variety of templates for blogs, social media, emails, and more."
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: "Easy to Use",
    description: "Simple, intuitive interface that lets you create amazing content with just a few clicks."
  },
  {
    icon: <Download className="h-8 w-8 text-purple-500" />,
    title: "Save & Export",
    description: "Save your work and export in multiple formats for easy sharing and publishing."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative overflow-hidden">
        {/* Vibrant Header/Navbar */}
        <header className="bg-gradient-to-r from-indigo-50 to-blue-50 shadow-md border-b border-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Generate Amazing Content
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                  with AI Power
                </span>
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
                Create stunning, engaging content in seconds with our AI-powered content generator.
                Perfect for bloggers, marketers, and businesses of all sizes.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/sign-up" 
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#features" 
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-white/10 hover:bg-white/20 transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Vibrant Features Section */}
        <div id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-block px-5 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-6 shadow-sm">
                POWERFUL FEATURES
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Everything you need to create
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  amazing content
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features to help you generate, edit, and publish content faster than ever.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                // Different colors for each feature card
                const colors = [
                  { bg: 'from-indigo-50 to-blue-50', border: 'border-indigo-100', icon: 'text-indigo-600', hoverIcon: 'text-indigo-700', hoverBg: 'bg-gradient-to-br from-indigo-100/80 to-blue-100/80' },
                  { bg: 'from-purple-50 to-fuchsia-50', border: 'border-purple-100', icon: 'text-purple-600', hoverIcon: 'text-purple-700', hoverBg: 'bg-gradient-to-br from-purple-100/80 to-fuchsia-100/80' },
                  { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100', icon: 'text-blue-600', hoverIcon: 'text-blue-700', hoverBg: 'bg-gradient-to-br from-blue-100/80 to-cyan-100/80' },
                  { bg: 'from-violet-50 to-indigo-50', border: 'border-violet-100', icon: 'text-violet-600', hoverIcon: 'text-violet-700', hoverBg: 'bg-gradient-to-br from-violet-100/80 to-indigo-100/80' },
                ][index % 4];

                return (
                  <div 
                    key={index} 
                    className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border ${colors.border} hover:border-opacity-50 hover:-translate-y-1.5`}
                  >
                    <div className={`absolute inset-0 ${colors.hoverBg} opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300`}></div>
                    <div className="relative z-10">
                      <div className={`flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br ${colors.bg} group-hover:scale-105 mb-6 mx-auto transition-all duration-300`}>
                        <div className={`${colors.icon} group-hover:${colors.hoverIcon} transition-colors duration-300`}>
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{feature.title}</h3>
                      <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-grid-white/[0.05]" />
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
              Ready to boost your content creation?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of creators already using our AI content generator to save time and create better content.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/sign-up" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-blue-600 bg-white hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI Content Gen
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Empowering creators with AI-powered content generation tools to bring ideas to life. Create amazing content in seconds with our advanced AI technology.
                </p>
                <div className="mt-4">
                  <p className="text-sm text-gray-400">Connect with us for the latest updates</p>
                </div>
              </div>

              <div className="md:col-span-3 md:col-start-10">
                <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">Product</h4>
                <ul className="space-y-3">
                  <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="h-px w-0 group-hover:w-4 bg-gradient-to-r from-blue-400 to-purple-400 mr-2 transition-all duration-300"></span>
                    Features
                  </Link></li>
                  <li><Link href="/dashboard/billing" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="h-px w-0 group-hover:w-4 bg-gradient-to-r from-blue-400 to-purple-400 mr-2 transition-all duration-300"></span>
                    Pricing & Billing
                  </Link></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 mt-12 border-t border-gray-800">
              <p className="text-gray-400 text-sm text-center">
                &copy; {new Date().getFullYear()} AI Content Generator. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
