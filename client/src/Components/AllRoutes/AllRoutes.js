import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoaderBars from "../Loader/LoaderBars";
import axios from "axios";

// Import your components here
import ConsumerHome from "../Consumer/ConsumerHome/ConsumerHome";
import ConsumerSignUp from "../Consumer/ConsumerSignUp/ConsumerSignUp";
import Welcome from "../Welcome/Welcome";
import ServiceProviderHome from "../ServiceProvider/ServiceProviderHome/ServiceProviderHome";
import ServiceProviderSignIn from "../ServiceProvider/ServiceProviderSignIn/ServiceProviderSignIn";
import ServiceProviderSignUp from "../ServiceProvider/ServiceProviderSignUp/ServiceProviderSignUp";
import AdminHome from "../Admin/AdminHome/AdminHome";
import SignIn from "../Consumer/ConsumerSignIn/ConsumerSignIn";
import ForgotPassword from "../Consumer/ConsumerForgetPassword/ConsumerForgetPassword";
import ResetPassword from "../Consumer/ConsumerResetPassword/ConsumerResetPassword";
import ConsumerSendEmail from "../Consumer/ConsumerSendEmail/ConsumerSendEmail";
import ConsumerUpdateInfo from "../Consumer/ConsumerUpdateInfo/ConsumerUpdateInfo";
import NotFound from "../NotFound/NotFound";
import ConsumerVerifyEmail from "../Consumer/ConsumerVerifyEmail/ConsumerVerifyEmail";
import ConsumerRequestedServicesPage from "../Consumer/ConsumerRequestedServicesPage/ConsumerRequestedServicesPage";
import ConsumerServiceHistoryPage from "../Consumer/ConsumerServiceHistoryPage/ConsumerServiceHistoryPage";

import ServiceProviderResetPassword from "../ServiceProvider/ServiceProviderResetPassword/ServiceProviderResetPassword";
import ServiceProviderSendEmail from "../ServiceProvider/ServiceProviderSendEmail/ServiceProviderSendEmail";
import ServiceProviderForgotPassword from "../ServiceProvider/ServiceProviderForgotPassword/ServiceProviderFrogotPassword";
import ServiceProviderUploadInfo from "../ServiceProvider/ServiceProviderUploadInfo/ServiceProviderUploadInfo";
import ServiceProviderConfirmEmail from "../ServiceProvider/ServiceProviderVerifyEmail/ServiceProviderVerifyEmail";
import ServiceProviderAccountVerification from "../ServiceProvider/ServiceProviderAccountVerification/ServiceProviderAccountVerification";
import ServiceProviderTimeSlot from "../ServiceProvider/ServiceProviderTimeSlot/ServiceProviderTimeSlot";
import ServiceProviderAddCNIC from "../ServiceProvider/ServiceProviderAddCNIC/ServiceProviderAddCNIC";
import ServiceProviderPost from "../ServiceProvider/ServiceProviderPost/ServiceProviderPost";
import ServiceProviderOrder from "../ServiceProvider/ServiceProviderOrder/ServiceProviderOrder";
import ServiceProviderSetting from "../ServiceProvider/ServiceProviderSetting/ServiceProviderSetting";
import ServiceProviderChatSection from "../ServiceProvider/ServiceProviderChatSection/ServiceProviderChatSection";
import ServiceProviderNotification from "../ServiceProvider/ServiceProviderNotification/ServiceProviderNotification";
import ConsumerNotification from "../Consumer/ConsumerNotification/ConsumerNotification";
import ConsumerDisputePage from "../Consumer/ConsumerDisputePage/ConsumerDisputePage";
import ConsumerServicePage from "../Consumer/ConsumerServicePage/ConsumerServicePage";
import ConsumerChatModule from "../Consumer/ConsumerChatModule/ConsumerChatModule";
const AuthenticatedRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isConsumerLoading, setConsumerLoading] = useState(true);
  const [isConsumerAuthenticated, setConsumerAuthenticated] = useState(false);

  const [isServiceProviderLoading, setServiceProviderLoading] = useState(true);
  const [isServiceProviderAuthenticated, setServiceProviderAuthenticated] =
    useState(false);
  const serviceProviderAuthenticatedRoutes = [
    "/service-provider-home",
    "/service-provider-upload-info",
    "/service-provider-add-time",
    "/service-provider-add-cnic",
    "/service-provider-post",
    "/service-provider-order",
    "/service-provider-chat-section",
    "/service-provider-setting",
    "/service-provider-notification",
    "/service-provider-account-verification/your%20account%20is%20not%20verified",
  ];
  const consumerAuthenticatedRoutes = [
    "/consumer-upload-info",
    "/consumer-notifications",
    "/consumer-disputes",
    "/consumer-service-page",
    "/consumer-service-history",
    "/consumer-requested-services",
    "/consumer-chat-section",
  ];

  useEffect(() => {
    const loadCurrentConsumer = async () => {
      try {
        const response = await axios.get(
          "/api/v1/consumer/load-current-consumer"
        );
        if (response.data) {
          setConsumerAuthenticated(true);
          if (!response?.data?.consumer?.isEmailVerified) {
            navigate("/consumer-send-email");
          }
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      } finally {
        setConsumerLoading(false);
      }
    };

    const loadCurrentServiceProvider = async () => {
      try {
        const response = await axios.get(
          "/api/v1/service-provider/load-current-service-provider"
        );
        if (response.data) {
          setServiceProviderAuthenticated(true);
          if (!response?.data?.serviceProvider?.serviceProviderAvatar) {
            navigate("/service-provider-upload-info");
          } else if (
            response?.data?.serviceProvider?.serviceProviderCNICImages
              ?.length === 0
          ) {
            navigate("/service-provider-add-cnic");
          } else if (
            response?.data?.serviceProvider?.serviceProviderWorkingHours
              .length === 0
          ) {
            navigate("/service-provider-add-time");
          } else if (!response?.data?.serviceProvider?.isAccountVerified) {
            navigate(
              "/service-provider-account-verification/your account is not verified"
            );
          } else if (
            location.pathname.startsWith(
              "/service-provider-account-verification"
            ) &&
            response?.data?.serviceProvider?.isAccountVerified
          ) {
            navigate("/service-provider-home", {
              state: { message: "Account is verified now" },
            });
          }
        } else {
          setServiceProviderAuthenticated(true);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
        setServiceProviderAuthenticated(false);
      } finally {
        setServiceProviderLoading(false);
      }
    };

    loadCurrentConsumer();
    loadCurrentServiceProvider();
  }, [location.pathname, navigate]);

  if (
    (isConsumerLoading &&
      consumerAuthenticatedRoutes.includes(location.pathname)) ||
    (isServiceProviderLoading &&
      serviceProviderAuthenticatedRoutes.includes(location.pathname))
  ) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoaderBars />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/consumer-sign-up" element={<ConsumerSignUp />} />
      <Route path="/consumer-sign-in" element={<SignIn />} />
      <Route path="/consumer-send-email" element={<ConsumerSendEmail />} />
      <Route path="/consumer-forgot-password" element={<ForgotPassword />} />
      <Route
        path="/consumer-reset-password/:token"
        element={<ResetPassword />}
      />
      <Route
        path="/consumer-confirm-email/:token"
        element={<ConsumerVerifyEmail />}
      />
      {/*Service provider public routes*/}
      <Route
        path="/service-provider-sign-up"
        element={<ServiceProviderSignUp />}
      />
      <Route
        path="/service-provider-sign-in"
        element={<ServiceProviderSignIn />}
      />
      <Route
        path="/service-provider-send-email/:message"
        element={<ServiceProviderSendEmail />}
      />
      <Route
        path="/service-provider-forgot-password"
        element={<ServiceProviderForgotPassword />}
      />
      <Route
        path="/service-provider-reset-password/:token"
        element={<ServiceProviderResetPassword />}
      />
      <Route
        path="/service-provider-confirm-email/:token"
        element={<ServiceProviderConfirmEmail />}
      />
      {/* Protected Consumer Routes */}
      <Route path="/consumer-home" element={<ConsumerHome />} />
      <Route
        path="/consumer-upload-info"
        element={
          isConsumerAuthenticated ? (
            <ConsumerUpdateInfo />
          ) : (
            <Navigate to="/consumer-sign-in" state={{ from: location }} />
          )
        }
      />
      <Route
        path="/consumer-service-history"
        element={
          isConsumerAuthenticated ? (
            <ConsumerServiceHistoryPage />
          ) : (
            <Navigate to="/consumer-sign-in" state={{ from: location }} />
          )
        }
      />
      <Route
        path="/consumer-requested-services"
        element={
          isConsumerAuthenticated ? (
            <ConsumerRequestedServicesPage />
          ) : (
            <Navigate to="/consumer-sign-in" state={{ from: location }} />
          )
        }
      />
      <Route
        path="/consumer-notifications"
        element={
          isConsumerAuthenticated ? (
            <ConsumerNotification />
          ) : (
            <Navigate to={"/consumer-sign-in"} />
          )
        }
      />
      <Route
        path="/consumer-disputes"
        element={
          isConsumerAuthenticated ? (
            <ConsumerDisputePage />
          ) : (
            <Navigate to={"/consumer-sign-in"} />
          )
        }
      />
      <Route
        path="/consumer-service-page"
        element={
          isConsumerAuthenticated ? (
            <ConsumerServicePage />
          ) : (
            <Navigate to={"/consumer-sign-in"} />
          )
        }
      />
      <Route
        path="/consumer-chat-section"
        element={
          isConsumerAuthenticated ? (
            <ConsumerChatModule />
          ) : (
            <Navigate to={"/consumer-sign-in"} />
          )
        }
      />
      {/* Protected Servicse Provider Routes */}
      <Route
        path="/service-provider-home"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderHome />
          ) : (
            <Navigate
              to="/service-provider-sign-in"
              state={{ from: location }}
            />
          )
        }
      />

      <Route
        path="/service-provider-upload-info"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderUploadInfo />
          ) : (
            <Navigate to="/service-provider-sign-in" />
          )
        }
      />
      <Route
        path="/service-provider-account-verification/:message"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderAccountVerification />
          ) : (
            <Navigate
              to="/service-provider-sign-in"
              state={{ from: location }}
            />
          )
        }
      />
      <Route
        path="/service-provider-add-time"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderTimeSlot />
          ) : (
            <Navigate to={"/service-provider-sign-in"} />
          )
        }
      />
      <Route
        path="/service-provider-add-cnic"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderAddCNIC />
          ) : (
            <Navigate to={"/service-provider-sign-in"} />
          )
        }
      />
      <Route
        path="/service-provider-post"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderPost />
          ) : (
            <Navigate to={"/service-provider-sign-in"} />
          )
        }
      />
      <Route
        path="/service-provider-order"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderOrder />
          ) : (
            <Navigate to={"/service-provider-sign-in"} />
          )
        }
      />
      <Route
        path="/service-provider-setting"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderSetting />
          ) : (
            <Navigate to={"/service-provider-sign-in"} />
          )
        }
      />
      <Route
        path="/service-provider-chat-section"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderChatSection />
          ) : (
            <Navigate to={"/service-provider-sign-in"} />
          )
        }
      />
      <Route
        path="/service-provider-notification"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderNotification />
          ) : (
            <Navigate to={"/service-provider-sign-in"} />
          )
        }
      />
      {/* Admin Route */}
      <Route path="/admin-home" element={<AdminHome />} />

      {/* Fallback for Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AllRoutes = () => {
  return (
    <Router>
      <AuthenticatedRoutes />
    </Router>
  );
};

export default AllRoutes;
