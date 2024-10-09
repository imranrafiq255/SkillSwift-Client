import React, { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ContactSection from "../ConsumerCommon/ContactSection";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  fileDisputeAction,
  loadAllDisputesAction,
  loadOrdersAction,
  loadRefundsAction,
  refundAmountRequestAction,
} from "../../Redux/Consumer/Actions/ConsumerActions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage.js";
import LoaderCircles from "../../Loader/LoaderCircles.js";
import { Toaster } from "react-hot-toast";
const DisputePage = () => {
  const [activeTab, setActiveTab] = useState("inProgress");
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [percentangeAmount, setPercentageAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { disputeLoading, disputeError, disputes } = useSelector(
    (state) => state.loadAllDisputesReducer
  );
  const { loading, error, orders } = useSelector(
    (state) => state.loadOrdersReducer
  );
  const { fileDisputeLoading, fileDisputeError, fileDisputeMessage } =
    useSelector((state) => state.fileDisputeReducer);
  const { refundLoading, refundError, refunds } = useSelector(
    (state) => state.loadRefundsReducer
  );
  const { refundRequestLoading, refundRequestError, refundRequestMessage } =
    useSelector((state) => state?.refundAmountRequestReducer);
  const handleOpenDisputeModal = () => {
    setShowDisputeModal(true);
    setSelectedServiceId("");
    setReason("");
    setDescription("");
    setErrors({});
  };
  const handleOpenRefundModal = () => {
    setShowRefundModal(true);
    setSelectedServiceId("");
    setDetails("");
    setPercentageAmount(0);
    setErrors({});
  };

  const handleCloseDisputeModal = () => {
    setShowDisputeModal(false);
  };
  const handleCloseRefundModal = () => {
    setShowRefundModal(false);
  };

  const handleOutsideClick = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (showDisputeModal) {
          handleCloseDisputeModal();
        }
        if (showRefundModal) {
          handleCloseRefundModal();
        }
      }
    },
    [showDisputeModal, showRefundModal]
  );

  useEffect(() => {
    if (showDisputeModal || showRefundModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDisputeModal, showRefundModal, handleOutsideClick]);

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadAllDisputesAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadOrdersAction());
  }, [dispatch]);
  const completedOrders = orders?.filter(
    (order) => order.orderStatus === "completed"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!selectedServiceId) newErrors.service = "Please select a service.";
    if (!reason) newErrors.reason = "Reason is required.";
    if (!description) newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const order = completedOrders?.find(
      (order) => order?._id.toString() === selectedServiceId.toString()
    );

    const id = order?.serviceProvider?._id;
    const data = {
      disputeTitle: reason,
      disputeDetails: description,
      order: selectedServiceId,
    };

    dispatch(clearErrors());
    dispatch(fileDisputeAction(id, data));
  };

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!selectedServiceId) newErrors.service = "Please select a service.";
    if (!percentangeAmount) newErrors.amount = "Percentage is required.";
    if (!details) newErrors.details = "Details are required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const order = completedOrders?.find(
      (order) => order?._id.toString() === selectedServiceId.toString()
    );

    const refundData = {
      refundRequestedAgainst: order?.serviceProvider?._id,
      refundAmountPercentage: percentangeAmount,
      refundDetails: details,
      order: selectedServiceId,
    };
    dispatch(clearErrors());
    dispatch(refundAmountRequestAction(refundData));
  };
  const fileDisputeToastRef = useRef(false);
  useEffect(() => {
    if (
      !fileDisputeLoading &&
      fileDisputeError &&
      !fileDisputeToastRef.current
    ) {
      handleShowFailureToast(fileDisputeError);
      fileDisputeToastRef.current = true;
      handleCloseDisputeModal();
    } else if (
      !fileDisputeLoading &&
      fileDisputeMessage &&
      !fileDisputeToastRef.current
    ) {
      handleShowSuccessToast(fileDisputeMessage);
      handleCloseDisputeModal();
      fileDisputeToastRef.current = true;
    }
  }, [
    fileDisputeLoading,
    fileDisputeError,
    fileDisputeToastRef,
    fileDisputeMessage,
  ]);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadRefundsAction());
  }, [dispatch]);
  const refundRequestToastRef = useRef(false);
  useEffect(() => {
    if (
      !refundRequestToastRef.current &&
      refundRequestError &&
      !refundRequestLoading
    ) {
      refundRequestToastRef.current = true;
      handleShowFailureToast(refundRequestError);
      handleCloseRefundModal();
    } else if (
      !refundRequestToastRef.current &&
      refundRequestMessage &&
      !refundRequestLoading
    ) {
      refundRequestToastRef.current = true;
      handleShowSuccessToast(refundRequestMessage);
      handleCloseRefundModal();
    }
  }, [refundRequestMessage, refundRequestLoading, refundRequestError]);
  useEffect(() => {
    if (!loading && error) {
      console.log(error);
    }
  }, [loading, error]);
  useEffect(() => {
    if (!refundLoading && refundError) {
      console.log(refundError);
    }
  }, [refundLoading, refundError]);
  useEffect(() => {
    if (!disputeLoading && disputeError) {
      console.log(disputeError);
    }
  }, [disputeLoading, disputeError]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Toaster />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Disputes</h1>

        <div className="flex gap-5">
          <button
            onClick={handleOpenDisputeModal}
            className="text-xs lg:text-lg mb-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Apply for Refund
          </button>
          {/* <button
            onClick={handleOpenRefundModal}
            className="text-xs lg:text-lg mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Apply for Partial Refund
          </button> */}
        </div>

        <div className="flex flex-wrap justify-center md:justify-start mb-6">
          {["inProgress", "accepted", "rejected"].map((tab) => (
            <div
              key={tab}
              className={`py-3 px-3 text-sm cursor-pointer transition-colors duration-200
                ${
                  activeTab === tab
                    ? "bg-gray-200 text-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() +
                tab.slice(1).replace(/([A-Z])/g, " $1")}
            </div>
          ))}
        </div>

        {/* Disputes List */}
        <div className="grid grid-cols-1 gap-6">
          {!disputeLoading &&
            disputes &&
            disputes
              ?.filter((dispute) => {
                if (activeTab === "inProgress")
                  return dispute?.disputeStatus === "pending";
                if (activeTab === "accepted")
                  return dispute?.disputeStatus === "resolved";
                if (activeTab === "rejected")
                  return dispute?.disputeStatus === "rejected";
                return false;
              })
              ?.map((dispute) => (
                <div
                  key={dispute?.id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={dispute?.order?.servicePost?.servicePostImage}
                      alt={dispute?.order?.servicePost?.serviceName}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {dispute?.order?.servicePost?.serviceName}
                      </h2>
                      <p className="text-lg font-bold text-blue-600">
                        Rs.{" "}
                        {dispute?.order?.servicePost?.servicePostPrice +
                          " Full Amount"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* Refunds */}
        <div className="grid grid-cols-1 gap-6 mt-4">
          {!refundLoading &&
            refunds &&
            refunds
              ?.filter((refund) => {
                if (activeTab === "inProgress")
                  return refund?.refundAmountStatus === "pending";
                if (activeTab === "accepted")
                  return refund?.refundAmountStatus === "approved";
                if (activeTab === "rejected")
                  return refund?.refundAmountStatus === "rejected";
                return false;
              })
              ?.map((refund) => (
                <div
                  key={refund?.id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={refund?.order?.servicePost?.servicePostImage}
                      alt={refund?.order?.servicePost?.serviceName}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {refund?.order?.servicePost?.serviceName}
                      </h2>
                      <p className="text-lg font-bold text-blue-600">
                        Rs.{" "}
                        {(refund?.order?.servicePost?.servicePostPrice *
                          refund?.refundAmountPercentage) /
                          100 +
                          " Partial Amount"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* New Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full flex flex-col"
          >
            <h2 className="text-xl font-bold mb-4">File a New Dispute</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium mb-1"
                >
                  Select Service
                </label>
                <select
                  id="service"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className={`border rounded-lg w-full p-2 ${
                    errors.service ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a service...</option>
                  {completedOrders.map((order) => (
                    <option key={order?._id} value={order?._id}>
                      {order?.servicePost?.serviceName}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-xs">{errors.service}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium mb-1"
                >
                  Reason
                </label>
                <input
                  type="text"
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={`border rounded-lg w-full p-2 ${
                    errors.reason ? "border-red-500" : ""
                  }`}
                />
                {errors.reason && (
                  <p className="text-red-500 text-xs">{errors.reason}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`border rounded-lg w-full p-2 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
              </div>
              {fileDisputeLoading ? (
                <div className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center">
                  <LoaderCircles />
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit Full Refund
                </button>
              )}
            </form>
            <button
              onClick={handleCloseDisputeModal}
              className="mt-4 text-blue-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showRefundModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full flex flex-col"
          >
            <h2 className="text-xl font-bold mb-4">File a Partial Refund</h2>
            <form
              onSubmit={handleRefundSubmit}
              className="flex flex-col space-y-4"
            >
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium mb-1"
                >
                  Select Service
                </label>
                <select
                  id="service"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className={`border rounded-lg w-full p-2 ${
                    errors.service ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a service...</option>
                  {!loading &&
                    completedOrders.map((order) => (
                      <option key={order?._id} value={order?._id}>
                        {order?.servicePost?.serviceName}
                      </option>
                    ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-xs">{errors.service}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="percentage"
                  className="block text-sm font-medium mb-1"
                >
                  Select Percentage
                </label>
                <select
                  id="percentage"
                  value={percentangeAmount}
                  onChange={(e) => setPercentageAmount(Number(e.target.value))} // Convert value to a number
                  className={`border rounded-lg w-full p-2 ${
                    errors.amount ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select percentage...</option>
                  <option value={25}>25%</option>
                  <option value={50}>50%</option>
                  <option value={75}>75%</option>
                </select>
                {errors.amount && (
                  <p className="text-red-500 text-xs">{errors.amount}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium mb-1"
                >
                  Refund Details
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className={`border rounded-lg w-full p-2 ${
                    errors.details ? "border-red-500" : ""
                  }`}
                  placeholder="Enter refund details..."
                />
                {errors.details && (
                  <p className="text-red-500 text-xs">{errors.details}</p>
                )}
              </div>
              {refundRequestLoading ? (
                <div className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center">
                  <LoaderCircles />
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit Request
                </button>
              )}
            </form>
            <button
              onClick={handleCloseRefundModal}
              className="mt-4 text-blue-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ContactSection />
      <Footer />
    </div>
  );
};

export default DisputePage;
