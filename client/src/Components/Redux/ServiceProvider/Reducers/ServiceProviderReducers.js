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

export { serviceProviderSignInReducer };
