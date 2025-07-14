'use client';

import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { TrademarkCard } from '@/components/dashboard/TrademarkCard';
import { TrademarkForm } from '@/components/dashboard/TrademarkForm';
import { Trademark, TrademarkCreate } from '@/types/trademark';
import { trademarkService } from '@/services/trademark';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const [trademarks, setTrademarks] = useState<Trademark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadTrademarks();
  }, []);

  const loadTrademarks = async () => {
    try {
      const data = await trademarkService.getTrademarks();
      setTrademarks(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load trademarks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTrademark = async (trademarkData: TrademarkCreate) => {
    setIsSubmitting(true);
    try {
      const newTrademark = await trademarkService.createTrademark(trademarkData);
      setTrademarks(prev => [newTrademark, ...prev]);
      setShowForm(false);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create trademark');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTrademark = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trademark?')) return;
    
    try {
      await trademarkService.deleteTrademark(id);
      setTrademarks(prev => prev.filter(tm => tm.id !== id));
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete trademark');
    }
  };

  const getTrademarksByStatus = (status: string) => {
    return trademarks.filter(tm => tm.status === status);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.full_name}</p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/search"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Search Trademarks
            </Link>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Create Trademark
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-primary-600">{trademarks.length}</div>
            <div className="text-sm text-gray-600">Total Trademarks</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {getTrademarksByStatus('registered').length}
            </div>
            <div className="text-sm text-gray-600">Registered</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {getTrademarksByStatus('under_examination').length}
            </div>
            <div className="text-sm text-gray-600">Under Examination</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-600">
              {getTrademarksByStatus('draft').length}
            </div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
        </div>

        {/* Trademarks List */}
        {trademarks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No trademarks found
            </div>
            <p className="text-gray-400 mb-6">
              Get started by creating your first trademark or searching for existing ones.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700"
              >
                Create First Trademark
              </button>
              <Link
                href="/search"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              >
                Search Trademarks
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trademarks.map((trademark) => (
              <TrademarkCard
                key={trademark.id}
                trademark={trademark}
                onDelete={handleDeleteTrademark}
              />
            ))}
          </div>
        )}

        {/* Trademark Form Modal */}
        {showForm && (
          <TrademarkForm
            onSubmit={handleCreateTrademark}
            onCancel={() => setShowForm(false)}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}