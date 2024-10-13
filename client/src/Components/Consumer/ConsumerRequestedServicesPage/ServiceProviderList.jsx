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
  // const providers = [
  //   {
  //     name: 'Alice Johnson',
  //     rating: '4.8 (200 reviews)',
  //   },
  //   {
  //     name: 'Bob Smith',
  //     rating: '4.5 (150 reviews)',
  //   },
  //   {
  //     name: 'Charlie Brown',
  //     rating: '4.9 (300 reviews)',
  //   },
  //   {
  //     name: 'Diana Prince',
  //     rating: '4.7 (250 reviews)',
  //   }
  //   // Add more dummy data as needed
  // ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="space-y-4">
        {!loadLoading && customService[0]?.serviceProviders?.length > 0 && (
          <>
            {customService[0]?.serviceProviders?.length > 0 ? (
              customService[0]?.serviceProviders.map((provider, index) => (
                <ServiceProviderCard key={index} provider={provider} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
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
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderList;
