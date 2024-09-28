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
};
