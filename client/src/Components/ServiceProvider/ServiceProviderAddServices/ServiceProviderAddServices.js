import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import LoaderBars from "../../Loader/LoaderBars";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { serviceProviderListedServicesAction } from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import LoaderCircles from "../../Loader/LoaderCircles";
const ServiceProviderServices = () => {
  const [services, setServices] = useState([]);
  const [serviceProviderListedServices, setServiceProviderListedServices] =
    useState([]);
  const [serviceLoading, setServiceLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector(
    (state) => state.serviceProviderListedServicesReducer
  );
  const location = useLocation();
  const toastMessage = location?.state?.message || null;
  const toastMessageRef = useRef(false);
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-services");
        setServices(response.data.services);
      } catch (error) {
        console.log(error?.response?.data?.message);
        handleShowFailureToast(error?.response?.data?.message);
      } finally {
        setServiceLoading(false);
      }
    };
    loadServices();
  }, []);
  const addServiceIntoArrayBtn = (service) => {
    if (
      serviceProviderListedServices.some((item) => item.service === service._id)
    ) {
      setServiceProviderListedServices((prevServices) =>
        prevServices.filter((item) => item.service !== service._id)
      );
    } else {
      setServiceProviderListedServices((prevServices) => [
        ...prevServices,
        { service: service._id },
      ]);
    }
  };
  useEffect(() => {
    if (toastMessage && !toastMessage.current) {
      handleShowSuccessToast(toastMessage);
      toastMessageRef.current = true;
    }
  }, [toastMessage, toastMessageRef]);
  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log(error);
        handleShowFailureToast(error);
      } else if (message) {
        console.log(message);
        navigate("/service-provider-home", { state: { message } });
      }
    }
  }, [navigate, message, error, loading]);
  const submitAddServicesBtn = () => {
    if (serviceProviderListedServices.length === 0) {
      handleShowFailureToast("Please select at least one service");
      return;
    }
    dispatch(
      serviceProviderListedServicesAction(serviceProviderListedServices)
    );
  };
  return (
    <>
      <Toaster />
      <div className="add-services-container w-screen h-screen flex">
        <div className="left-side w-full lg:w-6/12 h-full flex justify-center items-center flex-col">
          <div className="sign-in-container w-11/12 sm:w-8/12 lg:w-9/12 h-2/4">
            <div className="line h-1 w-3 bg-[#4e97fd]"></div>
            <div>
              <h1 className="text-[#4e97fd] my-5 text-4xl font-bold">
                Select your services
              </h1>
              <div className="time-slots-container">
                {serviceLoading ? (
                  <div className="loader-container flex justify-center">
                    <LoaderBars />
                  </div>
                ) : (
                  <div className="mt-14 flex flex-wrap w-full">
                    {services &&
                      services.map((service, index) => (
                        <div className="w-6/12 lg:w-1/3 mt-6" key={index}>
                          <input
                            type="text"
                            readOnly
                            value={service?.serviceName}
                            onClick={() => addServiceIntoArrayBtn(service)}
                            className={`${
                              serviceProviderListedServices.some(
                                (item) => item.service === service._id
                              )
                                ? "bg-slate-500 text-white border-none outline-none"
                                : " border-2 outline-slate-500 border-slate-500"
                            } text-center py-2 rounded-lg cursor-pointer mr`}
                          />
                        </div>
                      ))}
                  </div>
                )}
                {loading ? (
                  <div className="w-[96%] bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] mt-14 flex justify-center items-center">
                    <LoaderCircles />
                  </div>
                ) : (
                  <button
                    className="w-[96%] bg-black h-12 border-none rounded-[30px] text-white bg-gradient-to-r from-[#020024] via-[#090979] to-[#4e97fd] mt-14"
                    onClick={submitAddServicesBtn}
                  >
                    Add Services
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="right-side hidden lg:w-6/12 h-full lg:flex justify-center items-center">
          <img
            src={require("../../../Assets/tools-illustrations.jpg")}
            alt=""
            className="w-full h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderServices;
