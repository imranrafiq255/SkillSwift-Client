import React, { useEffect } from "react";
import JobCard from "./CustomServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { serviceProviderLoadCustomServicesAction } from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
const CustomServiceList = () => {
  const dispatch = useDispatch();
  const { loadLoading, customService } = useSelector(
    (state) => state.serviceProviderLoadCustomServicesReducer
  );
  useEffect(() => {
    dispatch(serviceProviderLoadCustomServicesAction());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Job Listings</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {!loadLoading &&
          customService &&
          customService.map((service, index) => (
            <JobCard key={index} service={service} />
          ))}
      </div>
    </div>
  );
};

export default CustomServiceList;
