import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import LoaderCircles from "../../Loader/LoaderCircles";
import { serviceProviderUploadInfoAction } from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
// Validation Schema
const validationSchema = Yup.object({
  serviceProviderPhoneNumber: Yup.string()
    .matches(
      /^\+92\d{10}$/,
      "Phone number must start with +92 followed by 10 digits"
    )
    .required("Phone number is required"),
  serviceProviderAvatar: Yup.mixed().required("Profile picture is required"),
  serviceProviderAddress: Yup.string().required("Address is required"),
});

const ServiceProviderUpdateInfo = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();
  const myMessage = location.state?.message || null;
  const myMessageRef = useRef(false);
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (state) => state.serviceProviderUploadInfoReducer
  );
  const formik = useFormik({
    initialValues: {
      serviceProviderPhoneNumber: "",
      serviceProviderAvatar: null,
      serviceProviderAddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(serviceProviderUploadInfoAction(values));
    },
  });

  // Function to handle image upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("serviceProviderAvatar", file);
    }
  };

  useEffect(() => {
    if (myMessage && !myMessageRef.current) {
      handleShowSuccessToast(myMessage);
      myMessageRef.current = true;
    }
  }, [myMessage, myMessageRef]);
  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log(error);
        handleShowFailureToast(error);
      } else if (message) {
        console.log(message);
        navigate("/service-provider-add-cnic", {
          state: { message: message },
        });
      }
    }
  }, [loading, message, error, navigate]);
  return (
    <>
      <Toaster />
      <div className="sign-up-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-up-container w-10/12 sm:w-8/12 lg:w-6/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Personal Info
              </h1>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="sign-up-form bg-white w-full h-full"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="w-64 h-64 rounded-full border-dashed border-2 border-gray-300 flex items-center justify-center relative">
                  {imagePreview ? (
                    <img
                      alt=""
                      className="w-64 h-64 rounded-full border-dashed border-2 border-gray-300 flex items-center justify-center relative"
                      src={imagePreview}
                    />
                  ) : (
                    <span className="text-gray-400">Profile Picture</span>
                  )}
                  <img
                    className="w-12 h-12 absolute bottom-12 right-8 transform translate-x-1/2 translate-y-1/2 shadow cursor-pointer"
                    src={require("../../../Assets/camera.png")}
                    onClick={() => fileInputRef.current.click()}
                    alt="Camera icon"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                {formik.touched.serviceProviderAvatar &&
                formik.errors.serviceProviderAvatar ? (
                  <div className="text-red-500 text-sm text-center mt-2">
                    {formik.errors.serviceProviderAvatar}
                  </div>
                ) : null}
              </div>

              <div className="phone">
                <label htmlFor="phoneNumber">Your Phone</label> <br />
                <input
                  type="text"
                  id="serviceProviderPhoneNumber"
                  name="serviceProviderPhoneNumber"
                  value={formik.values.serviceProviderPhoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl ${
                    formik.touched.serviceProviderPhoneNumber &&
                    formik.errors.serviceProviderPhoneNumber
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="+923001234567"
                />
                {formik.touched.serviceProviderPhoneNumber &&
                formik.errors.serviceProviderPhoneNumber ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.serviceProviderPhoneNumber}
                  </div>
                ) : null}
              </div>
              <div className="address">
                <label htmlFor="address">Your Address</label> <br />
                <input
                  type="text"
                  id="address"
                  name="serviceProviderAddress"
                  value={formik.values.serviceProviderAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border-b-[0.5px] border-slate-400 focus:border-b-[2px] focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none mt-2 h-11 text-xl ${
                    formik.touched.serviceProviderAddress &&
                    formik.errors.serviceProviderAddress
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Near noor mahel, Bahawalpur"
                />
                {formik.touched.serviceProviderAddress &&
                formik.errors.serviceProviderAddress ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.serviceProviderAddress}
                  </div>
                ) : null}
              </div>
              <div className="mt-8">
                {loading ? (
                  <div className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] flex justify-center items-center">
                    <LoaderCircles />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd]"
                  >
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../../Assets/SignUpIllustrator.jpg")}
            alt=""
            className="w-[80%] h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderUpdateInfo;
