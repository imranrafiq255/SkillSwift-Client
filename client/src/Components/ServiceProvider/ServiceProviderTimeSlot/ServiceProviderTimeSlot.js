import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadCurrentServiceProviderAction,
  serviceProviderAddTimeSlotAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoaderCircles from "../../Loader/LoaderCircles";
const ServiceProviderTimeSlot = () => {
  const { loading, error, message } = useSelector(
    (state) => state.serviceProviderAddTimeSlotReducer
  );
  const { serviceProvider } = useSelector(
    (state) => state?.loadCurrentServiceProviderReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toastMessage = location?.state?.message || null;
  const toastMessageRef = useRef(false);
  const formik = useFormik({
    initialValues: {
      dayOfWeek: "",
      time: "",
    },
    validationSchema: Yup.object({
      dayOfWeek: Yup.string().required("Please select day"),
      time: Yup.string().required("Please select time"),
    }),
    onSubmit: (values) => {
      dispatch(clearErrors());
      dispatch(serviceProviderAddTimeSlotAction(values));
      dispatch(clearErrors());
      formik.handleReset();
    },
  });
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadCurrentServiceProviderAction());
  }, [dispatch]);
  const workingHoursToastMessageRef = useRef(false);
  useEffect(() => {
    if (!loading) {
      if (error && !workingHoursToastMessageRef.current) {
        handleShowFailureToast(error);
        workingHoursToastMessageRef.current = true;
      } else if (message && !workingHoursToastMessageRef.current) {
        if (serviceProvider) {
          handleShowSuccessToast(message);
          navigate("/service-provider-home", { state: { message } });
          window.location.href = `/service-provider-home?message=${"You added time slot successfully."}`;
          workingHoursToastMessageRef.current = true;
        } else if (!serviceProvider) {
          navigate(
            "/service-provider-account-verification/your account is not verified",
            { state: { message } }
          );
          workingHoursToastMessageRef.current = true;
        }
      }
    }
  }, [loading, message, error, navigate, serviceProvider]);
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
          <div className="sign-in-container w-11/12 sm:w-8/12 lg:w-9/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                  Add your time slots
                </h1>
                <div className="mt-10">
                  <label htmlFor="" className="font-bold">
                    Select day
                  </label>
                  <br />
                  <select
                    name="dayOfWeek"
                    onChange={formik.handleChange}
                    value={formik.values.dayOfWeek}
                    onBlur={formik.handleBlur}
                    className={
                      "w-[80%] border-b-[2px] border-slate-400 focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none h-11 text-xl cursor-pointer mt-6"
                    }
                  >
                    <option value="">----- Select day -----</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                  <div>
                    {formik.touched.dayOfWeek && formik.errors.dayOfWeek ? (
                      <h1 className="text-red-600">
                        {formik.errors.dayOfWeek}
                      </h1>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mt-10">
                  <label htmlFor="" className="font-bold">
                    Select Time
                  </label>
                  <br />
                  <select
                    name="time"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      "w-[80%] border-b-[2px] border-slate-400 focus:border-slate-800 focus:transition-colors focus:duration-700 ease-in-out outline-none h-11 text-xl cursor-pointer mt-6"
                    }
                  >
                    <option value="">----- Select time -----</option>
                    <option value="8:00AM to 10:00AM">8:00AM to 10:00AM</option>
                    <option value="10:00AM to 12:00PM">
                      10:00AM to 12:00PM
                    </option>
                    <option value="12:00PM to 2:00PM">12:00PM to 2:00PM</option>
                    <option value="2:00PM to 4:00PM">2:00PM to 4:00PM</option>
                    <option value="4:00PM to 6:00PM">4:00PM to 6:00PM</option>
                  </select>
                  <div>
                    {formik.touched.time && formik.errors.time ? (
                      <h1 className="text-red-600">{formik.errors.time}</h1>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {loading ? (
                  <div className="w-[80%] bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] mt-20 flex justify-center items-center">
                    <LoaderCircles />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-[80%] bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] mt-20"
                  >
                    Add Time Slot
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../../Assets/time-illustrattions.jpg")}
            alt=""
            className="w-full h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderTimeSlot;
