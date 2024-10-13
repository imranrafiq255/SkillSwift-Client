import React, { useEffect, useCallback } from "react";
import JobCard from "./CustomServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { serviceProviderLoadCustomServicesAction } from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";

const CustomServiceList = () => {
  const dispatch = useDispatch();
  const { loadLoading, customService, error } = useSelector(
    (state) => state.serviceProviderLoadCustomServicesReducer
  );

  const handleRefresh = useCallback(() => {
    console.log("Refreshing")
    dispatch(serviceProviderLoadCustomServicesAction());
  }, [dispatch]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {loadLoading && <p>Loading services...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loadLoading && customService && customService.length === 0 && (
          <p>No services available at the moment.</p>
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
