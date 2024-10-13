import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center w-full">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="w-80 p-4 bg-white rounded-lg shadow-md">
          <Skeleton height={200} />
          <div className="mt-2">
            <Skeleton height={30} width={`60%`} />
            <Skeleton height={20} width={`80%`} className="mt-2" />
            <Skeleton height={20} width={`70%`} className="mt-2" />
            <Skeleton height={20} width={`90%`} className="mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
