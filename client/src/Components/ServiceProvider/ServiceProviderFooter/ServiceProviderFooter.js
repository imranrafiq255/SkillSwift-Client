import React from "react";

const ServiceProviderFooter = () => {
  return (
    <>
      <div className="footer-container h-[400px] bg-black w-full">
        <div className=" w-full h-full flex flex-col justify-center items-center">
          <div className="social-media flex justify-center items-center gap-8 pt-10">
            <a
              href="whatsapp:contact=015555555555@s.whatsapp.com&message='I'd like to chat with you'"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={require("../../../Assets/whatsapp.png")}
                alt=""
                className="lg:w-8 lg:h-8 w-5 h-5 invert"
              />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
              <img
                src={require("../../../Assets/tik-tok.png")}
                alt=""
                className="lg:w-8 lg:h-8 w-5 h-5 invert"
              />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={require("../../../Assets/facebook.png")}
                alt=""
                className="lg:w-8 lg:h-8 w-5 h-5 invert"
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={require("../../../Assets/instagram.png")}
                alt=""
                className="lg:w-8 lg:h-8 w-5 h-5 invert"
              />
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
              <img
                src={require("../../../Assets/twitter.png")}
                alt=""
                className="lg:w-8 lg:h-8 w-5 h-5 invert"
              />
            </a>
          </div>
          <div className="line lg:w-[70%] w-[90%] h-[0.3px] bg-white m-10"></div>
          <div className="contact flex justify-center flex-col items-center">
            <h1 className="text-center text-white font-bold text-xl lg:text-3xl my-5">
              WE ARE HERE FOR YOU
            </h1>
            <button className="text-black bg-white lg:w-40 lg:h-14 w-32 h-10 my-5">
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
