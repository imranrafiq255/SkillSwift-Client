import React, { useEffect, useRef, useState } from "react";
import Navbar from '../ConsumerCommon/Navbar';
import FAQsSection from '../ConsumerCommon/FAQsSection';
import ContactSection from '../ConsumerCommon/ContactSection';
import Footer from '../ConsumerCommon/Footer';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import PopularServicesSection from './PopularServicesSection';
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { handleShowSuccessToast } from "../../ToastMessages/ToastMessage";

const ConsumerHome = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  const message = location.state?.message || null;

  useEffect(() => {
    if (message && !hasShownToast.current) {
      handleShowSuccessToast(message);
      hasShownToast.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [message, navigate, location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PopularServicesSection />
      <FAQsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default ConsumerHome;
