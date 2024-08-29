import axios from "axios";

const handleError = (error) => {
  return error.response?.data?.message || "Network error";
};

const clearErrors = () => (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS",
  });
};

const serviceProviderSignInAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_IN_REQUEST",
      });
      const response = await axios.post("/api/v1/service-provider/sign-in", {
        serviceProviderData,
      });
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_IN_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_IN_FAILURE",
        payload: handleError(error),
      });
    }
  };

const serviceProviderForgotPasswordAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch(clearErrors());
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
        payload: handleError(error),
      });
    }
  };

const serviceProviderResetPasswordAction =
  (serviceProviderData, token) => async (dispatch) => {
    try {
      dispatch(clearErrors());
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
        payload: handleError(error),
      });
    }
  };

const serviceProviderSignUpAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_UP_REQUEST",
      });
      const response = await axios.post(
        "/api/v1/service-provider/sign-up",
        serviceProviderData
      );
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_UP_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_SIGN_UP_FAILURE",
        payload: handleError(error),
      });
    }
  };

const serviceProviderUploadInfoAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch({
        type: "SERVICE_PROVIDER_UPLOAD_INFO_REQUEST",
      });
      const response = await axios.post(
        "/api/v1/service-provider/avatar-phone-upload",
        serviceProviderData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: "SERVICE_PROVIDER_UPLOAD_INFO_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_UPLOAD_INFO_FAILURE",
        payload: handleError(error),
      });
    }
  };

const serviceProviderListedServicesAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch({
        type: "SERVICE_PROVIDER_LISTED_SERVICES_REQUEST",
      });
      const response = await axios.post(
        "/api/v1/service-provider/add-listed-services",
        { serviceProviderListedServices: serviceProviderData }
      );
      dispatch({
        type: "SERVICE_PROVIDER_LISTED_SERVICES_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_LISTED_SERVICES_FAILURE",
        payload: handleError(error),
      });
    }
  };
const serviceProviderAddTimeSlotAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch({
        type: "SERVICE_PROVIDER_ADD_TIME_SLOT_REQUEST",
      });
      const response = await axios.post(
        "/api/v1/service-provider/set-working-hours",
        { serviceProviderWorkingHours: serviceProviderData }
      );
      dispatch({
        type: "SERVICE_PROVIDER_ADD_TIME_SLOT_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_ADD_TIME_SLOT_FAILURE",
        payload: handleError(error),
      });
    }
  };

const serviceProviderAddCNICAction =
  (serviceProviderData) => async (dispatch) => {
    const formData = new FormData();
    formData.append(
      "serviceProviderCNICImages",
      serviceProviderData.cnicPhoto1
    );
    formData.append(
      "serviceProviderCNICImages",
      serviceProviderData.cnicPhoto2
    );
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      dispatch({
        type: "SERVICE_PROVIDER_ADD_CNIC_REQUEST",
      });
      const response = await axios.post(
        "/api/v1/service-provider/add-cnic-details",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: "SERVICE_PROVIDER_ADD_CNIC_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_ADD_CNIC_FAILURE",
        payload: handleError(error),
      });
    }
  };
export {
  clearErrors,
  serviceProviderSignInAction,
  serviceProviderForgotPasswordAction,
  serviceProviderResetPasswordAction,
  serviceProviderSignUpAction,
  serviceProviderUploadInfoAction,
  serviceProviderListedServicesAction,
  serviceProviderAddTimeSlotAction,
  serviceProviderAddCNICAction,
};
