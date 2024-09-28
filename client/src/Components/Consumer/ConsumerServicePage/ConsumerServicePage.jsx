import React, { useState } from "react";
import { FaStar, FaHeart, FaInfoCircle } from "react-icons/fa";
import Footer from "../ConsumerCommon/Footer.jsx";
import Navbar from "../ConsumerCommon/Navbar";
import ContactSection from "../ConsumerCommon/ContactSection";
import PopularServicesSection from "../ConsumerHome/PopularServicesSection.jsx";
import { useLocation } from "react-router-dom";
const ServicePage = () => {
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleBookService = () => {
    if (selectedSlot) {
      alert(`Booking Request is Sent for: ${selectedSlot}`);
    }
  };
  const location = useLocation();
  const service = location?.state?.service || null;
  console.log(service);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Service Details */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <img
                src={service?.imageUrl}
                alt={service?.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <p className="text-3xl font-bold text-blue-600">
                Rs. {service?.price}
              </p>
              <h1 className="text-3xl font-bold mb-4 mt-4">{service?.title}</h1>
              <p className="text-gray-700 mb-4">{service?.description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Service Provider</h2>
              <div className="flex items-center mb-4">
                <img
                  src={service?.provider?.imageUrl}
                  alt={service?.provider?.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{service?.provider?.name}</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < service?.provider?.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({service?.provider?.rating} out of 5 based on{" "}
                      {service?.provider?.reviewCount} reviews)
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
                        value={slot}
                        checked={selectedSlot === slot}
                        onChange={() => setSelectedSlot(slot)}
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
            </div>

            {/* Rating Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Rating</h2>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < service?.rating ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600">
                {service?.rating} out of 5 based on {service?.reviewCount}{" "}
                reviews
              </p>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-4">
                <button className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full">
                  <FaHeart className="mr-2" /> Add to Wishlist
                </button>
                <button className="flex items-center justify-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 w-full">
                  <FaInfoCircle className="mr-2" /> Request More Info on Chat
                </button>
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
