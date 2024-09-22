import React, { useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUser,
  FaMapMarkerAlt,
  FaHome,
  FaEnvelope,
  FaClipboardList,
  FaHistory,
  FaExclamationCircle,
} from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import AddressModal from "./AddressModal";
import ConsumerSearchPage from "../ConsumerSearchPage/ConsumerSearchPage";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "1234 Elm Street",
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileSave = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleAddressSave = (newAddress) => {
    alert("Address saved");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-blue-700 font-semibold text-xl">SkillSwift</div>

          {/* Menu for desktop */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
            <li className="relative group">
              <a href="/consumer-home" className="flex items-center">
                <FaHome className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  Home
                </span>
              </a>
            </li>
            <li className="relative group">
              <a href="/messages" className="flex items-center">
                <FaEnvelope className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  Messages
                </span>
              </a>
            </li>
            <li className="relative group">
              <a href="/requests" className="flex items-center">
                <FaClipboardList className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  Service Requests
                </span>
              </a>
            </li>
            <li className="relative group">
              <a href="/history" className="flex items-center">
                <FaHistory className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  Service History
                </span>
              </a>
            </li>
            <li className="relative group">
              <a href="/disputes" className="flex items-center">
                <FaExclamationCircle className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  Disputes
                </span>
              </a>
            </li>
            <li className="relative group">
              <button onClick={() => setShowProfileModal(true)} aria-label="Profile">
                <FaUser className="w-5 h-5" />
              </button>
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                Profile
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {/* Burger Icon for mobile */}
          <button
            className="block md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Combined Search, Profile, and Location Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setShowSearchModal(true)} aria-label="Search">
              <FaSearch className="w-5 h-5" />
            </button>
            <button onClick={() => setShowAddressModal(true)} aria-label="Address">
              <FaMapMarkerAlt className="w-5 h-5" />
            </button>
            <button onClick={() => alert("Notifications clicked")} aria-label="Profile">
              <FaBell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden mt-4 space-y-4 text-gray-700 font-semibold text-left`}
      >
        <a href="/home" className="flex items-center">
          <FaHome className="w-5 h-5 mx-2" />
          Home
        </a>
        <a href="/messages" className="flex items-center">
          <FaEnvelope className="w-5 h-5 mx-2" />
          Messages
        </a>
        <a href="/requests" className="flex items-center">
          <FaClipboardList className="w-5 h-5 mx-2" />
          Service Requests
        </a>
        <a href="/history" className="flex items-center">
          <FaHistory className="w-5 h-5 mx-2" />
          Service History
        </a>
        <a href="/disputes" className="flex items-center">
          <FaExclamationCircle className="w-5 h-5 mx-2" />
          Disputes
        </a>
        <button onClick={() => setShowAddressModal(true)} className="flex items-center">
          <FaMapMarkerAlt className="w-5 h-5 mx-2" />
          Address
        </button>
        <button onClick={() => setShowProfileModal(true)} className="flex items-center">
          <FaUser className="w-5 h-5 mx-2" />
          Profile
        </button>
        <button onClick={() => setShowSearchModal(true)} className="flex items-center">
          <FaSearch className="w-5 h-5 mx-2" />
          Search
        </button>
        <button onClick={() => alert("Notifications clicked")} className="flex items-center">
          <FaBell className="w-5 h-5 mx-2" />
          Notifications
        </button>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onEdit={() => {
          setShowProfileModal(false);
          navigate("/consumer-update-info");
        }}
        user={user}
        onSave={handleProfileSave}
      />

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        address={user.address}
        onSave={handleAddressSave}
      />

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full h-[90vh]">
            <ConsumerSearchPage onClose={() => setShowSearchModal(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
