import React, { useEffect } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ServiceProviderList from "./ServiceProviderList";
import ContactSection from "../ConsumerCommon/ContactSection";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { consumerLoadCustomServicesAction } from "../../Redux/Consumer/Actions/ConsumerActions";
const RequestedServicesPage = () => {
  const dispatch = useDispatch();
  const { customService } = useSelector(
    (state) => state.consumerLoadCustomServicesReducer
  );
  useEffect(() => {
    dispatch(consumerLoadCustomServicesAction());
  }, [dispatch]);
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
            <JobCard
              job={
                customService && customService?.length > 0 && customService[0]
              }
            />
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
