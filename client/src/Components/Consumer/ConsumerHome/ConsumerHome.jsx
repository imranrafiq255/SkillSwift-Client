import React, { useState } from "react";
import ConsumerSideBar from "../ConsumerSideBar/ConsumerSideBar";
import AdCard from "../ConsumerAdCard/AdCard";

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
        <div className="p-4 w-full flex flex-wrap gap-[1.25rem] justify-start">
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        <AdCard
          img={require("../../../Assets/HelpCentre.jpg")}
          name="David Bombal"
          title="I will Do House Cleaning"
          time="3 hours"
        />
        </div>
      </div>
    </div>
  );
};

export default ConsumerHome;
