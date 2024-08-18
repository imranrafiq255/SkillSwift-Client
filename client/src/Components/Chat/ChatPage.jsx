import React from "react";
import Sidebar from "./ChatSubComponents/ChatsSidebar";
import ChatWindow from "./ChatSubComponents/ChatWindow";
import InputField from "./ChatSubComponents/ChatInputField";
import ChatTopBar from "./ChatSubComponents/ChatTopBar";
import avatar from "../../Assets/avatar.png";

function ChatPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ChatTopBar avatar={avatar} name={"John Smith"} status={"active"} />
        <ChatWindow />
        <InputField />
      </div>
    </div>
  );
}

export default ChatPage;
