import React from 'react';

const ServiceProviderCard = ({ provider }) => {
  return (
    <div className="w-full max-w-lg flex items-center justify-between p-4 bg-white shadow-md rounded-full border space-x-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
        {/* Replace with an icon or image */}
        <span className="text-gray-500 text-2xl">👤</span>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{provider.name}</h2>
        <p className="text-sm text-gray-600">{provider.rating}</p>
      </div>
      <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition">
        Chat
      </button>
    </div>
  );
};

export default ServiceProviderCard;
