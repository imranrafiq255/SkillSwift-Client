import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ServiceProviderHeader.css";
const ServiceProviderHeader = () => {
  const [showing, setShowing] = useState(false);
  return (
    <>
      <div className="header-container h-[100px] lg:h-[200px] w-full">
        <div className="w-full flex items-end flex-wrap lg:h-[50%] h-[80%]">
          <div className="logo w-full items-center lg:w-7/12 flex lg:justify-end justify-between">
            <div className="menu-bar lg:hidden flex items-center px-10">
              <img
                src={require("../../../Assets/menu-bar-icon.png")}
                alt=""
                className="w-10 h-10 cursor-pointer"
                onClick={() => setShowing(!showing)}
              />
            </div>
            <div className="mr-10 lg:mr-28 flex lg:justify-center justify-end items-center">
              <img
                src={require("../../../Assets/puma-logo.png")}
                alt=""
                className="w-20 h-14"
              />
            </div>
          </div>
          <div className="logo-left hidden lg:w-5/12 lg:flex justify-end">
            <div className="mr-10 gap-6 flex">
              <div className="relative hidden lg:block">
                <img
                  src={require("../../../Assets/message.png")}
                  alt=""
                  className="w-5 h-5 cursor-pointer"
                />
                {false ? (
                  <div className="dot w-2 h-2 bg-red-600 rounded-full absolute top-0 -right-1"></div>
                ) : (
                  ""
                )}
              </div>
              <div className="relative hidden lg:block">
                <img
                  src={require("../../../Assets/notification.png")}
                  alt=""
                  className="w-5 h-5 cursor-pointer"
                />
                {false ? (
                  <div className="dot w-2 h-2 bg-red-600 rounded-full absolute top-0 right-0"></div>
                ) : (
                  ""
                )}
              </div>
              <img
                src={require("../../../Assets/settings.png")}
                alt=""
                className="w-5 h-5 cursor-pointer hover:rotate-[180deg] transition-transform ease-in-out duration-700"
              />
            </div>
          </div>
        </div>
        <div className="nav-bar hidden lg:flex justify-center gap-10 font-extralight text-xl mt-4">
          <div className="nav-link cursor-pointer text-[#4e97fd]">HOME</div>
          <div className="nav-link cursor-pointer">POST</div>
          <div className="nav-link cursor-pointer">SERVICES</div>
          <div className="nav-link cursor-pointer">ORDERS</div>
        </div>
      </div>
      {showing && (
        <div
          className={`mobile-screen-container w-[80%] h-screen bg-slate-800 absolute top-0 left-0 block lg:hidden ${
            showing ? "showing" : ""
          }`}
        >
          <div className="cross w-full flex justify-end py-3 px-5 mt-5">
            <div className="w-10 h-10">
              <img
                src={require("../../../Assets/close.png")}
                alt=""
                className="w-full h-full invert cursor-pointer"
                onClick={() => setShowing(!showing)}
              />
            </div>
          </div>
          <div className="icons-container w-full flex justify-center items-center bg-white h-20 mt-10">
            <div className="w-[70%] flex justify-between items-center">
              <div className="relative">
                <img
                  src={require("../../../Assets/message.png")}
                  alt=""
                  className="w-5 h-5 cursor-pointer"
                />
                {false ? (
                  <div className="dot w-2 h-2 bg-red-600 rounded-full absolute top-0 -right-1"></div>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <img
                  src={require("../../../Assets/notification.png")}
                  alt=""
                  className="w-5 h-5 cursor-pointer"
                />
                {false ? (
                  <div className="dot w-2 h-2 bg-red-600 rounded-full absolute top-0 right-0"></div>
                ) : (
                  ""
                )}
              </div>
              <img
                src={require("../../../Assets/settings.png")}
                alt=""
                className="w-5 h-5 cursor-pointer hover:rotate-[180deg] transition-transform ease-in-out duration-700"
              />
            </div>
          </div>
          <div className="mobile-screen-navbar-container flex flex-col justify-evenly">
            <div className="nav-link cursor-pointer text-[#4e97fd] h-14 flex items-center pl-8 my-10">
              <Link
                to={"/service-provider-home"}
                className="text-3xl font-light"
              >
                HOME
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div className="nav-link cursor-pointer h-14 flex items-center pl-8 text-white my-10">
              <Link
                to={"/service-provider-home"}
                className=" font-extralight text-3xl"
              >
                POSTS
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div className="nav-link cursor-pointer h-14 flex items-center pl-8 text-white my-10">
              <Link
                to={"/service-provider-home"}
                className="text-3xl font-extralight"
              >
                SERVICES
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div className="nav-link cursor-pointer  h-14 flex items-center pl-8 text-white my-10">
              <Link
                to={"/service-provider-home"}
                className="text-3xl font-extralight"
              >
                ORDERS
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceProviderHeader;
