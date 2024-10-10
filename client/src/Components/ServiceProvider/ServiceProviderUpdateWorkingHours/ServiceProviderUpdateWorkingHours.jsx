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
const ServiceProviderUpdateWorkingHours = () => {
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

  const workingHours = [
    {
      dayOfWeek: "Monday",
      time: "10:00AM to 12:00PM",
      _id: "6703a68c6a76c3463b35e936",
    },
    {
      dayOfWeek: "Tuesday",
      time: "10:00AM to 12:00PM",
      _id: "67076cf9957393e283eb174f",
    },
    {
      dayOfWeek: "Sunday",
      time: "4:00PM to 6:00PM",
      _id: "67076e42957393e283eb182b",
    },
    {
      dayOfWeek: "Sunday",
      time: "2:00PM to 4:00PM",
      _id: "670770d10fa39ff80c148ab7",
    },
    {
      dayOfWeek: "Friday",
      time: "12:00PM to 2:00PM",
      _id: "670774a70fa39ff80c148e73",
    },
    {
      dayOfWeek: "Thursday",
      time: "4:00PM to 6:00PM",
      _id: "670775280fa39ff80c149152",
    },
    {
      dayOfWeek: "Tuesday",
      time: "8:00AM to 10:00AM",
      _id: "670775870fa39ff80c14920b",
    },
    {
      dayOfWeek: "Wednesday",
      time: "10:00AM to 12:00PM",
      _id: "670775c50fa39ff80c14943e",
    },
    {
      dayOfWeek: "Saturday",
      time: "10:00AM to 12:00PM",
      _id: "670776320fa39ff80c1496e1",
    },
    {
      dayOfWeek: "Sunday",
      time: "2:00PM to 4:00PM",
      _id: "670770d10fa39ff80c148ab7",
    },
    {
      dayOfWeek: "Friday",
      time: "12:00PM to 2:00PM",
      _id: "670774a70fa39ff80c148e73",
    },
    {
      dayOfWeek: "Thursday",
      time: "4:00PM to 6:00PM",
      _id: "670775280fa39ff80c149152",
    },
    {
      dayOfWeek: "Tuesday",
      time: "8:00AM to 10:00AM",
      _id: "670775870fa39ff80c14920b",
    },
    {
      dayOfWeek: "Wednesday",
      time: "10:00AM to 12:00PM",
      _id: "670775c50fa39ff80c14943e",
    },
    {
      dayOfWeek: "Saturday",
      time: "10:00AM to 12:00PM",
      _id: "670776320fa39ff80c1496e1",
    },
  ];

  const handleDelete = (id) => {
    // Add logic here for handling deletion of the time slot with the given id.
    alert("Deleting time slot with ID:", id);
  };

  return (
    <>
      <Toaster />
      <div className="add-services-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-in-container w-11/12 sm:w-8/12 lg:w-9/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <h1 className="text-[#4e97fd] text-4xl font-bold">
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
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-10/12 h-96">
            <h1 className="text-[#4e97fd] my-3 text-3xl font-bold">
              Available time slots
            </h1>
            <div className="overflow-y-auto h-[80%]">
              {workingHours.length > 0 ? (
                workingHours.map((slot) => (
                  <div
                    key={slot._id}
                    className="flex justify-between items-center p-2 border-b border-gray-200"
                  >
                    <div>
                      <p className="text-xs font-medium">{slot.dayOfWeek}</p>
                      <p className="text-xs text-gray-600">{slot.time}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No working slots available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderUpdateWorkingHours;
