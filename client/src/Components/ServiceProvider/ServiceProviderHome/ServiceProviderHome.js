import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
import "react-loading-skeleton/dist/skeleton.css";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";
import axios from "axios";
import RingLoader from "../../Loader/RingLoader";
import ServiceCard from "./ServiceCard"; // Import the new component

const ServiceProviderHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const query = new URLSearchParams(location.search);
  const toastMessage = query.get("message");
  const [loadLoading, setLoadLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (toastMessage && !hasShownToast.current) {
      handleShowSuccessToast(toastMessage);
      hasShownToast.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [toastMessage, navigate, location.pathname]);

  const loadPosts = async () => {
    try {
      const response = await axios.get(
        `/api/v1/service-provider/load-all-service-provider-posts?page=${1}&limit=6`
      );
      const { posts } = response.data;
      setPosts(posts.slice(0, 6));
      setLoadLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoadLoading(false);
    }
  };

  const ratingCalculator = (ratings) => {
    let sum = 0;
    ratings?.forEach((rating) => (sum += rating?.rating));
    return Math.floor(sum / ratings?.length);
  };

  const timeFormatter = (time) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(time).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <Toaster />
      <div className="home-container">
        <ServiceProviderHeader />
        <div className="under-header-container">
          <div className="line w-full h-[0.3px] bg-slate-700"></div>
          <div className="posts lg:w-10/12 w-11/12 m-auto mt-8">
            <div className="service-posts w-full flex flex-wrap gap-6 justify-center mt-10">
              {loadLoading ? (
                <div>
                  <RingLoader />
                </div>
              ) : (
                ""
              )}
              {!loadLoading && posts?.length > 0 ? (
                posts.map((post) => (
                  <ServiceCard
                    key={post._id}
                    post={post}
                    ratingCalculator={ratingCalculator}
                    timeFormatter={timeFormatter}
                  />
                ))
              ) : (
                <div>
                  <h1>No posts in database</h1>
                </div>
              )}
            </div>
          </div>
          <div className="see-more-btn w-11/12 flex justify-end lg:mt-10">
            <Link to={"/service-provider-post"}>
              <div className="btn lg:w-40 lg:h-10 w-28 h-8 flex justify-center items-center bg-slate-700 text-white rounded-xl shadow-2xl cursor-pointer hover:bg-slate-600 lg:mr-5 lg:mt-6">
                See more{" "}
                <span>
                  <img
                    src={require("../../../Assets/right-arrow.png")}
                    alt=""
                    className="lg:w-6 lg:h-6 w-4 h-4 invert ml-2"
                  />
                </span>
              </div>
            </Link>
          </div>
          <div className="footer mt-10">
            <ServiceProviderFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderHome;
