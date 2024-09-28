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
    const response = await axios.post("/api/v1/consumer/sign-in", consumerData);
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
};
