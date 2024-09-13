import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonPostLoader = () => {
  return (
    <div className="lg:w-6/12 xl:w-4/12 w-full">
      <div className="card w-full h-full p-5">
        <Skeleton height={200} />
        <div className="w-full bg-slate-600 rounded-b-lg mt-4">
          <div className="flex justify-between items-center">
            <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
              <Skeleton width={150} />
            </h1>
            <div className="bg-[#dadada] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
              <Skeleton width={130} />
            </div>
          </div>
          <div className="message px-4 py-1">
            <Skeleton count={2} />
          </div>
          <div className="flex mt-5 justify-between">
            <h1 className="font-bold text-white px-4">
              <Skeleton width={100} />
            </h1>
            <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
              <Skeleton circle={true} height={40} width={40} />
              <Skeleton width={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPostLoader;
