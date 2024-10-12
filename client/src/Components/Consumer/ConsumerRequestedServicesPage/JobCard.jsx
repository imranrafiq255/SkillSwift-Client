import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="w-full max-w-xs rounded-lg border shadow-md p-4 bg-white flex flex-col items-center space-y-4">
      <div className="text-base text-gray-700 space-y-2"> {/* Increased font size */}
        <p><strong>Job Title:</strong> {job.title}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Budget:</strong> {job.budget}</p>
        <p><strong>Location:</strong> {job.location}</p>
      </div>
      <div className="flex flex-col space-y-2 w-full"> {/* Ensured buttons stack and take full width */}
        <button className="bg-green-500 text-white font-semibold py-2 w-full rounded-full hover:bg-green-600 transition">
          Found Service Provider
        </button>
        <button className="bg-red-500 text-white font-semibold py-2 w-full rounded-full hover:bg-red-600 transition">
          Delete Ad
        </button>
      </div>
    </div>
  );
};

export default JobCard;
