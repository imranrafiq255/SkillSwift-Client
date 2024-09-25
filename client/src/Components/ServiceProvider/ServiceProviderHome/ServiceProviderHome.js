import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
import "react-loading-skeleton/dist/skeleton.css";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";
import axios from "axios";
import RingLoader from "../../Loader/RingLoader";
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

  useEffect(() => {
    loadPosts();
  }, []);
  const timeFormatter = (time) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(time).toLocaleDateString("en-US", options);
  };
  return (
    <>
      <Toaster />
      <div className="home-container">
        <ServiceProviderHeader />
        <div className="under-header-container">
          <div className="line w-full h-[0.3px] bg-slate-700"></div>
          <div className="welcome-text mt-8">
            <h1 className="text-center text-lg lg:text-5xl font-bold">
              WELCOME TO SERVICE PROVIDER
            </h1>
          </div>
          <div className="posts lg:w-10/12 w-11/12 m-auto mt-8">
            <div className="border-2 border-slate-500 inline-block lg:px-8 px-4 lg:py-3 py-2">
              <h1 className="lg:text-xl text-xs font-light uppercase">
                Service Posts
              </h1>
            </div>
            <div className="service-posts w-full h-full flex flex-wrap mt-10">
              {loadLoading ? (
                <div>
                  <RingLoader />
                </div>
              ) : (
                ""
              )}
              {!loadLoading && posts?.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="lg:w-6/12 xl:w-4/12 w-full">
                    <div className="card w-full h-full p-5">
                      <div className="relative">
                        <img
                          src={post?.servicePostImage}
                          alt=""
                          className="w-full rounded-tl-lg rounded-tr-lg h-[250px]"
                        />
                        <div className="w-full bg-slate-600 rounded-b-lg">
                          <div className="flex justify-between items-center">
                            <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                              {post?.serviceName}
                            </h1>
                            <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                              <h1 className="text-white font-bold">
                                ${post?.servicePostPrice}
                              </h1>
                            </div>
                          </div>
                          <div className="message px-4 py-1">
                            <h1 className="text-white">
                              {post?.servicePostMessage}
                            </h1>
                          </div>
                          <div className="flex mt-5 justify-between">
                            <h1 className="font-bold text-white px-4">
                              {timeFormatter(post?.createdAt)}
                            </h1>
                            <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                              <div>
                                <img
                                  src={require("../../../Assets/star.png")}
                                  alt=""
                                  className="lg:w-5 lg:h-5 w-3 h-3"
                                />
                                <h1 className="text-xs mt-2 text-center">
                                  {post?.servicePostRatings.length}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
