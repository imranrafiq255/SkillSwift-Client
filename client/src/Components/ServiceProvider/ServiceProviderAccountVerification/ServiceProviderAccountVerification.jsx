import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
const ServiceProviderAccountVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const myMessage = location.state.message || null;
  const hasShownToast = useRef(false);
  useEffect(() => {
    if (myMessage && !hasShownToast.current) {
      handleShowSuccessToast(myMessage);
      hasShownToast.current = true;
      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [myMessage, navigate, location.pathname]);
  return (
    <>
      <Toaster />
      <div className=" w-screen flex justify-center items-center flex-col">
        <img
          src={require("../../../Assets/account-verification-illustrator.jpg")}
          alt=""
          className="w-[35%] h-[35%] mt-10"
        />
        <h1 className="font-bold text-3xl">
          {" "}
          <span className="text-[#4e97fd] text-5xl">ACCOUNT</span> IS NOT
          VERIFIED
        </h1>
        <p className="mt-5 font-semibold text-[#4e97fd]">
          Please wait for your account verification request approval!
        </p>
      </div>
      ;
    </>
  );
};

export default ServiceProviderAccountVerification;
