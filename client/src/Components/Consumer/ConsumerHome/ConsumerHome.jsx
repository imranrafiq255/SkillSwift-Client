import React, { useState } from "react";
import ConsumerSideBar from "../ConsumerSideBar/ConsumerSideBar";

const ConsumerHome = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(prevState => !prevState);
  };

  return (
    <div className="flex">
      <ConsumerSideBar isVisible={isSidebarVisible} />
      <div className="flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 m-4 bg-blue-500 text-white rounded"
        >
          {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        {/* Rest of your ConsumerHome content */}
        <div className="p-4">Rest of your ConsumerHome content</div>
      </div>
    </div>
  );
};

export default ConsumerHome;
