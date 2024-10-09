import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import Footer from "../ConsumerCommon/Footer.jsx";
import Navbar from "../ConsumerCommon/Navbar";
import ContactSection from "../ConsumerCommon/ContactSection";
import PopularServicesSection from "../ConsumerHome/PopularServicesSection.jsx";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage.js";
import { Toaster } from "react-hot-toast";
import { consumerOrderServiceAction } from "../../Redux/Consumer/Actions/ConsumerActions.js";
import LoaderCircles from "../../Loader/LoaderCircles";
import { useNavigate } from "react-router-dom";
const ServicePage = () => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.consumerOrderServiceReducer
  );
  const toastMessageShow = useRef(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const service = location?.state?.service || null;
  const navigate = useNavigate();
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
  };
  const ratingCalculator = (ratings) => {
    let sum = 0;
    ratings?.forEach((rating) => (sum += rating?.rating));
    return Math.floor(sum / ratings?.length);
  };
  return (
    <div className="min-h-screen bg-gray-100">
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
                            i < ratingCalculator(service?.servicePostRatings)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({ratingCalculator(service?.servicePostRatings) || 0} out
                      of 5 based on {service?.servicePostRatings?.length}{" "}
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
                    onClick={handleBookService}
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
            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-4">
                <button className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full">
                  <FaHeart className="mr-2" /> Add to Wishlist
                </button>
                <button className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full">
                  <FaInfoCircle className="mr-2" /> Request More Info on Chat
                </button>
              </div>
            </div> */}
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
