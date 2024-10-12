import CustomServiceList from "./CustomServiceList";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";
import { Toaster } from "react-hot-toast";

const ServiceProviderCustomServices = () => {
  return (
    <>
      <Toaster />
      <div className="home-container">
        <ServiceProviderHeader />
        <div className="under-header-container">
          <CustomServiceList/>
          <div className="footer mt-10">
            <ServiceProviderFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderCustomServices;
