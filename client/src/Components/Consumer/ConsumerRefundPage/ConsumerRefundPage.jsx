import React, { useState, useRef, useEffect } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ContactSection from "../ConsumerCommon/ContactSection";

const ConsumerRefundPage = () => {
  const [activeTab, setActiveTab] = useState("inProgress");
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedServiceId("");
    setReason("");
    setDescription("");
    setErrors({});
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

    // Handle the submission of the new dispute
    alert(`Dispute submitted for Service ID: ${selectedServiceId}`);
    handleCloseModal();
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };
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
  const disputes = [
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
      status: "accepted",
    },
    {
      id: 2,
      title: "Garden Maintenance",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 899,
      status: "accepted",
    },
    {
      id: 3,
      title: "Plumbing Services",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1299,
      status: "accepted",
    },
    {
      id: 1,
      title: "Professional Home Cleaning",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1098,
      status: "rejected",
    },
    {
      id: 2,
      title: "Garden Maintenance",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 899,
      status: "rejected",
    },
    {
      id: 3,
      title: "Plumbing Services",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      price: 1299,
      status: "rejected",
    },
  ];
  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  // Filter services to show only completed ones
  const completedServices = services?.filter(
    (service) => service.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Disputes</h1>

        <button
          onClick={handleOpenModal}
          className="mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          File a New Dispute
        </button>

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
          {disputes
            .filter((dispute) => {
              if (activeTab === "inProgress")
                return dispute.status === "inProgress";
              if (activeTab === "accepted")
                return dispute.status === "accepted";
              if (activeTab === "rejected")
                return dispute.status === "rejected";
              return false;
            })
            .map((dispute) => (
              <div
                key={dispute.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={dispute.imageUrl}
                    alt={dispute.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{dispute.title}</h2>
                    <p className="text-lg font-bold text-blue-600">
                      Rs. {dispute.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* New Dispute Modal */}
      {showModal && (
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
                  {completedServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
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
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit Dispute
              </button>
            </form>
            <button onClick={handleCloseModal} className="mt-4 text-blue-600">
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

export default ConsumerRefundPage;
