import { Brain, Sparkles, Zap, BarChart3, Users, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import ImageWithFallback from '../_components/ImageWithFallback';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { value: '10,000+', label: 'Happy Users' },
    { value: '1M+', label: 'Content Pieces Generated' },
    { value: '50+', label: 'AI Templates' },
    { value: '24/7', label: 'Support' },
  ];

  /**
   * Array of team members. Each member is an object with the following properties:
   * - `name`: The team member's name.
   * - `role`: The team member's role.
   * - `bio`: A short bio about the team member.
   * - `icon`: An icon element to display next to the team member's information.
   */
  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'AI enthusiast with 10+ years in content creation and technology.',
      icon: <Lightbulb className="w-6 h-6 text-indigo-500" />
    },
    {
      name: 'Sarah Williams',
      role: 'Head of AI',
      bio: 'Machine learning expert passionate about natural language processing.',
      icon: <Brain className="w-6 h-6 text-purple-500" />
    },
    {
      name: 'Michael Chen',
      role: 'Product Lead',
      bio: 'Product strategist focused on creating exceptional user experiences.',
      icon: <Sparkles className="w-6 h-6 text-blue-500" />
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our AI Content Generator</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Empowering creators and businesses with cutting-edge AI technology to transform their content creation process.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-6 shadow-sm">
              OUR STORY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Revolutionizing Content Creation with AI
            </h2>
            <div className="max-w-4xl mx-auto
            ">
              <p className="text-lg text-gray-600 mb-8">
                Founded in 2023, our mission is to make high-quality content creation accessible to everyone. 
                We believe that powerful AI tools should be intuitive, affordable, and available to all creators, 
                regardless of their technical expertise.
              </p>
              <p className="text-lg text-gray-600">
                Our team of AI researchers, content strategists, and software engineers have come together to 
                build a platform that combines cutting-edge technology with user-friendly design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <span className="inline-block px-5 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-6 shadow-sm">
                OUR MISSION
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Democratizing Content Creation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We're on a mission to break down barriers in content creation. Our AI-powered platform helps 
                individuals and businesses of all sizes create professional-quality content quickly and easily.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Zap className="flex-shrink-0 h-6 w-6 text-indigo-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast & Efficient</h3>
                    <p className="text-gray-600">Generate high-quality content in seconds, not hours.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BarChart3 className="flex-shrink-0 h-6 w-6 text-indigo-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Data-Driven</h3>
                    <p className="text-gray-600">Leveraging the latest AI research for optimal results.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="flex-shrink-0 h-6 w-6 text-indigo-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">User-Focused</h3>
                    <p className="text-gray-600">Designed with real user needs in mind.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="/images/ai-content-creation.jpg"
                  alt="AI Content Creation"
                  className="w-full h-full object-cover"
                  fallbackSrc="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-6 shadow-sm">
              OUR TEAM
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to making AI content creation accessible to everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-6">
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 text-center font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your content creation?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of creators and businesses already using our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/sign-up" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
            >
              Get Started Free
            </Link>
            <Link 
              href="#features" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
