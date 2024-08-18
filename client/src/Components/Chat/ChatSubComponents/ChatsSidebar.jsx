import React from 'react';
import avatar from "../../../Assets/avatar.png";

const contacts = [
  { id: 1, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 2, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 3, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 4, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 5, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 6, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 7, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 8, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 9, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 10, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 11, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 12, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 13, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 14, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 15, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 16, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 17, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 18, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
  { id: 19, name: 'John Smith', lastMessage: 'Hey, I am here for your help...', avatar: avatar },
];

const ChatsSidebar = () => {
  return (
    <div className="w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto">
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <div key={contact.id} className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full mr-4" />
            <div>
              <h2 className="font-semibold">{contact.name}</h2>
              <p className="text-gray-500 text-sm">{contact.lastMessage}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No contacts available.</p>
      )}
    </div>
  );
};

export default ChatsSidebar;
