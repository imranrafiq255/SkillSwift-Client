import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage";
import LoaderCircles from "../../Loader/LoaderCircles";
import { serviceProviderResetPasswordAction } from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import { Toaster } from "react-hot-toast";
// Validation Schema
const validationSchema = Yup.object({
  serviceProviderPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("serviceProviderPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ServiceProviderResetPassword = () => {
  const navigate = useNavigate();
  const passwordRef1 = useRef();
  const [eyeToggler1, setEyeToggler1] = useState(false);
  const passwordRef2 = useRef();
  const [eyeToggler2, setEyeToggler2] = useState(false);
  const dispatch = useDispatch();
  const { token } = useParams();
  const { loading, message, error } = useSelector(
    (state) => state.serviceProviderResetPasswordReducer
  );
  const eyeTogglerHandler1 = () => {
    setEyeToggler1((prev) => !prev);
    passwordRef1.current.type = eyeToggler1 ? "password" : "text";
  };

  const eyeTogglerHandler2 = () => {
    setEyeToggler2((prev) => !prev);
    passwordRef2.current.type = eyeToggler2 ? "password" : "text";
  };

  const formik = useFormik({
    initialValues: {
      serviceProviderPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(serviceProviderResetPasswordAction(values, token));
    },
  });
  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log(error);
        handleShowFailureToast(error);
      } else if (message) {
        console.log(message);
        navigate("/service-provider-home", { state: { message } });
      }
    }
  }, [message, error, navigate, loading]);
  console.log(message);
  return (
    <>
      <Toaster />
      <div className="sign-up-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-up-container w-10/12 sm:w-8/12 lg:w-6/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Reset Password
              </h1>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="sign-up-form bg-white w-full h-full"
            >
              <div className="password mt-5 relative">
                <label htmlFor="password">New Password</label> <br />
                <input
                  type={eyeToggler1 ? "text" : "password"}
                  id="password"
                  name="serviceProviderPassword"
                  value={formik.values.serviceProviderPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={passwordRef1}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl pr-12 ${
                    formik.touched.serviceProviderPassword &&
                    formik.errors.serviceProviderPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your new password"
                />
                {formik.touched.serviceProviderPassword &&
                formik.errors.serviceProviderPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.serviceProviderPassword}
                  </div>
                ) : null}
                <img
                  src={
                    eyeToggler1
                      ? require("../../../Assets/hiddenEye.png")
                      : require("../../../Assets/eye.png")
                  }
                  alt=""
                  className="absolute top-11 right-5 w-5 h-5 cursor-pointer"
                  onClick={eyeTogglerHandler1}
                />
              </div>
              <div className="password mt-5 relative">
                <label htmlFor="confirmPassword">Confirm new Password</label>{" "}
                <br />
                <input
                  type={eyeToggler2 ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={passwordRef2}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl pr-12 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Confirm your password"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
                <img
                  src={
                    eyeToggler2
                      ? require("../../../Assets/hiddenEye.png")
                      : require("../../../Assets/eye.png")
                  }
                  alt=""
                  className="absolute top-11 right-5 w-5 h-5 cursor-pointer"
                  onClick={eyeTogglerHandler2}
                />
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
                    Reset Password
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../../Assets/ResetPass.jpg")}
            alt=""
            className="w-[80%] h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderResetPassword;
