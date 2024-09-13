import React, { useState } from "react";
import "./ServiceProviderChatSection.css";
import { useNavigate } from "react-router-dom";
const ServiceProviderChatSection = () => {
  const [chatSectionShowing, setChatSectionShowing] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="chat-section-container">
        <div className="top-border h-20 w-full bg-[#dadada] flex justify-center items-center">
          <div className="lg:w-[80%] xl:w-[60%] flex items-center gap-8 xl:gap-5 lg:gap-10">
            <img
              src={require("../../../Assets/left-arrow.png")}
              alt=""
              className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            />
            <h1 className="text-lg lg:text-lg xl:text-2xl font-bold text-[#4e97fd] uppercase">
              Service Provider Chat Section
            </h1>
          </div>
        </div>
        <div className="bottom-section-container w-full flex justify-center py-5 bg-[#f6f9fc] h-screen">
          <div className="bottom-section w-full lg:w-11/12 xl:w-10/12">
            <div className="flex justify-between items-center px-3">
              <h1 className=" w-text-sm ml-1 xl:ml-0 lg:text-lg xl:text-xl font-light">
                All messages
              </h1>
              <div
                className="flex items-center gap-2 lg:hidden"
                onClick={() => setChatSectionShowing(!chatSectionShowing)}
              >
                <h1 className="font-light">Chats</h1>
                <img
                  src={require("../../../Assets/down-arrow.png")}
                  alt=""
                  className={`${
                    chatSectionShowing
                      ? "rotate-180 transition-transform duration-700 ease-in-out"
                      : "rotate-0 transition-transform duration-700 ease-in-out"
                  } w-4 h-4`}
                />
              </div>
            </div>
            <div className="w-full flex gap-4 mt-4 relative">
              <div className="left-chat-section w-3/12 border-2 border-slate-300 rounded-lg h-[50rem] lg:block hidden">
                <div className="chat-container flex flex-col items-center py-5">
                  <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                    <div className="profile basis-[60%] lg:basis-[50%] xl:basis-[20%] flex justify-center items-center">
                      <img
                        src={require("../../../Assets/avatar.png")}
                        alt=""
                        className="w-[0.5rem] h-[0.5rem] lg:h-[1rem] lg:w-[1rem] xl:h-[3rem] xl:w-[3rem] rounded-full"
                      />
                    </div>
                    <div className="name basis-[60%] lg:basis-[50%] xl:basis-[80%]">
                      <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-2">
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
              <div className="right-chat-section w-full xl:w-9/12 h-[35rem] lg:h-[40rem] xl:h-[50rem] lg:p-0 p-4 bg-[#f6f9fc]">
                <div className="">
                  <div className="top w-full h-[45rem] border-2 border-slate-300 rounded-lg relative">
                    <div className="top-user-name flex items-center absolute top-0 left-0 w-full h-[4rem] bg-white rounded-tl-[5px] rounded-tr-[5px] shadow-md">
                      <div className="profile basis-[30%] lg:basis-[20%] xl:basis-[10%] flex justify-center">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full shadow-2xl"
                        />
                      </div>
                      <div className="profile basis-[70%] lg:basis-[80%] xl:basis-[90%] -ml-3">
                        <h1 className="font-semibold">Imran Malik</h1>
                        <h1 className="text-sm text-[#878787]">
                          last seen 5 minutes ago
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="bottom w-full h-[4rem]  mt-[1rem] relative">
                    <input
                      type="text"
                      className="border-2 border-slate-300 rounded-2xl w-full h-full outline-none lg:text-[1.5rem] pl-4 pr-20"
                      placeholder="Enter what's in your mind..."
                    />
                    <img
                      src={require("../../../Assets/submit.png")}
                      alt=""
                      className="w-9 h-9 lg:w-10 lg:h-10 absolute top-4 right-7 lg:top-3 lg:right-5 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              {chatSectionShowing && (
                <div className="absolute top-0 right-2 w-8/12 bg-slate-300 h-[40rem] xl:hidden rounded-xl overflow-scroll">
                  <div className="chat-container flex flex-col items-center py-5 ">
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden overflow-y-scroll">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden overflow-y-scroll">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden overflow-y-scroll">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                    <div className="chat w-[90%] h-[4rem] bg-[#E5EFFC] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden">
                      <div className="profile w-3/12 flex justify-center items-center ">
                        <img
                          src={require("../../../Assets/avatar.png")}
                          alt=""
                          className="w-[3rem] h-[3rem] rounded-full"
                        />
                      </div>
                      <div className="name w-9/12">
                        <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                          Imran Malik
                        </h1>
                        <h1 className="message ml-2 truncate-text-2 text-sm">
                          hey dear i am using skillswift the thing is
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderChatSection;
