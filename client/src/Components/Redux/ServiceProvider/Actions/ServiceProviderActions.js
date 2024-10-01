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
const serviceProviderAddServicePostAction =
  (serviceProviderData) => async (dispatch) => {
    try {
      dispatch({
        type: "SERVICE_PROVIDER_ADD_SERVICE_POST_REQUEST",
      });
      const response = await axios.post(
        "/api/v1/service-provider/add-service-post",
        serviceProviderData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: "SERVICE_PROVIDER_ADD_SERVICE_POST_SUCCESS",
        payload: response?.data?.message,
      });
    } catch (error) {
      dispatch({
        type: "SERVICE_PROVIDER_ADD_SERVICE_POST_FAILURE",
        payload: handleError(error),
      });
    }
  };
const loadCurrentServiceProviderAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_CURRENT_SERVICE_PROVIDER_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/service-provider/load-current-service-provider"
    );
    dispatch({
      type: "LOAD_CURRENT_SERVICE_PROVIDER_SUCCESS",
      payload: response?.data?.serviceProvider,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CURRENT_SERVICE_PROVIDER_FAILURE",
      payload: handleError(error),
    });
  }
};
const loadPendingOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_PENDING_ORDERS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/service-provider/load-pending-orders"
    );
    dispatch({
      type: "LOAD_PENDING_ORDERS_SUCCESS",
      payload: response?.data?.pendingOrders,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_PENDING_ORDERS_FAILURE",
      payload: handleError(error),
    });
  }
};
const loadCompletedOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_COMPLETED_ORDERS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/service-provider/load-completed-orders"
    );
    dispatch({
      type: "LOAD_COMPLETED_ORDERS_SUCCESS",
      payload: response?.data?.completedOrders,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_COMPLETED_ORDERS_FAILURE",
      payload: handleError(error),
    });
  }
};
const loadRejectedOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_REJECTED_ORDERS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/service-provider/load-rejected-orders"
    );
    dispatch({
      type: "LOAD_REJECTED_ORDERS_SUCCESS",
      payload: response?.data?.rejectedOrders,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_REJECTED_ORDERS_FAILURE",
      payload: handleError(error),
    });
  }
};
const loadAcceptedOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_ACCEPTED_ORDERS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/service-provider/load-accepted-orders"
    );
    dispatch({
      type: "LOAD_ACCEPTED_ORDERS_SUCCESS",
      payload: response?.data?.acceptedOrders,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_ACCEPTED_ORDERS_FAILURE",
      payload: handleError(error),
    });
  }
};
const loadCancelledOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_CANCELLED_ORDERS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/service-provider/load-cancelled-orders"
    );
    dispatch({
      type: "LOAD_CANCELLED_ORDERS_SUCCESS",
      payload: response?.data?.cancelledOrders,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CANCELLED_ORDERS_FAILURE",
      payload: handleError(error),
    });
  }
};
const acceptOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "ACCEPT_ORDER_REQUEST",
    });
    const response = await axios.post(
      `/api/v1/service-provider/accept-order/${id}`
    );
    dispatch({
      type: "ACCEPT_ORDER_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "ACCEPT_ORDER_FAILURE",
      payload: handleError(error),
    });
  }
};
const rejectOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "REJECT_ORDER_REQUEST",
    });
    const response = await axios.delete(
      `/api/v1/service-provider/reject-order/${id}`
    );
    dispatch({
      type: "REJECT_ORDER_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "REJECT_ORDER_FAILURE",
      payload: handleError(error),
    });
  }
};
const cancelOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "CANCEL_ORDER_REQUEST",
    });
    const response = await axios.delete(
      `/api/v1/service-provider/cancel-order/${id}`
    );
    dispatch({
      type: "CANCEL_ORDER_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CANCEL_ORDER_FAILURE",
      payload: handleError(error),
    });
  }
};
const completeOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "COMPLETE_ORDER_REQUEST",
    });
    const response = await axios.post(
      `/api/v1/service-provider/complete-order/${id}`
    );
    dispatch({
      type: "COMPLETE_ORDER_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "COMPLETE_ORDER_FAILURE",
      payload: handleError(error),
    });
  }
};
const loadNewNotificationsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_NEW_NOTIFICATIONS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/service-provider/load-new-notifications"
    );
    dispatch({
      type: "LOAD_NEW_NOTIFICATIONS_SUCCESS",
      payload: response?.data?.notifications,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_NEW_NOTIFICATIONS_FAILURE",
      payload: handleError(error),
    });
  }
};
const readNotificationAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "READ_NOTIFICATION_REQUEST",
    });
    const response = await axios.get(
      `/api/v1/service-provider/read-notification/${id}`
    );
    dispatch({
      type: "READ_NOTIFICATION_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "READ_NOTIFICATION_FAILURE",
      payload: handleError(error),
    });
  }
};
const deleteServicePostAction = (id) => (dispatch) => {
  dispatch({
    type: "DELETE_SERVICE_POST_REQUEST",
  });
  axios
    .delete(`/api/v1/service-provider/delete-service-post/${id}`)
    .then((response) => {
      dispatch({
        type: "DELETE_SERVICE_POST_SUCCESS",
        payload: response?.data?.message,
      });
    })
    .catch((error) => {
      dispatch({
        type: "DELETE_SERVICE_POST_FAILURE",
        payload: handleError(error),
      });
    });
};
const loadConversationsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_CONVERSATIONS_REQUEST",
    });
    const response = await axios.get(
      "/api/v1/service-provider/load-conversations"
    );
    dispatch({
      type: "LOAD_CONVERSATIONS_SUCCESS",
      payload: response?.data?.conversations,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_CONVERSATIONS_FAILURE",
      payload: handleError(error),
    });
  }
};
const loadMessagesAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_MESSAGES_REQUEST",
    });
    const response = await axios.get(
      `/api/v1/service-provider/load-messages/${id}`
    );
    dispatch({
      type: "LOAD_MESSAGES_SUCCESS",
      payload: response?.data?.messages,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_MESSAGES_FAILURE",
      payload: handleError(error),
    });
  }
};
const sendMessageAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "SEND_MESSAGE_REQUEST",
    });
    const response = await axios.post(
      `/api/v1/service-provider/send-message`,
      data
    );
    dispatch({
      type: "SEND_MESSAGE_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "SEND_MESSAGE_FAILURE",
      payload: handleError(error),
    });
  }
};
const createConversationAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "CREATE_CONVERSATION_REQUEST",
    });
    const response = await axios.post(
      "/api/v1/service-provider/create-conversation",
      data
    );
    dispatch({
      type: "CREATE_CONVERSATION_SUCCESS",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_CONVERSATION_FAILURE",
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
  serviceProviderAddServicePostAction,
  loadCurrentServiceProviderAction,
  loadPendingOrdersAction,
  loadCompletedOrdersAction,
  loadRejectedOrdersAction,
  loadAcceptedOrdersAction,
  loadCancelledOrdersAction,
  acceptOrderAction,
  rejectOrderAction,
  cancelOrderAction,
  completeOrderAction,
  loadNewNotificationsAction,
  readNotificationAction,
  deleteServicePostAction,
  loadConversationsAction,
  loadMessagesAction,
  sendMessageAction,
  createConversationAction,
};
