import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  serviceProviderMarkInterestedCustomServiceAction,
  clearErrors,
  serviceProviderCustomServiceChatAction,
  loadCurrentServiceProviderAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import LoaderCircles from "../../Loader/LoaderCircles";
import { Toaster } from "react-hot-toast";

const JobCard = ({ service, handleRefresh }) => {
  const dispatch = useDispatch();
  const [isInterestedAction, setIsInterestedAction] = useState(false);
  const [loading, setLoading] = useState(false);

  const { interestedLoading, interestedError, interestedMessage } = useSelector(
    (state) => state.serviceProviderMarkInterestedCustomServiceReducer
  );
  const { chatLoading, chatError, chatMessage } = useSelector(
    (state) => state.serviceProviderCustomServiceChatReducer
  );
  const { serviceProvider } = useSelector(
    (state) => state.loadCurrentServiceProviderReducer
  );

  const handleMarkInterested = () => {
    if (service?._id) {
      setLoading(true);
      dispatch(serviceProviderMarkInterestedCustomServiceAction(service?._id));
      setIsInterestedAction(true);
    }
  };

  useEffect(() => {
    if (isInterestedAction && !interestedLoading) {
      if (interestedError) {
        handleShowFailureToast(interestedError);
        dispatch(clearErrors());
        setLoading(false);
      } else if (interestedMessage) {
        handleShowSuccessToast(interestedMessage);
        dispatch(clearErrors());
        handleRefresh();
        const data = {
          consumer: service?.consumer?._id,
          receiverType: "ServiceProvider",
        };
        dispatch(serviceProviderCustomServiceChatAction(data));
        setLoading(false);
      }
      setIsInterestedAction(false);
    }
  }, [
    dispatch,
    interestedError,
    interestedMessage,
    interestedLoading,
    service?.consumer?._id,
    handleRefresh,
    isInterestedAction,
  ]);

  useEffect(() => {
    if (!chatLoading && chatError) {
      console.log(chatError);
      dispatch(clearErrors());
    } else if (!chatLoading && chatMessage) {
      console.log(chatMessage);
      dispatch(clearErrors());
    }
  }, [dispatch, chatLoading, chatError, chatMessage]);

  useEffect(() => {
    dispatch(loadCurrentServiceProviderAction());
  }, [dispatch]);

  const isFound =
    service?.serviceProviders?.length > 0
      ? service?.serviceProviders?.find(
          (provider) => provider?._id === serviceProvider?._id
        )
      : null;

  return (
    <div className="w-80 rounded-lg border shadow-md p-4 bg-white flex flex-col items-center space-y-2">
      <Toaster />
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        <img
          src={service?.consumer?.consumerAvatar}
          alt=""
          className="text-gray-500 text-2xl w-12 h-12 rounded-full"
        />
      </div>
      <h2 className="text-lg font-bold">
        {service?.consumer?.consumerFullName}
      </h2>
      <div className="text-sm text-gray-700 space-y-1 pb-5">
        <p>
          <strong>Job Title:</strong> {service?.serviceTitle}
        </p>
        <p>
          <strong>Budget:</strong> {service?.serviceBudget}
        </p>
        <p>
          <strong>Location:</strong> {service?.consumer?.consumerAddress}
        </p>
        <p>
          <strong>Description:</strong> {service?.serviceDescription}
        </p>
      </div>
      {loading ? ( // Show loading state for this button only
        <div className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition flex justify-center items-center">
          <LoaderCircles />
        </div>
      ) : chatMessage || isFound ? (
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition"
          onClick={() =>
            (window.location.href = `/service-provider-chat-section?id=${service?.consumer?._id}`)
          }
        >
          Open Chat
        </button>
      ) : (
        <button
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition"
          onClick={handleMarkInterested}
        >
          Interested
        </button>
      )}
    </div>
  );
};

export default JobCard;
