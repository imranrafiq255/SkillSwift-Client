import React, { useRef, useState } from "react";
import "./SignIn.css";
const SignIn = () => {
  const passwordRef = useRef();
  const [eyeToggler, setEyeToggler] = useState(false);
  const eyeTogglerHandler = () => {
    if (!eyeToggler) {
      passwordRef.current.type = "text";
      setEyeToggler(true);
    } else {
      passwordRef.current.type = "password";
      setEyeToggler(false);
    }
  };
  return (
    <>
      <div className="sign-in-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-in-container w-10/12 sm:w-8/12 lg:w-6/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Sign in
              </h1>
            </div>
            <div className="sign-in-form bg-white w-full h-full">
              <div className="email">
                <label htmlFor="">Your email</label> <br />
                <input
                  type="email"
                  className="w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl"
                  placeholder="Enter your email"
                />
              </div>
              <div className="password mt-5 relative">
                <label htmlFor="">Password</label> <br />
                <input
                  type="password"
                  ref={passwordRef}
                  className="w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl"
                  placeholder="Enter your password"
                />
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
                <h1 className="cursor-pointer hover:underline">
                  Forgot password?
                </h1>
              </div>
              <div className="mt-8">
                <button className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd]">
                  Sign in
                </button>
              </div>
              <div className="mt-5">
                <h1>
                  New user?{" "}
                  <span className="font-semibold ml-2 hover:underline cursor-pointer">
                    {" "}
                    Create an account
                  </span>
                </h1>
              </div>
            </div>
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
