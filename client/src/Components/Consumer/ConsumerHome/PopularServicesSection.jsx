import React from 'react';
import AdImage from "../../../Assets/ServiceAd.png";
import StarRating from "../ConsumerCommon/StarRating";

const PopularServicesSection = () => {
  const popularServices = [
    { name: "House Help", price: "3000", imgSrc: AdImage, rating: 4 },
    { name: "House Help", price: "3000", imgSrc: AdImage, rating: 5 },
    { name: "House Help", price: "3000", imgSrc: AdImage, rating: 3 },
    { name: "House Help", price: "3000", imgSrc: AdImage, rating: 4 },
    { name: "House Help", price: "3000", imgSrc: AdImage, rating: 5 },
    { name: "House Help", price: "3000", imgSrc: AdImage, rating: 2 },
    { name: "House Help", price: "3000", imgSrc: AdImage, rating: 4 },
    { name: "House Help", price: "3000", imgSrc: AdImage, rating: 3 },
    // Add more popularServices here...
  ];

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-8">Popular Services</h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {popularServices.map((service, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
              <img
                src={service.imgSrc}
                alt={service.name}
                className="w-full h-48 md:h-64 object-cover mb-4 rounded-t-lg"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <StarRating rating={service.rating} />
                <p className="text-gray-700 mt-2">{"Rs " + service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServicesSection;
