'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          Trademark System
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/search" className="hover:text-gray-300">
                Search
              </Link>
              <Link href="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">
                  Welcome, {user?.full_name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/auth/login"
                className="bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded text-sm"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};