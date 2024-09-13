import React from "react";
import { useNavigate } from "react-router-dom";
const ServiceProviderNotification = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="notification-container">
        <div className="top-border h-20 w-full bg-[#dadada] flex justify-center items-center">
          <div className="lg:w-[80%] xl:w-[60%] flex items-center gap-14 xl:gap-5 lg:gap-10">
            <img
              src={require("../../../Assets/left-arrow.png")}
              alt=""
              className="w-6 h-6 lg:w-7 lg:h-7 xl:w-10 xl:h-10 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-lg lg:text-lg xl:text-2xl font-bold text-[#4e97fd] uppercase">
              Service Provider Notification
            </h1>
          </div>
        </div>
        <div className="notification-message ml-10 my-4">
          <h1 className="font-bold text-2xl">Notifications</h1>
        </div>
        <div className="notification flex justify-center">
          <div className="center w-full p-5 lg:w-10/12 xl:w-5/12">
            <div className="notification-card shadow-2xl w-full bg-[#c8c8c8] rounded-md flex items-center relative">
              <img
                src={require("../../../Assets/avatar.png")}
                alt=""
                className="w-14 h-14 m-7 rounded-full"
              />
              <div>
                <h1 className="text-sm font-bold text-[#4e97fd]">John Doe</h1>
                <p className="text-sm text-[#878787]">You have a new message</p>
              </div>
              <div className="read absolute bottom-3 right-3">
                <div className="btn flex items-center gap-1 bg-black py-1 px-2 rounded-xl cursor-pointer">
                  <h1 className="text-white text-xs">Read</h1>
                  <img
                    src={require("../../../Assets/up-arrows.png")}
                    alt=""
                    className="w-3 h-3 invert animate-pulse"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderNotification;
