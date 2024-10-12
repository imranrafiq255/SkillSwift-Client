import React, { useEffect, useRef, useState } from "react";
import { FaComments } from "react-icons/fa";
import "./ConsumerChatModule.css";
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
import Navbar from "../ConsumerCommon/Navbar.jsx";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage";
const ConsumerChatModule = () => {
  const [chatSectionShowing, setChatSectionShowing] = useState(false);
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
      dispatch(clearErrors());
      console.log(conversationsError);
    }
  }, [conversationsLoading, conversationsError, dispatch]);
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
            receiver: {
              createdAt: currentConversation?.members?.receiver?.createdAt,
              serviceProviderFullName:
                currentConversation?.members?.receiver?.serviceProviderFullName,
              serviceProviderEmail:
                currentConversation?.members?.receiver?.serviceProviderEmail,
              serviceProviderAvatar:
                currentConversation?.members?.receiver?.serviceProviderAvatar,
              serviceProviderAddress:
                currentConversation?.members?.receiver?.serviceProviderAddress,
              isEmailVerified:
                currentConversation?.members?.receiver?.isEmailVerified,
              updatedAt: currentConversation?.members?.receiver?.updatedAt,
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
        receiverId: currentConversation?.members?.receiver?._id,
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
    if (!conversationsLoading && conversations?.length > 0) {
      setCurrentConversation(conversations[0]);
    }
  }, [conversationsLoading, conversations]);

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
  useEffect(() => {
    scrollToEndMessage?.current?.scrollIntoView();
  }, [allMessages]);
  console.log(conversations);

  return (
    <>
      <Navbar />
      <div className="chat-section-container">
        {conversations && conversations.length === 0 ? (
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
          <div className="bottom-section-container w-full flex justify-center bg-[#f6f9fc] h-screen">
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
                                conversation?.members?.receiver
                                  ?.serviceProviderAvatar
                              }
                              alt=""
                              className="w-[0.5rem] h-[0.5rem] lg:h-[1rem] lg:w-[1rem] xl:h-[3rem] xl:w-[3rem] rounded-full"
                            />
                          </div>
                          <div className="name basis-[60%] lg:basis-[50%] xl:basis-[80%]">
                            <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-2">
                              {
                                conversation?.members?.receiver
                                  ?.serviceProviderFullName
                              }
                            </h1>
                            <h1 className="message ml-2 truncate-text text-sm">
                              {checkOnlineConsumer(
                                conversation?.members?.receiver?._id
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
                              currentConversation?.members?.receiver
                                ?.serviceProviderAvatar
                            }
                            alt=""
                            className="w-[3rem] h-[3rem] rounded-full shadow-2xl"
                          />
                          <div
                            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ml-4 w-3 h-3 rounded-full ${
                              checkOnlineConsumer(
                                currentConversation?.members?.receiver?._id
                              )
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                        </div>
                        <div className="profile basis-[70%] lg:basis-[80%] xl:basis-[90%] ml-3">
                          <h1 className="font-semibold">
                            {
                              currentConversation?.members?.receiver
                                ?.serviceProviderFullName
                            }
                          </h1>
                          <h1 className="text-sm text-[#878787]">
                            {checkOnlineConsumer(
                              currentConversation?.members?.receiver?._id
                            )
                              ? "Online"
                              : "Offline"}
                          </h1>
                        </div>
                      </div>
                      <div className="top w-full flex-1 relative overflow-hidden">
                        <div className="chat-messages pt-6 flex flex-col h-full overflow-auto">
                          {loadMessagesLoading ? (
                            <div className="flex justify-center items-center h-full">
                              <h1 className="text-lg">
                                <RingLoader />
                              </h1>
                            </div>
                          ) : allMessages && allMessages.length > 0 ? (
                            allMessages.map((message) => (
                              <div key={message._id}>
                                {message.sender?._id === consumer?._id ? (
                                  <div className="mb-4 flex justify-end pr-2 w-full">
                                    <div className="bg-blue-500 mt-2 pb-1 px-2 rounded-lg shadow-md max-w-xs lg:max-w-md">
                                      <p className="text-white mt-1">
                                        {message?.message}
                                      </p>
                                    </div>
                                    <img
                                      src={message?.sender?.consumerAvatar}
                                      alt=""
                                      className="w-8 h-8 rounded-full shadow-md mx-2 border-2 border-blue-500"
                                    />
                                  </div>
                                ) : (
                                  <div className="mb-4 flex pl-2 w-full">
                                    <img
                                      src={
                                        message?.conversation?.members?.receiver
                                          ?.serviceProviderAvatar
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
                      </div>{" "}
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
                                  conversation?.members?.receiver
                                    ?.serviceProviderAvatar
                                }
                                alt=""
                                className="w-[3rem] h-[3rem] rounded-full"
                              />
                            </div>
                            <div className="name w-9/12">
                              <h1 className="xl:text-lg lg:text-sm text-xs font-bold mx-2 mt-4">
                                {
                                  conversation?.members?.receiver
                                    ?.serviceProviderFullName
                                }
                              </h1>
                              <h1 className="message ml-2 truncate-text-2 text-sm">
                                {checkOnlineConsumer(
                                  conversation?.members?.receiver?._id
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

export default ConsumerChatModule;
