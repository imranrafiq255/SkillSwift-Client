import { configureStore } from "@reduxjs/toolkit";
import {
  consumerForgotPasswordLinkReducer,
  consumerLoginReducer,
  consumerResetPasswordReducer,
  consumerSignUpReducer,
  consumerUploadInfoReducer,
  loadCurrentConsumerReducer,
} from "./Consumer/Reducers/ConsumerReducers";
import { serviceProviderSignInReducer } from "./ServiceProvider/Reducers/ServiceProviderReducers";

const store = configureStore({
  reducer: {
    consumerLoginReducer: consumerLoginReducer,
    consumerForgotPasswordLinkReducer: consumerForgotPasswordLinkReducer,
    consumerResetPasswordReducer: consumerResetPasswordReducer,
    consumerSignUpReducer: consumerSignUpReducer,
    loadCurrentConsumerReducer: loadCurrentConsumerReducer,
    consumerUploadInfoReducer: consumerUploadInfoReducer,

    // service provider reducers
    serviceProviderSignInReducer: serviceProviderSignInReducer,
  },
});

export default store;
