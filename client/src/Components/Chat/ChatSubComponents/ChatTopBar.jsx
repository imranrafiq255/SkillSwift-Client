import React from 'react';

const ChatTopBar = ({ avatar, name, status }) => {
  return (
    <div className="flex items-center p-4 bg-gray-100 border-b border-gray-200">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className={`text-sm ${status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>
          {status === 'active' ? 'Active now' : `Last seen: ${status}`}
        </p>
      </div>
    </div>
  );
};

export default ChatTopBar;
