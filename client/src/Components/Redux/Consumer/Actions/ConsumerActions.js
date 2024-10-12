import axios from "axios";
const clearErrors = () => (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS",
  });
};
const consumerLoginAction = (consumerData) => async (dispatch) => {
  try {
    dispatch({
      type: "CONSUMER_LOADING",
    });
    const response = await axios
      .post("/api/v1/consumer/sign-in", consumerData)
      .then();
    dispatch({
      type: "CONSUMER_MESSAGE",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CONSUMER_ERROR",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const consumerForgotPasswordLinkAction = (consumerData) => async (dispatch) => {
  try {
    dispatch({
      type: "CONSUMER_FORGOT_PASSWORD_LINK_REQUEST",
    });
    const response = await axios.post(
      "/api/v1/consumer/send-reset-password-email",
      consumerData
    );
    dispatch({
      type: "CONSUMER_FORGOT_PASSWORD_LINK_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CONSUMER_FORGOT_PASSWORD_LINK_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const consumerResetPasswordAction =
  (consumerData, token) => async (dispatch) => {
    try {
      dispatch({
        type: "CONSUMER_RESET_PASSWORD_REQUEST",
      });
      const response = await axios.put(
        `/api/v1/consumer/reset-password/${token}`,
        consumerData
      );
      dispatch({
        type: "CONSUMER_RESET_PASSWORD_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "CONSUMER_RESET_PASSWORD_FAILURE",
        payload: error?.response?.data?.message || "Network error",
      });
    }
  };
const consumerSignUpAction = (consumerData) => async (dispatch) => {
  try {
    dispatch({
      type: "CONSUMER_SIGN_UP_REQUEST",
    });
    const response = await axios.post("/api/v1/consumer/sign-up", consumerData);
    dispatch({
      type: "CONSUMER_SIGN_UP_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CONSUMER_SIGN_UP_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const loadCurrentConsumerAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_CURRENT_CONSUMER_REQUEST",
    });
    const response = await axios.get("/api/v1/consumer/load-current-consumer");
    dispatch({
      type: "LOAD_CURRENT_CONSUMER_SUCCESS",
      payload: response?.data?.consumer,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CURRENT_CONSUMER_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const consumerUploadInfoAction = (consumerData) => async (dispatch) => {
  try {
    dispatch({
      type: "CONSUMER_UPLOAD_INFO_REQUEST",
    });
    console.log("there");
    const response = await axios.post(
      "/api/v1/consumer/avatar-phone-upload",
      consumerData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data.message);
    dispatch({
      type: "CONSUMER_UPLOAD_INFO_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CONSUMER_UPLOAD_INFO_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const loadPopularPostsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_POPULAR_POSTS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/consumer/load-popular-service-posts?all=true"
    );
    dispatch({
      type: "LOAD_POPULAR_POSTS_SUCCESS",
      payload: response?.data?.servicePosts,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_POPULAR_POSTS_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const loadNewNotificationsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_NEW_NOTIFICATIONS_REQUEST",
    });
    const response = await axios.get("/api/v1/consumer/load-new-notifications");
    dispatch({
      type: "LOAD_NEW_NOTIFICATIONS_SUCCESS",
      payload: response?.data?.notifications,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_NEW_NOTIFICATIONS_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const readNotificationAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "READ_NOTIFICATION_REQUEST",
    });
    const response = await axios.get(
      `/api/v1/consumer/read-notification/${id}`
    );
    dispatch({
      type: "READ_NOTIFICATION_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "READ_NOTIFICATION_FAILURE",
      payload: error?.response?.data?.message,
    });
  }
};
const consumerOrderServiceAction = (serviceData) => async (dispatch) => {
  try {
    dispatch({
      type: "CONSUMER_ORDER_SERVICE_REQUEST",
    });
    const response = await axios.post(
      "/api/v1/consumer/order-service",
      serviceData
    );
    dispatch({
      type: "CONSUMER_ORDER_SERVICE_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CONSUMER_ORDER_SERVICE_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const loadOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_ORDERS_REQUEST",
    });
    const response = await axios.get("/api/v1/consumer/load-orders");
    dispatch({
      type: "LOAD_ORDERS_SUCCESS",
      payload: response?.data?.orders,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_ORDERS_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const consumerRejectOrderAction = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "CONSUMER_REJECT_ORDER_REQUEST",
    });
    const response = await axios.delete(
      `/api/v1/consumer/reject-order/${orderId}`
    );
    dispatch({
      type: "CONSUMER_REJECT_ORDER_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CONSUMER_REJECT_ORDER_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const consumerAddRatingAction = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: "CONSUMER_ADD_RATING_REQUEST",
    });
    const response = await axios.post(
      `/api/v1/consumer/add-rating/${id}`,
      data
    );
    dispatch({
      type: "CONSUMER_ADD_RATING_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CONSUMER_ADD_RATING_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const loadAllDisputesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_ALL_DISPUTES_REQUEST",
    });
    const response = await axios.get("/api/v1/consumer/load-disputes");
    dispatch({
      type: "LOAD_ALL_DISPUTES_SUCCESS",
      payload: response?.data?.disputes,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_ALL_DISPUTES_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const fileDisputeAction = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: "FILE_DISPUTE_REQUEST",
    });
    const response = await axios.post(
      `/api/v1/consumer/file-dispute/${id}`,
      data
    );
    dispatch({
      type: "FILE_DISPUTE_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "FILE_DISPUTE_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const loadRefundsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_REFUNDS_REQUEST",
    });
    const response = await axios.get("/api/v1/consumer/load-refunds");
    dispatch({
      type: "LOAD_REFUNDS_SUCCESS",
      payload: response?.data?.refunds,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_REFUNDS_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const refundAmountRequestAction = (refundData) => async (dispatch) => {
  try {
    dispatch({
      type: "REFUND_AMOUNT_REQUEST",
    });
    const response = await axios.post(
      "/api/v1/consumer/refund-amount-request",
      refundData
    );
    dispatch({
      type: "REFUND_AMOUNT_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "REFUND_AMOUNT_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
// chat
const loadConversationsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_CONVERSATIONS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/consumer/load-consumer-conversations"
    );
    dispatch({
      type: "LOAD_CONVERSATIONS_SUCCESS",
      payload: response?.data?.conversations,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CONVERSATIONS_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const loadMessagesAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_MESSAGES_REQUEST",
    });
    const response = await axios.get(`/api/v1/consumer/load-messages/${id}`);
    dispatch({
      type: "LOAD_MESSAGES_SUCCESS",
      payload: response?.data?.messages,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_MESSAGES_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const sendMessageAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "SEND_MESSAGE_REQUEST",
    });
    const response = await axios.post(`/api/v1/consumer/send-message`, data);
    dispatch({
      type: "SEND_MESSAGE_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "SEND_MESSAGE_FAILURE",
      payload: error?.response?.data?.message || "Network Error",
    });
  }
};
const createConversationAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "CREATE_CONVERSATION_REQUEST",
    });
    const response = await axios.post(
      "/api/v1/consumer/create-conversation",
      data
    );
    dispatch({
      type: "CREATE_CONVERSATION_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_CONVERSATION_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const consumerAddCustomServiceAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_CUSTOM_SERVICE_REQUEST",
    });
    const response = await axios.post(
      "/api/v1/consumer/add-custom-service",
      data
    );
    dispatch({
      type: "ADD_CUSTOM_SERVICE_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "ADD_CUSTOM_SERVICE_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const consumerDeleteCustomServiceAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_CUSTOM_SERVICE_REQUEST",
    });
    const response = await axios.delete(
      `/api/v1/consumer/delete-custom-service/${id}`
    );
    dispatch({
      type: "DELETE_CUSTOM_SERVICE_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_CUSTOM_SERVICE_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
const consumerLoadCustomServicesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_CUSTOM_SERVICES_REQUEST",
    });
    const response = await axios.get("/api/v1/consumer/load-custom-services");
    dispatch({
      type: "LOAD_CUSTOM_SERVICES_SUCCESS",
      payload: response?.data?.services,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CUSTOM_SERVICES_FAILURE",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};
export {
  clearErrors,
  consumerLoginAction,
  consumerForgotPasswordLinkAction,
  consumerResetPasswordAction,
  consumerSignUpAction,
  loadCurrentConsumerAction,
  consumerUploadInfoAction,
  loadPopularPostsAction,
  loadNewNotificationsAction,
  readNotificationAction,
  consumerOrderServiceAction,
  loadOrdersAction,
  consumerRejectOrderAction,
  consumerAddRatingAction,
  loadAllDisputesAction,
  fileDisputeAction,
  loadRefundsAction,
  refundAmountRequestAction,
  loadConversationsAction,
  loadMessagesAction,
  sendMessageAction,
  createConversationAction,
  consumerAddCustomServiceAction,
  consumerDeleteCustomServiceAction,
  consumerLoadCustomServicesAction,
};
