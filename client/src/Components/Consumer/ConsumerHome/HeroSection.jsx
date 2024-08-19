import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative">
      <img
        src={require("../../../Assets/HeroSectionBanner.jpg")}
        alt="Hero Background"
        className="w-full h-screen object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50">
        <h1 className="text-white text-5xl font-bold">SKILLSWIFT</h1>
        <p className="text-white text-xl mt-4">
        Where Skills and Needs Click for Perfect Solutions!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
