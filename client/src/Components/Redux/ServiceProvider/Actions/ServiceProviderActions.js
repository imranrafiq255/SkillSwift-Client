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

export { serviceProviderSignInAction };
