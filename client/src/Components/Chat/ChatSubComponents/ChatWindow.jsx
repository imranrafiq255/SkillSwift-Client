import React from "react";
import johnAvatar from "../../../Assets/avatar2.png";
import myAvatar from "../../../Assets/avatar.png";

const messages = [
  {
    id: 1,
    sender: "Me",
    text: "Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?",
    timestamp: "16 Aug 2024",
    avatar: johnAvatar,
  },
  {
    id: 2,
    sender: "John",
    text: "Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?Hey, John I wanted some help?",
    timestamp: "16 Aug 2024",
    avatar: myAvatar,
  },
  {
    id: 3,
    sender: "Me",
    text: "Hey, John I wanted some help?",
    timestamp: "16 Aug 2024",
    avatar: johnAvatar,
  },
  {
    id: 4,
    sender: "John",
    text: "Hey, Customer how can I help you?",
    timestamp: "16 Aug 2024",
    avatar: myAvatar,
  },
  {
    id: 5,
    sender: "John",
    text: "Hey, Customer how can I help you?",
    timestamp: "16 Aug 2024",
    avatar: myAvatar,
  },
  {
    id: 6,
    sender: "John",
    text: "Hey, Customer how can I help you?",
    timestamp: "16 Aug 2024",
    avatar: myAvatar,
  },{
    id: 7,
    sender: "John",
    text: "Hey, Customer how can I help you?",
    timestamp: "16 Aug 2024",
    avatar: myAvatar,
  },
  {
    id: 8,
    sender: "John",
    text: "Hey, Customer how can I help you?",
    timestamp: "16 Aug 2024",
    avatar: myAvatar,
  },
  {
    id: 9,
    sender: "John",
    text: "Hey, Customer how can I help you?",
    timestamp: "16 Aug 2024",
    avatar: myAvatar,
  },
];

const ChatWindow = () => {
  return (
    <div className="flex-1 bg-white flex flex-col overflow-y-auto">
      <div className="flex-1 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start mb-4 ${
              message.sender === "Me" ? "flex-row-reverse" : ""
            }`}
          >
            <img
              src={message.avatar}
              alt={message.sender}
              className="w-10 h-10 rounded-full m-2"
            />
            <div
              className={`p-2 rounded-lg ${
                message.sender === "Me"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-200"
              }`}
            >
              <p className="text-sm text-gray-500">{message.timestamp}</p>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
