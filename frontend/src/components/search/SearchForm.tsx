'use client';

import React, { useState } from 'react';
import { TrademarkSearchQuery } from '@/types/trademark';

interface SearchFormProps {
  onSearch: (query: TrademarkSearchQuery) => void;
  isLoading?: boolean;
}

const NICE_CLASSES = [
  { value: 1, label: 'Class 1 - Chemical products' },
  { value: 9, label: 'Class 9 - Scientific and electric apparatus' },
  { value: 25, label: 'Class 25 - Clothing' },
  { value: 35, label: 'Class 35 - Advertising and business' },
  { value: 42, label: 'Class 42 - Scientific and technological services' },
  { value: 45, label: 'Class 45 - Legal services' },
];

const JURISDICTIONS = [
  { value: '', label: 'All Jurisdictions' },
  { value: 'US', label: 'United States' },
  { value: 'EU', label: 'European Union' },
  { value: 'GR', label: 'Greece' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({
        query: query.trim(),
        jurisdiction: jurisdiction || undefined,
        nice_classes: selectedClasses.length > 0 ? selectedClasses : undefined,
      });
    }
  };

  const handleClassToggle = (classValue: number) => {
    setSelectedClasses(prev => 
      prev.includes(classValue) 
        ? prev.filter(c => c !== classValue)
        : [...prev, classValue]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
            Trademark Name
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter trademark name to search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">
            Jurisdiction
          </label>
          <select
            id="jurisdiction"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {JURISDICTIONS.map(j => (
              <option key={j.value} value={j.value}>
                {j.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nice Classification Classes (optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {NICE_CLASSES.map(cls => (
            <label key={cls.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedClasses.includes(cls.value)}
                onChange={() => handleClassToggle(cls.value)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">{cls.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {isLoading ? 'Searching...' : 'Search Trademarks'}
      </button>
    </form>
  );
};