import React, { useEffect, useRef, useState } from "react";
import { FaComments } from "react-icons/fa";
import "./ServiceProviderChatSection.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadConversationsAction,
  loadCurrentServiceProviderAction,
  loadMessagesAction,
  sendMessageAction,
} from "../../Redux/ServiceProvider/Actions/ServiceProviderActions";
import RingLoader from "../../Loader/RingLoader";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage";
const ServiceProviderChatSection = () => {
  const [chatSectionShowing, setChatSectionShowing] = useState(false);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [activeServiceProviders, setActiveServiceProviders] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const scrollToEndMessage = useRef(null);
  const { serviceProvider, serviceProviderLoading } = useSelector(
    (state) => state.loadCurrentServiceProviderReducer
  );
  const { conversationsLoading, conversations, conversationsError } =
    useSelector((state) => state.loadConversationsReducer);
  const { loadMessagesLoading, loadMessagesError, messages } = useSelector(
    (state) => state.loadMessagesReducer
  );
  const { sendMessageLoading, sendMessageError } = useSelector(
    (state) => state.sendMessageReducer
  );
  const [currentConversation, setCurrentConversation] = useState(null);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadCurrentServiceProviderAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadConversationsAction());
  }, [dispatch]);
  useEffect(() => {
    if (!conversationsLoading && conversationsError) {
      console.log(conversationsError);
    }
  }, [conversationsLoading, conversationsError]);
  useEffect(() => {
    if (!conversationsLoading && conversations) {
      setCurrentConversation(conversations[0]);
    }
  }, [conversationsLoading, conversations]);

  useEffect(() => {
    const socket1 = io("http://localhost:8081");
    setSocket(socket1);
    return () => {
      socket1.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket && !serviceProviderLoading && serviceProvider) {
      socket.emit("addUser", { id: serviceProvider._id });
      const handleGetServiceProviders = (data) => {
        setActiveServiceProviders(data);
      };
      socket.on("getUsers", handleGetServiceProviders);

      return () => {
        socket.off("getUsers", handleGetServiceProviders);
      };
    }
  }, [serviceProviderLoading, serviceProvider, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("receivedMessage", ({ message }) => {
        setAllMessages((prevMessages) => [...prevMessages, message]);
      });
      return () => {
        socket.off("receivedMessage");
      };
    }
  }, [socket]);

  const checkOnlineServiceProvider = (id) => {
    const onlineServiceProviders = activeServiceProviders.filter(
      (provider) => provider.id === id
    );
    return onlineServiceProviders.length > 0;
  };
  const sendMessage = () => {
    if (messageToSend) {
      const newMessage = {
        message: messageToSend,
        conversation: {
          _id: currentConversation?._id || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          members: {
            receiver: {
              serviceProviderFullName: serviceProvider.serviceProviderFullName,
              serviceProviderEmail: serviceProvider.serviceProviderEmail,
              serviceProviderAvatar: serviceProvider.serviceProviderAvatar,
              serviceProviderAddress: serviceProvider.serviceProviderAddress,
              serviceProviderPhoneNumber:
                serviceProvider.serviceProviderPhoneNumber,
              isAccountVerified: serviceProvider.isAccountVerified,
              isEmailVerified: serviceProvider.isEmailVerified,
              serviceProviderListedServices:
                serviceProvider.serviceProviderListedServices,
              serviceProviderWorkingHours:
                serviceProvider.serviceProviderWorkingHours,
              createdAt: serviceProvider.createdAt,
              updatedAt: serviceProvider.updatedAt,
              _id: serviceProvider._id,
            },
            sender: {
              consumerFullName:
                currentConversation?.members?.sender?.consumerFullName,
              consumerEmail:
                currentConversation?.members?.sender?.consumerEmail,
              consumerAvatar:
                currentConversation?.members?.sender?.consumerAvatar,
              consumerAddress:
                currentConversation?.members?.sender?.consumerAddress,
              consumerFavoriteServicePosts:
                currentConversation?.members?.sender
                  ?.consumerFavoriteServicePosts,
              consumerOrders:
                currentConversation?.members?.sender?.consumerOrders,
              isEmailVerified:
                currentConversation?.members?.sender?.isEmailVerified,
              createdAt: currentConversation?.members?.sender?.createdAt,
              updatedAt: currentConversation?.members?.sender?.updatedAt,
              _id: currentConversation?.members?.sender?._id,
            },
          },
        },
        sender: {
          serviceProviderFullName: serviceProvider.serviceProviderFullName,
          serviceProviderEmail: serviceProvider.serviceProviderEmail,
          serviceProviderAvatar: serviceProvider.serviceProviderAvatar,
          serviceProviderAddress: serviceProvider.serviceProviderAddress,
          serviceProviderPhoneNumber:
            serviceProvider.serviceProviderPhoneNumber,
          isAccountVerified: serviceProvider.isAccountVerified,
          isEmailVerified: serviceProvider.isEmailVerified,
          serviceProviderListedServices:
            serviceProvider.serviceProviderListedServices,
          serviceProviderWorkingHours:
            serviceProvider.serviceProviderWorkingHours,
          createdAt: serviceProvider.createdAt,
          updatedAt: serviceProvider.updatedAt,
          _id: serviceProvider._id,
        },
        senderId: serviceProvider._id,
        senderType: "ServiceProvider",
        memberTypeSender: "ServiceProvider",
        memberTypeReceiver: "Consumer",
        createdAt: new Date().toISOString(),
      };

      socket.emit("sendMessage", {
        message: newMessage,
        senderId: serviceProvider?._id,
        receiverId: currentConversation?.members?.sender?._id,
      });

      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      const data = {
        conversationId: currentConversation?._id,
        message: messageToSend,
      };
      dispatch(clearErrors());
      dispatch(sendMessageAction(data));
      setMessageToSend("");
    } else {
      alert("Message is missing");
    }
  };

  useEffect(() => {
    if (currentConversation) {
      dispatch(clearErrors());
      dispatch(loadMessagesAction(currentConversation?._id));
    }
  }, [dispatch, currentConversation]);
  useEffect(() => {
    if (!loadMessagesLoading && loadMessagesError) {
      console.log(loadMessagesError);
    } else if (!loadMessagesLoading && messages) {
      setAllMessages(messages);
    }
  }, [loadMessagesLoading, loadMessagesError, messages]);
  useEffect(() => {
    if (!sendMessageLoading && sendMessageError) {
      handleShowFailureToast(sendMessageError);
    }
  }, [sendMessageLoading, sendMessageError]);
  // const timeConverter = (time) => {
  //   const a = new Date(time);
  //   const now = new Date();
  //   const diff = now.getTime() - a.getTime();
  //   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //   const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  //   if (days > 0) {
  //     return days === 1 ? `${days} day ago` : `${days} days ago`;
  //   } else if (hours > 0) {
  //     return `${hours} hours ago`;
  //   } else if (minutes > 0) {
  //     return `${minutes} minutes ago`;
  //   } else if (seconds > 0) {
  //     return `${seconds} seconds ago`;
  //   }
  // };
  // const handleEnterKeyBtn = (e) => {
  //   if (messageToSend) {
  //     if (e.key === "Enter") {
  //       sendMessage();
  //     }
  //   }
  // };
  useEffect(() => {
    scrollToEndMessage?.current?.scrollIntoView();
  }, [allMessages]);
  return (
    <>
      <div className="chat-section-container">
        {conversations && conversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="bg-blue-100 p-6 rounded-full">
              <FaComments className="text-blue-500 text-6xl" />
            </div>
            <h1 className="text-blue-600 text-2xl font-semibold mt-4">
              No Conversations Available
            </h1>
            <p className="text-blue-500 mt-2">
              It looks like you have no active conversations. Start a new one or
              check back later!
            </p>
          </div>
        ) : (
          <div className="bottom-section-container w-full flex justify-center py-5 bg-[#f6f9fc] h-screen">
            <div className="bottom-section w-full lg:w-11/12 xl:w-10/12">
              <div className="flex justify-between items-center px-3">
                <div
                  className="flex items-center gap-2 lg:hidden"
                  onClick={() => setChatSectionShowing(!chatSectionShowing)}
                >
                  <h1 className="font-light">Chats</h1>
                  <img
                    src={require("../../../Assets/down-arrow.png")}
                    alt=""
                    className={`${
                      chatSectionShowing
                        ? "rotate-180 transition-transform duration-700 ease-in-out"
                        : "rotate-0 transition-transform duration-700 ease-in-out"
                    } w-4 h-4`}
                  />
                </div>
              </div>
              <div className="w-full flex gap-4 mt-4 relative">
                <div className="left-chat-section w-4/12 border-2 border-slate-300 rounded-lg lg:block hidden">
                  <div className="chat-container flex flex-col items-center py-5">
                    {conversationsLoading ? (
                      <div className="flex justify-center">
                        <h1 className="text-lg">Loading...</h1>
                      </div>
                    ) : conversations && conversations.length > 0 ? (
                      conversations.map((conversation) => (
                        <div
                          className={`${
                            conversation?._id === currentConversation?._id
                              ? "bg-[#E5EFFC]"
                              : ""
                          } chat w-[90%] h-[4rem] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden`}
                          onClick={() => setCurrentConversation(conversation)}
                        >
                          <div className="profile basis-[60%] lg:basis-[50%] xl:basis-[20%] flex justify-center items-center">
                            <img
                              src={
                                conversation?.members?.sender?.consumerAvatar
                              }
                              alt=""
                              className="w-[0.5rem] h-[0.5rem] lg:h-[1rem] lg:w-[1rem] xl:h-[3rem] xl:w-[3rem] rounded-full"
                            />
                          </div>
                          <div className="name basis-[60%] lg:basis-[50%] xl:basis-[80%]">
                            <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-2">
                              {conversation?.members?.sender?.consumerFullName}
                            </h1>
                            <h1 className="message ml-2 truncate-text text-sm">
                              {checkOnlineServiceProvider(
                                conversation?.members?.sender?._id
                              )
                                ? "Online"
                                : "Offline"}
                            </h1>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <h1>No chat available</h1>
                      </div>
                    )}
                  </div>
                </div>
                {currentConversation && (
                  <div className="right-chat-section w-full xl:w-9/12 h-[calc(100vh-5rem)] lg:p-0 p-4 bg-[#f6f9fc] flex flex-col">
                    <div className="flex-1 relative border-2 border-slate-300 rounded-lg ">
                      <div className="top-user-name flex items-center sticky top-0 left-0 w-full h-[4rem] bg-white rounded-tl-[5px] rounded-tr-[5px] shadow-md">
                        <div className="profile basis-[30%] lg:basis-[20%] xl:basis-[10%] flex justify-center relative">
                          <img
                            src={
                              currentConversation?.members?.sender
                                ?.consumerAvatar
                            }
                            alt=""
                            className="w-[3rem] h-[3rem] rounded-full shadow-2xl"
                          />
                          <div
                            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ml-4 w-3 h-3 rounded-full ${
                              checkOnlineServiceProvider(
                                currentConversation?.members?.sender?._id
                              )
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                        </div>
                        <div className="profile basis-[70%] lg:basis-[80%] xl:basis-[90%] ml-3">
                          <h1 className="font-semibold">
                            {
                              currentConversation?.members?.sender
                                ?.consumerFullName
                            }
                          </h1>
                          <h1 className="text-sm text-[#878787]">
                            {checkOnlineServiceProvider(
                              currentConversation?.members?.sender?._id
                            )
                              ? "Online"
                              : "Offline"}
                          </h1>
                        </div>
                      </div>
                      <div className="top w-full flex-1 relative overflow-hidden">
                        <div className="chat-messages pt-6 mt-[1rem] flex flex-col h-full overflow-auto">
                          {loadMessagesLoading ? (
                            <div className="flex justify-center items-center h-full">
                              <h1 className="text-lg">
                                <RingLoader />
                              </h1>
                            </div>
                          ) : allMessages && allMessages.length > 0 ? (
                            allMessages.map((message) => (
                              <div key={message._id}>
                                {message.sender?._id ===
                                serviceProvider?._id ? (
                                  <div className="mb-4 flex justify-end pr-2 w-full">
                                    <div className="bg-blue-500 mt-2 pb-1 px-2 rounded-lg shadow-md max-w-xs lg:max-w-md">
                                      <p className="text-white mt-1">
                                        {message?.message}
                                      </p>
                                    </div>
                                    <img
                                      src={
                                        message?.sender?.serviceProviderAvatar
                                      }
                                      alt=""
                                      className="w-8 h-8 rounded-full shadow-md mx-2 border-2 border-blue-500"
                                    />
                                  </div>
                                ) : (
                                  <div className="mb-4 flex pl-2 w-full">
                                    <img
                                      src={
                                        message?.conversation?.members?.sender
                                          ?.consumerAvatar
                                      }
                                      alt=""
                                      className="w-8 h-8 rounded-full shadow-md mx-2 border-2 border-gray-500"
                                    />
                                    <div className="bg-gray-300 mt-2 pb-1 px-2 rounded-lg shadow-md max-w-xs lg:max-w-md">
                                      <p className="text-black mt-1">
                                        {message?.message}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="flex justify-center items-center h-full">
                              <h1>No chat available</h1>
                            </div>
                          )}
                          <div ref={scrollToEndMessage}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bottom w-full h-12 mt-4 relative">
                      <input
                        type="text"
                        onChange={(e) => setMessageToSend(e.target.value)}
                        value={messageToSend}
                        className="border border-gray-300 rounded-lg w-full h-full outline-none px-4 text-sm lg:text-base placeholder-gray-500"
                        placeholder="Type your message..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendMessage();
                          }
                        }}
                      />
                      {messageToSend && (
                        <button
                          className="absolute inset-y-0 right-3 flex items-center justify-center"
                          onClick={() => sendMessage()}
                        >
                          <img
                            src={require("../../../Assets/submit.png")}
                            alt="Send"
                            className="w-6 h-6 lg:w-8 lg:h-8"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {chatSectionShowing && (
                  <div className="absolute top-0 right-2 w-8/12 bg-slate-300 h-[40rem] xl:hidden rounded-xl overflow-scroll">
                    <div className="chat-container flex flex-col items-center py-5 ">
                      {conversationsLoading ? (
                        <div>Loading</div>
                      ) : conversations && conversations.length > 0 ? (
                        conversations.map((conversation) => (
                          <div
                            className={`${
                              conversation?._id === currentConversation?._id
                                ? "bg-[#E5EFFC]"
                                : ""
                            } chat w-[90%] h-[4rem] flex rounded-lg mb-3 cursor-pointer overflow-x-hidden`}
                            onClick={() => {
                              setCurrentConversation(conversation);
                              setChatSectionShowing(false);
                            }}
                          >
                            <div className="profile w-3/12 flex justify-center items-center ">
                              <img
                                src={
                                  conversation?.members?.sender?.consumerAvatar
                                }
                                alt=""
                                className="w-[3rem] h-[3rem] rounded-full"
                              />
                            </div>
                            <div className="name w-9/12">
                              <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                                {
                                  conversation?.members?.sender
                                    ?.consumerFullName
                                }
                              </h1>
                              <h1 className="message ml-2 truncate-text-2 text-sm">
                                {checkOnlineServiceProvider(
                                  conversation?.members?.sender?._id
                                )
                                  ? "Online"
                                  : "Offline"}
                              </h1>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>
                          <h1>No chat available</h1>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceProviderChatSection;
