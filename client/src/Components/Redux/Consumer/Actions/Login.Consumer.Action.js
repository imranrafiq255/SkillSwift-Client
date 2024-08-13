import axios from "axios";
const consumerLoginAction = (consumerData) => async (dispatch) => {
  try {
    dispatch({
      type: "CONSUMER_LOADING",
    });
    const response = await axios.post("/api/v1/consumer/sign-in", consumerData);
    dispatch({
      type: "CONSUMER_MESSAGE",
      payload: response?.data?.message,
    });
  } catch (error) {
    dispatch({
      type: "CONSUMER_ERROR",
      payload: error?.response?.data?.message || "Network error",
    });
  }
};

export default consumerLoginAction;
