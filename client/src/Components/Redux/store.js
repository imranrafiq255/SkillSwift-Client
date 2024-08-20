import { configureStore } from "@reduxjs/toolkit";
import {
  consumerForgotPasswordLinkReducer,
  consumerLoginReducer,
  consumerResetPasswordReducer,
  consumerSignUpReducer,
  consumerUploadInfoReducer,
  loadCurrentConsumerReducer,
} from "./Consumer/Reducers/ConsumerReducers";
import {
  serviceProviderForgotPasswordReducer,
  serviceProviderResetPasswordReducer,
  serviceProviderSignInReducer,
} from "./ServiceProvider/Reducers/ServiceProviderReducers";

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
    serviceProviderForgotPasswordReducer: serviceProviderForgotPasswordReducer,
    serviceProviderResetPasswordReducer: serviceProviderResetPasswordReducer,
  },
});

export default store;
