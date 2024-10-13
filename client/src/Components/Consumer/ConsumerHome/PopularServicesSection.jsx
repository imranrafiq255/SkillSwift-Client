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
    if (!ratings || ratings.length === 0) return 0; // Prevent division by zero
    let sum = 0;
    ratings.forEach((rating) => (sum += rating.rating));
    return sum / ratings.length;
  };

  // Sorting function according to specified criteria
  const sortServices = (services) => {
    return services.slice().sort((a, b) => {
      const aAvgRating = ratingCalculator(a.servicePostRatings);
      const bAvgRating = ratingCalculator(b.servicePostRatings);
      const aTotalRatings = a.servicePostRatings.length;
      const bTotalRatings = b.servicePostRatings.length;

      // Sort by total number of ratings first (descending)
      if (bTotalRatings !== aTotalRatings) {
        return bTotalRatings - aTotalRatings; // More ratings come first
      }

      // If total ratings are equal, sort by average rating (descending)
      return bAvgRating - aAvgRating; // Higher average comes first
    });
  };

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-8">Popular Services</h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonRecentPostLoader key={index} />
            ))
          ) : posts && posts.length > 0 ? (
            sortServices(posts).map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col cursor-pointer hover:scale-105 transition-transform duration-700 ease-out"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/consumer-service-page", {
                    state: { service: service },
                  });
                }}
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
                    rating={ratingCalculator(service.servicePostRatings) || 0}
                  />
                  <p className="text-gray-700 mt-2">
                    {"Rs " + service.servicePostPrice}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>No posts in the database</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularServicesSection;
