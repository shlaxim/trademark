'use client';

import React from 'react';
import { TrademarkSearchResult } from '@/types/trademark';

interface SearchResultsProps {
  results: TrademarkSearchResult[];
  title: string;
  source: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, title, source }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'registered':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'under_examination':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'abandoned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p>No trademarks found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">
        {title} ({results.length} results)
      </h3>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={result.id || index}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-lg">{result.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{result.jurisdiction}</span>
                  <span>•</span>
                  <span>{result.type}</span>
                  <span>•</span>
                  <span className="text-xs text-gray-500">{source}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {result.similarity_score && (
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {Math.round(result.similarity_score * 100)}% match
                  </div>
                )}
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(result.status)}`}>
                  {result.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {result.description && (
              <p className="text-sm text-gray-600 mb-2">{result.description}</p>
            )}

            {result.goods_services && (
              <p className="text-sm text-gray-700 mb-2">
                <strong>Goods & Services:</strong> {result.goods_services}
              </p>
            )}

            {result.nice_classes && result.nice_classes.length > 0 && (
              <p className="text-sm text-gray-700 mb-2">
                <strong>Nice Classes:</strong> {result.nice_classes.join(', ')}
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
              {result.application_number && (
                <div>
                  <strong>Application:</strong> {result.application_number}
                </div>
              )}
              {result.registration_number && (
                <div>
                  <strong>Registration:</strong> {result.registration_number}
                </div>
              )}
              {result.filing_date && (
                <div>
                  <strong>Filed:</strong> {formatDate(result.filing_date)}
                </div>
              )}
              {result.registration_date && (
                <div>
                  <strong>Registered:</strong> {formatDate(result.registration_date)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};