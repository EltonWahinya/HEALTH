import React from 'react';
import { Heart } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Heart className="w-12 h-12 text-blue-500 animate-pulse mx-auto mb-4" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Samsung Health</h2>
        <p className="text-gray-600">Loading your wellness data...</p>
      </div>
    </div>
  );
}