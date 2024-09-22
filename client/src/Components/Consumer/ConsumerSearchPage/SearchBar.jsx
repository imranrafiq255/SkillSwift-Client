import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-between items-center mb-8 mx-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:border-gray-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        >
          <path
            d="m14.37 12.86 5.636 5.637-1.414 1.414-5.633-5.632a7.627 7.627 0 0 1-4.688 1.604c-4.256 0-7.707-3.483-7.707-7.78 0-4.297 3.45-7.78 7.707-7.78s7.707 3.483 7.707 7.78c0 1.792-.6 3.442-1.608 4.758ZM8.27 14.084c3.259 0 5.907-2.673 5.907-5.98 0-3.306-2.648-5.98-5.907-5.98-3.258 0-5.907 2.674-5.907 5.98 0 3.307 2.649 5.98 5.907 5.98Z"
            fill="#000"
            fillRule="nonzero"
          ></path>
        </svg>
      </div>
      <button 
        className="text-gray-500 ml-4"
        onClick={() => setSearchQuery('')}
      >
        Cancel
      </button>
    </div>
  );
};

export default SearchBar;
