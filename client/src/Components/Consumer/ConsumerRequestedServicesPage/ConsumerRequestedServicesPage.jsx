import React, { useEffect } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ServiceProviderList from "./ServiceProviderList";
import ContactSection from "../ConsumerCommon/ContactSection";
import JobCard from "./JobCard";

const RequestedServicesPage = () => {
  const customService = {
    consumerName: "John Doe",
    title: "Software Developer",
    description: "Looking for a developer with experience in React.",
    budget: "$4000",
    location: "Remote",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-row">
        <div className="w-1/2">
          {/* This makes ServiceProviderList take half the width */}
          <ServiceProviderList />
        </div>
        <div className="w-1/2 flex justify-center items-start">
          {" "}
          <div className="mt-10">
            {" "}
            <JobCard job={customService} />
          </div>
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
