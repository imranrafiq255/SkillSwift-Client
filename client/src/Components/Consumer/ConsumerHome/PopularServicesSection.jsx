import React, { useEffect } from "react";
import StarRating from "../ConsumerCommon/StarRating";
import { useSelector, useDispatch } from "react-redux";
import { loadPopularPostsAction } from "../../Redux/Consumer/Actions/ConsumerActions";
import SkeletonRecentPostLoader from "../../Loader/ConsumerLoaders/SkeletonRecentPostLoader";
import { useNavigate } from "react-router-dom";
const PopularServicesSection = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector(
    (state) => state.loadPopularPostsReducer
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadPopularPostsAction());
  }, [dispatch]);
  const ratingCalculator = (ratings) => {
    let sum = 0;
    ratings.forEach((rating) => (sum += rating.rating));
    console.log(sum);

    return sum / ratings.length;
  };
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-8">Popular Services</h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            <div>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <div className="w-full h-24 bg-gray-200 rounded-lg">
                    <SkeletonRecentPostLoader />
                  </div>
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            posts.map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col cursor-pointer hover:scale-105 transition-transform duration-700 ease-out"
                onClick={() =>
                  navigate("/consumer-service-page", {
                    state: { service: service },
                  })
                }
              >
                <img
                  src={service.servicePostImage}
                  alt={service.serviceName}
                  className="w-full h-48 md:h-64 object-cover mb-4 rounded-t-lg"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-2">
                    {service.serviceName}
                  </h3>
                  <StarRating
                    rating={ratingCalculator(service.servicePostRatings)}
                  />
                  <p className="text-gray-700 mt-2">
                    {"Rs " + service.servicePostPrice}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>No post into database</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularServicesSection;
