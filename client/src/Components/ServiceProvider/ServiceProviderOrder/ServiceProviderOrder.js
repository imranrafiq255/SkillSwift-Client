import React, { useState } from "react";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";

const ServiceProviderOrder = () => {
  const [isShowing, setShowing] = useState(1);

  return (
    <>
      <div className="service-provider-order-container">
        <div className="header">
          <ServiceProviderHeader />
        </div>
        <div className="line w-full h-[0.3px] bg-slate-700"></div>
        <div className="all-orders-container mt-10">
          <div className="orders-navigation flex justify-center items-center gap-4 overflow-auto">
            <h1
              onClick={() => setShowing(1)}
              className={`${
                isShowing === 1 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-lg`}
            >
              Pending
            </h1>
            <h1
              onClick={() => setShowing(2)}
              className={`${
                isShowing === 2 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-lg`}
            >
              Completed
            </h1>
            <h1
              onClick={() => setShowing(3)}
              className={`${
                isShowing === 3 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-lg`}
            >
              Accepted
            </h1>
            <h1
              onClick={() => setShowing(4)}
              className={`${
                isShowing === 4 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-lg`}
            >
              Rejected
            </h1>
            <h1
              onClick={() => setShowing(5)}
              className={`${
                isShowing === 5 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-lg`}
            >
              Cancelled
            </h1>
          </div>
          <div className="div-navigation-line w-full flex justify-center items-center mt-4">
            <div className="line lg:w-[55%] w-[85%] xl:w-[35%] h-[1px] bg-slate-700"></div>
          </div>
          <div className="navigation-container flex justify-center">
            {isShowing === 1 && (
              <div className="pending-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                  <div className="consumer-information p-4">
                    <div className="order-by flex items-center gap-3">
                      <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                        Order By
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="consumer-profile-information flex mt-8">
                      <div className="profile-pic-name flex items-center gap-8">
                        <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                          <img
                            src={require("../../../Assets/avatar.png")}
                            alt=""
                            className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                            John Doe
                          </h1>
                          <div className="">
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                Email:
                              </span>{" "}
                              mohammedimranrafique@gmail.com
                            </h1>
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                Phone:
                              </span>{" "}
                              +923036751255
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="address flex items-center gap-7">
                      <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                        <h1 className="text-white">Address</h1>
                      </div>
                      <h1 className="mt-3">Noor Mahel Bahawalpur</h1>
                    </div>
                    <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                    <div className="order-details flex items-center gap-3">
                      <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                        Order Details
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="order-details-container relative">
                      <div className="flex gap-3 items-center name">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                          <h1 className="text-black text-xs">Service Name</h1>
                        </div>
                        <h1>Name</h1>
                      </div>
                      <div className="flex gap-3 items-center message">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                          <h1 className="text-black text-xs">
                            Service message
                          </h1>
                        </div>
                        <h1>Message</h1>
                      </div>
                      <div className="flex gap-3 items-center name absolute right-0 top-0">
                        <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                          <h1 className="text-white text-xs">$49</h1>
                        </div>
                      </div>
                    </div>
                    <div className="btns flex gap-3 justify-center mt-8 mb-5">
                      <button className="bg-red-500 text-white py-2 px-8 rounded-lg shadow-lg basis-[45%]">
                        Reject
                      </button>
                      <button className="bg-[#10f31b] text-white py-2 px-8 rounded-lg shadow-lg basis-[45%]">
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isShowing === 2 && (
              <div className="completed-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                  <div className="consumer-information p-4">
                    <div className="order-by flex items-center gap-3">
                      <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                        Order By
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="consumer-profile-information flex mt-8">
                      <div className="profile-pic-name flex items-center gap-8">
                        <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                          <img
                            src={require("../../../Assets/avatar.png")}
                            alt=""
                            className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                            John Doe
                          </h1>
                          <div className="">
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                Email:
                              </span>{" "}
                              mohammedimranrafique@gmail.com
                            </h1>
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                Phone:
                              </span>{" "}
                              +923036751255
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="address flex items-center gap-7">
                      <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                        <h1 className="text-white">Address</h1>
                      </div>
                      <h1 className="mt-3">Noor Mahel Bahawalpur</h1>
                    </div>
                    <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                    <div className="order-details flex items-center gap-3">
                      <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                        Order Details
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="order-details-container relative">
                      <div className="flex gap-3 items-center name">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                          <h1 className="text-black text-xs">Service Name</h1>
                        </div>
                        <h1>Name</h1>
                      </div>
                      <div className="flex gap-3 items-center message">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                          <h1 className="text-black text-xs">
                            Service message
                          </h1>
                        </div>
                        <h1>Message</h1>
                      </div>
                      <div className="flex gap-3 items-center name absolute right-0 top-0">
                        <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                          <h1 className="text-white text-xs">$49</h1>
                        </div>
                      </div>
                    </div>
                    <div className="btns flex gap-3 justify-center mt-8 mb-5">
                      <button className="bg-[#4e97fd] text-white py-2 px-8 rounded-lg shadow-lg w-full">
                        Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isShowing === 3 && (
              <div className="accepted-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                  <div className="consumer-information p-4">
                    <div className="order-by flex items-center gap-3">
                      <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                        Order By
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="consumer-profile-information flex mt-8">
                      <div className="profile-pic-name flex items-center gap-8">
                        <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                          <img
                            src={require("../../../Assets/avatar.png")}
                            alt=""
                            className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                            John Doe
                          </h1>
                          <div className="">
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                Email:
                              </span>{" "}
                              mohammedimranrafique@gmail.com
                            </h1>
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                Phone:
                              </span>{" "}
                              +923036751255
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="address flex items-center gap-7">
                      <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                        <h1 className="text-white">Address</h1>
                      </div>
                      <h1 className="mt-3">Noor Mahel Bahawalpur</h1>
                    </div>
                    <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                    <div className="order-details flex items-center gap-3">
                      <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                        Order Details
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="order-details-container relative">
                      <div className="flex gap-3 items-center name">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                          <h1 className="text-black text-xs">Service Name</h1>
                        </div>
                        <h1>Name</h1>
                      </div>
                      <div className="flex gap-3 items-center message">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                          <h1 className="text-black text-xs">
                            Service message
                          </h1>
                        </div>
                        <h1>Message</h1>
                      </div>
                      <div className="flex gap-3 items-center name absolute right-0 top-0">
                        <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                          <h1 className="text-white text-xs">$49</h1>
                        </div>
                      </div>
                    </div>
                    <div className="btns flex gap-3 justify-center mt-8 mb-5">
                      <button className="bg-[#ee0d05] text-white py-2 px-8 rounded-lg shadow-lg w-full">
                        Cancel?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isShowing === 4 && (
              <div className="rejected-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                  <div className="consumer-information p-4">
                    <div className="order-by flex items-center gap-3">
                      <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                        Order By
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="consumer-profile-information flex mt-8">
                      <div className="profile-pic-name flex items-center gap-8">
                        <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                          <img
                            src={require("../../../Assets/avatar.png")}
                            alt=""
                            className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                            John Doe
                          </h1>
                          <div className="">
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                Email:
                              </span>{" "}
                              mohammedimranrafique@gmail.com
                            </h1>
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                Phone:
                              </span>{" "}
                              +923036751255
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="address flex items-center gap-7">
                      <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                        <h1 className="text-white">Address</h1>
                      </div>
                      <h1 className="mt-3">Noor Mahel Bahawalpur</h1>
                    </div>
                    <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                    <div className="order-details flex items-center gap-3">
                      <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                        Order Details
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="order-details-container relative">
                      <div className="flex gap-3 items-center name">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                          <h1 className="text-black text-xs">Service Name</h1>
                        </div>
                        <h1>Name</h1>
                      </div>
                      <div className="flex gap-3 items-center message">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                          <h1 className="text-black text-xs">
                            Service message
                          </h1>
                        </div>
                        <h1>Message</h1>
                      </div>
                      <div className="flex gap-3 items-center name absolute right-0 top-0">
                        <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                          <h1 className="text-white text-xs">$49</h1>
                        </div>
                      </div>
                    </div>
                    <div className="btns flex gap-3 justify-center mt-8 mb-5">
                      <button className="bg-[#f31010] text-white py-2 px-8 rounded-lg shadow-lg w-full">
                        Rejected
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isShowing === 5 && (
              <div className="cancelled-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                  <div className="consumer-information p-4">
                    <div className="order-by flex items-center gap-3">
                      <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                        Order By
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="consumer-profile-information flex mt-8">
                      <div className="profile-pic-name flex items-center gap-8">
                        <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                          <img
                            src={require("../../../Assets/avatar.png")}
                            alt=""
                            className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                            John Doe
                          </h1>
                          <div className="">
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                Email:
                              </span>{" "}
                              mohammedimranrafique@gmail.com
                            </h1>
                            <h1 className="text-xs xl:text-lg lg:text-sm">
                              <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                Phone:
                              </span>{" "}
                              +923036751255
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="address flex items-center gap-7">
                      <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                        <h1 className="text-white">Address</h1>
                      </div>
                      <h1 className="mt-3">Noor Mahel Bahawalpur</h1>
                    </div>
                    <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                    <div className="order-details flex items-center gap-3">
                      <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                        Order Details
                      </h1>
                      <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                    </div>
                    <div className="order-details-container relative">
                      <div className="flex gap-3 items-center name">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                          <h1 className="text-black text-xs">Service Name</h1>
                        </div>
                        <h1>Name</h1>
                      </div>
                      <div className="flex gap-3 items-center message">
                        <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                          <h1 className="text-black text-xs">
                            Service message
                          </h1>
                        </div>
                        <h1>Message</h1>
                      </div>
                      <div className="flex gap-3 items-center name absolute right-0 top-0">
                        <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                          <h1 className="text-white text-xs">$49</h1>
                        </div>
                      </div>
                    </div>
                    <div className="btns flex gap-3 justify-center mt-8 mb-5">
                      <button className="bg-[#b61604] text-white py-2 px-8 rounded-lg shadow-lg w-full">
                        Cancelled
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <ServiceProviderFooter />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderOrder;
