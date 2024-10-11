import React, { useEffect, useState } from "react";
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
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import AddressModal from "./AddressModal";
import ConsumerSearchPage from "../ConsumerSearchPage/ConsumerSearchPage";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentConsumerAction } from "../../Redux/Consumer/Actions/ConsumerActions";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { loading, consumer } = useSelector(
    (state) => state.loadCurrentConsumerReducer
  );
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });
  const signOutHandler = async () => {
    try {
      const response = await axios.get("/api/v1/consumer/sign-out");
      window.location.href = `/consumer-sign-in?message=${response?.data?.message}`;
    } catch (error) {
      handleShowFailureToast(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    dispatch(loadCurrentConsumerAction());
  }, [dispatch]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileSave = (updatedUser) => {
    setUser(updatedUser);
  };
  const handleAddressSave = async (newAddress) => {
    try {
      const data = { consumerAddress: newAddress };
      const response = await axios.post(
        "/api/v1/consumer/change-consumer-address",
        data
      );
      handleShowSuccessToast(response?.data?.message);
    } catch (error) {
      console.log(error?.response?.data?.message);
      handleShowFailureToast(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (!loading && consumer) {
      setUser({
        name: consumer?.consumerFullName,
        email: consumer?.consumerEmail,
        phone: consumer?.consumerPhoneNumber,
        address: consumer?.consumerAddress,
        image: consumer?.consumerAvatar,
      });
    }
  }, [consumer, loading]);
  return (
    <nav className="bg-white shadow-md p-6 z-10">
      <Toaster />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-blue-700 font-semibold text-xl">SkillSwift</div>

          {/* Menu for desktop */}
          <ul className="hidden md:flex space-x-14 text-gray-700 font-semibold">
            <li className="relative group">
              <Link to="/consumer-home" className="flex items-center">
                <FaHome className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full text-xs text-gray-700">
                  Home
                </span>
              </Link>
            </li>
            <li className="relative group">
              <Link to="/consumer-chat-section" className="flex items-center">
                <FaEnvelope className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full text-xs text-gray-700">
                  Messages
                </span>
              </Link>
            </li>
            <li className="relative group">
              <Link
                to={"/consumer-requested-services"}
                className="flex items-center"
              >
                <FaClipboardList className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full text-xs text-gray-700">
                  Requests
                </span>
              </Link>
            </li>
            <li className="relative group">
              <Link
                to={"/consumer-service-history"}
                className="flex items-center"
              >
                <FaHistory className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full text-xs text-gray-700">
                  History
                </span>
              </Link>
            </li>
            <li className="relative group">
              <Link to={"/consumer-disputes"} className="flex items-center">
                <FaExclamationCircle className="w-5 h-5" />
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full text-xs text-gray-700">
                  Disputes
                </span>
              </Link>
            </li>
            <li className="relative group">
              <button
                onClick={() => {
                  if (!loading && !consumer) {
                    navigate("/consumer-sign-in", {
                      state: { message: "Please login first" },
                    });
                  } else if (!loading && consumer) {
                    setShowProfileModal(true);
                  }
                }}
                aria-label="Profile"
              >
                <FaUser className="w-5 h-5" />
              </button>
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full text-xs text-gray-700">
                Profile
              </span>
            </li>
            <li className="relative group">
              <button
                onClick={() => {
                  alert("Custom Service");
                }}
                aria-label="Custom"
              >
                <FaEdit className="w-5 h-5" />
              </button>
              <span className="absolute left-1/2 transform -translate-x-1/2 top-full text-xs text-gray-700 whitespace-nowrap">
                Custom Request
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
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (!loading && !consumer) {
                  navigate("/consumer-sign-in", {
                    state: { message: "Please login first" },
                  });
                } else if (!loading && consumer) {
                  setShowAddressModal(true);
                }
              }}
              aria-label="Address"
            >
              <FaMapMarkerAlt className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/consumer-notifications")}
              aria-label="Profile"
            >
              <FaBell className="w-5 h-5" />
            </button>
            <button onClick={signOutHandler} aria-label="Signout">
              <FaSignOutAlt className="w-5 h-5" />
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
        <Link to="/consumer-home" className="flex items-center">
          <FaHome className="w-5 h-5 mx-2" />
          Home
        </Link>
        <Link to="/consumer-chat-section" className="flex items-center">
          <FaEnvelope className="w-5 h-5 mx-2" />
          Messages
        </Link>
        <Link to={"/consumer-requested-services"} className="flex items-center">
          <FaClipboardList className="w-5 h-5 mx-2" />
          Service Requests
        </Link>
        <Link to={"/consumer-service-history"} className="flex items-center">
          <FaHistory className="w-5 h-5 mx-2" />
          Service History
        </Link>
        <Link to={"/consumer-disputes"} className="flex items-center">
          <FaExclamationCircle className="w-5 h-5 mx-2" />
          Disputes
        </Link>
        <button
          onClick={() => {
            if (!loading && !consumer) {
              navigate("/consumer-sign-in", {
                state: { message: "Please login first" },
              });
            } else if (!loading && consumer) {
              setShowAddressModal(true);
            }
          }}
          className="flex items-center"
        >
          <FaMapMarkerAlt className="w-5 h-5 mx-2" />
          Address
        </button>
        <button
          onClick={() => {
            if (!loading && !consumer) {
              navigate("/consumer-sign-in", {
                state: { message: "Please login first" },
              });
            } else if (!loading && consumer) {
              setShowProfileModal(true);
            }
          }}
          className="flex items-center"
        >
          <FaUser className="w-5 h-5 mx-2" />
          Profile
        </button>
        <button
          onClick={() => {
            alert("Custom Service");
          }}
          className="flex items-center"
        >
          <FaEdit className="w-5 h-5 mx-2" />
          Custom Request
        </button>
        <button
          onClick={() => setShowSearchModal(true)}
          className="flex items-center"
        >
          <FaSearch className="w-5 h-5 mx-2" />
          Search
        </button>
        <button
          onClick={() => navigate("/consumer-notifications")}
          className="flex items-center"
        >
          <FaBell className="w-5 h-5 mx-2" />
          Notifications
        </button>
        <button
          onClick={signOutHandler}
          className="flex items-center"
          aria-label="Signout"
        >
          <FaSignOutAlt className="w-5 h-5 mx-2" />
          Signout
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
