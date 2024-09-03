import React from "react";
import "./ServiceProviderChatSection.css";
const ServiceProviderChatSection = () => {
  return (
    <>
      <div className="chat-section-container">
        <div className="top-border h-20 w-full bg-[#dadada] flex justify-center items-center">
          <div className="lg:w-[80%] xl:w-[60%] flex items-center gap-14 xl:gap-5 lg:gap-10">
            <img
              src={require("../../../Assets/left-arrow.png")}
              alt=""
              className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 cursor-pointer"
            />
            <h1 className="text-lg lg:text-lg xl:text-2xl font-bold text-[#4e97fd] uppercase">
              Service Provider Chat Section
            </h1>
          </div>
        </div>
        <div className="bottom-section-container w-full flex justify-center py-5">
          <div className="bottom-section w-10/12 ">
            <h1 className="mt-10 text-xl font-light">All messages</h1>
            <div className="w-full flex gap-4 mt-4">
              <div className="left-chat-section w-3/12 border-2 border-slate-300 rounded-lg h-[50rem]">
                <div className="chat-container flex flex-col items-center py-5">
                  <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer">
                    <div className="profile basis-[20%] flex justify-center items-center">
                      <img
                        src={require("../../../Assets/avatar.png")}
                        alt=""
                        className="h-[3rem] w-[3rem] rounded-full"
                      />
                    </div>
                    <div className="name basis-[80%]">
                      <h1 className="text-lg font-bold mx-2 mt-2">
                        Imran Malik
                      </h1>
                      <h1 className="message ml-2 truncate-text text-sm">
                        hey dear i am using skillswift the thing is
                      </h1>
                    </div>
                  </div>
                  <div className="chat w-[90%] h-[4rem] flex rounded-lg mb-3 cursor-pointer">
                    <div className="profile basis-[20%] flex justify-center items-center">
                      <img
                        src={require("../../../Assets/avatar.png")}
                        alt=""
                        className="h-[3rem] w-[3rem] rounded-full"
                      />
                    </div>
                    <div className="name basis-[80%]">
                      <h1 className="text-lg font-bold mx-2 mt-2">
                        Imran Malik
                      </h1>
                      <h1 className="message ml-2 truncate-text text-sm">
                        hey dear i am using skillswift the thing is
                      </h1>
                    </div>
                  </div>
                  <div className="chat w-[90%] h-[4rem] flex rounded-lg mb-3 cursor-pointer">
                    <div className="profile basis-[20%] flex justify-center items-center">
                      <img
                        src={require("../../../Assets/avatar.png")}
                        alt=""
                        className="h-[3rem] w-[3rem] rounded-full"
                      />
                    </div>
                    <div className="name basis-[80%]">
                      <h1 className="text-lg font-bold mx-2 mt-2">
                        Imran Malik
                      </h1>
                      <h1 className="message ml-2 truncate-text text-sm">
                        hey dear i am using skillswift the thing is
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-chat-section w-9/12 h-[50rem]">
                <div className="top w-full h-[45rem] border-2 border-slate-300 rounded-lg"></div>
                <div className="bottom w-full h-[4rem]  mt-[0.8rem] relative">
                  <input
                    type="text"
                    className="border-2 border-slate-300 rounded-2xl w-full h-full outline-none text-[1.5rem] pl-4 pr-20"
                    placeholder="Enter what's in your mind..."
                  />
                  <img
                    src={require("../../../Assets/submit.png")}
                    alt=""
                    className="w-10 h-10 absolute top-3 right-5 cursor-pointer"
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

export default ServiceProviderChatSection;
