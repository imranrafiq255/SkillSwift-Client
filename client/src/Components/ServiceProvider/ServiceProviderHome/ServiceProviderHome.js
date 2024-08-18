import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
const ServiceProviderHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const myMessage = location.state.message || null;
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
      <div>ServiceProviderHome</div>;
    </>
  );
};

export default ServiceProviderHome;
