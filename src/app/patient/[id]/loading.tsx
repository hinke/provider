import React from 'react';

export default function Loading() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
} 