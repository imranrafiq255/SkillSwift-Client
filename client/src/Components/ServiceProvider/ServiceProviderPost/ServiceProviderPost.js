import React, { useState, useEffect, useRef } from "react";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";
import SkeletonPostLoader from "../../Loader/ServiceProviderLoaders/SkeletonPostLoader";
import "./ServiceProviderPost.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const ServiceProviderPost = () => {
  const [postShowing, setPostShowing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const fileRef = useRef();
  const [postImage, setPostImage] = useState(null);
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
      setPostImage(null);
      console.log(myObj);

      formik.resetForm();
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: "Window installation",
          price: 49,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          time: "2 months ago",
          rating: 4.6,
        },
      ]);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="service-provider-post-container">
        <div className="header">
          <ServiceProviderHeader />
        </div>
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
                />
              </div>
              <div className="posts-container flex flex-wrap">
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonPostLoader key={index} />
                    ))
                  : posts.map((post) => (
                      <div key={post.id} className="lg:w-6/12 xl:w-4/12 w-full">
                        <div className="card w-full h-full p-5">
                          <div className="relative">
                            <div className=" absolute top-5 right-5">
                              <h1 className="text-white cursor-pointer">
                                Delete
                              </h1>
                            </div>
                            <img
                              src={require("../../../Assets/coffee with computer.jpeg")}
                              alt=""
                              className="w-full rounded-lg"
                            />
                            <div className="w-full bg-slate-600 rounded-b-lg">
                              <div className="flex justify-between items-center">
                                <h1 className="text-white p-4 font-bold lg:text-xl text-lg">
                                  {post.title}
                                </h1>
                                <div className="bg-[#4e97fd] w-20 h-8 mr-5 flex justify-center items-center shadow-xl rounded-lg">
                                  <h1 className="text-white font-bold">
                                    ${post.price}
                                  </h1>
                                </div>
                              </div>
                              <div className="message px-4 py-1">
                                <h1 className="text-white">
                                  {post.description}
                                </h1>
                              </div>
                              <div className="flex mt-5 justify-between">
                                <h1 className="font-bold text-white px-4">
                                  {post.time}
                                </h1>
                                <div className="flex flex-col justify-center items-center mb-8 bg-white mr-10 lg:p-2 p-1 rounded-xl lg:-mt-5 -mt-2">
                                  <div>
                                    <img
                                      src={require("../../../Assets/star.png")}
                                      alt=""
                                      className="lg:w-5 lg:h-5 w-3 h-3"
                                    />
                                    <h1 className="text-xs mt-2">
                                      {post.rating}
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
                  <select
                    name="service"
                    id=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.serviceName}
                    className="w-full border-[0.8px] border-slate-600 outline-none h-12 rounded-xl text-xl px-4 mt-6 focus:border-2 cursor-pointer"
                  >
                    <option readOnly={true}>
                      ---- Select the service ----
                    </option>
                    <option value="1">1</option>
                    <option value="1">1</option>
                    <option value="1">1</option>
                  </select>
                  {formik.touched.service && formik.errors.service && (
                    <div className="error text-red-600">
                      {formik.errors.service}
                    </div>
                  )}
                  <input
                    type="number"
                    name="servicePostPrice"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.servicePostPrice}
                    className="w-full border-[0.8px] border-slate-600 outline-none h-12 rounded-xl text-xl px-4 mt-6 focus:border-2"
                    placeholder="Enter Post Price"
                  />
                  {formik.touched.servicePostPrice &&
                    formik.errors.servicePostPrice && (
                      <div className="error text-red-600">
                        {formik.errors.servicePostPrice}
                      </div>
                    )}
                  <textarea
                    name="servicePostMessage"
                    id=""
                    rows={4}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.servicePostMessage}
                    className="w-full border-[0.8px] border-slate-600 outline-none rounded-xl text-xl px-4 mt-6 focus:border-2"
                    placeholder="Type your message ..."
                  ></textarea>
                  {formik.touched.servicePostMessage &&
                    formik.errors.servicePostMessage && (
                      <div className="error text-red-600">
                        {formik.errors.servicePostMessage}
                      </div>
                    )}
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-[#4e97fd] text-white w-32 h-10 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="footer">
          <ServiceProviderFooter />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderPost;
