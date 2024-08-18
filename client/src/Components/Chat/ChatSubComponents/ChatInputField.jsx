import React, { useState } from 'react';
import sendIcon from '../../../Assets/send.png'; // Adjust path as needed

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Your send message logic here
    if(message){
      console.log('Message sent:', message);
      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <div className="p-2 bg-gray-100 flex items-center">
      <div className="flex items-center flex-grow rounded-lg border border-gray-300 bg-white">
        <input
          type="text"
          placeholder="Hey, How are you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border-none rounded-lg focus:outline-none"
        />
        <img
          onClick={handleSendMessage}
          className="mr-4 rounded-lg cursor-pointer h-6 w-6"
          src={sendIcon}
          alt="Send"
        />
      </div>
    </div>
  );
};

export default ChatInput;
