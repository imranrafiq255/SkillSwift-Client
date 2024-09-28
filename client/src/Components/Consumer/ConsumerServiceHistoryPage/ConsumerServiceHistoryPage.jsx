import React, { useState, useRef, useEffect } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ContactSection from "../ConsumerCommon/ContactSection";

const ServiceHistoryPage = () => {
  const [activeTab, setActiveTab] = useState("inProgress");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [rating, setRating] = useState(1);
  const modalRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Professional Home Cleaning",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1098,
      status: "inProgress",
    },
    {
      id: 2,
      title: "Garden Maintenance",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 899,
      status: "inProgress",
    },
    {
      id: 3,
      title: "Plumbing Services",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1299,
      status: "inProgress",
    },
    {
      id: 1,
      title: "Professional Home Cleaning",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1098,
      status: "completed",
    },
    {
      id: 2,
      title: "Garden Maintenance",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 899,
      status: "completed",
    },
    {
      id: 3,
      title: "Plumbing Services",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1299,
      status: "completed",
    },
    {
      id: 1,
      title: "Professional Home Cleaning",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1098,
      status: "cancelled",
    },
    {
      id: 2,
      title: "Garden Maintenance",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 899,
      status: "cancelled",
    },
    {
      id: 3,
      title: "Plumbing Services",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1299,
      status: "cancelled",
    },
  ];
  // const disputes = [
  //   {
  //     id: 1,
  //     title: "Professional Home Cleaning",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 1098,
  //     status:"inProgress",
  //   },
  //   {
  //     id: 2,
  //     title: "Garden Maintenance",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 899,
  //     status:"inProgress",
  //   },
  //   {
  //     id: 3,
  //     title: "Plumbing Services",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 1299,
  //     status:"inProgress",
  //   },
  //   {
  //     id: 1,
  //     title: "Professional Home Cleaning",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 1098,
  //     status:"accepted",
  //   },
  //   {
  //     id: 2,
  //     title: "Garden Maintenance",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 899,
  //     status:"accepted",
  //   },
  //   {
  //     id: 3,
  //     title: "Plumbing Services",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 1299,
  //     status:"accepted",
  //   },
  //   {
  //     id: 1,
  //     title: "Professional Home Cleaning",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 1098,
  //     status:"rejected",
  //   },
  //   {
  //     id: 2,
  //     title: "Garden Maintenance",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 899,
  //     status:"rejected",
  //   },
  //   {
  //     id: 3,
  //     title: "Plumbing Services",
  //     imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  //     price: 1299,
  //     status:"rejected",
  //   },
  // ];
  const handleCancel = (serviceId) => {
    alert(`Cancelled service with ID: ${serviceId}`);
  };

  const handleBookAgain = (serviceId) => {
    alert(`Booking service with ID: ${serviceId} again`);
  };

  const handleReview = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowReviewModal(true);
  };

  const submitReview = () => {
    alert(`Service ID: ${selectedServiceId}, Rating: ${rating}`);
    setShowReviewModal(false);
    setRating(1); // Reset to 1 star
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowReviewModal(false);
    }
  };

  useEffect(() => {
    if (showReviewModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showReviewModal]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Service History</h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center md:justify-start mb-6">
          {["inProgress", "completed", "cancelled", "toReview"].map((tab) => (
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

        {/* Services List */}
        <div className="hidden md:grid grid-cols-1 gap-6">
          {services
            ?.filter((service) => {
              if (activeTab === "inProgress")
                return service?.status === "inProgress";
              if (activeTab === "completed")
                return service?.status === "completed";
              if (activeTab === "toReview")
                return service?.status === "completed";
              if (activeTab === "cancelled")
                return service?.status === "cancelled";
              return false;
            })
            ?.map((service) => (
              <div
                key={service?.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={service?.imageUrl}
                    alt={service?.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{service?.title}</h2>
                    <p className="text-lg font-bold text-blue-600">
                      Rs. {service?.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (activeTab === "inProgress") {
                      handleCancel(service?.id);
                    } else if (activeTab === "completed") {
                      handleBookAgain(service?.id);
                    } else if (activeTab === "toReview") {
                      handleReview(service?.id);
                    } else {
                      handleBookAgain(service?.id);
                    }
                  }}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {activeTab === "inProgress"
                    ? "Cancel"
                    : activeTab === "toReview"
                    ? "Review"
                    : "Book Again"}
                </button>
              </div>
            ))}
        </div>

        <div className="md:hidden space-y-4">
          {services
            ?.filter((service) => {
              if (activeTab === "inProgress")
                return service?.status === "inProgress";
              if (activeTab === "completed")
                return service?.status === "completed";
              if (activeTab === "toReview")
                return service?.status === "completed";
              if (activeTab === "cancelled")
                return service?.status === "cancelled";
              return false;
            })
            ?.map((service) => (
              <div
                key={service?.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col"
              >
                <img
                  src={service?.imageUrl}
                  alt={service?.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold">{service?.title}</h2>
                <p className="text-lg font-bold text-blue-600">
                  Rs. {service?.price}
                </p>
                <button
                  onClick={() => {
                    if (activeTab === "inProgress") {
                      handleCancel(service?.id);
                    } else if (activeTab === "completed") {
                      handleBookAgain(service?.id);
                    } else if (activeTab === "toReview") {
                      handleReview(service?.id);
                    } else {
                      handleBookAgain(service?.id);
                    }
                  }}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {activeTab === "inProgress"
                    ? "Cancel"
                    : activeTab === "toReview"
                    ? "Review"
                    : "Book Again"}
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-4">Rate Your Service</h2>
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  onClick={() => setRating(index + 1)}
                  className={`w-8 h-8 cursor-pointer ${
                    rating > index ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.086 1.122-6.508L.244 6.91l6.522-.949L10 0l2.234 5.961 6.522.949-4.998 4.668 1.122 6.508L10 15z" />
                </svg>
              ))}
            </div>
            <button
              onClick={submitReview}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={rating < 1} // Disable if rating is less than 1
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiceHistoryPage;
