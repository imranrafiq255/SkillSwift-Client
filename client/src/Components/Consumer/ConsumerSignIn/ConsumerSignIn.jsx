import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./ConsumerSignIn.css";
import { useDispatch, useSelector } from "react-redux";
import consumerLoginAction from "../../Redux/Consumer/Actions/Login.Consumer.Action";
import LoaderCircles from "../../Loader/LoaderCircles";
import { Toaster } from "react-hot-toast";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage";
// Validation schema
const validationSchema = Yup.object({
  consumerEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  consumerPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const [eyeToggler, setEyeToggler] = useState(false);
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.consumerLoginReducer
  );
  const eyeTogglerHandler = () => {
    if (!eyeToggler) {
      passwordRef.current.type = "text";
      setEyeToggler(true);
    } else {
      passwordRef.current.type = "password";
      setEyeToggler(false);
    }
  };

  const handeleSubmit = async (values) => {
    console.log(values);
    dispatch(consumerLoginAction(values));
  };

  const formik = useFormik({
    initialValues: {
      consumerEmail: "",
      consumerPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handeleSubmit,
  });
  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log(error);
        handleShowFailureToast(error);
      } else if (message) {
        console.log(message);
        navigate("/consumer-home");
      }
    }
  }, [loading, message, error, navigate]);

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
                <label htmlFor="email">Your email</label> <br />
                <input
                  type="email"
                  id="email"
                  name="consumerEmail"
                  value={formik.values.consumerEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl ${
                    formik.touched.consumerEmail && formik.errors.consumerEmail
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your email"
                />
                {formik.touched.consumerEmail && formik.errors.consumerEmail ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.consumerEmail}
                  </div>
                ) : null}
              </div>
              <div className="password mt-5 relative">
                <label htmlFor="password">Password</label> <br />
                <input
                  type={eyeToggler ? "text" : "password"}
                  id="password"
                  name="consumerPassword"
                  value={formik.values.consumerPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={passwordRef}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl pr-12 ${
                    formik.touched.password && formik.errors.consumerPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                />
                {formik.touched.consumerPassword &&
                formik.errors.consumerPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.consumerPassword}
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
                  onClick={() => navigate("/consumer-forgot-paasword")}
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
                    onClick={() => navigate("/consumer-sign-up")}
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
