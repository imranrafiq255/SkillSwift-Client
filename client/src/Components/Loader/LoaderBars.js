import React from "react";
import { Bars } from "react-loader-spinner";
const LoaderBars = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="#334155"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default LoaderBars;
