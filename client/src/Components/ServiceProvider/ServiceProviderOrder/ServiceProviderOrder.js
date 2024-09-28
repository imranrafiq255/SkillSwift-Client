import React, { useEffect, useState } from "react";
import ServiceProviderHeader from "../ServiceProviderHeader/ServiceProviderHeader";
import ServiceProviderFooter from "../ServiceProviderFooter/ServiceProviderFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptOrderAction,
  cancelOrderAction,
  completeOrderAction,
  loadAcceptedOrdersAction,
  loadCancelledOrdersAction,
  loadCompletedOrdersAction,
  loadPendingOrdersAction,
  loadRejectedOrdersAction,
  rejectOrderAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import SkeletonOrderLoader from "../../Loader/ServiceProviderLoaders/SkeletonOrderLoader";
import { Toaster } from "react-hot-toast";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import LoaderCircles from "../../Loader/LoaderCircles";
const ServiceProviderOrder = () => {
  const [isShowing, setShowing] = useState(1);
  const dispatch = useDispatch();
  const { pendingLoading, pendingOrders } = useSelector(
    (state) => state.loadPendingOrdersReducer
  );
  const { completedLoading, completedOrders } = useSelector(
    (state) => state.loadCompletedOrdersReducer
  );
  const { rejectedLoading, rejectedOrders } = useSelector(
    (state) => state.loadRejectedOrdersReducer
  );
  const { acceptedLoading, acceptedOrders } = useSelector(
    (state) => state.loadAcceptedOrdersReducer
  );
  const { cancelledLoading, cancelledOrders } = useSelector(
    (state) => state.loadCancelledOrdersReducer
  );
  const { acceptOrderLoading, acceptOrderError, acceptOrderMessage } =
    useSelector((state) => state.acceptOrderReducer);
  const { rejectOrderLoading, rejectOrderError, rejectOrderMessage } =
    useSelector((state) => state.rejectOrderReducer);
  const { completeOrderLoading, completeOrderError, completeOrderMessage } =
    useSelector((state) => state.completeOrderReducer);
  const { cancelOrderLoading, cancelOrderError, cancelOrderMessage } =
    useSelector((state) => state.cancelOrderReducer);
  useEffect(() => {
    dispatch(loadPendingOrdersAction());
    dispatch(loadCompletedOrdersAction());
    dispatch(loadRejectedOrdersAction());
    dispatch(loadAcceptedOrdersAction());
    dispatch(loadCancelledOrdersAction());
  }, [dispatch]);
  const acceptOrder = (id) => {
    dispatch(acceptOrderAction(id));
  };
  useEffect(() => {
    if (!acceptOrderLoading && acceptOrderError) {
      handleShowFailureToast(acceptOrderError);
    } else if (!acceptOrderLoading && acceptOrderMessage) {
      handleShowSuccessToast(acceptOrderMessage);
      dispatch(loadPendingOrdersAction());
      dispatch(loadCompletedOrdersAction());
      dispatch(loadRejectedOrdersAction());
      dispatch(loadAcceptedOrdersAction());
      dispatch(loadCancelledOrdersAction());
    }
  }, [acceptOrderError, acceptOrderLoading, acceptOrderMessage, dispatch]);
  const rejectOrder = (id) => {
    dispatch(rejectOrderAction(id));
  };
  useEffect(() => {
    if (!rejectOrderLoading && rejectOrderError) {
      handleShowFailureToast(rejectOrderError);
    } else if (!rejectOrderLoading && rejectOrderMessage) {
      handleShowSuccessToast(rejectOrderMessage);
      dispatch(loadPendingOrdersAction());
      dispatch(loadCompletedOrdersAction());
      dispatch(loadRejectedOrdersAction());
      dispatch(loadAcceptedOrdersAction());
      dispatch(loadCancelledOrdersAction());
    }
  }, [rejectOrderError, rejectOrderLoading, rejectOrderMessage, dispatch]);
  const completeOrder = (id) => {
    dispatch(completeOrderAction(id));
  };
  useEffect(() => {
    if (!completeOrderLoading && completeOrderError) {
      handleShowFailureToast(completeOrderError);
    } else if (!completeOrderLoading && completeOrderMessage) {
      handleShowSuccessToast(completeOrderMessage);
      dispatch(loadPendingOrdersAction());
      dispatch(loadCompletedOrdersAction());
      dispatch(loadRejectedOrdersAction());
      dispatch(loadAcceptedOrdersAction());
      dispatch(loadCancelledOrdersAction());
    }
  }, [
    completeOrderError,
    completeOrderLoading,
    completeOrderMessage,
    dispatch,
  ]);
  const cancelOrder = (id) => {
    dispatch(cancelOrderAction(id));
  };
  useEffect(() => {
    if (!cancelOrderLoading && cancelOrderError) {
      handleShowFailureToast(cancelOrderError);
    } else if (!cancelOrderLoading && cancelOrderMessage) {
      handleShowSuccessToast(cancelOrderMessage);
      dispatch(loadPendingOrdersAction());
      dispatch(loadCompletedOrdersAction());
      dispatch(loadRejectedOrdersAction());
      dispatch(loadAcceptedOrdersAction());
      dispatch(loadCancelledOrdersAction());
    }
  }, [cancelOrderError, cancelOrderLoading, cancelOrderMessage, dispatch]);
  return (
    <>
      <Toaster />
      <div className="service-provider-order-container">
        <div className="header">
          <ServiceProviderHeader />
        </div>
        <div className="line w-full h-[0.3px] bg-slate-700"></div>
        <div className="all-orders-container mt-10">
          <div className="orders-navigation flex justify-center items-center gap-4 overflow-auto">
            <h1
              onClick={() => setShowing(1)}
              className={`${
                isShowing === 1 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-sm lg:text-lg`}
            >
              Pending
            </h1>
            <h1
              onClick={() => setShowing(2)}
              className={`${
                isShowing === 2 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-sm lg:text-lg`}
            >
              Completed
            </h1>
            <h1
              onClick={() => setShowing(3)}
              className={`${
                isShowing === 3 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-sm lg:text-lg`}
            >
              Accepted
            </h1>
            <h1
              onClick={() => setShowing(4)}
              className={`${
                isShowing === 4 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-sm lg:text-lg`}
            >
              Rejected
            </h1>
            <h1
              onClick={() => setShowing(5)}
              className={`${
                isShowing === 5 ? "font-bold border-b-2 border-[#4e97fd]" : ""
              } cursor-pointer text-sm lg:text-lg`}
            >
              Cancelled
            </h1>
          </div>
          <div className="div-navigation-line w-full flex justify-center items-center mt-4">
            <div className="line lg:w-[55%] w-[85%] xl:w-[35%] h-[1px] bg-slate-700"></div>
          </div>
          <div className="navigation-container flex justify-center">
            {isShowing === 1 && (
              <div className="pending-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                {pendingLoading ? <SkeletonOrderLoader /> : ""}
                {!pendingLoading &&
                pendingOrders &&
                pendingOrders?.length > 0 ? (
                  pendingOrders?.map((order) => (
                    <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                      <div className="consumer-information p-4">
                        <div className="order-by flex items-center gap-3">
                          <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                            Order By
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="consumer-profile-information flex mt-8">
                          <div className="profile-pic-name flex items-center gap-8">
                            <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                              <img
                                src={order?.serviceOrderBy?.consumerAvatar}
                                alt=""
                                className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                              />
                            </div>
                            <div>
                              <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                                {order?.serviceOrderBy?.consumerFullName}
                              </h1>
                              <div className="">
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                    Email:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerEmail?.toLowerCase()}
                                </h1>
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                    Phone:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerPhoneNumber}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="address flex items-center gap-7">
                          <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                            <h1 className="text-white">Address</h1>
                          </div>
                          <h1 className="mt-3">
                            {order?.serviceOrderBy?.consumerAddress}
                          </h1>
                        </div>
                        <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                        <div className="order-details flex items-center gap-3">
                          <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                            Order Details
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="order-details-container relative">
                          <div className="flex gap-3 items-center name">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                              <h1 className="text-black text-xs">
                                Service Name
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.serviceName}</h1>
                          </div>
                          <div className="flex gap-3 items-center message">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs inline-block">
                                Service message
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.servicePostMessage}</h1>
                          </div>
                          <div className="flex gap-3 items-center schedule mt-4">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs">
                                Delivery Date
                              </h1>
                            </div>
                            <h1>{order?.orderDeliverySchedule}</h1>
                          </div>
                          <div className="flex gap-3 items-center name absolute right-0 top-0">
                            <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                              <h1 className="text-white text-xs">
                                {"$ " + order?.servicePost?.servicePostPrice}
                              </h1>
                            </div>
                          </div>
                        </div>
                        {acceptOrderLoading || rejectOrderLoading ? (
                          <div className="btns flex gap-3 justify-center mt-8 mb-5">
                            <div className="bg-red-500 text-white py-2 px-8 rounded-lg shadow-lg basis-[45%] flex justify-center items-center">
                              <LoaderCircles />
                            </div>
                            <div className="bg-[#10f31b] text-white py-2 px-8 rounded-lg shadow-lg basis-[45%] flex justify-center items-center">
                              <LoaderCircles />
                            </div>
                          </div>
                        ) : (
                          <div className="btns flex gap-3 justify-center mt-8 mb-5">
                            <button
                              className="bg-red-500 text-white py-2 px-8 rounded-lg shadow-lg basis-[45%]"
                              onClick={() => rejectOrder(order?._id)}
                            >
                              Reject
                            </button>
                            <button
                              className="bg-[#10f31b] text-white py-2 px-8 rounded-lg shadow-lg basis-[45%]"
                              onClick={() => acceptOrder(order?._id)}
                            >
                              Accept
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1>No pending order into database</h1>
                  </div>
                )}
              </div>
            )}
            {isShowing === 2 && (
              <div className="completed-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                {completedLoading ? <SkeletonOrderLoader /> : ""}
                {!completedLoading &&
                completedOrders &&
                completedOrders?.length > 0 ? (
                  completedOrders.map((order) => (
                    <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                      <div className="consumer-information p-4">
                        <div className="order-by flex items-center gap-3">
                          <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                            Order By
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="consumer-profile-information flex mt-8">
                          <div className="profile-pic-name flex items-center gap-8">
                            <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                              <img
                                src={order?.serviceOrderBy?.consumerAvatar}
                                alt=""
                                className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                              />
                            </div>
                            <div>
                              <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                                {order?.serviceOrderBy?.consumerFullName}
                              </h1>
                              <div className="">
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                    Email:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerEmail?.toLowerCase()}
                                </h1>
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                    Phone:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerPhoneNumber}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="address flex items-center gap-7">
                          <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                            <h1 className="text-white">Address</h1>
                          </div>
                          <h1 className="mt-3">
                            {order?.serviceOrderBy?.consumerAddress}
                          </h1>
                        </div>
                        <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                        <div className="order-details flex items-center gap-3">
                          <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                            Order Details
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="order-details-container relative">
                          <div className="flex gap-3 items-center name">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                              <h1 className="text-black text-xs">
                                Service Name
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.serviceName}</h1>
                          </div>
                          <div className="flex gap-3 items-center message">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs inline-block">
                                Service message
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.servicePostMessage}</h1>
                          </div>
                          <div className="flex gap-3 items-center schedule mt-4">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs">
                                Delivery Date
                              </h1>
                            </div>
                            <h1>{order?.orderDeliverySchedule}</h1>
                          </div>
                          <div className="flex gap-3 items-center name absolute right-0 top-0">
                            <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                              <h1 className="text-white text-xs">
                                {"$ " + order?.servicePost?.servicePostPrice}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <div className="btns flex gap-3 justify-center mt-8 mb-5">
                          <div className="bg-[#4e97fd] text-white py-2 px-8 rounded-lg shadow-lg w-full flex justify-center items-center">
                            Completed
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1>No order is completed yet!</h1>
                  </div>
                )}
              </div>
            )}
            {isShowing === 3 && (
              <div className="accepted-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                {acceptedLoading ? <SkeletonOrderLoader /> : ""}
                {!acceptedLoading &&
                acceptedOrders &&
                acceptedOrders?.length > 0 ? (
                  acceptedOrders.map((order) => (
                    <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                      <div className="consumer-information p-4">
                        <div className="order-by flex items-center gap-3">
                          <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                            Order By
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="consumer-profile-information flex mt-8">
                          <div className="profile-pic-name flex items-center gap-8">
                            <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                              <img
                                src={order?.serviceOrderBy?.consumerAvatar}
                                alt=""
                                className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                              />
                            </div>
                            <div>
                              <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                                {order?.serviceOrderBy?.consumerFullName}
                              </h1>
                              <div className="">
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                    Email:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerEmail?.toLowerCase()}
                                </h1>
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                    Phone:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerPhoneNumber}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="address flex items-center gap-7">
                          <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                            <h1 className="text-white">Address</h1>
                          </div>
                          <h1 className="mt-3">
                            {order?.serviceOrderBy?.consumerAddress}
                          </h1>
                        </div>
                        <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                        <div className="order-details flex items-center gap-3">
                          <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                            Order Details
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="order-details-container relative">
                          <div className="flex gap-3 items-center name">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                              <h1 className="text-black text-xs">
                                Service Name
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.serviceName}</h1>
                          </div>
                          <div className="flex gap-3 items-center message">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs inline-block">
                                Service message
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.servicePostMessage}</h1>
                          </div>
                          <div className="flex gap-3 items-center schedule mt-4">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs">
                                Delivery Date
                              </h1>
                            </div>
                            <h1>{order?.orderDeliverySchedule}</h1>
                          </div>
                          <div className="flex gap-3 items-center name absolute right-0 top-0">
                            <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                              <h1 className="text-white text-xs">
                                {"$ " + order?.servicePost?.servicePostPrice}
                              </h1>
                            </div>
                          </div>
                        </div>
                        {completeOrderLoading || cancelOrderLoading ? (
                          <div className="btns flex gap-3 justify-center mt-8 mb-5">
                            <div className="bg-[#ee0d05] text-white py-2 px-8 rounded-lg shadow-lg w-full flex justify-center items-center">
                              <LoaderCircles />
                            </div>
                            <div className="bg-[#448d16] text-white py-2 px-8 rounded-lg shadow-lg w-full flex justify-center items-center">
                              <LoaderCircles />
                            </div>
                          </div>
                        ) : (
                          <div className="btns flex gap-3 justify-center mt-8 mb-5">
                            <button
                              className="bg-[#ee0d05] text-white py-2 px-8 rounded-lg shadow-lg w-full"
                              onClick={() => cancelOrder(order?._id)}
                            >
                              Cancel?
                            </button>
                            <button
                              className="bg-[#448d16] text-white py-2 px-8 rounded-lg shadow-lg w-full"
                              onClick={() => completeOrder(order?._id)}
                            >
                              Complete?
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1>No order is accepted yet!</h1>
                  </div>
                )}
              </div>
            )}
            {isShowing === 4 && (
              <div className="rejected-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                {rejectedLoading ? <SkeletonOrderLoader /> : ""}
                {!rejectedLoading &&
                rejectedOrders &&
                rejectedOrders?.length > 0 ? (
                  rejectedOrders.map((order) => (
                    <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                      <div className="consumer-information p-4">
                        <div className="order-by flex items-center gap-3">
                          <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                            Order By
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="consumer-profile-information flex mt-8">
                          <div className="profile-pic-name flex items-center gap-8">
                            <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                              <img
                                src={order?.serviceOrderBy?.consumerAvatar}
                                alt=""
                                className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                              />
                            </div>
                            <div>
                              <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                                {order?.serviceOrderBy?.consumerFullName}
                              </h1>
                              <div className="">
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                    Email:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerEmail?.toLowerCase()}
                                </h1>
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                    Phone:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerPhoneNumber}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="address flex items-center gap-7">
                          <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                            <h1 className="text-white">Address</h1>
                          </div>
                          <h1 className="mt-3">
                            {order?.serviceOrderBy?.consumerAddress}
                          </h1>
                        </div>
                        <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                        <div className="order-details flex items-center gap-3">
                          <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                            Order Details
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="order-details-container relative">
                          <div className="flex gap-3 items-center name">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                              <h1 className="text-black text-xs">
                                Service Name
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.serviceName}</h1>
                          </div>
                          <div className="flex gap-3 items-center message">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs inline-block">
                                Service message
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.servicePostMessage}</h1>
                          </div>
                          <div className="flex gap-3 items-center schedule mt-4">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs">
                                Delivery Date
                              </h1>
                            </div>
                            <h1>{order?.orderDeliverySchedule}</h1>
                          </div>
                          <div className="flex gap-3 items-center name absolute right-0 top-0">
                            <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                              <h1 className="text-white text-xs">
                                {"$ " + order?.servicePost?.servicePostPrice}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <div className="btns flex gap-3 justify-center mt-8 mb-5">
                          <div className="bg-[#f31010] text-white py-2 px-8 rounded-lg shadow-lg w-full flex justify-center items-center">
                            Rejected
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1>No order is rejected yet!</h1>
                  </div>
                )}
              </div>
            )}
            {isShowing === 5 && (
              <div className="cancelled-container w-11/12 lg:w-8/12 xl:w-4/12 my-10">
                {cancelledLoading ? <SkeletonOrderLoader /> : ""}
                {!cancelledLoading &&
                cancelledOrders &&
                cancelledOrders?.length > 0 ? (
                  cancelledOrders.map((order) => (
                    <div className="order w-full card shadow-xl bg-[#dadada] rounded-xl my-8">
                      <div className="consumer-information p-4">
                        <div className="order-by flex items-center gap-3">
                          <h1 className="p-2 bg-white text-xs rounded-2xl text-black basis-[34%] lg:basis-[24%] xl:basis-[14%] text-center">
                            Order By
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="consumer-profile-information flex mt-8">
                          <div className="profile-pic-name flex items-center gap-8">
                            <div className=" p-[2px] border-[1px] border-slate-600 rounded-full">
                              <img
                                src={order?.serviceOrderBy?.consumerAvatar}
                                alt=""
                                className="w-10 h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 rounded-full"
                              />
                            </div>
                            <div>
                              <h1 className="xl:text-2xl lg:text-xl font-bold font-serif text-[#4e97fd]">
                                {order?.serviceOrderBy?.consumerFullName}
                              </h1>
                              <div className="">
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-sm xl:text-lg lg:text-sm">
                                    Email:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerEmail?.toLowerCase()}
                                </h1>
                                <h1 className="text-xs xl:text-lg lg:text-sm">
                                  <span className="font-semibold text-xs xl:text-lg lg:text-sm">
                                    Phone:
                                  </span>{" "}
                                  {order?.serviceOrderBy?.consumerPhoneNumber}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="address flex items-center gap-7">
                          <div className="bg-slate-600 inline-block py-1 px-4 rounded-2xl mt-4">
                            <h1 className="text-white">Address</h1>
                          </div>
                          <h1 className="mt-3">
                            {order?.serviceOrderBy?.consumerAddress}
                          </h1>
                        </div>
                        <div className="line w-[100%] h-[1px] bg-white my-4"></div>
                        <div className="order-details flex items-center gap-3">
                          <h1 className="p-2 bg-green-400 text-xs rounded-lg text-white basis-[40%] lg:basis-[30%] xl:basis-[20%] text-center">
                            Order Details
                          </h1>
                          <div className="line h-[1px] bg-slate-700 basis-[80%]"></div>
                        </div>
                        <div className="order-details-container relative">
                          <div className="flex gap-3 items-center name">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg my-4">
                              <h1 className="text-black text-xs">
                                Service Name
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.serviceName}</h1>
                          </div>
                          <div className="flex gap-3 items-center message">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs inline-block">
                                Service message
                              </h1>
                            </div>
                            <h1>{order?.servicePost?.servicePostMessage}</h1>
                          </div>
                          <div className="flex gap-3 items-center schedule mt-4">
                            <div className="order-name bg-white inline-block py-2 px-4 rounded-lg">
                              <h1 className="text-black text-xs">
                                Delivery Date
                              </h1>
                            </div>
                            <h1>{order?.orderDeliverySchedule}</h1>
                          </div>
                          <div className="flex gap-3 items-center name absolute right-0 top-0">
                            <div className="order-name bg-[#4e97fd] inline-block py-2 px-4 rounded-lg my-4 shadow-lg">
                              <h1 className="text-white text-xs">
                                {"$ " + order?.servicePost?.servicePostPrice}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <div className="btns flex gap-3 justify-center mt-8 mb-5">
                          <div className="bg-[#b61604] text-white py-2 px-8 rounded-lg shadow-lg w-full flex justify-center items-center">
                            Cancelled
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1>No order is cancelled yet</h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <ServiceProviderFooter />
        </div>
      </div>
    </>
  );
};

export default ServiceProviderOrder;
