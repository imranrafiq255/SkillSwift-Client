import React from "react";
import Skeleton from "react-loading-skeleton";
const SkeletonNotificationLoader = () => {
  return (
    <>
      <div className="notification flex justify-center">
        <div className="center w-full p-5 lg:w-10/12 xl:w-5/12">
          <div className="notification-card shadow-2xl w-full bg-[#c8c8c8] rounded-md flex items-center relative">
            <Skeleton width={60} height={60} circle={true} className="m-6" />
            <div>
              <h1 className="text-sm font-bold text-[#4e97fd]">
                <Skeleton width={100} className="ml-3" />
              </h1>
              <p className="text-sm text-[#878787]">
                <Skeleton width={150} className="ml-3" />
              </p>
            </div>
            <div className="read absolute top-2 right-3">
              <div className="btn flex items-center gap-1 py-1 px-2 rounded-xl cursor-pointer">
                <h1 className="text-white text-xs">
                  <Skeleton width={50} height={20} />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonNotificationLoader;
