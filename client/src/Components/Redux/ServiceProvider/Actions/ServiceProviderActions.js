import axios from "axios";
const serviceProviderSignInAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_IN_REQUEST",
      });
      const response = await axios.post(
        "/api/v1/service-provider/sign-in",
        serviceProviderData
      );
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_IN_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_IN_FAILURE",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
const serviceProviderForgotPasswordAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch({
        type: "SERVICE_PROVIDER_FORGOT_PASSWORD_REQUEST",
      });
      const response = await axios.post(
        "/api/v1/service-provider/send-reset-password-email",
        serviceProviderData
      );
      dispatch({
        type: "SERVICE_PROVIDER_FORGOT_PASSWORD_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_FORGOT_PASSWORD_FAILURE",
        payload: error.response?.data?.message || "Network error",
      });
    }
  };
const serviceProviderResetPasswordAction =
  (serviceProviderData, token) => async (dispatch) => {
    try {
      dispatch({
        type: "SERVICE_PROVIDER_RESET_PASSWORD_REQUEST",
      });
      const response = await axios.post(
        `/api/v1/service-provider/reset-password/${token}`,
        serviceProviderData
      );
      dispatch({
        type: "SERVICE_PROVIDER_RESET_PASSWORD_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_RESET_PASSWORD_FAILURE",
        payload: error.response?.data?.message || "Network error",
      });
    }
  };
export {
  serviceProviderSignInAction,
  serviceProviderForgotPasswordAction,
  serviceProviderResetPasswordAction,
};
