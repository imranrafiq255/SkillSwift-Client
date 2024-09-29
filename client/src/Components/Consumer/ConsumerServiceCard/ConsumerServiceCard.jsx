import React from "react";
import StarRating from "../ConsumerCommon/StarRating";
import { useNavigate } from "react-router-dom";
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      onClick={() =>
        navigate("/consumer-service-page", {
          state: { service: service },
        })
      }
    >
      <img
        src={service.servicePostImage}
        alt={service.serviceName}
        className="w-full h-48 object-cover mb-4 rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{service.serviceName}</h3>
        <StarRating rating={service.servicePostRatings.length} />
        <p className="text-gray-700 mt-2">{"Rs " + service.servicePostPrice}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
