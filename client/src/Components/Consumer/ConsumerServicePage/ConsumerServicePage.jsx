import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaInfoCircle } from "react-icons/fa";
import Footer from "../ConsumerCommon/Footer.jsx";
import Navbar from "../ConsumerCommon/Navbar";
import ContactSection from "../ConsumerCommon/ContactSection";
import PopularServicesSection from "../ConsumerHome/PopularServicesSection.jsx";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage.js";
import { Toaster } from "react-hot-toast";
import {
  clearErrors,
  consumerOrderServiceAction,
  loadConversationsAction,
  loadCurrentConsumerAction,
} from "../../Redux/Consumer/Actions/ConsumerActions.js";
import LoaderCircles from "../../Loader/LoaderCircles";
import { useNavigate } from "react-router-dom";
import { createConversationAction } from "../../Redux/Consumer/Actions/ConsumerActions";
import axios from "axios";
const ServicePage = () => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.consumerOrderServiceReducer
  );
  const [orderBtnClicked, setOrderBtnClicked] = useState(false);
  const toastMessageShow = useRef(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const service = location?.state?.service || null;
  const navigate = useNavigate();

  const { conversationLoading, conversationError, conversationMessage } =
    useSelector((state) => state.createConversationReducer);
  const { conversations } = useSelector(
    (state) => state.loadConsumerConversationsReducer
  );
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadCurrentConsumerAction());
    dispatch(loadConversationsAction());
  }, [dispatch]);
  useEffect(() => {
    if (!loading && !toastMessageShow.current && message) {
      toastMessageShow.current = true;
      navigate("/consumer-service-history", { state: { message: message } });
    } else if (!loading && !toastMessageShow.current && error) {
      toastMessageShow.current = true;
      handleShowFailureToast(error);
    }
  }, [loading, error, message, navigate]);
  const handleBookService = () => {
    const data = {
      orderDeliverySchedule: selectedSlot,
      servicePost: service?._id,
      serviceProvider: service?.serviceProvider?._id,
    };
    dispatch(consumerOrderServiceAction(data));
    createConversation(data?.serviceProvider);
  };
  const ratingCalculator = (ratings) => {
    let sum = 0;
    ratings?.forEach((rating) => (sum += rating?.rating));
    return Math.floor(sum / ratings?.length);
  };
  const createConversation = (id) => {
    const existedReceiver = conversations.find(
      (conversation) => conversation.members.receiver._id === id
    );
    if (existedReceiver) {
      navigate("/consumer-chat-section");
      return;
    }
    const data = { receiver: id, receiverType: "ServiceProvider" };
    dispatch(createConversationAction(data));
  };
  const conversationToastMessage = useRef(false);
  useEffect(() => {
    if (
      !conversationLoading &&
      conversationError &&
      !conversationToastMessage.current
    ) {
      console.log(conversationError);
      conversationToastMessage.current = true;
    } else if (
      !conversationLoading &&
      conversationMessage &&
      !conversationToastMessage.current
    ) {
      conversationToastMessage.current = true;
      if (!orderBtnClicked) {
        handleShowSuccessToast("You can now chat with this consumer");
        setTimeout(() => {
          navigate("/consumer-chat-section");
        }, 500);
      }
    }
  }, [
    conversationError,
    conversationMessage,
    conversationLoading,
    navigate,
    orderBtnClicked,
  ]);
  const [serviceProviderRating, setServiceProviderRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  useEffect(() => {
    const ratingHandler = async () => {
      try {
        const response = await axios.get(
          `/api/v1/consumer/service-provider-rating/${service?.serviceProvider?._id}`
        );
        setServiceProviderRating(response?.data?.averageRating);
        setTotalRating(response?.data?.total);
      } catch (error) {
        console.log(error?.response?.data?.message || "Network error");
      }
    };
    ratingHandler();
  }, [service?.serviceProvider?._id]);
  console.log(conversations);

  return (
    <div className="min-h-screen bg-gray-100">
      {console.log(service)}
      {/* Header */}
      <Navbar />
      <Toaster />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Service Details */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <img
                src={service?.servicePostImage}
                alt={service?.serviceName}
                className="w-full h-64 object-fit rounded-lg"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <p className="text-3xl font-bold text-blue-600">
                Rs. {service?.servicePostPrice}
              </p>
              <h1 className="text-3xl font-bold mb-4 mt-4">
                {service?.serviceName}
              </h1>
              <p className="text-gray-700 mb-4">
                {service?.servicePostMessage}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Service Provider</h2>
              <div className="flex items-center mb-4">
                <img
                  src={service?.serviceProvider?.serviceProviderAvatar}
                  alt={service?.serviceProvider?.serviceProviderFullName}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">
                    {service?.serviceProvider?.serviceProviderFullName}
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < serviceProviderRating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({serviceProviderRating} out of 5 based on {totalRating}{" "}
                      ratings)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <form>
                {service?.serviceProvider?.serviceProviderWorkingHours.map(
                  (slot, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`slot-${index}`}
                        name="availability"
                        value={slot.dayOfWeek + ", " + slot.time}
                        checked={
                          selectedSlot === slot.dayOfWeek + ", " + slot.time
                        }
                        onChange={() =>
                          setSelectedSlot(slot.dayOfWeek + ", " + slot.time)
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor={`slot-${index}`}
                        className="text-gray-700"
                      >
                        {slot?.dayOfWeek} - {slot?.time}
                      </label>
                    </div>
                  )
                )}
              </form>
              <div>
                {loading ? (
                  <div className="mt-4 py-2 px-4 rounded-lg transition duration-300 w-full bg-blue-600 text-white hover:bg-blue-700 flex justify-center items-center">
                    <LoaderCircles />
                  </div>
                ) : (
                  <button
                    className={`mt-4 py-2 px-4 rounded-lg transition duration-300 w-full ${
                      selectedSlot
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-400 text-white cursor-not-allowed"
                    }`}
                    onClick={() => {
                      handleBookService();
                      setOrderBtnClicked(true);
                    }}
                    disabled={!selectedSlot}
                    title={!selectedSlot ? "Please select a time slot" : ""}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Rating</h2>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < ratingCalculator(service?.servicePostRatings)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600">
                {ratingCalculator(service?.servicePostRatings) || 0} out of 5
                based on {service?.servicePostRatings?.length} reviews
              </p>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-4">
                {/* <button className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full">
                  <FaHeart className="mr-2" /> Add to Wishlist
                </button> */}
                {conversationLoading ? (
                  <div className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full">
                    <LoaderCircles />
                  </div>
                ) : (
                  <button
                    className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full"
                    onClick={() =>
                      createConversation(service?.serviceProvider?._id)
                    }
                  >
                    <FaInfoCircle className="mr-2" /> Request More Info on Chat
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <PopularServicesSection />
      </main>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ServicePage;
