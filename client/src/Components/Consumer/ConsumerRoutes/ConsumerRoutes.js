import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsumerHome from "../ConsumerHome/ConsumerHome";
const ConsumerRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ConsumerHome />} />
          {/* <Route path='/consumer/about' element={<Home/>}/> */}
        </Routes>
      </Router>
    </>
  );
};

export default ConsumerRoutes;
