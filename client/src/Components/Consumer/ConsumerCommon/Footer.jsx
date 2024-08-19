import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <p>&copy; 2024 SkillSwift All rights reserved.</p>
      <div className="flex justify-center mt-4 space-x-4">
        <a href="#"><svg /* icon for social */ /></a>
        <a href="#"><svg /* icon for social */ /></a>
      </div>
    </footer>
  );
};

export default Footer;
