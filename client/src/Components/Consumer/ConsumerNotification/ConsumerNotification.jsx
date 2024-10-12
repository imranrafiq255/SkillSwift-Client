import React, { useEffect, useRef } from "react";
import SkeletonNotificationLoader from "../../Loader/ServiceProviderLoaders/SkeletonNotificationLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadNewNotificationsAction,
  readNotificationAction,
} from "../../Redux/Consumer/Actions/ConsumerActions.js";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import { FaBell } from "react-icons/fa";
import Navbar from "../ConsumerCommon/Navbar.jsx";
import ContactSection from "../ConsumerCommon/ContactSection.jsx";
import Footer from "../ConsumerCommon/Footer.jsx";

const ConsumerNotification = () => {
  const dispatch = useDispatch();
  const { loadNotificationLoader, notifications } = useSelector(
    (state) => state.loadNewNotificationsReducer
  );
  const {
    readNotificationLoader,
    readNotificationMessage,
    readNotificationError,
  } = useSelector((state) => state.readNotificationReducer);
  const toastMessage = useRef(false);
  useEffect(() => {
    dispatch(loadNewNotificationsAction());
  }, [dispatch]);
  useEffect(() => {
    if (
      !readNotificationLoader &&
      readNotificationError &&
      !toastMessage.current
    ) {
      handleShowFailureToast(readNotificationError);
      toastMessage.current = true;
      dispatch(clearErrors());
      dispatch(loadNewNotificationsAction());
    } else if (
      !readNotificationLoader &&
      readNotificationMessage &&
      !toastMessage.current
    ) {
      handleShowSuccessToast(readNotificationMessage);
      toastMessage.current = true;
      dispatch(clearErrors());
      dispatch(loadNewNotificationsAction());
    }
  }, [
    readNotificationError,
    readNotificationMessage,
    readNotificationLoader,
    dispatch,
  ]);
  const readNotificationHandler = (id) => {
    dispatch(readNotificationAction(id));
    dispatch(loadNewNotificationsAction());
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="notification-container min-h-screen">
        <div className="notification-message ml-10 my-4"></div>
        {loadNotificationLoader &&
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonNotificationLoader key={index} />
          ))}
        {!loadNotificationLoader && notifications?.length > 0 ? (
          notifications.map((notification) => (
            <div className="notification flex justify-center">
              <div className="center w-full p-5 lg:w-10/12 xl:w-5/12">
                <div className="notification-card shadow-2xl w-full bg-[#c8c8c8] rounded-md items-center relative flex p-3 gap-2">
                  <div className=" basis-[15%] flex justify-center">
                    <img
                      src={
                        notification?.notificationSendBy?.serviceProviderAvatar
                      }
                      alt=""
                      className="w-14 h-14 rounded-full"
                    />
                  </div>
                  <div className="basis-[85%]">
                    <h1 className="text-sm font-bold text-[#4e97fd]">
                      {
                        notification?.notificationSendBy
                          ?.serviceProviderFullName
                      }
                    </h1>
                    <p className="text-sm text-[#878787]">
                      {notification?.notificationMessage}
                    </p>
                  </div>
                  <div
                    className="read absolute 
                  top-2 right-3"
                  >
                    <div
                      className="btn flex items-center gap-1 bg-black py-1 px-2 rounded-xl cursor-pointer"
                      onClick={() => readNotificationHandler(notification?._id)}
                    >
                      <h1 className="text-white text-xs">Read</h1>
                      <img
                        src={require("../../../Assets/up-arrows.png")}
                        alt=""
                        className="w-3 h-3 invert animate-pulse"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="bg-blue-100 p-6 rounded-full">
              <FaBell className="text-blue-500 text-6xl" />
            </div>
            <h1 className="text-blue-600 text-2xl font-semibold mt-4">
              No Notifcation Available
            </h1>
            <p className="text-blue-500 mt-2">
              It looks like you have no notifications.
            </p>
          </div>
        )}
      </div>
      <ContactSection />
      <Footer />
    </>
  );
};

export default ConsumerNotification;
