import { createReducer } from "@reduxjs/toolkit";

const consumerLoginReducer = createReducer(
  {
    loading: false,
    message: "",
    error: null,
  },
  (builder) => {
    builder
      .addCase("CONSUMER_LOADING", (state) => {
        state.loading = true;
      })
      .addCase("CONSUMER_MESSAGE", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("CONSUMER_ERROR", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);

const consumerForgotPasswordLinkReducer = createReducer(
  {
    loading: false,
    message: "",
    error: null,
  },
  (builder) => {
    builder.addCase("CONSUMER_FORGOT_PASSWORD_LINK_REQUEST", (state) => {
      state.loading = true;
    });
    builder.addCase(
      "CONSUMER_FORGOT_PASSWORD_LINK_SUCCESS",
      (state, action) => {
        state.loading = false;
        state.message = action.payload;
      }
    );
    builder.addCase(
      "CONSUMER_FORGOT_PASSWORD_LINK_FAILURE",
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase("CLEAR_ERRORS", (state) => {
      state.error = null;
    });
  }
);

const consumerResetPasswordReducer = createReducer(
  {
    loading: false,
    message: "",
    error: null,
  },
  (builder) => {
    builder.addCase("CONSUMER_RESET_PASSWORD_REQUEST", (state) => {
      state.loading = true;
    });
    builder.addCase("CONSUMER_RESET_PASSWORD_SUCCESS", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase("CONSUMER_RESET_PASSWORD_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase("CLEAR_ERRORS", (state) => {
      state.error = null;
    });
  }
);
const consumerSignUpReducer = createReducer(
  {
    loading: false,
    message: "",
    error: null,
  },
  (builder) => {
    builder
      .addCase("CONSUMER_SIGN_UP_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("CONSUMER_SIGN_UP_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("CONSUMER_SIGN_UP_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const loadCurrentConsumerReducer = createReducer(
  {
    loading: false,
    consumer: null,
    isAuthenticated: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase("LOAD_CURRENT_CONSUMER_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("LOAD_CURRENT_CONSUMER_SUCCESS", (state, action) => {
        state.loading = false;
        state.consumer = action.payload;
        state.isAuthenticated = true;
      })
      .addCase("LOAD_CURRENT_CONSUMER_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const consumerUploadInfoReducer = createReducer(
  {
    loading: false,
    message: "",
    error: null,
  },
  (builder) => {
    builder
      .addCase("CONSUMER_UPLOAD_INFO_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("CONSUMER_UPLOAD_INFO_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("CONSUMER_UPLOAD_INFO_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const loadPopularPostsReducer = createReducer(
  { loading: false, error: null, posts: null },
  (builder) => {
    builder.addCase("LOAD_POPULAR_POSTS", (state) => {
      state.loading = true;
    });
    builder.addCase("LOAD_POPULAR_POSTS_SUCCESS", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase("LOAD_POPULAR_POSTS_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase("CLEAR_ERRORS", (state) => {
      state.error = null;
    });
  }
);
const loadConsumerNewNotificationsReducer = createReducer(
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
const readConsumerNotificationReducer = createReducer(
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
const consumerOrderServiceReducer = createReducer(
  { loading: false, error: null, message: null },
  (builder) => {
    builder
      .addCase("CONSUMER_ORDER_SERVICE_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("CONSUMER_ORDER_SERVICE_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("CONSUMER_ORDER_SERVICE_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const loadOrdersReducer = createReducer(
  { loading: false, error: null, orders: null },
  (builder) => {
    builder
      .addCase("LOAD_ORDERS_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("LOAD_ORDERS_SUCCESS", (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase("LOAD_ORDERS_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
      });
  }
);
const consumerRejectOrderReducer = createReducer(
  { rejectLoading: false, rejectError: null, rejectMessage: null },
  (builder) => {
    builder
      .addCase("CONSUMER_REJECT_ORDER_REQUEST", (state) => {
        state.rejectLoading = true;
        state.rejectError = null;
      })
      .addCase("CONSUMER_REJECT_ORDER_SUCCESS", (state, action) => {
        state.rejectLoading = false;
        state.rejectMessage = action.payload;
      })
      .addCase("CONSUMER_REJECT_ORDER_FAILURE", (state, action) => {
        state.rejectLoading = false;
        state.rejectError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.rejectError = null;
      });
  }
);
const consumerAddRatingReducer = createReducer(
  { ratingLoading: false, ratingError: null, ratingMessage: null },
  (builder) => {
    builder.addCase("CONSUMER_ADD_RATING_REQUEST", (state) => {
      state.ratingLoading = true;
      state.ratingError = null;
    });
    builder.addCase("CONSUMER_ADD_RATING_SUCCESS", (state, action) => {
      state.ratingLoading = false;
      state.ratingMessage = action.payload;
    });
    builder.addCase("CONSUMER_ADD_RATING_FAILURE", (state, action) => {
      state.ratingLoading = false;
      state.ratingError = action.payload;
    });
    builder.addCase("CLEAR_ERRORS", (state) => {
      state.ratingError = null;
    });
  }
);
const loadAllDisputesReducer = createReducer(
  { disputeLoading: false, disputeError: null, disputes: null },
  (builder) => {
    builder
      .addCase("LOAD_ALL_DISPUTES_REQUEST", (state) => {
        state.disputeLoading = true;
      })
      .addCase("LOAD_ALL_DISPUTES_SUCCESS", (state, action) => {
        state.disputeLoading = false;
        state.disputes = action.payload;
      })
      .addCase("LOAD_ALL_DISPUTES_FAILURE", (state, action) => {
        state.disputeLoading = false;
        state.disputeError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.disputeError = null;
      });
  }
);

const fileDisputeReducer = createReducer(
  {
    fileDisputeLoading: false,
    fileDisputeError: null,
    fileDisputeMessage: null,
  },
  (builder) => {
    builder.addCase("FILE_DISPUTE_REQUEST", (state) => {
      state.fileDisputeLoading = true;
      state.fileDisputeError = null;
    });
    builder.addCase("FILE_DISPUTE_SUCCESS", (state, action) => {
      state.fileDisputeLoading = false;
      state.fileDisputeMessage = action.payload;
    });
    builder.addCase("FILE_DISPUTE_FAILURE", (state, action) => {
      state.fileDisputeLoading = false;
      state.fileDisputeError = action.payload;
    });
    builder.addCase("CLEAR_ERRORS", (state) => {
      state.fileDisputeError = null;
    });
  }
);
const loadRefundsReducer = createReducer(
  { refundLoading: false, refundError: null, refunds: null },
  (builder) => {
    builder
      .addCase("LOAD_REFUNDS_REQUEST", (state) => {
        state.refundLoading = false;
      })
      .addCase("LOAD_REFUNDS_SUCCESS", (state, action) => {
        state.refundLoading = false;
        state.refunds = action.payload;
      })
      .addCase("LOAD_REFUNDS_FAILURE", (state, action) => {
        state.refundLoading = false;
        state.refundError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.refundError = null;
      });
  }
);
const refundAmountRequestReducer = createReducer(
  {
    refundRequestLoading: false,
    refundRequestError: null,
    refundRequestMessage: null,
  },
  (builder) => {
    builder
      .addCase("REFUND_AMOUNT_REQUEST", (state) => {
        state.refundRequestLoading = true;
      })
      .addCase("REFUND_AMOUNT_SUCCESS", (state, action) => {
        state.refundRequestLoading = false;
        state.refundRequestMessage = action.payload;
      })
      .addCase("REFUND_AMOUNT_FAILURE", (state, action) => {
        state.refundRequestLoading = false;
        state.refundRequestError = action.payload;
      })
      .addCase("CLEAR_ERRORS", (state) => {
        state.refundRequestError = null;
      });
  }
);
export {
  consumerLoginReducer,
  consumerForgotPasswordLinkReducer,
  consumerResetPasswordReducer,
  consumerSignUpReducer,
  loadCurrentConsumerReducer,
  consumerUploadInfoReducer,
  loadPopularPostsReducer,
  loadConsumerNewNotificationsReducer,
  readConsumerNotificationReducer,
  consumerOrderServiceReducer,
  loadOrdersReducer,
  consumerRejectOrderReducer,
  consumerAddRatingReducer,
  loadAllDisputesReducer,
  fileDisputeReducer,
  loadRefundsReducer,
  refundAmountRequestReducer,
};
