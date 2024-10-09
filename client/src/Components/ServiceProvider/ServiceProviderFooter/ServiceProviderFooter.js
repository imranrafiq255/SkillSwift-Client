import React from "react";

const ServiceProviderFooter = () => {
  return (
    <>
      <div className="footer-container h-[400px] bg-black w-full">
        <div className=" w-full h-full flex flex-col justify-center items-center">
          <div className="contact flex justify-center flex-col items-center">
            <h1 className="text-center text-white font-bold text-xl lg:text-3xl my-5">
              WE ARE HERE FOR YOU
            </h1>
            <button
              className="text-black bg-white lg:w-40 lg:h-14 w-32 h-10 my-5"
              onClick={() =>
                window.open("https://wa.me/+923247572574", "_blank")
              }
            >
              CONTACT US
            </button>
          </div>
          <h1 className="text-white text-center text-sm lg:text-lg">
            2024&#169; reserved by Team SkillSwift
          </h1>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderFooter;
