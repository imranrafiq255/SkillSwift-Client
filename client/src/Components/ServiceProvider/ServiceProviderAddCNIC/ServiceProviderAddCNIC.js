import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  serviceProviderAddCNICAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { useNavigate, useLocation } from "react-router-dom";
import LoaderCircles from "../../Loader/LoaderCircles";
import { Toaster } from "react-hot-toast";
const ServiceProviderAddCNIC = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.serviceProviderAddCNICReducer
  );
  const location = useLocation();
  const toastMessage = location?.state?.message || null;
  const toastMessageRef = useRef(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      cnicPhoto1: null,
      cnicPhoto2: null,
    },
    validationSchema: Yup.object({
      cnicPhoto1: Yup.mixed().required("CNIC photo 1 is required"),
      cnicPhoto2: Yup.mixed().required("CNIC photo 2 is required"),
    }),
    onSubmit: (values) => {
      const data = { cnicPhoto1: image1, cnicPhoto2: image2 };
      dispatch(clearErrors());
      dispatch(serviceProviderAddCNICAction(data));
      formik.handleReset();
      setImage1(null);
      setImage2(null);
    },
  });
  useEffect(() => {
    if (!loading) {
      if (error) {
        handleShowFailureToast(error);
      } else if (message) {
        navigate("/service-provider-add-time", { state: { message } });
      }
    }
  }, [loading, error, navigate, message]);
  useEffect(() => {
    if (toastMessage && !toastMessage.current) {
      handleShowSuccessToast(toastMessage);
      toastMessageRef.current = true;
    }
  }, [toastMessage, toastMessageRef]);

  return (
    <>
      <Toaster />
      <div className="add-services-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-in-container w-11/12 sm:w-8/12 lg:w-9/12 h-2/4 mt-[-120px]">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Add CNIC Photos
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label className="uppercase ">Choose first photo</label>
                  {!image1 && (
                    <div
                      className=" w-10/12 h-[150px] border-2 border-dashed border-slate-700 flex justify-center items-center mt-4 cursor-pointer"
                      onClick={() => image1Ref.current.click()}
                    >
                      Upload CNIC Photo 1
                    </div>
                  )}
                  <br />
                  <input
                    type="file"
                    className="image1 hidden"
                    accept="image/*"
                    ref={image1Ref}
                    name="cnicPhoto1"
                    onChange={(e) => {
                      setImage1(e.target.files[0]);
                      formik.handleChange(e);
                    }}
                  />
                  {image1 && (
                    <img
                      src={URL.createObjectURL(image1)}
                      alt=""
                      className="ImagePreview1 w-10/12 h-[180px] border-2 border-dashed border-slate-700 flex justify-center items-center mt-4 cursor-pointer"
                    />
                  )}
                  {formik.touched.cnicPhoto1 && formik.errors.cnicPhoto1 ? (
                    <h1 className="text-red-500">{formik.errors.cnicPhoto1}</h1>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label className="uppercase">Choose second photo</label>
                  {!image2 && (
                    <div
                      className="w-10/12 h-[150px] border-2 border-dashed border-slate-700 flex justify-center items-center mt-4 cursor-pointer"
                      onClick={() => image2Ref.current.click()}
                    >
                      Upload CNIC Photo 2
                    </div>
                  )}
                  <br />
                  <input
                    type="file"
                    className="image2 hidden"
                    accept="image/*"
                    ref={image2Ref}
                    name="cnicPhoto2"
                    onChange={(e) => {
                      setImage2(e.target.files[0]);
                      formik.handleChange(e);
                    }}
                  />
                  {image2 && (
                    <img
                      src={URL.createObjectURL(image2)}
                      alt=""
                      className="ImagePreview1 w-10/12 h-[180px] border-2 border-dashed border-slate-700 flex justify-center items-center mt-4 cursor-pointer"
                    />
                  )}
                  {formik.touched.cnicPhoto2 && formik.errors.cnicPhoto2 ? (
                    <h1 className="text-red-500">{formik.errors.cnicPhoto2}</h1>
                  ) : (
                    ""
                  )}
                </div>
                {loading ? (
                  <div className="w-[83%] bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] mt-10 flex justify-center items-center">
                    <LoaderCircles />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-[83%] bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] mt-10"
                  >
                    Add CNIC
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../../Assets/camera-illustration.jpg")}
            alt=""
            className="w-full h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderAddCNIC;
