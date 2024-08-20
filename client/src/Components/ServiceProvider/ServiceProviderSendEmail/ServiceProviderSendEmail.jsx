import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
const ServiceProviderSendEmail = () => {
  const location = useLocation();
  const messageRef = useRef(false);
  const navigate = useNavigate();
  const message = location.state?.message || null;

  useEffect(() => {
    if (message && !messageRef.current) {
      messageRef.current = true;
      handleShowSuccessToast(message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [message, navigate, location.pathname]);
  return (
    <>
      <Toaster />
      <div className="consumer-send-email-container w-screen">
        <div className="image flex justify-center mt-40 lg:mt-20">
          <img
            src={require("../../../Assets/sendEmailAvatar.jpg")}
            alt=""
            className="w-[30%] h-[30%]"
          />
        </div>
        <div className="message">
          <h1 className="font-extralight text-center">
            We've sent an email link to your email address
            <span className="font-semibold"></span>, Please check your inbox.
          </h1>
          <div className="flex justify-center mt-12">
            <a
              href="https://www.gmail.com"
              className="text-center bg-[#4e97fd] hover:bg-[#68a5fa] px-14 py-4 text-white"
            >
              Open Gmail?
            </a>
          </div>
          <div />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderSendEmail;
