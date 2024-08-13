import { configureStore } from "@reduxjs/toolkit";
import consumerLoginReducer from "./Consumer/Reducers/Login.Consumer.Reducer";

const store = configureStore({
  reducer: {
    consumerLoginReducer: consumerLoginReducer,
  },
});

export default store;
