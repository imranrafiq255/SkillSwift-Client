import React, { useEffect, useRef } from "react";
import Navbar from "../ConsumerCommon/Navbar";
import ContactSection from "../ConsumerCommon/ContactSection";
import Footer from "../ConsumerCommon/Footer";
import ServicesSection from "./ServicesSection";
import PopularServicesSection from "./PopularServicesSection";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";

const ConsumerHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const message = location?.state?.message || null;

  useEffect(() => {
    if (message && !hasShownToast.current) {
      handleShowSuccessToast(message);
      hasShownToast.current = true;
    }
  }, [message, navigate]);

  return (
    <>
      <Toaster />
      <Navbar />
      {/* <div className="relative">
        <HeroSection />
        <div className="absolute top-0 left-0 right-0 z-10">
        <ServicesSection />
        </div>
        </div> */}
      {/* <HeroSection /> */}
      <PopularServicesSection />
      <ServicesSection />
      {/* <FAQsSection /> */}
      <ContactSection />
      <Footer />
    </>
  );
};

export default ConsumerHome;
