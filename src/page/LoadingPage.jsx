import React from "react";
import DotLoader from "react-spinners/DotLoader";

const LoadingPage = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <DotLoader
          color="#36abd6"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
