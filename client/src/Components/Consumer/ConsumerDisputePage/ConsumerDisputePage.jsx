import React, { useState, useRef, useEffect } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ContactSection from "../ConsumerCommon/ContactSection";

const DisputePage = () => {
  const [activeTab, setActiveTab] = useState("inProgress");
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [refundPercentage, setRefundPercentage] = useState(100); // Default to 100% for full refund
  const [errors, setErrors] = useState({});
  const disputeModalRef = useRef(null);
  const refundModalRef = useRef(null);

  const handleOpenDisputeModal = () => {
    setShowDisputeModal(true);
    setRefundPercentage(100); // Full refund
    resetFormFields();
  };

  const handleOpenRefundModal = () => {
    setShowRefundModal(true);
    setRefundPercentage(25); // Partial refund default to 25%
    resetFormFields();
  };

  const handleCloseDisputeModal = () => {
    setShowDisputeModal(false);
  };

  const handleCloseRefundModal = () => {
    setShowRefundModal(false);
  };

  const resetFormFields = () => {
    setSelectedServiceId("");
    setReason("");
    setDescription("");
    setErrors({});
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

    // Submission logic
    const actionType = showDisputeModal ? "Full Refund" : `Partial Refund (${refundPercentage}%)`;
    alert(`${actionType} dispute submitted for Service ID: ${selectedServiceId}`);

    if (showDisputeModal) handleCloseDisputeModal();
    if (showRefundModal) handleCloseRefundModal();
  };

  const handleOutsideClick = (event) => {
    if (disputeModalRef.current && !disputeModalRef.current.contains(event.target)) {
      handleCloseDisputeModal();
    }
    if (refundModalRef.current && !refundModalRef.current.contains(event.target)) {
      handleCloseRefundModal();
    }
  };

  useEffect(() => {
    if (showDisputeModal || showRefundModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDisputeModal, showRefundModal]);

  const services = [
    { id: 1, title: "Professional Home Cleaning", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952", price: 1098, status: "inProgress" },
    { id: 2, title: "Garden Maintenance", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952", price: 899, status: "inProgress" },
    { id: 3, title: "Plumbing Services", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952", price: 1299, status: "inProgress" },
  ];

  const disputes = [
    { id: 1, title: "Professional Home Cleaning", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952", price: 1098, status: "inProgress" },
    { id: 2, title: "Garden Maintenance", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952", price: 899, status: "accepted" },
    { id: 3, title: "Plumbing Services", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952", price: 1299, status: "rejected" },
  ];

  const completedServices = services.filter(service => service.status === "completed");

  // Calculate refund amount based on selected service and percentage
  const selectedService = completedServices.find(service => service.id === Number(selectedServiceId));
  const refundAmount = selectedService ? (selectedService.price * refundPercentage) / 100 : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Disputes</h1>

        <div className="flex gap-5">
          <button
            onClick={handleOpenDisputeModal}
            className={`text-xs lg:text-lg mb-4 py-2 px-4 rounded-lg transition duration-300 ${completedServices.length > 0 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-400 text-white cursor-not-allowed'}`}
            disabled={completedServices.length === 0}
            title={completedServices.length === 0 ? "No completed services" : ""}
          >
            Apply for Full Refund
          </button>
          <button
            onClick={handleOpenRefundModal}
            className={`text-xs lg:text-lg mb-4 py-2 px-4 rounded-lg transition duration-300 ${completedServices.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-400 text-white cursor-not-allowed'}`}
            disabled={completedServices.length === 0}
            title={completedServices.length === 0 ? "No completed services" : ""}
          >
            Apply for Partial Refund
          </button>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start mb-6">
          {["inProgress", "accepted", "rejected"].map((tab) => (
            <div
              key={tab}
              className={`py-3 px-3 text-sm cursor-pointer transition-colors duration-200 ${activeTab === tab ? "bg-gray-200 text-blue-600" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {disputes.filter(dispute => dispute.status === activeTab).map(dispute => (
            <div key={dispute.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <img src={dispute.imageUrl} alt={dispute.title} className="w-20 h-20 object-cover rounded-lg mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{dispute.title}</h2>
                  <p className="text-lg font-bold text-blue-600">Rs. {dispute.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDisputeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={disputeModalRef} className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">File a Full Refund Dispute</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {renderFormFields(errors, completedServices, selectedServiceId, setSelectedServiceId, reason, setReason, description, setDescription)}
              <div className="font-semibold text-blue-600">Refund Amount: Rs. {refundAmount}</div>
              <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">Submit Full Refund</button>
            </form>
            <button onClick={handleCloseDisputeModal} className="mt-4 text-blue-600">Cancel</button>
          </div>
        </div>
      )}

      {showRefundModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={refundModalRef} className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">File a Partial Refund Dispute</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {renderFormFields(errors, completedServices, selectedServiceId, setSelectedServiceId, reason, setReason, description, setDescription)}

              {/* Partial refund options */}
              <div className="flex gap-2 items-center justify-center">
                {[25, 50, 75].map((percent) => (
                  <button
                    key={percent}
                    type="button"
                    onClick={() => setRefundPercentage(percent)}
                    className={`py-2 px-4 rounded-lg border ${refundPercentage === percent ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
                  >
                    {percent}%
                  </button>
                ))}
              </div>

              <div className="font-semibold text-blue-600">Refund Amount: Rs. {refundAmount}</div>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Submit Partial Refund</button>
            </form>
            <button onClick={handleCloseRefundModal} className="mt-4 text-blue-600">Cancel</button>
          </div>
        </div>
      )}

      <ContactSection />
      <Footer />
    </div>
  );
};

const renderFormFields = (errors, completedServices, selectedServiceId, setSelectedServiceId, reason, setReason, description, setDescription) => (
  <>
    <div className="flex flex-col">
      <label className="font-medium mb-2">Select Service</label>
      <select value={selectedServiceId} onChange={(e) => setSelectedServiceId(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2">
        <option value="">Select a service</option>
        {completedServices.map((service) => (
          <option key={service.id} value={service.id}>{service.title}</option>
        ))}
      </select>
      {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
    </div>
    <div className="flex flex-col">
      <label className="font-medium mb-2">Reason</label>
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2" />
      {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
    </div>
    <div className="flex flex-col">
      <label className="font-medium mb-2">Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2"></textarea>
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
    </div>
  </>
);

export default DisputePage;
