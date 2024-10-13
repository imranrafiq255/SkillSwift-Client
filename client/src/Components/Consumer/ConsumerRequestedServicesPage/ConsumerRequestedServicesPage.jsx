import React, { useEffect } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import Footer from "../ConsumerCommon/Footer";
import ServiceProviderList from "./ServiceProviderList";
import ContactSection from "../ConsumerCommon/ContactSection";
import JobCard from "./JobCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { consumerLoadCustomServicesAction } from "../../Redux/Consumer/Actions/ConsumerActions";
import { FaClipboardList, FaEdit } from "react-icons/fa";
import CustomServiceModal from "./CustomServiceModal";
import JobListingForm from "./JobListingForm";
const RequestedServicesPage = () => {
  const openCustomServiceModal = () => setisCustomServiceModalOpen(true);
  const closeCustomServiceModal = () => setisCustomServiceModalOpen(false);
  const [isCustomServiceModalOpen, setisCustomServiceModalOpen] =
    useState(false);

  const [refresh, setRefresh] = useState(0);

  const toggleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const dispatch = useDispatch();
  const { customService } = useSelector(
    (state) => state.consumerLoadCustomServicesReducer
  );
  useEffect(() => {
    dispatch(consumerLoadCustomServicesAction());
  }, [dispatch, refresh]);
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {customService && customService.length > 0 && customService[0] ? (
          <div className="flex flex-row">
            <div className="w-1/2">
              <ServiceProviderList />
            </div>
            <div className="w-1/2 flex justify-center items-start bg-white">
              <div className="mt-10">
                <JobCard
                  job={
                    customService &&
                    customService.length > 0 &&
                    customService[0]
                  }
                  toggleRefresh = {toggleRefresh}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen relative">
            {/* Custom Job Listing Modal */}
            <CustomServiceModal
              isOpen={isCustomServiceModalOpen}
              onClose={closeCustomServiceModal}
            >
              <JobListingForm onCancel={closeCustomServiceModal} toggleRefresh = {toggleRefresh} />
            </CustomServiceModal>

            <div className="absolute top-4 left-4">
              <button
                onClick={() => {
                  openCustomServiceModal();
                }}
                aria-label="Custom"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
              >
                <FaEdit className="w-5 h-5 inline" />
                <span className="ml-1">New Request</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="bg-blue-100 p-6 rounded-full">
                <FaClipboardList className="text-blue-500 text-6xl" />
              </div>
              <h1 className="text-blue-600 text-2xl font-semibold mt-4">
                You have no Custom Service Ad.
              </h1>
              <p className="text-blue-500 mt-2">
                You Can Post one to get your custom service done.
              </p>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default RequestedServicesPage;
