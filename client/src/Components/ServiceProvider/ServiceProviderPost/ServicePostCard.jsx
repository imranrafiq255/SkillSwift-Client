import React from "react";
import { FaStar } from "react-icons/fa";

const ServicePostCard = ({
  post,
  timeFormatter,
  ratingCalculator,
  setDeleteOptionShowing,
  setDeletePostId,
}) => {
  return (
    <div className="w-full lg:w-[45%] xl:w-[30%] p-4">
      <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={post.servicePostImage}
            alt="Service"
            className="w-full h-[180px] object-cover"
          />
          <div className="absolute top-2 right-2">
            <div
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => {
                setDeleteOptionShowing(true);
                setDeletePostId(post._id);
              }}
            >
              <img
                src={require("../../../Assets/delete.png")}
                alt="Delete"
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h1 className="text-lg font-semibold">{post.serviceName}</h1>
          <p className="text-gray-700">
            {post.servicePostMessage.length > 60
              ? `${post.servicePostMessage.slice(0, 60)}...`
              : post.servicePostMessage}
          </p>
          <p className="text-black font-bold mt-2">Rs {post.servicePostPrice}</p>
          <div className="flex items-center my-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < ratingCalculator(post.servicePostRatings)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-600 ml-2 text-sm">
              {post.servicePostRatings.length > 0
                ? `${ratingCalculator(post.servicePostRatings)} out of 5 based on ${post.servicePostRatings.length} reviews`
                : "No Reviews"}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Listed on: {timeFormatter(post.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicePostCard;
