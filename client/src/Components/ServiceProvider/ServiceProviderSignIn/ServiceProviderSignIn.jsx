import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./ServiceProviderSignIn.css";
import { useDispatch, useSelector } from "react-redux";
import {
  serviceProviderSignInAction,
  clearErrors,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import LoaderCircles from "../../Loader/LoaderCircles";
import axios from "axios";
import { useLocation } from "react-router-dom";
// Validation schema
const validationSchema = Yup.object({
  serviceProviderEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  serviceProviderPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const location = useLocation();
  const [eyeToggler, setEyeToggler] = useState(false);
  const { loading, message, error } = useSelector(
    (state) => state.serviceProviderSignInReducer
  );
  const dispatch = useDispatch();

  const eyeTogglerHandler = () => {
    setEyeToggler((prevState) => !prevState);
    passwordRef.current.type = eyeToggler ? "password" : "text";
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(clearErrors());
      dispatch(serviceProviderSignInAction(values));
    } catch (err) {
      console.log("Sign-in error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      serviceProviderEmail: "",
      serviceProviderPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log(error);
        handleShowFailureToast(error);
      } else if (message) {
        console.log(message);
        const loadServiceProvider = async () => {
          const response = await axios.get(
            "/api/v1/service-provider/load-current-service-provider"
          );
          if (response.data) {
            if (response.data.serviceProvider.isAccountVerified) {
              navigate("/service-provider-home", { state: { message } });
            } else {
              navigate(
                "/service-provider-account-verification/your account is not verified",
                { state: { message: "Your account is not verified" } }
              );
            }
          }
        };
        loadServiceProvider();
      }
    }
  }, [loading, message, error, navigate]);
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
      <div className="sign-in-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-in-container w-10/12 sm:w-8/12 lg:w-6/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Sign in
              </h1>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="sign-in-form bg-white w-full h-full"
            >
              <div className="email">
                <label htmlFor="serviceProviderEmail">Your email</label> <br />
                <input
                  type="email"
                  id="serviceProviderEmail"
                  name="serviceProviderEmail"
                  value={formik.values.serviceProviderEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl ${
                    formik.touched.serviceProviderEmail &&
                    formik.errors.serviceProviderEmail
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your email"
                />
                {formik.touched.serviceProviderEmail &&
                formik.errors.serviceProviderEmail ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.serviceProviderEmail}
                  </div>
                ) : null}
              </div>
              <div className="password mt-5 relative">
                <label htmlFor="serviceProviderPassword">Password</label> <br />
                <input
                  type={eyeToggler ? "text" : "password"}
                  id="serviceProviderPassword"
                  name="serviceProviderPassword"
                  value={formik.values.serviceProviderPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={passwordRef}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl pr-12 ${
                    formik.touched.serviceProviderPassword &&
                    formik.errors.serviceProviderPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                />
                {formik.touched.serviceProviderPassword &&
                formik.errors.serviceProviderPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.serviceProviderPassword}
                  </div>
                ) : null}
                <img
                  src={
                    eyeToggler
                      ? require("../../../Assets/hiddenEye.png")
                      : require("../../../Assets/eye.png")
                  }
                  alt=""
                  className="absolute top-11 right-5 w-5 h-5 cursor-pointer"
                  onClick={eyeTogglerHandler}
                />
              </div>
              <div className="mt-5 flex justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <h1 className="font-extralight">Remember me</h1>
                </div>
                <h1
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate("/service-provider-forgot-password")}
                >
                  Forgot password?
                </h1>
              </div>
              <div className="mt-8">
                {loading ? (
                  <div className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] flex justify-center items-center">
                    <LoaderCircles />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd]"
                  >
                    Sign in
                  </button>
                )}
              </div>
              <div className="mt-5">
                <h1>
                  New user?{" "}
                  <span
                    className="font-semibold ml-2 hover:underline cursor-pointer"
                    onClick={() => navigate("/service-provider-sign-up")}
                  >
                    {" "}
                    Create an account
                  </span>
                </h1>
              </div>
            </form>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../../Assets/SignInIllustrator.jpg")}
            alt=""
            className="w-[80%] h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
