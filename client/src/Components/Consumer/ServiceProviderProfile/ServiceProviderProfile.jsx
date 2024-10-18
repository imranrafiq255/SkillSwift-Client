import React, { useEffect } from "react";
import { FaStar, FaComment } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../ConsumerCommon/Navbar";
import ContactSection from "../ConsumerCommon/ContactSection";
import Footer from "../ConsumerCommon/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadCurrentConsumerAction,
  loadConversationsAction,
  createConversationAction,
} from "../../Redux/Consumer/Actions/ConsumerActions";

const ServiceProviderProfile = () => {
  const location = useLocation();
  const service = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load consumer details and conversations
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadCurrentConsumerAction());
    dispatch(loadConversationsAction());
  }, [dispatch]);

  // Calculate the service provider's rating
  const totalRatings = service?.servicePostRatings?.length || 0;
  const serviceProviderRating = totalRatings
    ? service.servicePostRatings.reduce(
        (acc, rating) => acc + rating.rating,
        0
      ) / totalRatings
    : 0;

  const { conversations } = useSelector(
    (state) => state.loadConsumerConversationsReducer
  );

  // Function to create or navigate to a conversation
  const createOrNavigateToConversation = (serviceProviderId) => {
    const existingConversation = conversations.find(
      (conversation) => conversation.members.receiver._id === serviceProviderId
    );

    if (!existingConversation) {
      const data = {
        receiver: serviceProviderId,
        receiverType: "ServiceProvider",
      };
      dispatch(createConversationAction(data));
    } else {
      navigate("/consumer-chat-section");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center my-6">
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-2xl">
          {/* Avatar at the top */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={service?.serviceProvider?.serviceProviderAvatar}
              alt={service?.serviceProvider?.serviceProviderFullName}
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 mb-2"
            />
            <h3 className="text-3xl font-semibold">
              {service?.serviceProvider?.serviceProviderFullName}
            </h3>
          </div>
          {/* Star rating and ratings summary */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex text-yellow-400 mb-2">
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
              ({Math.round(serviceProviderRating * 10) / 10} out of 5 based on{" "}
              {totalRatings} ratings)
            </span>
            {/* Chat Button */}
            <button
              className="flex items-center mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() =>
                createOrNavigateToConversation(service?.serviceProvider?._id)
              }
            >
              <FaComment className="mr-2" />
              Chat
            </button>
            {/* Service Provider Contact Info */}
            <div className="mt-6">
              <p className="text-gray-600">
                <strong>Email:</strong>{" "}
                {service?.serviceProvider?.serviceProviderEmail}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong>{" "}
                {service?.serviceProvider?.serviceProviderPhoneNumber}
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong>{" "}
                {service?.serviceProvider?.serviceProviderAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
      <Footer />
    </>
  );
};

export default ServiceProviderProfile;
