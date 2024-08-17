import { configureStore } from "@reduxjs/toolkit";
import {
  consumerForgotPasswordLinkReducer,
  consumerLoginReducer,
  consumerResetPasswordReducer,
} from "./Consumer/Reducers/ConsumerReducers";

const store = configureStore({
  reducer: {
    consumerLoginReducer: consumerLoginReducer,
    consumerForgotPasswordLinkReducer: consumerForgotPasswordLinkReducer,
    consumerResetPasswordReducer: consumerResetPasswordReducer,
  },
});

export default store;
