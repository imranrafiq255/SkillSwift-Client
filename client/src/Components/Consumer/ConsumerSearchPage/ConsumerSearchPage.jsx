import React, { useEffect, useState } from "react";
import ServiceCard from "../ConsumerServiceCard/ConsumerServiceCard";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { loadPopularPostsAction } from "../../Redux/Consumer/Actions/ConsumerActions.js";
const ConsumerSearchPage = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [filteredServices, setFilteredServices] = useState(null);
  const { loading, posts, error } = useSelector(
    (state) => state.loadPopularPostsReducer
  );
  useEffect(() => {
    if (!loading && posts) {
      setFilteredServices(posts);
      const filtered = posts.filter((post) =>
        post.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    } else if (!loading && error) {
      console.error(error);
      setFilteredServices([]);
    }
  }, [searchQuery, loading, posts, error]);
  useEffect(() => {
    dispatch(loadPopularPostsAction());
  }, [dispatch]);
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
          {!loading && filteredServices && filteredServices.length > 0 ? (
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
