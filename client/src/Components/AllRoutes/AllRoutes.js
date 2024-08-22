import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import ConsumerUploadInfo from "../Consumer/ConsumerUploadInfo/ConsumerUploadInfo";
import NotFound from "../NotFound/NotFound";
import ConsumerVerifyEmail from "../Consumer/ConsumerVerifyEmail/ConsumerVerifyEmail";
import LoaderBars from "../Loader/LoaderBars";
import axios from "axios";
// import TempComponent from "../MyTemps/TempComponent";
import ServiceProviderResetPassword from "../ServiceProvider/ServiceProviderResetPassword/ServiceProviderResetPassword";
import ServiceProviderSendEmail from "../ServiceProvider/ServiceProviderSendEmail/ServiceProviderSendEmail";
import ServiceProviderForgotPassword from "../ServiceProvider/ServiceProviderForgotPassword/ServiceProviderFrogotPassword";
import ServiceProviderUploadInfo from "../ServiceProvider/ServiceProviderUploadInfo/ServiceProviderUploadInfo";
import ServiceProviderConfirmEmail from "../ServiceProvider/ServiceProviderVerifyEmail/ServiceProviderVerifyEmail";
import ServiceProviderAccountVerification from "../ServiceProvider/ServiceProviderAccountVerification/ServiceProviderAccountVerification";
const AuthenticatedRoutes = () => {
  const location = useLocation();

  const [isConsumerLoading, setConsumerLoading] = useState(true);
  const [isConsumerAuthenticated, setConsumerAuthenticated] = useState(false);
  const [isServiceProviderLoading, setServiceProviderLoading] = useState(true);
  const [isServiceProviderAuthenticated, setServiceProviderAuthenticated] =
    useState(false);
  const navigate = useNavigate(false);
  const [serviceProvider, setServiceProvider] = useState(null);
  const serviceProviderVerifiedRoutes = [
    "/consumer-upload-info",
    "/service-provider-home",
  ];
  useEffect(() => {
    const loadCurrentConsumer = async () => {
      try {
        const response = await axios.get(
          "/api/v1/consumer/load-current-consumer"
        );
        if (response.data) {
          setConsumerAuthenticated(true);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      } finally {
        setConsumerLoading(false);
      }
    };
    loadCurrentConsumer();
    const loadCurrentServiceProvider = async () => {
      try {
        const response = await axios.get(
          "/api/v1/service-provider/load-current-service-provider"
        );
        if (response.data) {
          setServiceProviderAuthenticated(true);
        }
        setServiceProvider(response.data.serviceProvider);
      } catch (error) {
        console.log(error?.response?.data?.message);
      } finally {
        setServiceProviderLoading(false);
      }
    };
    loadCurrentServiceProvider();
  }, []);

  if (isConsumerLoading && location.pathname === "/consumer-upload-info") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoaderBars />
      </div>
    );
  }
  if (
    isServiceProviderLoading &&
    serviceProviderVerifiedRoutes.includes(location.pathname)
  ) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoaderBars />
      </div>
    );
  }

  if (
    !isServiceProviderLoading &&
    location.pathname === "/service-provider-home" &&
    !serviceProvider?.isAccountVerified
  ) {
    return navigate(
      "/service-provider-account-verification/please wait for your account verification",
      {
        state: {
          message: "You can't access this page until your account is verified.",
        },
      }
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      {/* <Route path="/temp" element={<TempComponent />} /> */}
      <Route path="/consumer-home" element={<ConsumerHome />} />
      <Route path="/consumer-sign-up" element={<ConsumerSignUp />} />
      <Route
        path="/consumer-upload-info"
        element={
          isConsumerAuthenticated ? (
            <ConsumerUploadInfo />
          ) : (
            <Navigate to={"/consumer-sign-in"} />
          )
        }
      />
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
      <Route
        path="/service-provider-home"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderHome />
          ) : (
            <Navigate to={"/service-provider-sign-in"} />
          )
        }
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
        path="/service-provider-sign-up"
        element={<ServiceProviderSignUp />}
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
        path="/service-provider-upload-info"
        element={
          isServiceProviderAuthenticated ? (
            <ServiceProviderUploadInfo />
          ) : (
            <Navigate to={"/service-provider-upload-info"} />
          )
        }
      />
      <Route
        path="/service-provider-confirm-email/:token"
        element={<ServiceProviderConfirmEmail />}
      />
      <Route
        path="/service-provider-account-verification/:message"
        element={<ServiceProviderAccountVerification />}
      />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AllRoutes = () => {
  const [isConsumerAuthenticated, setConsumerAuthenticated] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await axios.get(
          "/api/v1/consumer/load-current-consumer"
        );
        if (response.data) {
          setConsumerAuthenticated(true);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      } finally {
        setHasCheckedAuth(true);
      }
    };

    if (!hasCheckedAuth) {
      loadCurrentUser();
    }
  }, [hasCheckedAuth]);

  return (
    <Router>
      <AuthenticatedRoutes isConsumerAuthenticated={isConsumerAuthenticated} />
    </Router>
  );
};

export default AllRoutes;
