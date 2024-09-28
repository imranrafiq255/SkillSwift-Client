import React, { useEffect, useState } from "react";
import StarRating from "../ConsumerCommon/StarRating";
import axios from "axios";
import SkeletonRecentPostLoader from "../../Loader/ConsumerLoaders/SkeletonRecentPostLoader";
import RingLoader from "../../Loader/RingLoader";

const ServicesSection = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadedPostIds, setLoadedPostIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadInitialPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/consumer/load-recent-service-posts?page=1&limit=8`
      );
      const newPosts = response.data.servicePosts;
      const uniquePosts = newPosts.filter(
        (post) => !loadedPostIds.has(post._id)
      );
      setRecentPosts(uniquePosts);
      setLoadedPostIds(
        new Set([...loadedPostIds, ...uniquePosts.map((post) => post._id)])
      );
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const response = await axios.get(
        `/api/v1/consumer/load-recent-service-posts?page=${nextPage}&limit=8`
      );
      const newPosts = response.data.servicePosts;

      const uniquePosts = newPosts.filter(
        (post) => !loadedPostIds.has(post._id)
      );
      setRecentPosts((prevPosts) => [...prevPosts, ...uniquePosts]);
      setLoadedPostIds(
        new Set([...loadedPostIds, ...uniquePosts.map((post) => post._id)])
      );
      setHasMore(response.data.hasMore);
      setPage(nextPage);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const viewMoreHandler = () => {
    if (hasMore) {
      loadMorePosts();
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-8">
        Recent Services Ads
      </h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonRecentPostLoader key={index} />
            ))
          ) : recentPosts && recentPosts.length > 0 ? (
            recentPosts?.map((service, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={service.servicePostImage}
                  alt={service.serviceName}
                  className="w-full h-48 object-cover mb-4 rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {service.serviceName}
                  </h3>
                  <StarRating rating={service.servicePostRatings.length} />
                  <p className="text-gray-700 mt-2">
                    {"Rs " + service.servicePostPrice}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>No posts into database</h1>
            </div>
          )}
        </div>
      </div>
      {loadingMore && (
        <div className="text-center mt-8 flex justify-center">
          <div className="w-40 h-20 text-white px-6 py-2 rounded-lg transition-colors duration-300 flex justify-center items-center">
            <RingLoader />
          </div>
        </div>
      )}
      {hasMore && !loading && !loadingMore && (
        <div className="text-center mt-8">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            onClick={viewMoreHandler}
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
