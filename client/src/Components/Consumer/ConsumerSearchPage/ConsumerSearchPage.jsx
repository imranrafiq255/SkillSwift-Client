import React, { useState } from "react";
import ServiceCard from "../ConsumerServiceCard/ConsumerServiceCard";
import SearchBar from "./SearchBar";
import AdImage from "../../../Assets/avatar.png";

const ConsumerSearchPage = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const services = [
    { name: "Plumbing", price: "2500", imgSrc: AdImage, rating: 3 },
    { name: "Electrical Repair", price: "3500", imgSrc: AdImage, rating: 5 },
    { name: "Gardening", price: "2000", imgSrc: AdImage, rating: 4 },
    { name: "Home Cleaning", price: "1800", imgSrc: AdImage, rating: 4 },
    { name: "Pest Control", price: "2200", imgSrc: AdImage, rating: 2 },
    { name: "Painting", price: "4000", imgSrc: AdImage, rating: 5 },
    { name: "Car Wash", price: "1200", imgSrc: AdImage, rating: 3 },
    { name: "AC Installation", price: "3000", imgSrc: AdImage, rating: 4 },
    { name: "Plumbing", price: "2500", imgSrc: AdImage, rating: 3 },
    { name: "Electrical Repair", price: "3500", imgSrc: AdImage, rating: 5 },
    { name: "Gardening", price: "2000", imgSrc: AdImage, rating: 4 },
    { name: "Home Cleaning", price: "1800", imgSrc: AdImage, rating: 4 },
    { name: "Pest Control", price: "2200", imgSrc: AdImage, rating: 2 },
    { name: "Painting", price: "4000", imgSrc: AdImage, rating: 5 },
    { name: "Car Wash", price: "1200", imgSrc: AdImage, rating: 3 },
    { name: "AC Installation", price: "3000", imgSrc: AdImage, rating: 4 },
    { name: "Plumbing", price: "2500", imgSrc: AdImage, rating: 3 },
    { name: "Electrical Repair", price: "3500", imgSrc: AdImage, rating: 5 },
    { name: "Gardening", price: "2000", imgSrc: AdImage, rating: 4 },
    { name: "Home Cleaning", price: "1800", imgSrc: AdImage, rating: 4 },
    { name: "Pest Control", price: "2200", imgSrc: AdImage, rating: 2 },
    { name: "Painting", price: "4000", imgSrc: AdImage, rating: 5 },
    { name: "Car Wash", price: "1200", imgSrc: AdImage, rating: 3 },
    { name: "AC Installation", price: "3000", imgSrc: AdImage, rating: 4 },
  ];

  // Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10">
        <div className="ml-4 mt-4 mr-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <h2 className="text-2xl font-bold ml-6 mb-2">Popular Services</h2>
      </div>

      <main className="flex-1 overflow-y-auto p-8 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))
          ) : (
            <p className="text-gray-600">No services match your search.</p>
          )}
        </div>
      </main>

      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold p-2"
      >
        ✕
      </button>
    </div>
  );
};

export default ConsumerSearchPage;
