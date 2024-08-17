import axios from "axios";
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
export {
  consumerLoginAction,
  consumerForgotPasswordLinkAction,
  consumerResetPasswordAction,
};
