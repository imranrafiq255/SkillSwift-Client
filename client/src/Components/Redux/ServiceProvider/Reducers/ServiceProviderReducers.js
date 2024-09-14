import { createReducer } from "@reduxjs/toolkit";

const serviceProviderSignInInitialValues = {
  loading: false,
  message: "",
  error: null,
};

const serviceProviderSignInReducer = createReducer(
  serviceProviderSignInInitialValues,
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_SIGN_IN_REQUEST", (state) => {
        state.loading = true;
        state.error = null; // Clear errors
      })
      .addCase("SERVICE_PROVIDER_SIGN_IN_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_SIGN_IN_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null; // Handle error clearing
      });
  }
);

const serviceProviderForgotPasswordInitialState = {
  loading: false,
  message: "",
  error: null,
};

const serviceProviderForgotPasswordReducer = createReducer(
  serviceProviderForgotPasswordInitialState,
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_FORGOT_PASSWORD_REQUEST", (state) => {
        state.loading = true;
        state.error = null; // Clear errors
      })
      .addCase("SERVICE_PROVIDER_FORGOT_PASSWORD_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_FORGOT_PASSWORD_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null; // Handle error clearing
      });
  }
);

const serviceProviderResetPasswordInitialState = {
  loading: false,
  message: null,
  error: null,
};

const serviceProviderResetPasswordReducer = createReducer(
  serviceProviderResetPasswordInitialState,
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_RESET_PASSWORD_REQUEST", (state) => {
        state.loading = true;
        state.error = null; // Clear errors
      })
      .addCase("SERVICE_PROVIDER_RESET_PASSWORD_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_RESET_PASSWORD_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null; // Handle error clearing
      });
  }
);

const serviceProviderSignUpInitialValues = {
  loading: false,
  message: null,
  error: null,
};

const serviceProviderSignUpReducer = createReducer(
  serviceProviderSignUpInitialValues,
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_SIGN_UP_REQUEST", (state) => {
        state.loading = true;
        state.error = null; // Clear errors
      })
      .addCase("SERVICE_PROVIDER_SIGN_UP_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_SIGN_UP_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);

const serviceProviderUploadInfoReducer = createReducer(
  { loading: false, message: null, error: null },
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_UPLOAD_INFO_REQUEST", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("SERVICE_PROVIDER_UPLOAD_INFO_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_UPLOAD_INFO_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);

const serviceProviderListedServicesReducer = createReducer(
  { loading: false, error: null, message: null },
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_LISTED_SERVICES_REQUEST", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("SERVICE_PROVIDER_LISTED_SERVICES_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_LISTED_SERVICES_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const serviceProviderAddTimeSlotReducer = createReducer(
  { loading: false, error: null, message: null },
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_ADD_TIME_SLOT_REQUEST", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("SERVICE_PROVIDER_ADD_TIME_SLOT_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_ADD_TIME_SLOT_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const serviceProviderAddCNICReducer = createReducer(
  { loading: false, message: null, error: null },
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_ADD_CNIC_REQUEST", (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("SERVICE_PROVIDER_ADD_CNIC_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_ADD_CNIC_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const serviceProviderAddServicePostReducer = createReducer(
  {
    loading: false,
    message: null,
    error: null,
  },
  (builder) => {
    builder
      .addCase("SERVICE_PROVIDER_ADD_SERVICE_POST_REQUEST", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("SERVICE_PROVIDER_ADD_SERVICE_POST_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_ADD_SERVICE_POST_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const loadCurrentServiceProviderReducer = createReducer(
  {
    serviceProvider: null,
    serviceProviderLoading: false,
    serviceProviderError: null,
  },
  (builder) => {
    builder
      .addCase("LOAD_CURRENT_SERVICE_PROVIDER_REQUEST", (state) => {
        state.serviceProviderLoading = true;
        state.serviceProviderError = null;
      })
      .addCase("LOAD_CURRENT_SERVICE_PROVIDER_SUCCESS", (state, action) => {
        state.serviceProviderLoading = false;
        state.serviceProvider = action.payload;
      })
      .addCase("LOAD_CURRENT_SERVICE_PROVIDER_FAILURE", (state, action) => {
        state.serviceProviderLoading = false;
        state.serviceProviderError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.serviceProviderError = null;
      });
  }
);

// Orders
const loadPendingOrdersReducer = createReducer(
  { pendingLoading: false, pendingOrders: null, pendingError: null },
  (builder) => {
    builder
      .addCase("LOAD_PENDING_ORDERS_REQUEST", (state) => {
        state.pendingLoading = true;
        state.pendingError = null;
      })
      .addCase("LOAD_PENDING_ORDERS_SUCCESS", (state, action) => {
        state.pendingLoading = false;
        state.pendingOrders = action.payload;
      })
      .addCase("LOAD_PENDING_ORDERS_FAILURE", (state, action) => {
        state.pendingLoading = false;
        state.pendingError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.pendingError = null;
      });
  }
);
const loadCompletedOrdersReducer = createReducer(
  { completedLoading: false, completedError: null, completedOrders: null },
  (builder) => {
    builder
      .addCase("LOAD_COMPLETED_ORDERS_REQUEST", (state) => {
        state.completedLoading = true;
        state.completedError = null;
      })
      .addCase("LOAD_COMPLETED_ORDERS_SUCCESS", (state, action) => {
        state.completedLoading = false;
        state.completedOrders = action.payload;
      })
      .addCase("LOAD_COMPLETED_ORDERS_FAILURE", (state, action) => {
        state.completedLoading = false;
        state.completedError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.completedError = null;
      });
  }
);
const loadAcceptedOrdersReducer = createReducer(
  { acceptedLoading: false, acceptedError: null, acceptedOrders: null },
  (builder) => {
    builder
      .addCase("LOAD_ACCEPTED_ORDERS_REQUEST", (state) => {
        state.acceptedLoading = true;
        state.acceptedError = null;
      })
      .addCase("LOAD_ACCEPTED_ORDERS_SUCCESS", (state, action) => {
        state.acceptedLoading = false;
        state.acceptedOrders = action.payload;
      })
      .addCase("LOAD_ACCEPTED_ORDERS_FAILURE", (state, action) => {
        state.acceptedLoading = false;
        state.acceptedError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.acceptedError = null;
      });
  }
);
const loadRejectedOrdersReducer = createReducer(
  { rejectedLoading: false, rejectedError: null, rejectedOrders: null },
  (builder) => {
    builder
      .addCase("LOAD_REJECTED_ORDERS_REQUEST", (state) => {
        state.rejectedLoading = true;
        state.rejectedError = null;
      })
      .addCase("LOAD_REJECTED_ORDERS_SUCCESS", (state, action) => {
        state.rejectedLoading = false;
        state.rejectedOrders = action.payload;
      })
      .addCase("LOAD_REJECTED_ORDERS_FAILURE", (state, action) => {
        state.rejectedLoading = false;
        state.rejectedError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.rejectedError = null;
      });
  }
);
const loadCancelledOrdersReducer = createReducer(
  { cancelledLoading: false, cancelledError: null, cancelledOrders: null },
  (builder) => {
    builder
      .addCase("LOAD_CANCELLED_ORDERS_REQUEST", (state) => {
        state.cancelledLoading = true;
        state.cancelledError = null;
      })
      .addCase("LOAD_CANCELLED_ORDERS_SUCCESS", (state, action) => {
        state.cancelledLoading = false;
        state.cancelledOrders = action.payload;
      })
      .addCase("LOAD_CANCELLED_ORDERS_FAILURE", (state, action) => {
        state.cancelledLoading = false;
        state.cancelledError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.cancelledError = null;
      });
  }
);
const acceptOrderReducer = createReducer(
  {
    acceptOrderLoading: false,
    acceptOrderError: null,
    acceptOrderMessage: null,
  },
  (builder) => {
    builder
      .addCase("ACCEPT_ORDER_REQUEST", (state) => {
        state.acceptOrderLoading = true;
        state.acceptOrderError = null;
      })
      .addCase("ACCEPT_ORDER_SUCCESS", (state, action) => {
        state.acceptOrderLoading = false;
        state.acceptOrderMessage = action.payload;
      })
      .addCase("ACCEPT_ORDER_FAILURE", (state, action) => {
        state.acceptOrderLoading = false;
        state.acceptOrderError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.acceptOrderError = null;
      });
  }
);
const rejectOrderReducer = createReducer(
  {
    rejectOrderLoading: false,
    rejectOrderError: null,
    rejectOrderMessage: null,
  },
  (builder) => {
    builder
      .addCase("REJECT_ORDER_REQUEST", (state) => {
        state.rejectOrderLoading = true;
        state.rejectOrderError = null;
      })
      .addCase("REJECT_ORDER_SUCCESS", (state, action) => {
        state.rejectOrderLoading = false;
        state.rejectOrderMessage = action.payload;
      })
      .addCase("REJECT_ORDER_FAILURE", (state, action) => {
        state.rejectOrderLoading = false;
        state.rejectOrderError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.rejectOrderError = null;
      });
  }
);
const cancelOrderReducer = createReducer(
  {
    cancelOrderLoading: false,
    cancelOrderError: null,
    cancelOrderMessage: null,
  },
  (builder) => {
    builder
      .addCase("CANCEL_ORDER_REQUEST", (state) => {
        state.cancelOrderLoading = true;
        state.cancelOrderError = null;
      })
      .addCase("CANCEL_ORDER_SUCCESS", (state, action) => {
        state.cancelOrderLoading = false;
        state.cancelOrderMessage = action.payload;
      })
      .addCase("CANCEL_ORDER_FAILURE", (state, action) => {
        state.cancelOrderLoading = false;
        state.cancelOrderError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.cancelOrderError = null;
      });
  }
);
const completeOrderReducer = createReducer(
  {
    completeOrderLoading: false,
    completeOrderError: null,
    completeOrderMessage: null,
  },
  (builder) => {
    builder
      .addCase("COMPLETE_ORDER_REQUEST", (state) => {
        state.completeOrderLoading = true;
        state.completeOrderError = null;
      })
      .addCase("COMPLETE_ORDER_SUCCESS", (state, action) => {
        state.completeOrderLoading = false;
        state.completeOrderMessage = action.payload;
      })
      .addCase("COMPLETE_ORDER_FAILURE", (state, action) => {
        state.completeOrderLoading = false;
        state.completeOrderError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.completeOrderError = null;
      });
  }
);
// notifications
const loadNewNotificationsReducer = createReducer(
  {
    loadNotificationLoader: false,
    notifications: null,
    loadNotificationError: null,
  },
  (builder) => {
    builder
      .addCase("LOAD_NEW_NOTIFICATIONS_REQUEST", (state) => {
        state.loadNotificationLoader = true;
        state.loadNotificationError = null;
      })
      .addCase("LOAD_NEW_NOTIFICATIONS_SUCCESS", (state, action) => {
        state.loadNotificationLoader = false;
        state.notifications = action.payload;
      })
      .addCase("LOAD_NEW_NOTIFICATIONS_FAILURE", (state, action) => {
        state.loadNotificationLoader = false;
        state.loadNotificationError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.loadNotificationError = null;
      });
  }
);
const readNotificationReducer = createReducer(
  {
    readNotificationLoader: false,
    readNotificationMessage: null,
    readNotificationError: null,
  },
  (builder) => {
    builder
      .addCase("READ_NOTIFICATION_REQUEST", (state) => {
        state.readNotificationLoader = true;
        state.readNotificationError = null;
      })
      .addCase("READ_NOTIFICATION_SUCCESS", (state, action) => {
        state.readNotificationLoader = false;
        state.readNotificationMessage = action.payload;
      })
      .addCase("READ_NOTIFICATION_FAILURE", (state, action) => {
        state.readNotificationLoader = false;
        state.readNotificationError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.readNotificationError = null;
      });
  }
);
const deleteServicePostReducer = createReducer(
  {
    deleteServicePostLoading: false,
    deleteServicePostMessage: null,
    deleteServicePostError: null,
  },
  (builder) => {
    builder
      .addCase("DELETE_SERVICE_POST_REQUEST", (state) => {
        state.deleteServicePostLoading = true;
        state.deleteServicePostError = null;
      })
      .addCase("DELETE_SERVICE_POST_SUCCESS", (state, action) => {
        state.deleteServicePostLoading = false;
        state.deleteServicePostMessage = action.payload;
      })
      .addCase("DELETE_SERVICE_POST_FAILURE", (state, action) => {
        state.deleteServicePostLoading = false;
        state.deleteServicePostError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.deleteServicePostError = null;
      });
  }
);
export {
  serviceProviderSignInReducer,
  serviceProviderForgotPasswordReducer,
  serviceProviderResetPasswordReducer,
  serviceProviderSignUpReducer,
  serviceProviderUploadInfoReducer,
  serviceProviderListedServicesReducer,
  serviceProviderAddTimeSlotReducer,
  serviceProviderAddCNICReducer,
  serviceProviderAddServicePostReducer,
  loadCurrentServiceProviderReducer,
  loadPendingOrdersReducer,
  loadCompletedOrdersReducer,
  loadAcceptedOrdersReducer,
  loadRejectedOrdersReducer,
  loadCancelledOrdersReducer,
  acceptOrderReducer,
  rejectOrderReducer,
  cancelOrderReducer,
  completeOrderReducer,
  loadNewNotificationsReducer,
  readNotificationReducer,
  deleteServicePostReducer,
};
