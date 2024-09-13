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
  loadCurrentServiceProviderAction,
  serviceProviderAddServicePostAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import { Toaster } from "react-hot-toast";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import LoaderCircles from "../../Loader/LoaderCircles";

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
  // const { serviceProvider, serviceProviderLoading } = useSelector(
  //   (state) => state.loadCurrentServiceProviderReducer
  // );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      service: "",
      servicePostMessage: "",
      servicePostPrice: "",
      servicePostImage: null,
    },
    validationSchema: Yup.object({
      service: Yup.string().required("Post title is required"),
      servicePostMessage: Yup.string().required("Post message is required"),
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

  useEffect(() => {
    if (!loading && error) {
      handleShowFailureToast(error);
    } else if (!loading && message) {
      handleShowSuccessToast(message);
      setPostShowing(true);
    }
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

    const filteredPosts = allPosts.filter(
      (post) =>
        post.service.serviceName.toLowerCase().includes(searchTerm) ||
        post.service.serviceDescription.toLowerCase().includes(searchTerm)
    );
    setPosts(filteredPosts);
  };

  return (
    <>
      <Toaster />
      <div className="service-provider-post-container">
        <ServiceProviderHeader />
        <div className="line w-full h-[0.3px] bg-slate-700"></div>
        <div className="post-sections-container mt-10">
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
                {loadLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonPostLoader key={index} />
                    ))
                  : posts.map((post) => (
                      <div key={post.id} className="lg:w-6/12 xl:w-4/12 w-full">
                        <div className="card w-full h-full p-5">
                          <div className="relative">
                            <div className="absolute top-5 right-5">
                              <h1 className="text-white cursor-pointer">
                                Delete
                              </h1>
                            </div>
                            <img
                              src={post.servicePostImage}
                              alt=""
                              className="w-full rounded-tl-lg rounded-tr-lg h-[250px]"
                            />
                            <div className="w-full bg-slate-600 rounded-b-lg">
                              <div className="flex justify-between items-center">
                                <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                                  {post.service.serviceName}
                                </h1>
                                <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                                  <h1 className="text-white font-bold">
                                    ${post.servicePostPrice}
                                  </h1>
                                </div>
                              </div>
                              <div className="message px-4 py-1">
                                <h1 className="text-white">
                                  {post.servicePostMessage}
                                </h1>
                              </div>
                              <div className="flex mt-5 justify-between">
                                <h1 className="font-bold text-white px-4">
                                  {timeFormatter(post.createdAt)}
                                </h1>
                                <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                                  <div>
                                    <img
                                      src={require("../../../Assets/star.png")}
                                      alt=""
                                      className="lg:w-5 lg:h-5 w-3 h-3"
                                    />
                                    <h1 className="text-xs mt-2 text-center">
                                      {post.servicePostRatings.length}
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          ) : (
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
                      <h1 className="error text-red-500 text-sm">
                        {formik.errors.servicePostImage}
                      </h1>
                    )}
                  <input
                    type="file"
                    name="servicePostImage"
                    ref={fileRef}
                    onChange={(e) => setPostImage(e.target.files[0])}
                    className="hidden"
                  />
                  <input
                    type="text"
                    name="service"
                    value={formik.values.service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="my-5 w-full outline-none border-b-[1px] border-slate-700 p-2 bg-transparent"
                    placeholder="Post Title"
                  />
                  {formik.touched.service && formik.errors.service && (
                    <h1 className="error text-red-500 text-sm">
                      {formik.errors.service}
                    </h1>
                  )}
                  <textarea
                    name="servicePostMessage"
                    value={formik.values.servicePostMessage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    cols="30"
                    rows="4"
                    className="my-5 w-full outline-none border-b-[1px] border-slate-700 p-2 bg-transparent"
                    placeholder="Post Message"
                  ></textarea>
                  {formik.touched.servicePostMessage &&
                    formik.errors.servicePostMessage && (
                      <h1 className="error text-red-500 text-sm">
                        {formik.errors.servicePostMessage}
                      </h1>
                    )}
                  <input
                    type="number"
                    name="servicePostPrice"
                    value={formik.values.servicePostPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="my-5 w-full outline-none border-b-[1px] border-slate-700 p-2 bg-transparent"
                    placeholder="Post Price"
                  />
                  {formik.touched.servicePostPrice &&
                    formik.errors.servicePostPrice && (
                      <h1 className="error text-red-500 text-sm">
                        {formik.errors.servicePostPrice}
                      </h1>
                    )}
                  <div className="flex justify-center my-5">
                    <button
                      type="submit"
                      className="bg-slate-700 text-white p-3 shadow-lg rounded-2xl"
                      disabled={loading}
                    >
                      {loading ? <LoaderCircles /> : "Create Post"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <ServiceProviderFooter />
      </div>
    </>
  );
};

export default ServiceProviderPost;
