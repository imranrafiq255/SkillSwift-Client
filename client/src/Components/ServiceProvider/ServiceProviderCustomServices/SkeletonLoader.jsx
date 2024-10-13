// SkeletonLoader.js
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="w-80 rounded-lg border shadow-md p-4 bg-white flex flex-col items-center space-y-2">
      <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
      <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
      <div className="text-sm text-gray-700 space-y-1 pb-5">
        <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default SkeletonLoader;
