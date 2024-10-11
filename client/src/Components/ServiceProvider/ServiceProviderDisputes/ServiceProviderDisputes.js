import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage.js";
import { useSelector, useDispatch } from "react-redux";
import { loadDisputesAction } from "../../Redux/ServiceProvider/Actions/ServiceProviderActions.js";
import RingLoader from "../../Loader/RingLoader.js";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader.jsx";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter.js";

const ServiceProviderDisputes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const toastMessage = query.get("message");
  const hasToastShown = useRef(false);
  const dispatch = useDispatch();
  const { disputeLoader, disputes } = useSelector(
    (state) => state.loadDisputesReducer
  );

  const [hoveredDispute, setHoveredDispute] = useState(null);

  useEffect(() => {
    if (!hasToastShown.current && toastMessage) {
      hasToastShown.current = true;
      handleShowSuccessToast(toastMessage);
      navigate(location.pathname, { state: { message: null } });
    }
  }, [location.pathname, toastMessage, hasToastShown, navigate]);

  useEffect(() => {
    dispatch(loadDisputesAction());
  }, [dispatch]);

  const handleMouseEnter = (dispute) => {
    setHoveredDispute(dispute);
  };

  const handleMouseLeave = () => {
    setHoveredDispute(null);
  };
  const timeConvertorForRefundDeadline = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() + 10;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
  const timeConvertorForRefundApproval = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
  return (
    <>
      <div>
        <ServiceProviderHeader />
        <div>
          <div className="home-container flex justify-center">
            <div className="sub-home-container w-10/12">
              <h1 className="text-lg lg:xl xl:text-4xl font-bold text-[#4e97fd]">
                Dispute Management
              </h1>
              <div className="dispute-container flex justify-center my-5">
                <div className="dispute-sub-container w-full lg:w-10/12 xl:w-8/12 flex flex-wrap">
                  {disputeLoader && (
                    <div>
                      <RingLoader />
                    </div>
                  )}
                  {!disputeLoader && disputes?.length > 0 ? (
                    disputes?.map((dispute) => (
                      <div
                        key={dispute._id}
                        className="relative bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 w-full lg:6/12 xl:w-4/12"
                        onMouseEnter={() => handleMouseEnter(dispute)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <h2 className="text-lg xl:text-xl font-semibold mb-4">
                          {dispute?.disputeTitle}
                        </h2>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Reason:</span>{" "}
                          {dispute?.disputeDetails}
                        </p>
                        <div className="mt-4">
                          <h3 className="text-lg font-medium mb-2">
                            Customer Details
                          </h3>
                          <p className="text-gray-600">
                            <span className="font-medium">Name:</span>{" "}
                            {dispute?.disputeFiledBy?.consumerFullName}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Phone:</span>{" "}
                            {dispute?.disputeFiledBy?.consumerPhoneNumber}
                          </p>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-medium mb-2">
                            Service Details
                          </h3>
                          <p className="text-gray-600">
                            <span className="font-medium">Service Name:</span>{" "}
                            {dispute?.order?.servicePost?.serviceName}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Amount:</span>{" "}
                            {"Rs " +
                              dispute?.order?.servicePost?.servicePostPrice}
                          </p>
                          {dispute?.disputeStatus === "pending" && (
                            <div className="w-full bg-[#4e97fd] text-white py-4 mt-3 flex justify-center items-center">
                              Pending
                            </div>
                          )}
                          {dispute?.disputeStatus === "rejected" && (
                            <div className="w-full bg-red-600 text-white py-4 mt-3 flex justify-center items-center">
                              Rejected
                            </div>
                          )}
                          {dispute?.disputeStatus === "resolved" && (
                            <div className="w-full bg-green-400 text-white py-4 mt-3 flex justify-center items-center">
                              Resolved
                            </div>
                          )}
                        </div>

                        {/* Dialog Box for hovered dispute */}
                        {hoveredDispute === dispute &&
                          dispute?.disputeResolution && (
                            <div className="absolute left-0 top-0 bg-slate-500 text-white rounded-lg shadow-lg p-4 w-72 z-10">
                              <p className="mb-2">
                                <span className="font-medium">
                                  Resolution Message:
                                </span>{" "}
                                {dispute?.disputeResolution}
                              </p>
                              <p className="">
                                <span className="font-medium">
                                  Refund Approval:
                                </span>{" "}
                                {timeConvertorForRefundApproval(
                                  dispute?.updatedAt
                                )}
                              </p>
                              <p className="">
                                <span className="font-medium">
                                  Refund Deadline:
                                </span>{" "}
                                {timeConvertorForRefundDeadline(
                                  dispute?.updatedAt
                                )}
                              </p>
                              <p className="">
                                <span className="font-medium">Amount:</span>{" "}
                                {"Rs " +
                                  dispute?.order?.servicePost?.servicePostPrice}
                              </p>
                            </div>
                          )}
                      </div>
                    ))
                  ) : (
                    <div>
                      <h1>No disputes in database.</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ServiceProviderFooter />
      </div>
    </>
  );
};

export default ServiceProviderDisputes;
