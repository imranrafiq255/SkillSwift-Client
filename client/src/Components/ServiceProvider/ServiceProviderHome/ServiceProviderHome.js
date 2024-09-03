import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";
const ServiceProviderHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const myMessage = location?.state?.message || null;
  useEffect(() => {
    if (myMessage && !hasShownToast.current) {
      handleShowSuccessToast(myMessage);
      hasShownToast.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [myMessage, navigate, location.pathname]);
  return (
    <>
      <Toaster />
      <div className="home-container">
        <ServiceProviderHeader />
        <div className="under-header-container">
          <div className="line w-full h-[0.3px] bg-slate-700"></div>
          <div className="welcome-text mt-8">
            <h1 className="text-center text-lg lg:text-5xl font-bold">
              WELCOME TO SERVICE PROVIDER
            </h1>
          </div>
          <div className="posts lg:w-10/12 w-11/12 m-auto mt-8">
            <div className="border-2 border-slate-500 inline-block lg:px-8 px-4 lg:py-3 py-2">
              <h1 className="lg:text-xl text-xs font-light uppercase">
                Service Posts
              </h1>
            </div>
            <div className="service-posts w-full h-full flex flex-wrap mt-10">
              <div className="lg:w-6/12 xl:w-4/12 w-full">
                <div className="card w-full h-full p-5">
                  <img
                    src={require("../../../Assets/coffee with computer.jpeg")}
                    alt=""
                    className="w-full rounded-lg"
                  />
                  <div className="w-full bg-slate-600 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                        Window installation
                      </h1>
                      <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                        <h1 className="text-white font-bold">$ 49</h1>
                      </div>
                    </div>
                    <div className="message px-4 py-1">
                      <h1 className="text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nam laboriosam possimus vel veritatis aliquid optio
                      </h1>
                    </div>
                    <div className="flex mt-5 justify-between">
                      <h1 className="font-bold text-white px-4">
                        2 months ago
                      </h1>
                      <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                        <img
                          src={require("../../../Assets/star.png")}
                          alt=""
                          className="lg:w-5 lg:h-5 w-3 h-3"
                        />
                        <h1 className="text-xs mt-2">4.6</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-6/12 xl:w-4/12 w-full xl:h-[500px]">
                <div className="card w-full h-full p-5">
                  <img
                    src={require("../../../Assets/coffee with computer.jpeg")}
                    alt=""
                    className="w-full rounded-lg"
                  />
                  <div className="w-full bg-slate-600 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                        Window installation
                      </h1>
                      <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                        <h1 className="text-white font-bold">$ 49</h1>
                      </div>
                    </div>
                    <div className="message px-4 py-1">
                      <h1 className="text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nam laboriosam possimus vel veritatis aliquid optio
                      </h1>
                    </div>
                    <div className="flex mt-5 justify-between">
                      <h1 className="font-bold text-white px-4">
                        2 months ago
                      </h1>
                      <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                        <img
                          src={require("../../../Assets/star.png")}
                          alt=""
                          className="lg:w-5 lg:h-5 w-3 h-3"
                        />
                        <h1 className="text-xs mt-2">4.6</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-6/12 xl:w-4/12 w-full xl:h-[500px]">
                <div className="card w-full h-full p-5">
                  <img
                    src={require("../../../Assets/coffee with computer.jpeg")}
                    alt=""
                    className="w-full rounded-lg"
                  />
                  <div className="w-full bg-slate-600 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                        Window installation
                      </h1>
                      <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                        <h1 className="text-white font-bold">$ 49</h1>
                      </div>
                    </div>
                    <div className="message px-4 py-1">
                      <h1 className="text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nam laboriosam possimus vel veritatis aliquid optio
                      </h1>
                    </div>
                    <div className="flex mt-5 justify-between">
                      <h1 className="font-bold text-white px-4">
                        2 months ago
                      </h1>
                      <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                        <img
                          src={require("../../../Assets/star.png")}
                          alt=""
                          className="lg:w-5 lg:h-5 w-3 h-3"
                        />
                        <h1 className="text-xs mt-2">4.6</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-6/12 xl:w-4/12 w-full xl:h-[500px]">
                <div className="card w-full h-full p-5">
                  <img
                    src={require("../../../Assets/coffee with computer.jpeg")}
                    alt=""
                    className="w-full rounded-lg"
                  />
                  <div className="w-full bg-slate-600 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                        Window installation
                      </h1>
                      <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                        <h1 className="text-white font-bold">$ 49</h1>
                      </div>
                    </div>
                    <div className="message px-4 py-1">
                      <h1 className="text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nam laboriosam possimus vel veritatis aliquid optio
                      </h1>
                    </div>
                    <div className="flex mt-5 justify-between">
                      <h1 className="font-bold text-white px-4">
                        2 months ago
                      </h1>
                      <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                        <img
                          src={require("../../../Assets/star.png")}
                          alt=""
                          className="lg:w-5 lg:h-5 w-3 h-3"
                        />
                        <h1 className="text-xs mt-2">4.6</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-6/12 xl:w-4/12 w-full xl:h-[500px]">
                <div className="card w-full h-full p-5">
                  <img
                    src={require("../../../Assets/coffee with computer.jpeg")}
                    alt=""
                    className="w-full rounded-lg"
                  />
                  <div className="w-full bg-slate-600 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                        Window installation
                      </h1>
                      <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                        <h1 className="text-white font-bold">$ 49</h1>
                      </div>
                    </div>
                    <div className="message px-4 py-1">
                      <h1 className="text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nam laboriosam possimus vel veritatis aliquid optio
                      </h1>
                    </div>
                    <div className="flex mt-5 justify-between">
                      <h1 className="font-bold text-white px-4">
                        2 months ago
                      </h1>
                      <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                        <img
                          src={require("../../../Assets/star.png")}
                          alt=""
                          className="lg:w-5 lg:h-5 w-3 h-3"
                        />
                        <h1 className="text-xs mt-2">4.6</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-6/12 xl:w-4/12 w-full xl:h-[500px]">
                <div className="card w-full h-full p-5">
                  <img
                    src={require("../../../Assets/coffee with computer.jpeg")}
                    alt=""
                    className="w-full rounded-lg"
                  />
                  <div className="w-full bg-slate-600 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                        Window installation
                      </h1>
                      <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                        <h1 className="text-white font-bold">$ 49</h1>
                      </div>
                    </div>
                    <div className="message px-4 py-1">
                      <h1 className="text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nam laboriosam possimus vel veritatis aliquid optio
                      </h1>
                    </div>
                    <div className="flex mt-5 justify-between">
                      <h1 className="font-bold text-white px-4">
                        2 months ago
                      </h1>
                      <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                        <img
                          src={require("../../../Assets/star.png")}
                          alt=""
                          className="lg:w-5 lg:h-5 w-3 h-3"
                        />
                        <h1 className="text-xs mt-2">4.6</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="see-more-btn w-11/12 flex justify-end lg:mt-10">
            <div className="btn lg:w-40 lg:h-10 w-28 h-8 flex justify-center items-center bg-slate-700 text-white rounded-xl shadow-2xl cursor-pointer hover:bg-slate-600 lg:mr-5 lg:mt-6">
              See more{" "}
              <span>
                <img
                  src={require("../../../Assets/right-arrow.png")}
                  alt=""
                  className="lg:w-6 lg:h-6 w-4 h-4 invert ml-2"
                />
              </span>
            </div>
          </div>
          <div className="footer mt-10">
            <ServiceProviderFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderHome;
