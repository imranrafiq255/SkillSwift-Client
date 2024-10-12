import React from 'react';
import JobCard from './CustomServiceCard';

const CustomServiceList = () => {
  const jobs = [
    {
      consumerName: 'John Doe',
      title: 'Software Developer',
      description: 'Looking for a developer with experience in React.',
      budget: '$4000',
      location: 'Remote'
    },
    {
      consumerName: 'Jane Smith',
      title: 'Graphic Designer',
      description: 'Need a designer for branding and logo design.',
      budget: '$1500',
      location: 'New York, NY'
    },
    {
      consumerName: 'Mike Johnson',
      title: 'Data Analyst',
      description: 'Seeking an analyst to interpret complex data sets.',
      budget: '$3500',
      location: 'San Francisco, CA'
    },
    {
      consumerName: 'Emily White',
      title: 'Content Writer',
      description: 'Looking for a creative writer for blog posts.',
      budget: '$800',
      location: 'Remote'
    },
    {
      consumerName: 'Emily White',
      title: 'Content Writer',
      description: 'Looking for a creative writer for blog posts.',
      budget: '$800',
      location: 'Remote'
    },
    {
      consumerName: 'Emily White',
      title: 'Content Writer',
      description: 'Looking for a creative writer for blog posts.',
      budget: '$800',
      location: 'Remote'
    },
    {
      consumerName: 'Emily White',
      title: 'Content Writer',
      description: 'Looking for a creative writer for blog posts.',
      budget: '$800',
      location: 'Remote'
    }
    // Add more dummy data as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Job Listings</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default CustomServiceList;
