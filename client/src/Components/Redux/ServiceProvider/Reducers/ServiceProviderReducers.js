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
        state.error = null; // Handle error clearing
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
export {
  serviceProviderSignInReducer,
  serviceProviderForgotPasswordReducer,
  serviceProviderResetPasswordReducer,
  serviceProviderSignUpReducer,
  serviceProviderUploadInfoReducer,
  serviceProviderListedServicesReducer,
};
