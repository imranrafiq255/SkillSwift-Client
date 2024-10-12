import React from 'react';
import ServiceProviderCard from './ServiceProviderCard';

const ServiceProviderList = () => {
  const providers = [
    {
      name: 'Alice Johnson',
      rating: '4.8 (200 reviews)',
    },
    {
      name: 'Bob Smith',
      rating: '4.5 (150 reviews)',
    },
    {
      name: 'Charlie Brown',
      rating: '4.9 (300 reviews)',
    },
    {
      name: 'Diana Prince',
      rating: '4.7 (250 reviews)',
    }
    // Add more dummy data as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="space-y-4">
        {providers.map((provider, index) => (
          <ServiceProviderCard key={index} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderList;
