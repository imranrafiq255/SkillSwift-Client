import React from "react";

const AdCard = ({ name = "", img, title, time }) => {
  return (
    <div className="rounded-lg bg-[#2b3445] text-[#fff] font-[Poppins] overflow-hidden shadow-md flex flex-col">
      {/* Image Container */}
      <div className="relative">
        <img
          className="w-full h-[12.313rem] object-cover"
          alt={title}
          src={img}
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-4 text-[#b7b9d2] font-semibold">
          {name}
        </div>
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-[#808191] mt-2">{time} ago</p>
      </div>
    </div>
  );
};

export default AdCard;
