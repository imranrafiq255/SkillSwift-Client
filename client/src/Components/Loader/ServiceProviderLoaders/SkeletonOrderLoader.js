import React from "react";
import Skeleton from "react-loading-skeleton";
const SkeletonOrderLoader = () => {
  return (
    <>
      <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
        <div className="consumer-information p-4">
          <div className="order-by flex items-center gap-3">
            <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
              <Skeleton width={10} />
            </h1>
            <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
          </div>
          <div className="consumer-profile-information flex mt-8">
            <div className="profile-pic-name flex items-center gap-8">
              <div className=" p-[2px] border-[1px]  rounded-full">
                <Skeleton circle={true} width={60} height={60} />
                {/* <Skeleton width={30} /> */}
              </div>
              <div>
                <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                  <Skeleton width={130} count={1} />
                </h1>
                <div className="">
                  <h1 className="text-xs xl:text-lg lg:text-sm">
                    <Skeleton width={130} count={1} />
                  </h1>
                  <h1 className="text-xs xl:text-lg lg:text-sm">
                    <Skeleton width={130} count={1} />
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="address flex items-center gap-7">
            <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
              <h1 className="text-white">
                <Skeleton width={30} count={1} />
              </h1>
            </div>
            <h1 className="mt-3">
              <Skeleton width={30} count={1} />
            </h1>
          </div>
          <div className="line w-[100%] h-[1px] bg-white my-4"></div>
          <div className="order-details flex items-center gap-3">
            <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
              <Skeleton width={30} count={1} />
            </h1>
            <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
          </div>
          <div className="order-details-container relative">
            <div className="flex gap-3 items-center name">
              <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                <h1 className="bg-[#dadada] text-xs">
                  <Skeleton width={130} count={1} />
                </h1>
              </div>
              <h1>
                <Skeleton width={30} count={1} />
              </h1>
            </div>
            <div className="flex gap-3 items-center message">
              <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                <h1 className="text-black text-xs">
                  <Skeleton width={30} count={1} />
                </h1>
              </div>
              <h1>
                <Skeleton width={250} count={3} />
              </h1>
            </div>
            <div className="flex gap-3 items-center schedule mt-4">
              <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                <h1 className="text-black text-xs">
                  <Skeleton width={30} count={1} />
                </h1>
              </div>
              <h1>
                <Skeleton width={30} count={1} />
              </h1>
            </div>
            <div className="flex gap-3 items-center name absolute right-0 top-0">
              <div className="order-name bg-[#dadada] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                <h1 className="text-white text-xs">
                  <Skeleton width={10} count={1} />
                </h1>
              </div>
            </div>
          </div>
          <div className="btns flex gap-3 justify-center mt-8 mb-5">
            <button className="bg-[#edebeb] text-white py-2 px-8 rounded-lg shadow-lg basis-[45%]">
              <Skeleton width={100} count={1} />
            </button>
            <button className="bg-[#f5f2f2] text-white py-2 px-8 rounded-lg shadow-lg basis-[45%]">
              <Skeleton width={100} count={1} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonOrderLoader;
