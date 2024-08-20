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
      })
      .addCase("SERVICE_PROVIDER_SIGN_IN_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("SERVICE_PROVIDER_SIGN_IN_FAILURE", (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
    builder.addCase(
      "SERVICE_PROVIDER_FORGOT_PASSWORD_REQUEST",
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      "SERVICE_PROVIDER_FORGOT_PASSWORD_SUCCESS",
      (state, action) => {
        state.loading = false;
        state.message = action.payload;
      }
    );
    builder.addCase(
      "SERVICE_PROVIDER_FORGOT_PASSWORD_FAILURE",
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
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
    builder.addCase(
      "SERVICE_PROVIDER_RESET_PASSWORD_REQUEST",
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      "SERVICE_PROVIDER_RESET_PASSWORD_SUCCESS",
      (state, action) => {
        state.loading = false;
        state.message = action.payload;
      }
    );
    builder.addCase(
      "SERVICE_PROVIDER_RESET_PASSWORD_FAILURE",
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  }
);
export {
  serviceProviderSignInReducer,
  serviceProviderForgotPasswordReducer,
  serviceProviderResetPasswordReducer,
};
