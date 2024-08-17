import { createReducer } from "@reduxjs/toolkit";

const consumerLoginInitialState = {
  loading: false,
  message: "",
  error: null,
};

const consumerLoginReducer = createReducer(
  consumerLoginInitialState,
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
      });
  }
);

const consumerForgotPasswordLinkInitialState = {
  loading: false,
  message: "",
  error: null,
};
const consumerForgotPasswordLinkReducer = createReducer(
  consumerForgotPasswordLinkInitialState,
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
  }
);

const consumerResetPasswordInitialState = {
  loading: false,
  message: "",
  error: null,
};
const consumerResetPasswordReducer = createReducer(
  consumerResetPasswordInitialState,
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
  }
);
export {
  consumerLoginReducer,
  consumerForgotPasswordLinkReducer,
  consumerResetPasswordReducer,
};
