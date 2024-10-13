import React, { useEffect, useCallback } from "react";
import JobCard from "./CustomServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { serviceProviderLoadCustomServicesAction } from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import SkeletonLoader from "./SkeletonLoader";
import { FaClipboardList } from "react-icons/fa";

const CustomServiceList = () => {
  const dispatch = useDispatch();
  const { loadLoading, customService, error } = useSelector(
    (state) => state.serviceProviderLoadCustomServicesReducer
  );

  const handleRefresh = useCallback(() => {
    console.log("Refreshing");
    dispatch(serviceProviderLoadCustomServicesAction());
  }, [dispatch]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {loadLoading && (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!loadLoading && customService && customService.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <div className="bg-blue-100 p-6 rounded-full">
            <FaClipboardList className="text-blue-500 text-6xl" />
          </div>
          <h1 className="text-blue-600 text-2xl font-semibold mt-4">
            No Services Available
          </h1>
          <p className="text-blue-500 mt-2">
            It looks like there are no services available at the moment.
          </p>
        </div>
        )}
        {!loadLoading &&
          customService &&
          customService.map((service, index) => (
            <JobCard key={index} service={service} handleRefresh={handleRefresh} />
          ))}
      </div>
    </div>
  );
};

export default CustomServiceList;
