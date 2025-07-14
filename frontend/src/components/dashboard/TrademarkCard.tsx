'use client';

import React from 'react';
import { Trademark } from '@/types/trademark';
import Link from 'next/link';

interface TrademarkCardProps {
  trademark: Trademark;
  onEdit?: (trademark: Trademark) => void;
  onDelete?: (id: string) => void;
}

export const TrademarkCard: React.FC<TrademarkCardProps> = ({ 
  trademark, 
  onEdit, 
  onDelete 
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'registered':
        return 'bg-green-100 text-green-800';
      case 'submitted':
      case 'under_examination':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'abandoned':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{trademark.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{trademark.jurisdiction}</span>
            <span>•</span>
            <span>{trademark.type}</span>
          </div>
        </div>
        
        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(trademark.status)}`}>
          {trademark.status.replace('_', ' ')}
        </span>
      </div>

      {trademark.description && (
        <p className="text-sm text-gray-600 mb-3">{trademark.description}</p>
      )}

      {trademark.goods_services && (
        <div className="mb-3">
          <p className="text-sm text-gray-700">
            <strong>Goods & Services:</strong> {trademark.goods_services}
          </p>
        </div>
      )}

      {trademark.nice_classes && trademark.nice_classes.length > 0 && (
        <div className="mb-3">
          <p className="text-sm text-gray-700">
            <strong>Nice Classes:</strong> {trademark.nice_classes.join(', ')}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        {trademark.application_number && (
          <div>
            <strong>Application:</strong> {trademark.application_number}
          </div>
        )}
        {trademark.registration_number && (
          <div>
            <strong>Registration:</strong> {trademark.registration_number}
          </div>
        )}
        {trademark.filing_date && (
          <div>
            <strong>Filed:</strong> {formatDate(trademark.filing_date)}
          </div>
        )}
        {trademark.registration_date && (
          <div>
            <strong>Registered:</strong> {formatDate(trademark.registration_date)}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <span className="text-xs text-gray-500">
          Created: {formatDate(trademark.created_at)}
        </span>
        
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(trademark)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>
          )}
          {onDelete && trademark.status === 'draft' && (
            <button
              onClick={() => onDelete(trademark.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};