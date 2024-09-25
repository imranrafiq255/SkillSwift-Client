import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadCurrentServiceProviderAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
const ServiceProviderSetting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceProviderErrorToastMessage = useRef(false);
  const { serviceProvider, serviceProviderLoading, serviceProviderError } =
    useSelector((state) => state.loadCurrentServiceProviderReducer);
  const signOutHandler = async () => {
    try {
      const response = await axios.get("/api/v1/service-provider/sign-out");
      window.location.href = `/service-provider-sign-in?message=${response?.data?.message}`;
    } catch (error) {
      handleShowFailureToast(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadCurrentServiceProviderAction());
  }, [dispatch]);
  useEffect(() => {
    if (
      !serviceProviderLoading &&
      serviceProviderError &&
      !serviceProviderErrorToastMessage.current
    ) {
      console.log(serviceProviderError);
    }
  }, [
    serviceProviderLoading,
    serviceProviderError,
    serviceProviderErrorToastMessage,
  ]);
  return (
    <>
      <div className="setting-container">
        <div className="top-border h-20 w-full bg-[#dadada] flex justify-center items-center">
          <div className="lg:w-[80%] xl:w-[60%] flex items-center gap-14 xl:gap-5 lg:gap-10">
            <img
              src={require("../../../Assets/left-arrow.png")}
              alt=""
              className="w-6 h-6 lg:w-7 lg:h-7 xl:w-10 xl:h-10 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-lg lg:text-lg xl:text-2xl font-bold text-[#4e97fd] uppercase">
              Service Provider Setting
            </h1>
          </div>
        </div>
        <div className="setting flex justify-center">
          <div className="w-11/12 lg:w-8/12 xl:w-6/12 flex flex-col items-center mt-5 bg-slate-200 rounded-2xl">
            <div className="profile-pic h-[200px] w-[200px] rounded-full border-slate-700 border-2 flex justify-center items-center p-2 relative mt-4">
              <img
                src={
                  !serviceProviderLoading &&
                  serviceProvider &&
                  serviceProvider?.serviceProviderAvatar
                }
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="setting-options flex flex-col items-center w-full my-10 gap-5">
              <Link
                className="w-[90%] lg:w-[70%] xl:w-[50%]"
                to={"/service-provider-upload-info"}
              >
                <div className="option w-full h-14 flex bg-[#f0f0f0f0] shadow-lg rounded-lg items-center justify-around cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700 hover:bg-[#dcdbdbf0]">
                  <div className="basis-[80%]">
                    <h1 className="text-black text-center">UPLOAD INFO</h1>
                  </div>
                  <div className="basis-[20%]">
                    <img
                      src={require("../../../Assets/next-arrow.png")}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </Link>
              <Link
                className="w-[90%] lg:w-[70%] xl:w-[50%]"
                to={"/service-provider-add-time"}
              >
                <div className="option w-full h-14 flex bg-[#f0f0f0f0] shadow-lg rounded-lg items-center justify-around cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700 hover:bg-[#dcdbdbf0]">
                  <div className="basis-[80%]">
                    <h1 className="text-black text-center">
                      ADD WORKING HOURS
                    </h1>
                  </div>
                  <div className="basis-[20%]">
                    <img
                      src={require("../../../Assets/next-arrow.png")}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </Link>
              <Link
                className="w-[90%] lg:w-[70%] xl:w-[50%]"
                to={"/service-provider-post"}
              >
                <div className="option w-full h-14 flex bg-[#f0f0f0f0] shadow-lg rounded-lg items-center justify-around cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700 hover:bg-[#dcdbdbf0]">
                  <div className="basis-[80%]">
                    <h1 className="text-black text-center uppercase">
                      Manage Posts
                    </h1>
                  </div>
                  <div className="basis-[20%]">
                    <img
                      src={require("../../../Assets/next-arrow.png")}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </Link>
              <Link
                className="w-[90%] lg:w-[70%] xl:w-[50%]"
                to={"/service-provider-order"}
              >
                <div className="option w-full h-14 flex bg-[#f0f0f0f0] shadow-lg rounded-lg items-center justify-around cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700 hover:bg-[#dcdbdbf0]">
                  <div className="basis-[80%]">
                    <h1 className="text-black text-center uppercase">
                      Manage Orders
                    </h1>
                  </div>
                  <div className="basis-[20%]">
                    <img
                      src={require("../../../Assets/next-arrow.png")}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </Link>
              <Link
                className="w-[90%] lg:w-[70%] xl:w-[50%]"
                to={"/service-provider-chat-section"}
              >
                <div className="option w-full h-14 flex bg-[#f0f0f0f0] shadow-lg rounded-lg items-center justify-around cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700 hover:bg-[#dcdbdbf0]">
                  <div className="basis-[80%]">
                    <h1 className="text-black text-center uppercase">
                      Open Chat Section
                    </h1>
                  </div>
                  <div className="basis-[20%]">
                    <img
                      src={require("../../../Assets/next-arrow.png")}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </Link>
              <Link
                className="w-[90%] lg:w-[70%] xl:w-[50%]"
                to={"/service-provider-sign-in"}
              >
                <div className="option w-full h-14 flex bg-[#f0f0f0f0] shadow-lg rounded-lg items-center justify-around cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700 hover:bg-[#dcdbdbf0]">
                  <div className="basis-[80%]">
                    <h1 className="text-black text-center uppercase">LOGIN</h1>
                  </div>
                  <div className="basis-[20%]">
                    <img
                      src={require("../../../Assets/next-arrow.png")}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </Link>
              <Link
                className="w-[90%] lg:w-[70%] xl:w-[50%]"
                onClick={signOutHandler}
              >
                <div className="option w-full h-14 flex bg-[#f0f0f0f0] shadow-lg rounded-lg items-center justify-around cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700 hover:bg-[#dcdbdbf0]">
                  <div className="basis-[80%]">
                    <h1 className="text-black text-center uppercase">LOGOUT</h1>
                  </div>
                  <div className="basis-[20%]">
                    <img
                      src={require("../../../Assets/logout.png")}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderSetting;
