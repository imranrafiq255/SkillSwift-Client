import React, { useEffect, useRef, useState } from "react";
import "./ConsumerChatModule.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadConversationsAction,
  loadCurrentConsumerAction,
  loadMessagesAction,
  sendMessageAction,
} from "../../Redux/Consumer/Actions/ConsumerActions.js";
import RingLoader from "../../Loader/RingLoader";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage";
const ConsumerChatModule = () => {
  const [chatSectionShowing, setChatSectionShowing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [activeConsumers, setActiveConsumers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const scrollToEndMessage = useRef(null);
  const { consumer } = useSelector((state) => state.loadCurrentConsumerReducer);
  const { conversationsLoading, conversations, conversationsError } =
    useSelector((state) => state.loadConsumerConversationsReducer);
  const { loadMessagesLoading, loadMessagesError, messages } = useSelector(
    (state) => state.loadConsumerMessagesReducer
  );
  const { sendMessageLoading, sendMessageError } = useSelector(
    (state) => state.sendConsumerMessageReducer
  );
  const [currentConversation, setCurrentConversation] = useState(null);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(loadCurrentConsumerAction());
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
    let isMounted = true;

    if (socket && consumer) {
      if (isMounted) {
        socket.emit("addUser", { id: consumer?._id });

        const handleGetServiceProviders = (data) => {
          setActiveConsumers(data);
        };
        socket.on("getUsers", handleGetServiceProviders);

        return () => {
          socket.off("getUsers", handleGetServiceProviders);
          isMounted = false;
        };
      }
    }
  }, [consumer, socket]);
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
  const checkOnlineConsumer = (id) => {
    const onlineServiceProviders = activeConsumers.filter(
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
          createdAt: currentConversation?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          members: {
            receiver: {
              createdAt: consumer?.createdAt,
              isEmailVerified: consumer?.isEmailVerified,
              consumerFullName: consumer?.consumerFullName,
              consumerEmail: consumer?.consumerEmail,
              consumerAvatar: consumer?.consumerAvatar,
              consumerAddress: consumer?.consumerAddress,
              consumerPhoneNumber: consumer?.consumerPhoneNumber,
              updatedAt: consumer?.updatedAt,
              _id: consumer?._id,
            },
            sender: {
              createdAt: currentConversation?.members?.sender?.createdAt,
              serviceProviderFullName:
                currentConversation?.members?.sender?.serviceProviderFullName,
              serviceProviderEmail:
                currentConversation?.members?.sender?.serviceProviderEmail,
              serviceProviderAvatar:
                currentConversation?.members?.sender?.serviceProviderAvatar,
              serviceProviderAddress:
                currentConversation?.members?.sender?.serviceProviderAddress,
              isEmailVerified:
                currentConversation?.members?.sender?.isEmailVerified,
              updatedAt: currentConversation?.members?.sender?.updatedAt,
              _id: currentConversation?.members?.receiver?._id,
            },
          },
        },
        sender: {
          createdAt: consumer?.createdAt,
          isEmailVerified: consumer?.isEmailVerified,
          consumerFullName: consumer?.consumerFullName,
          consumerEmail: consumer?.consumerEmail,
          consumerAvatar: consumer?.consumerAvatar,
          consumerAddress: consumer?.consumerAddress,
          consumerPhoneNumber: consumer?.consumerPhoneNumber,
          updatedAt: consumer?.updatedAt,
          _id: consumer?._id,
        },
        senderType: "Consumer",
        memberTypeSender: "Consumer",
        memberTypeReceiver: "ServiceProvider",
        createdAt: new Date().toISOString(),
      };

      socket.emit("sendMessage", {
        message: newMessage,
        senderId: consumer?._id,
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
  const timeConverter = (time) => {
    const a = new Date(time);
    const now = new Date();
    const diff = now.getTime() - a.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else if (seconds > 0) {
      return `${seconds} seconds ago`;
    }
  };
  const handleEnterKeyBtn = (e) => {
    if (messageToSend) {
      if (e.key === "Enter") {
        sendMessage();
      }
    }
  };
  useEffect(() => {
    scrollToEndMessage?.current?.scrollIntoView();
  }, [allMessages]);
  console.log(currentConversation?.members?.sender?._id);

  return (
    <>
      <div className="chat-section-container">
        <div className="top-border h-20 w-full bg-[#dadada] flex justify-center items-center">
          <div className="lg:w-[80%] xl:w-[60%] flex items-center gap-8 xl:gap-5 lg:gap-10">
            <img
              src={require("../../../Assets/left-arrow.png")}
              alt=""
              className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            />
            <h1 className="text-lg lg:text-lg xl:text-2xl font-bold text-[#4e97fd] uppercase">
              Consumer Chat Section
            </h1>
          </div>
        </div>
        {conversations && conversations.length === 0 ? (
          <div className="flex justify-center">
            <h1>No conversation available</h1>
          </div>
        ) : (
          <div className="bottom-section-container w-full flex justify-center py-5 bg-[#f6f9fc] h-screen">
            <div className="bottom-section w-full lg:w-11/12 xl:w-10/12">
              <div className="flex justify-between items-center px-3">
                <h1 className=" w-text-sm ml-1 xl:ml-0 lg:text-lg xl:text-xl font-light">
                  All messages
                </h1>
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
                <div className="left-chat-section w-3/12 border-2 border-slate-300 rounded-lg h-[50rem] lg:block hidden">
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
                                conversation?.members?.sender
                                  ?.serviceProviderAvatar
                              }
                              alt=""
                              className="w-[0.5rem] h-[0.5rem] lg:h-[1rem] lg:w-[1rem] xl:h-[3rem] xl:w-[3rem] rounded-full"
                            />
                          </div>
                          <div className="name basis-[60%] lg:basis-[50%] xl:basis-[80%]">
                            <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-2">
                              {
                                conversation?.members?.sender
                                  ?.serviceProviderFullName
                              }
                            </h1>
                            <h1 className="message ml-2 truncate-text text-sm">
                              hey dear i am using skillswift the thing is
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
                  <div className="right-chat-section w-full xl:w-9/12 h-[35rem] lg:h-[40rem] xl:h-[50rem] lg:p-0 p-4 bg-[#f6f9fc]">
                    <div className="">
                      <div className="top w-full h-[45rem] border-2 border-slate-300 rounded-lg relative overflow-scroll vanish-scroll-bar">
                        <div className="top-user-name flex items-center sticky top-0 left-0 w-full h-[4rem] bg-white rounded-tl-[5px] rounded-tr-[5px] shadow-md">
                          <div className="profile basis-[30%] lg:basis-[20%] xl:basis-[10%] flex justify-center">
                            <img
                              src={
                                currentConversation?.members?.sender
                                  ?.serviceProviderAvatar
                              }
                              alt=""
                              className="w-[3rem] h-[3rem] rounded-full shadow-2xl"
                            />
                          </div>
                          <div className="profile basis-[70%] lg:basis-[80%] xl:basis-[90%] -ml-3">
                            <h1 className="font-semibold">
                              {
                                currentConversation?.members?.sender
                                  ?.serviceProviderFullName
                              }
                            </h1>
                            <h1 className="text-sm text-[#878787]">
                              {checkOnlineConsumer(
                                currentConversation?.members?.sender?._id
                              )
                                ? "Online"
                                : "Offline"}
                            </h1>
                          </div>
                        </div>
                        <div className="chat-messages mt-[4rem] flex flex-col">
                          {loadMessagesLoading ? (
                            <div className="flex justify-center items-center">
                              {
                                <h1 className="text-lg">
                                  <RingLoader />
                                </h1>
                              }
                            </div>
                          ) : allMessages && allMessages.length > 0 ? (
                            allMessages?.map((message) => (
                              <div>
                                {message.sender?._id === consumer?._id ? (
                                  <div className="mb-4 flex items-end justify-end mr-2 w-full px-2">
                                    <div className=" p-4 rounded-lg bg-[#4e97fd]  shadow-md max-w-xs lg:max-w-md">
                                      <div className="flex gap-2 items-center">
                                        <img
                                          src={message?.sender?.consumerAvatar}
                                          alt=""
                                          className="w-8 h-8 rounded-full"
                                        />
                                        <p className="text-gray-900 font-medium">
                                          {message?.sender?.consumerFullName}
                                        </p>
                                      </div>
                                      <p className="text-white mt-1">
                                        {message?.message}
                                      </p>
                                      <span className="text-xs text-gray-500 mt-2 block text-right">
                                        {timeConverter(message?.createdAt) ||
                                          "just now"}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="mb-4 flex items-end pl-2 w-full">
                                    <div className="bg-green-400 p-4 rounded-lg shadow-md max-w-xs lg:max-w-md">
                                      <div className="flex gap-2 items-center">
                                        <img
                                          src={
                                            message?.conversation?.members
                                              ?.sender?.serviceProviderAvatar
                                          }
                                          alt=""
                                          className="w-8 h-8 rounded-full"
                                        />
                                        <p className="text-gray-900 font-medium">
                                          {
                                            message?.conversation?.members
                                              ?.sender?.serviceProviderFullName
                                          }
                                        </p>
                                      </div>
                                      <p className="text-white mt-1">
                                        {message?.message}
                                      </p>
                                      <span className="text-xs text-gray-500 mt-2 block text-right">
                                        {timeConverter(message?.createdAt)}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div>
                              <h1>No chat available</h1>
                            </div>
                          )}
                          <div ref={scrollToEndMessage}></div>
                        </div>
                      </div>
                      <div className="bottom w-full h-[4rem]  mt-[1rem] relative">
                        <input
                          type="text"
                          onChange={(e) => setMessageToSend(e.target.value)}
                          value={messageToSend}
                          className="border-2 border-slate-300 rounded-2xl w-full h-full outline-none lg:text-[1.5rem] pl-4 pr-20"
                          placeholder="Enter what's in your mind..."
                        />
                        {messageToSend && (
                          <img
                            src={require("../../../Assets/submit.png")}
                            alt=""
                            className="w-9 h-9 lg:w-10 lg:h-10 absolute top-4 right-7 lg:top-3 lg:right-5 cursor-pointer"
                            onClick={() => sendMessage()}
                            onKeyDown={handleEnterKeyBtn}
                          />
                        )}
                      </div>
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
                            onClick={() => setCurrentConversation(conversation)}
                          >
                            <div className="profile w-3/12 flex justify-center items-center ">
                              <img
                                src={
                                  conversation?.members?.receiver
                                    ?.consumerAvatar
                                }
                                alt=""
                                className="w-[3rem] h-[3rem] rounded-full"
                              />
                            </div>
                            <div className="name w-9/12">
                              <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                                {
                                  conversation?.members?.receiver
                                    ?.consumerFullName
                                }
                              </h1>
                              <h1 className="message ml-2 truncate-text-2 text-sm">
                                hey dear i am using skillswift the thing is
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

export default ConsumerChatModule;
