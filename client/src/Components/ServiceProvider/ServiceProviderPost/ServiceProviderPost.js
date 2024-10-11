import React, { useState, useEffect, useRef } from "react";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";
import SkeletonPostLoader from "../../Loader/ServiceProviderLoaders/SkeletonPostLoader";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ServiceProviderPost.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteServicePostAction,
  loadCurrentServiceProviderAction,
  serviceProviderAddServicePostAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import { Toaster } from "react-hot-toast";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import LoaderCircles from "../../Loader/LoaderCircles";
import { FaStar } from "react-icons/fa";

const ServiceProviderPost = () => {
  const [postShowing, setPostShowing] = useState(true);
  const [loadLoading, setLoadLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const fileRef = useRef();
  const [postImage, setPostImage] = useState(null);
  const { loading, message, error } = useSelector(
    (state) => state.serviceProviderAddServicePostReducer
  );
  const {
    deleteServicePostLoading,
    deleteServicePostMessage,
    deleteServicePostError,
  } = useSelector((state) => state.deleteServicePostReducer);
  const dispatch = useDispatch();
  const deletePostToastMessage = useRef(false);
  const formik = useFormik({
    initialValues: {
      serviceName: "",
      servicePostMessage: "",
      servicePostPrice: "",
      servicePostImage: null,
    },
    validationSchema: Yup.object({
      serviceName: Yup.string().max(20, 'Title must be 20 characters or less').required("Post name is required"),
      servicePostMessage: Yup.string().max(256, 'Description must be 256 characters or less').required("Post message is required"),
      servicePostPrice: Yup.number()
        .required("Post price is required")
        .min(1, "Post price should be at least $1"),
      servicePostImage: Yup.mixed().required("Post image is required"),
    }),
    onSubmit: (values) => {
      const myObj = { ...values, servicePostImage: postImage };
      dispatch(clearErrors());
      dispatch(serviceProviderAddServicePostAction(myObj));
      formik.resetForm();
      setPostImage(null);
    },
  });

  const loadPosts = async () => {
    try {
      const response = await axios.get(
        `/api/v1/service-provider/load-all-service-provider-posts`
      );
      setAllPosts(response.data.posts);
      setPosts(response.data.posts);
      setLoadLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoadLoading(false);
    }
  };

  const timeFormatter = (time) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(time).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    loadPosts();
  }, []);
  const hasShownToast = useRef(false);
  useEffect(() => {
    if (!loading && error && !hasShownToast.current) {
      handleShowFailureToast(error);
      hasShownToast.current = true;
    } else if (!loading && message && !hasShownToast.current) {
      loadPosts();
      handleShowSuccessToast(message);
      setPostShowing(true);
      hasShownToast.current = true;
    }
    return () => {
      hasShownToast.current = false;
    };
  }, [loading, error, message]);

  useEffect(() => {
    dispatch(loadCurrentServiceProviderAction());
  }, [dispatch]);

  const searchPostHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm) {
      setPosts(allPosts);
      return;
    }

    const filteredPosts = allPosts.filter((post) =>
      post.serviceName.toLowerCase().includes(searchTerm)
    );
    setPosts(filteredPosts);
  };
  const [isDeleteOptionShowing, setDeleteOptionShowing] = useState(false);
  const [deletePostId, setDeletePostId] = useState("");
  const deletePostHandler = () => {
    dispatch(deleteServicePostAction(deletePostId));
    setDeleteOptionShowing(false);
  };

  const ratingCalculator = (ratings) => {
    let sum = 0;
    ratings?.forEach((rating) => (sum += rating?.rating));
    return Math.floor(sum / ratings?.length);
  };

  useEffect(() => {
    if (
      !deleteServicePostLoading &&
      deleteServicePostMessage &&
      !deletePostToastMessage.current
    ) {
      loadPosts();
      handleShowSuccessToast(deleteServicePostMessage);
      deletePostToastMessage.current = false;
    } else if (!deleteServicePostLoading && deleteServicePostError) {
      handleShowFailureToast(deleteServicePostError);
      deletePostToastMessage.current = false;
    }
  }, [
    deleteServicePostLoading,
    deleteServicePostMessage,
    deleteServicePostError,
    deletePostToastMessage,
  ]);
  return (
    <>
      <Toaster />
      {isDeleteOptionShowing ? (
        <div>
          <div
            className="delete-option w-screen h-screen bg-white fixed top-0 left-0 opacity-80 z-40 overflow-hidden"
            onClick={() => setDeleteOptionShowing(!isDeleteOptionShowing)}
          ></div>
          <div className="w-[80%] lg:w-[30%] h-[12rem] bg-white fixed opacity-100 top-[50%] left-10 lg:left-[35%] z-50 shadow-xl rounded-lg">
            <h1 className=" ml-5 mt-10 text-xl">Are your sure to delete?</h1>
            <div className="flex justify-around mt-10">
              <button
                className="basis-[40%] bg-green-500 text-white h-10 rounded-lg"
                onClick={() => setDeleteOptionShowing(!isDeleteOptionShowing)}
              >
                Cancel
              </button>
              <button
                className="basis-[40%] bg-red-700 text-white h-10 rounded-lg"
                onClick={deletePostHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="service-provider-post-container">
        <ServiceProviderHeader />
        <div className="line w-full h-[0.3px] bg-slate-700"></div>
        <div className="section flex items-center justify-center gap-10">
          <h1
            className={`${
              postShowing ? "" : "border-b-[3px] border-[#4e97fd] font-bold"
            } text-slate-700 text-2xl shadow-2xl cursor-pointer`}
            onClick={() => setPostShowing(!postShowing)}
          >
            Create Post
          </h1>
          <h1
            className={`${
              postShowing ? "border-b-[3px] border-[#4e97fd] font-bold" : ""
            } text-slate-700 text-2xl shadow-2xl cursor-pointer`}
            onClick={() => setPostShowing(!postShowing)}
          >
            Posts
          </h1>
        </div>

        <div className="post-sections-container mt-10">
          {!postShowing && (
            <div className="create-post flex justify-center flex-wrap p-3 lg:p-5">
              <div className="w-full lg:w-6/12 xl:w-4/12 my-10">
                <form
                  className="border-[0.3px] border-slate-600 p-4 lg:p-10 shadow-2xl rounded-xl w-full"
                  onSubmit={formik.handleSubmit}
                >
                  {!postImage ? (
                    <div
                      className="select-image flex justify-center items-center w-full h-[200px] border-2 border-slate-700 border-dashed gap-5 cursor-pointer rounded-2xl"
                      onClick={() => fileRef.current.click()}
                    >
                      <img
                        src={require("../../../Assets/cloud.png")}
                        alt=""
                        className="w-20 h-20"
                      />
                      <h1 className="mt-5">Select an image</h1>
                    </div>
                  ) : (
                    <img
                      src={postImage && URL.createObjectURL(postImage)}
                      alt=""
                      className="w-full h-[200px] gap-5 cursor-pointer rounded-2xl"
                    />
                  )}
                  {formik.touched.servicePostImage &&
                    formik.errors.servicePostImage && (
                      <div className="error text-red-600">
                        {formik.errors.servicePostImage}
                      </div>
                    )}
                  <input
                    type="file"
                    className="hidden"
                    name="servicePostImage"
                    value={formik.values.servicePostImage}
                    ref={fileRef}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setPostImage(e.target.files[0]);
                    }}
                    onBlur={formik.handleBlur}
                    accept="image/*"
                  />
                  <input
                    type="text"
                    name="serviceName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.serviceName}
                    placeholder="Enter your service name"
                    className="w-full border-[0.8px] border-slate-600 outline-none h-12 rounded-xl text-xl px-4 mt-6"
                  />
                  {formik.touched.serviceName && formik.errors.serviceName && (
                    <div className="error text-red-600">
                      {formik.errors.serviceName}
                    </div>
                  )}
                  <textarea
                    name="servicePostMessage"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.servicePostMessage}
                    className="w-full h-[120px] border-[0.8px] border-slate-600 outline-none mt-5 rounded-xl text-xl p-4"
                    placeholder="Write the post message here"
                  ></textarea>
                  {formik.touched.servicePostMessage &&
                    formik.errors.servicePostMessage && (
                      <div className="error text-red-600">
                        {formik.errors.servicePostMessage}
                      </div>
                    )}
                  <input
                    type="number"
                    name="servicePostPrice"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.servicePostPrice}
                    className="w-full h-12 border-[0.8px] border-slate-600 outline-none mt-5 rounded-xl text-xl p-4"
                    placeholder="Enter the price for this service"
                  />
                  {formik.touched.servicePostPrice &&
                    formik.errors.servicePostPrice && (
                      <div className="error text-red-600">
                        {formik.errors.servicePostPrice}
                      </div>
                    )}
                  <div className="w-full h-full flex justify-end">
                    {loading ? (
                      <div className="text-white h-12 rounded-lg w-3/12 mt-5 text-xl font-bold bg-[#4e97fd] flex justify-center items-center">
                        <LoaderCircles />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="text-white h-12 rounded-lg w-3/12 mt-5 text-xl font-bold bg-[#4e97fd]"
                      >
                        Post
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
          {postShowing ? (
            <div className="all-posts-container">
              <div className="search-bar flex justify-center my-5">
                <input
                  type="text"
                  className="border-b-[1px] focus:border-b-2 border-slate-700 lg:hover:w-[30%] lg:w-[14%] w-[50%] transition-all duration-700 ease-in-out bg-transparent outline-none"
                  placeholder="Search"
                  onChange={searchPostHandler}
                />
              </div>
              <div className="posts-container flex flex-wrap">
                {loadLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonPostLoader key={index} />
                  ))
                ) : posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.id} className="lg:w-6/12 xl:w-4/12 w-full">
                      <div className="card w-full h-full p-5">
                        <div className="relative">
                          <div className="absolute top-2 right-2">
                            <div
                              className="w-10 h-10 bg-[#dadada] rounded-full flex justify-center items-center cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700"
                              onClick={() => {
                                setDeleteOptionShowing(!isDeleteOptionShowing);
                                setDeletePostId(post._id);
                              }}
                            >
                              <img
                                src={require("../../../Assets/delete.png")}
                                alt=""
                                className="h-5 w-5"
                              />
                            </div>
                          </div>
                          <img
                            src={post.servicePostImage}
                            alt=""
                            className="w-full rounded-tl-lg rounded-tr-lg h-[250px]"
                          />
                          <div className="w-full bg-slate-600 rounded-b-lg">
                            <div className="flex justify-between items-center">
                              <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                                {post.serviceName}
                              </h1>
                              <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                                <h1 className="text-white font-bold">
                                  Rs {post.servicePostPrice}
                                </h1>
                              </div>
                            </div>
                            <div className="message px-4">
                            <p className="text-white">
                              {post?.servicePostMessage.length > 30
                                ? `${post.servicePostMessage.slice(0, 30)}...`
                                : post.servicePostMessage}
                            </p>
                            </div>
                            <div className="flex-row mt-5 justify-between">
                            {/* Rating Section */}
                            <div className="ml-4">
                              <div className="flex text-yellow-400 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={
                                      i <
                                      ratingCalculator(post?.servicePostRatings)
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                              <p className="text-white">
                                {post?.servicePostRatings?.length > 0
                                  ? `${
                                      ratingCalculator(
                                        post?.servicePostRatings
                                      ) || 0
                                    } out of 5 based on ${
                                      post.servicePostRatings.length
                                    } reviews`
                                  : "No Reviews"}
                              </p>
                            </div>
                            <h1 className="font-bold text-white px-4 py-2">
                              {timeFormatter(post?.createdAt)}
                            </h1>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full">
                    <h1 className="text-center">No posts into database</h1>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <ServiceProviderFooter />
      </div>
    </>
  );
};

export default ServiceProviderPost;
