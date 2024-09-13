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
  acceptOrderReducer,
  cancelOrderReducer,
  completeOrderReducer,
  loadAcceptedOrdersReducer,
  loadCancelledOrdersReducer,
  loadCompletedOrdersReducer,
  loadCurrentServiceProviderReducer,
  loadPendingOrdersReducer,
  loadRejectedOrdersReducer,
  rejectOrderReducer,
  serviceProviderAddCNICReducer,
  serviceProviderAddServicePostReducer,
  serviceProviderAddTimeSlotReducer,
  serviceProviderForgotPasswordReducer,
  serviceProviderListedServicesReducer,
  serviceProviderResetPasswordReducer,
  serviceProviderSignInReducer,
  serviceProviderSignUpReducer,
  serviceProviderUploadInfoReducer,
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
    serviceProviderSignUpReducer: serviceProviderSignUpReducer,
    serviceProviderUploadInfoReducer: serviceProviderUploadInfoReducer,
    serviceProviderListedServicesReducer: serviceProviderListedServicesReducer,
    serviceProviderAddTimeSlotReducer: serviceProviderAddTimeSlotReducer,
    serviceProviderAddCNICReducer: serviceProviderAddCNICReducer,
    serviceProviderAddServicePostReducer: serviceProviderAddServicePostReducer,
    loadCurrentServiceProviderReducer: loadCurrentServiceProviderReducer,
    loadPendingOrdersReducer: loadPendingOrdersReducer,
    loadCompletedOrdersReducer: loadCompletedOrdersReducer,
    loadAcceptedOrdersReducer: loadAcceptedOrdersReducer,
    loadRejectedOrdersReducer: loadRejectedOrdersReducer,
    loadCancelledOrdersReducer: loadCancelledOrdersReducer,
    acceptOrderReducer: acceptOrderReducer,
    rejectOrderReducer: rejectOrderReducer,
    cancelOrderReducer: cancelOrderReducer,
    completeOrderReducer: completeOrderReducer,
  },
});

export default store;
