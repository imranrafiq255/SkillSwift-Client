import axios from "axios";
import React, { useEffect, useState } from "react";

const ServiceProviderCard = ({ provider }) => {
  const [serviceProviderRating, setServiceProviderRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  useEffect(() => {
    const ratingHandler = async () => {
      try {
        const response = await axios.get(
          `/api/v1/consumer/service-provider-rating/${provider?._id}`
        );
        console.log(response.data);

        setServiceProviderRating(response?.data?.averageRating);
        setTotalRating(response?.data?.total);
      } catch (error) {
        console.log(error?.response?.data?.message || "Network error");
      }
    };
    ratingHandler();
  }, [provider?._id]);
  console.log(totalRating);
  return (
    <div className="w-full max-w-lg flex items-center justify-between p-4 bg-white shadow-md rounded-full border space-x-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
        {/* Replace with an icon or image */}
        {/* <span className="text-gray-500 text-2xl">👤</span> */}
        <img
          src={provider?.serviceProviderAvatar}
          alt=""
          className="text-gray-500 text-2xl w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          {provider?.serviceProviderFullName}
        </h2>
        <span className="text-gray-600">
          ({Math.round(serviceProviderRating * 10) / 10} out of 5 based on{" "}
          {totalRating} ratings)
        </span>
      </div>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition"
        onClick={() => (window.location.href = "/consumer-chat-section")}
      >
        Chat
      </button>
    </div>
  );
};

export default ServiceProviderCard;
