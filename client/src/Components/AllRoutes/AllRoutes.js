import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsumerHome from "../Consumer/ConsumerHome/ConsumerHome";
import ConsumerSignUp from "../Consumer/ConsumerSignUp/ConsumerSignUp";
import Welcome from "../Welcome/Welcome";
import ServiceProviderHome from "../ServiceProvider/ServiceProviderHome/ServiceProviderHome";
import AdminHome from "../Admin/AdminHome/AdminHome";
import SignIn from "../Consumer/SignIn/SignIn";
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
          {/* Service Provider  */}
          <Route
            path="/service-provider-home"
            element={<ServiceProviderHome />}
          />
          {/* Admin  */}
          <Route path="/admin-home" element={<AdminHome />} />
        </Routes>
      </Router>
    </>
  );
};

export default AllRoutes;
