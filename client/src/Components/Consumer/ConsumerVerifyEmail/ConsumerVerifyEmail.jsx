import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import LoaderBars from "../../Loader/LoaderBars";
import { Toaster } from "react-hot-toast";
const ConsumerVerifyEmail = () => {
  const { token } = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const toastMessageRef = useRef(false);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `/api/v1/consumer/confirm-email/${token}`
        );
        setLoading(false);
        if (!toastMessageRef.current) {
          toastMessageRef.current = true;
          handleShowSuccessToast(response?.data?.message);
          setVerified(true);
          setTimeout(() => {
            navigate("/consumer-upload-info");
          }, 2000);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
        handleShowFailureToast(error?.response?.data?.message);
        setLoading(false);
      }
    };
    verifyEmail();
  }, [token, navigate]);
  return (
    <>
      <Toaster />
      <div className="verify-email-container w-screen h-screen flex flex-col justify-center items-center">
        {isLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <LoaderBars />
          </div>
        ) : (
          <div className="lg:w-[30%] w-[70%] h-full flex flex-col items-center lg:justify-items-start justify-center gap-6">
            <img
              src={require("../../../Assets/verify-email-tick.png")}
              alt=""
              className="w-40 h-40"
            />
            {verified ? (
              <h1 className="text-center text-xl font-bold">Email Verified</h1>
            ) : (
              <h1 className="text-center text-xl font-bold">
                Email Is Not Verified
              </h1>
            )}
            {verified ? (
              <h1 className="text-center">
                Your email address is verified successfully.
              </h1>
            ) : (
              <h1 className="text-red-500">
                Your email address is not verified.
              </h1>
            )}
            <button
              className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd]"
              onClick={() => navigate("/consumer-home")}
            >
              Go to My Account
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ConsumerVerifyEmail;
