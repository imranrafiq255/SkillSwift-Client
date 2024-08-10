import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <img
        src={require("../../Assets/404.jpg")}
        alt="404 Not Found"
        className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl object-contain"
      />
    </div>
  );
};

export default NotFound;
