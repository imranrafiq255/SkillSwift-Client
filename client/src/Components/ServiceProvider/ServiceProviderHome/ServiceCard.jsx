import React from "react";
import { FaStar } from "react-icons/fa";

const ServiceCard = ({ post, ratingCalculator, timeFormatter }) => {
  return (
    <div className="lg:w-4/12 xl:w-3/12 w-full p-1">
      <div className="card rounded-lg border shadow-md w-full h-full p-3">
        <div className="relative">
          <img
            src={post?.servicePostImage}
            alt=""
            className="w-full rounded-tl-lg rounded-tr-lg h-[200px] object-cover"
          />
          <div className="bg-white rounded-b-lg pb-3">
            <div className="flex flex-col px-3 py-2">
              <h1 className="text-black font-bold text-base">
                {post?.serviceName}
              </h1>
              <h1 className="text-black font-bold text-base">
                Rs {post?.servicePostPrice}
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                {post?.servicePostMessage.length > 30
                  ? `${post.servicePostMessage.slice(0, 30)}...`
                  : post.servicePostMessage}
              </p>
            </div>
            <div className="flex flex-col justify-between px-3 py-1">
              {/* Rating Section */}
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < ratingCalculator(post?.servicePostRatings)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-600 ml-2 text-sm">
                  {post?.servicePostRatings?.length > 0
                    ? `${ratingCalculator(post?.servicePostRatings) || 0} out of 5`
                    : "No Reviews"}
                </p>
              </div>
              <h1 className="font-bold text-gray-600 text-sm">
                Listed on: {timeFormatter(post?.createdAt)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
