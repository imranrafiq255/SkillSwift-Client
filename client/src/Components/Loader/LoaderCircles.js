import React from "react";
import { Circles } from "react-loader-spinner";
const LoaderCircles = () => {
  return (
    <Circles
      height="80"
      width="40"
      color="#fff"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default LoaderCircles;
