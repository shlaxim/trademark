'use client';

import React, { useState } from 'react';
import { TrademarkCreate, TrademarkType } from '@/types/trademark';

interface TrademarkFormProps {
  onSubmit: (trademark: TrademarkCreate) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TRADEMARK_TYPES = [
  { value: TrademarkType.WORD, label: 'Word Mark' },
  { value: TrademarkType.FIGURATIVE, label: 'Figurative Mark' },
  { value: TrademarkType.COMBINED, label: 'Combined Mark' },
  { value: TrademarkType.THREE_DIMENSIONAL, label: '3D Mark' },
  { value: TrademarkType.SOUND, label: 'Sound Mark' },
  { value: TrademarkType.COLOR, label: 'Color Mark' },
  { value: TrademarkType.OTHER, label: 'Other' },
];

const JURISDICTIONS = [
  { value: 'US', label: 'United States' },
  { value: 'EU', label: 'European Union' },
  { value: 'GR', label: 'Greece' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

const NICE_CLASSES = [
  { value: 1, label: 'Class 1 - Chemical products' },
  { value: 9, label: 'Class 9 - Scientific and electric apparatus' },
  { value: 25, label: 'Class 25 - Clothing' },
  { value: 35, label: 'Class 35 - Advertising and business' },
  { value: 42, label: 'Class 42 - Scientific and technological services' },
  { value: 45, label: 'Class 45 - Legal services' },
];

export const TrademarkForm: React.FC<TrademarkFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<TrademarkCreate>({
    name: '',
    description: '',
    type: TrademarkType.WORD,
    jurisdiction: 'US',
    goods_services: '',
    nice_classes: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClassToggle = (classValue: number) => {
    setFormData(prev => ({
      ...prev,
      nice_classes: prev.nice_classes?.includes(classValue)
        ? prev.nice_classes.filter(c => c !== classValue)
        : [...(prev.nice_classes || []), classValue],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Trademark</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trademark Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter trademark name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as TrademarkType }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {TRADEMARK_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jurisdiction *
                </label>
                <select
                  value={formData.jurisdiction}
                  onChange={(e) => setFormData(prev => ({ ...prev, jurisdiction: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {JURISDICTIONS.map(jurisdiction => (
                    <option key={jurisdiction.value} value={jurisdiction.value}>
                      {jurisdiction.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goods & Services
              </label>
              <textarea
                value={formData.goods_services}
                onChange={(e) => setFormData(prev => ({ ...prev, goods_services: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe the goods and services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nice Classification Classes
              </label>
              <div className="grid grid-cols-1 gap-2">
                {NICE_CLASSES.map(cls => (
                  <label key={cls.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.nice_classes?.includes(cls.value)}
                      onChange={() => handleClassToggle(cls.value)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">{cls.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Trademark'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};