import React, { useState } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const [navigator, setNavigator] = useState("consumer");
  const navigate = useNavigate();
  const moduleNavigator = () => {
    if (navigator === "consumer") {
      navigate("/consumer-sign-in");
    } else if (navigator === "serviceProvider") {
      navigate("/service-provider-sign-in");
    }
  };
  return (
    <>
      <div className="consumer-sign-up-container w-screen h-screen flex justify-center">
        <div className="left-side w-full sm:w-8/12 xl:w-6/12 h-screen flex justify-center mt-28 lg:mt-0 lg:items-center">
          <div className="form-container w-full lg:w-10/12 xl:w-8/12 h-2/4 ml-8 lg:ml-4">
            <div className="line h-1 w-6 bg-slate-800"></div>
            <div className="mt-10">
              <h1 className="text-4xl font-serif text-[#441ed1] font-bold">
              SkillSwift: Where Skills and Needs Click for Perfect Solutions!
              </h1>
            </div>
            <div className="mt-10">
              <h1 className="font-serif text-slate-600 font-light">
              Bridging talented professionals with those seeking top-notch services for a perfect match.
              </h1>
            </div>
            <div className="mt-10">
              <div
                className={`btn1 w-11/12 h-14 flex justify-center items-center text-sm rounded-md cursor-pointer  ${
                  navigator === "consumer"
                    ? "bg-[#00f] text-white"
                    : "bg-slate-300 hover:bg-[#00f] hover:text-white transition-colors ease-in-out duration-700"
                }`}
                onClick={() => setNavigator("consumer")}
              >
                Continue as Consumer
              </div>
              <div
                className={`btn2 mt-2 w-11/12 h-14 flex justify-center items-center text-sm rounded-md cursor-pointer  ${
                  navigator === "serviceProvider"
                    ? "bg-[#00f] text-white"
                    : "bg-slate-300 hover:bg-[#00f] hover:text-white transition-colors ease-in-out duration-700"
                }`}
                onClick={() => setNavigator("serviceProvider")}
              >
                Continue as Service Provider
              </div>
              <button
                className="btn w-11/12 h-10 mt-10 bg-black text-white flex justify-center items-center text-sm rounded-3xl cursor-pointer hover:bg-[#00f] hover:text-white transition-colors ease-in-out duration-700"
                onClick={moduleNavigator}
              >
                Get started!
              </button>
            </div>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../Assets/WelcomeScreenIllustrator.jpg")}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Welcome;
