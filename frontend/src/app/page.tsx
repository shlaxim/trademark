'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Trademark Registration System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive platform for trademark registration and management across multiple jurisdictions. 
            Search for existing trademarks, file applications, and manage your intellectual property portfolio.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/auth/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-primary-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Search & Analyze</h3>
              <p className="text-gray-600">
                Search existing trademarks across multiple databases including TMview, EUIPO, and local registries.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-primary-600 text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">File Applications</h3>
              <p className="text-gray-600">
                Submit trademark applications to Greek National Office (OBI), EUIPO, and WIPO Madrid System.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-primary-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Manage Portfolio</h3>
              <p className="text-gray-600">
                Track application status, manage renewals, and organize your trademark portfolio in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Multi-jurisdiction trademark search
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Real-time availability scoring
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Nice classification system integration
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Secure payment processing
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Application status tracking
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Document management
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                E-signature capabilities
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Portfolio analytics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}