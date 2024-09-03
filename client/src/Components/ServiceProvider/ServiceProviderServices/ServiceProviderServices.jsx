import React from "react";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";

const ServiceProviderServices = () => {
  return (
    <>
      <div className="service-provider-services-container">
        <div className="header">
          <ServiceProviderHeader />
        </div>
        <div className="footer">
          <ServiceProviderFooter />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderServices;
