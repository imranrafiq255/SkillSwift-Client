import React from "react";
import AdImage from "../../../Assets/AcService.png";
import StarRating from "../ConsumerCommon/StarRating";

const ServicesSection = () => {
  const services = [
    { name: "AC Servicing", price: "3000", imgSrc: AdImage, rating: 4 },
    { name: "AC Servicing", price: "3000", imgSrc: AdImage, rating: 5 },
    { name: "AC Servicing", price: "3000", imgSrc: AdImage, rating: 3 },
    { name: "AC Servicing", price: "3000", imgSrc: AdImage, rating: 4 },
    { name: "AC Servicing", price: "3000", imgSrc: AdImage, rating: 5 },
    { name: "AC Servicing", price: "3000", imgSrc: AdImage, rating: 2 },
    { name: "AC Servicing", price: "3000", imgSrc: AdImage, rating: 4 },
    { name: "AC Servicing", price: "3000", imgSrc: AdImage, rating: 3 },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-8">
        Recent Services Ads
      </h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={service.imgSrc}
                alt={service.name}
                className="w-full h-48 object-cover mb-4 rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <StarRating rating={service.rating} />
                <p className="text-gray-700 mt-2">{"Rs " + service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
          View All
        </button>
      </div>
    </section>
  );
};

export default ServicesSection;
