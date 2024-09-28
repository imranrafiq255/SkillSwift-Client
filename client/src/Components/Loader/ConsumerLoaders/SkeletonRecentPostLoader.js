import React from "react";
import Skeleton from "react-loading-skeleton";
const SkeletonRecentPostLoader = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Skeleton circle={true} height={200} width={200} />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          <Skeleton count={1} />
        </h3>
        <p className="text-gray-700 mt-2">
          <Skeleton />
        </p>
      </div>
    </div>
  );
};

export default SkeletonRecentPostLoader;
