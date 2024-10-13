import React, { useEffect } from "react";
import ServiceProviderCard from "./ServiceProviderCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  consumerLoadCustomServicesAction,
} from "../../Redux/Consumer/Actions/ConsumerActions";
import { FaRegHourglass } from "react-icons/fa";

const ServiceProviderList = () => {
  const dispatch = useDispatch();
  const { loadLoading, customService } = useSelector(
    (state) => state.consumerLoadCustomServicesReducer
  );

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(consumerLoadCustomServicesAction());
  }, [dispatch]);

  const serviceProviders = customService[0]?.serviceProviders || [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="space-y-4">
        {loadLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="bg-blue-100 p-6 rounded-full">
              <FaRegHourglass className="text-blue-500 text-6xl" />
            </div>
          </div>
        ) : serviceProviders.length > 0 ? (
          serviceProviders.map((provider, index) => (
            <ServiceProviderCard key={index} provider={provider} />
          ))
        ) : (
          <div className="flex flex-col border shadow-md items-center justify-center h-full text-center p-4 bg-white">
            <div className="bg-blue-100 p-6 rounded-full">
              <FaRegHourglass className="text-blue-500 text-6xl" />
            </div>
            <h1 className="text-blue-600 text-2xl font-semibold mt-4">
              No Response Yet
            </h1>
            <p className="text-blue-500 mt-2">
              We will let you know when a Service Provider responds to your
              request
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderList;
