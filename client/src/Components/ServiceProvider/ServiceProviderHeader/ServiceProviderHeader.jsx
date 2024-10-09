import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ServiceProviderHeader.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadNewNotificationsAction } from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import Logo from "../../../Assets/skillswift_logo.svg";
const ServiceProviderHeader = () => {
  const [showing, setShowing] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { loadNotificationLoader, notifications } = useSelector(
    (state) => state.loadNewNotificationsReducer
  );
  const toggleSidebar = () => {
    setShowing((prevShowing) => {
      const newShowing = !prevShowing;
      document.body.classList.toggle("no-scroll", newShowing);
      return newShowing;
    });
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  useEffect(() => {
    dispatch(loadNewNotificationsAction());
  }, [dispatch]);
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
                onClick={toggleSidebar}
              />
            </div>
            <div className="mr-10 lg:mr-28 flex lg:justify-center justify-end items-center">
              <img src={Logo} alt="" className="w-20 h-20" />
            </div>
          </div>
          <div className="logo-left hidden lg:w-5/12 lg:flex justify-end">
            <div className="mr-10 gap-6 flex">
              <div className="relative hidden lg:block">
                <Link to={"/service-provider-chat-section"}>
                  <img
                    src={require("../../../Assets/message.png")}
                    alt=""
                    className="w-5 h-5 cursor-pointer"
                  />
                </Link>
                {false ? (
                  <div className="dot w-2 h-2 bg-red-600 rounded-full absolute top-0 -right-1"></div>
                ) : (
                  ""
                )}
              </div>
              <div className="relative hidden lg:block">
                <Link to={"/service-provider-notification"}>
                  <img
                    src={require("../../../Assets/notification.png")}
                    alt=""
                    className="w-5 h-5 cursor-pointer"
                  />
                </Link>
                {!loadNotificationLoader && notifications?.length > 0 ? (
                  <div className="dot w-2 h-2 bg-red-600 rounded-full absolute top-0 right-0"></div>
                ) : (
                  ""
                )}
              </div>
              <Link to={"/service-provider-setting"}>
                <img
                  src={require("../../../Assets/settings.png")}
                  alt=""
                  className="w-5 h-5 cursor-pointer hover:rotate-[180deg] transition-transform ease-in-out duration-700"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="nav-bar hidden lg:flex justify-center gap-10 font-extralight text-xl mt-4">
          <div
            className={`${
              location.pathname === "/service-provider-home"
                ? " border-b-2 text-[#4e97fd] border-[#4e97fd] transition-all ease-linear duration-1000"
                : ""
            } nav-link cursor-pointer `}
          >
            <Link to={"/service-provider-home"}>HOME</Link>
          </div>
          <div
            className={`${
              location.pathname === "/service-provider-post"
                ? " border-b-2 text-[#4e97fd] border-[#4e97fd] transition-all ease-linear duration-1000"
                : ""
            } nav-link cursor-pointer `}
          >
            <Link to={"/service-provider-post"}>POST</Link>
          </div>
          <div
            className={`${
              location.pathname === "/service-provider-order"
                ? " border-b-2 text-[#4e97fd] border-[#4e97fd] transition-all ease-linear duration-1000"
                : ""
            } nav-link cursor-pointer `}
          >
            <Link to={"/service-provider-order"}>ORDERS</Link>
          </div>
          <div
            className={`${
              location.pathname === "/service-provider-dispute"
                ? " border-b-2 text-[#4e97fd] border-[#4e97fd] transition-all ease-linear duration-1000"
                : ""
            } nav-link cursor-pointer `}
          >
            <Link to={"/service-provider-dispute"}>DISPUTES</Link>
          </div>
        </div>
      </div>
      {showing && (
        <div
          className={`mobile-screen-container w-full h-screen bg-slate-800 absolute top-0 left-0 block lg:hidden z-20 ${
            showing ? "showing" : ""
          }`}
        >
          <div className="cross w-full flex justify-end py-3 px-5 mt-5">
            <div className="w-10 h-10">
              <img
                src={require("../../../Assets/close.png")}
                alt=""
                className="w-full h-full invert cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
          </div>
          <div className="icons-container w-full flex justify-center items-center bg-white h-20 mt-10">
            <div className="w-[70%] flex justify-between items-center">
              <div className="relative">
                <Link to={"/service-provider-chat-section"}>
                  <img
                    src={require("../../../Assets/message.png")}
                    alt=""
                    className="w-5 h-5 cursor-pointer"
                  />
                </Link>
                {false ? (
                  <div className="dot w-2 h-2 bg-red-600 rounded-full absolute top-0 -right-1"></div>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <Link to={"/service-provider-notification"}>
                  <img
                    src={require("../../../Assets/notification.png")}
                    alt=""
                    className="w-5 h-5 cursor-pointer"
                  />
                </Link>
                {false ? (
                  <div className="dot w-2 h-2 bg-red-600 rounded-full absolute top-0 right-0"></div>
                ) : (
                  ""
                )}
              </div>
              <Link to={"/service-provider-setting"}>
                <img
                  src={require("../../../Assets/settings.png")}
                  alt=""
                  className="w-5 h-5 cursor-pointer hover:rotate-[180deg] transition-transform ease-in-out duration-700"
                />
              </Link>
            </div>
          </div>
          <div className="mobile-screen-navbar-container flex flex-col justify-evenly">
            <div
              className={`${
                location.pathname === "/service-provider-home"
                  ? "text-[#4e97fd]"
                  : "text-white"
              } nav-link cursor-pointer h-14 flex items-center pl-8 my-10`}
            >
              <Link
                to={"/service-provider-home"}
                className="text-3xl font-light"
              >
                HOME
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div
              className={`${
                location.pathname === "/service-provider-post"
                  ? "text-[#4e97fd]"
                  : "text-white"
              } nav-link cursor-pointer h-14 flex items-center pl-8 my-10`}
            >
              <Link
                to={"/service-provider-post"}
                className=" font-extralight text-3xl"
              >
                POSTS
              </Link>
            </div>
            <div className="line w-full h-[0.2px] bg-white"></div>
            <div
              className={`${
                location.pathname === "/service-provider-order"
                  ? "text-[#4e97fd]"
                  : "text-white"
              } nav-link cursor-pointer h-14 flex items-center pl-8 my-10`}
            >
              <Link
                to={"/service-provider-order"}
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
