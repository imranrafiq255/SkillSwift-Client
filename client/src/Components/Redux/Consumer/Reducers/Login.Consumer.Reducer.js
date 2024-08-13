import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: "",
  error: null,
};

const consumerLoginReducer = createReducer(initialState, (builder) => {
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
});

export default consumerLoginReducer;
