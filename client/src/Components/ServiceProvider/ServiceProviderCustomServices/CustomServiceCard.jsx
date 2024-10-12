import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="w-80 rounded-lg border shadow-md p-4 bg-white flex flex-col items-center space-y-2">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        {/* Replace with an icon or image */}
        <span className="text-gray-500 text-3xl">👤</span>
      </div>
      <h2 className="text-lg font-bold">{job.consumerName}</h2>
      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>Job Title:</strong> {job.title}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Budget:</strong> {job.budget}</p>
        <p><strong>Location:</strong> {job.location}</p>
      </div>
      <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition">
        Interested
      </button>
    </div>
  );
};

export default JobCard;
