import React from "react";
const ConsumerSendEmail = ({ email }) => {
  return (
    <>
      <div className="consumer-send-email-container w-screen">
        <div className="image flex justify-center mt-40 lg:mt-20">
          <img
            src={require("../../../Assets/sendEmailAvatar.png")}
            alt=""
            className="w-[30%] h-[30%]"
          />
        </div>  
        <div className="message">
          <h1 className="font-extralight text-center">
            We've sent an email to{" "}
            <span className="font-semibold">{email}</span>, Please check your
            inbox.
          </h1>
          <div className="flex justify-center mt-12">
            <a
              href="https://www.gmail.com"
              className="text-center bg-[#4e97fd] hover:bg-[#68a5fa] px-14 py-4 text-white"
            >
              Open Gmail?
            </a>
          </div>
          <div />
        </div>
      </div>
    </>
  );
};

export default ConsumerSendEmail;
