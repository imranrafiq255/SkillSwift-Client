import React, { useEffect } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ContactSection from "../ConsumerCommon/ContactSection";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadOrdersAction,
} from "../../Redux/Consumer/Actions/ConsumerActions";
import { useNavigate } from "react-router-dom";
const RequestedServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector(
    (state) => state.loadOrdersReducer
  );
  console.log(orders);

  const handleChat = () => {
    navigate("/consumer-chat-section");
  };

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadOrdersAction());
  }, [dispatch]);

  // Filter orders based on 'accepted' status
  const acceptedOrders = orders?.filter(
    (order) => order?.orderStatus === "accepted"
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Requested Services</h1>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 gap-6">
          {!loading &&
            acceptedOrders?.map((order) => (
              <div
                key={order?.servicePost?._id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={order?.servicePost?.servicePostImage}
                    alt={order?.servicePost?.serviceName}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {order?.servicePost?.serviceName}
                    </h2>
                    <p className="text-lg font-bold text-blue-600">
                      Rs. {order?.servicePost?.servicePostPrice}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleChat()}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Chat with Provider
                </button>
              </div>
            ))}
        </div>

        {/* Mobile List */}
        <div className="md:hidden space-y-4">
          {!loading &&
            acceptedOrders?.map((order) => (
              <div
                key={order?.servicePost?._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col"
              >
                <img
                  src={order?.servicePost?.servicePostImage}
                  alt={order?.servicePost?.serviceName}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold">
                  {order?.servicePost?.serviceName}
                </h2>
                <p className="text-lg font-bold text-blue-600">
                  Rs. {order?.servicePost?.servicePostPrice}
                </p>
                <button
                  onClick={() => handleChat()}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Chat with Provider
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RequestedServicesPage;
