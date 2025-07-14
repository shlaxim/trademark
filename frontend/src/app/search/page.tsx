'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { SearchForm } from '@/components/search/SearchForm';
import { SearchResults } from '@/components/search/SearchResults';
import { TrademarkSearchQuery } from '@/types/trademark';
import { trademarkService } from '@/services/trademark';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query: TrademarkSearchQuery) => {
    setIsLoading(true);
    setError('');
    
    try {
      const results = await trademarkService.searchCombined(query);
      setSearchResults(results);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Trademark Search</h1>
        
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {searchResults && (
          <div className="space-y-6">
            {searchResults.summary && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Search Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Local Database:</strong> {searchResults.summary.total_local} results
                  </div>
                  <div>
                    <strong>TMview:</strong> {searchResults.summary.total_tmview} results
                  </div>
                  <div>
                    <strong>Total:</strong> {searchResults.summary.total_combined} results
                  </div>
                </div>
              </div>
            )}
            
            {searchResults.local_results && (
              <SearchResults
                results={searchResults.local_results.results}
                title="Local Database Results"
                source="Local"
              />
            )}
            
            {searchResults.tmview_results && (
              <SearchResults
                results={searchResults.tmview_results.results}
                title="TMview Results"
                source="TMview"
              />
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}