import React from "react";

const ServiceProviderTimeSlot = () => {
  return (
    <>
      <div className="add-services-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-in-container w-11/12 sm:w-8/12 lg:w-9/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Add your time slots
              </h1>
              <div className="mt-10">
                <label htmlFor="" className="font-bold">
                  Select day
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className={
                    "w-[80%] border-b-[2px] border-slate-400 focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none h-11 text-xl cursor-pointer mt-6"
                  }
                >
                  <option value="1">1</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="mt-10">
                <label htmlFor="" className="font-bold">
                  Select day
                </label>
                <br />
                <select
                  name=""
                  id=""
                  className={
                    "w-[80%] border-b-[2px] border-slate-400 focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none h-11 text-xl cursor-pointer mt-6"
                  }
                >
                  <option value="1">1</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../../Assets/time-illustrattions.jpg")}
            alt=""
            className="w-full h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderTimeSlot;
