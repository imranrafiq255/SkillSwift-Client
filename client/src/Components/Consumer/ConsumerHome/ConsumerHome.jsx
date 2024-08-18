import React, { useEffect, useRef, useState } from "react";
import ConsumerSideBar from "../ConsumerSideBar/ConsumerSideBar";
import AdCard from "../ConsumerAdCard/AdCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";

const ConsumerHome = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  const message = location.state?.message || null;

  useEffect(() => {
    if (message && !hasShownToast.current) {
      handleShowSuccessToast(message);
      hasShownToast.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [message, navigate, location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <Toaster />
      <ConsumerSideBar isVisible={isSidebarVisible} />
      <div className="flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 m-4 bg-blue-500 text-white rounded"
        >
          {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
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
