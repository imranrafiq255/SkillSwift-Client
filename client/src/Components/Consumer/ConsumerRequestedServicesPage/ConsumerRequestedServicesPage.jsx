import React from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ContactSection from "../ConsumerCommon/ContactSection";

const RequestedServicesPage = () => {
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
  const handleChat = () => {
    // Implement cancel functionality here
    alert(`Hnadle Chat`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Requested Services</h1>
        <div className="hidden md:grid grid-cols-1 gap-6">
          {/* Desktop Grid */}
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                  <p className="text-lg font-bold text-blue-600">
                    Rs. {service.price}
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

        <div className="md:hidden space-y-4">
          {/* Mobile List */}
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            >
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="text-lg font-bold text-blue-600">
                Rs. {service.price}
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
