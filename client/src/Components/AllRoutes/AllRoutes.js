import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import NotFound from "../NotFound/NotFound";
const AllRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Consumer  */}
          <Route path="/" element={<Welcome />} />
          <Route path="/consumer-home" element={<ConsumerHome />} />
          <Route path="/consumer-sign-up" element={<ConsumerSignUp />} />
          <Route path="/consumer-sign-in" element={<SignIn />} />
          <Route path="/consumer-send-email" element={<ConsumerSendEmail />} />
          <Route
            path="/consumer-forgot-paasword"
            element={<ForgotPassword />}
          />
          <Route path="/consumer-reset-paasword" element={<ResetPassword />} />

          {/* Service Provider  */}
          <Route
            path="/service-provider-home"
            element={<ServiceProviderHome />}
          />
          <Route
            path="//service-provider-sign-in"
            element={<ServiceProviderSignIn />}
          />
          <Route
            path="//service-provider-sign-up"
            element={<ServiceProviderSignUp />}
          />

          {/* Admin  */}
          <Route path="/admin-home" element={<AdminHome />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default AllRoutes;
