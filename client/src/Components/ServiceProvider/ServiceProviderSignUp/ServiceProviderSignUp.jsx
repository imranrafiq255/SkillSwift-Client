import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ServiceProviderSignUp.css";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name should only contain English letters")
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ConsumerSignUp = () => {
  const navigate = useNavigate();
  const passwordRef1 = useRef();
  const [eyeToggler1, setEyeToggler1] = useState(false);
  const passwordRef2 = useRef();
  const [eyeToggler2, setEyeToggler2] = useState(false);
  const [termsConditions, setTermsConditions] = useState(false);

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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!termsConditions) {
        // If terms are not accepted, prevent form submission
        alert("You must accept the terms and conditions.");
        return;
      }

      // Handle form submission
      console.log(values);
    },
  });

  return (
    <>
      <div className="sign-up-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-up-container w-10/12 sm:w-8/12 lg:w-6/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Sign Up
              </h1>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="sign-up-form bg-white w-full h-full"
            >
              <div className="full-name">
                <label htmlFor="name">Your name</label> <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="email">
                <label htmlFor="email">Your email</label> <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="password mt-5 relative">
                <label htmlFor="password">Password</label> <br />
                <input
                  type={eyeToggler1 ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={passwordRef1}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl pr-12 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
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
                <label htmlFor="confirmPassword">Confirm password</label> <br />
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
              <div className="mt-5 flex justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="termsConditions"
                    className="w-4 h-4 cursor-pointer"
                    checked={termsConditions}
                    onChange={(e) => setTermsConditions(e.target.checked)}
                  />
                  <label
                    htmlFor="termsConditions"
                    className="font-extralight cursor-pointer"
                  >
                    I accept the{" "}
                    <span className="font-semibold hover:underline cursor-pointer">
                      Terms of services
                    </span>
                  </label>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd]"
                >
                  Create Account
                </button>
              </div>
              <div className="mt-5">
                <h1 className="font-extralight">
                  Already have an account?{" "}
                  <span
                    className="font-semibold ml-2 hover:underline cursor-pointer"
                    onClick={() => navigate("/consumer-sign-in")}
                  >
                    Sign In
                  </span>
                </h1>
              </div>
            </form>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../../Assets/SignUpIllustrator.jpg")}
            alt=""
            className="w-[80%] h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default ConsumerSignUp;
