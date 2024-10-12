import React from "react";
import { Circles } from "react-loader-spinner";
const LoaderCircles = () => {
  return (
    <Circles
      height="40"
      width="20"
      color="#fff"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default LoaderCircles;
