import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import Gnims from "../img/gnims4.png";

const LoadingPage = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* <img src={Gnims} alt="" className="fixed top-30% " /> */}
        <MoonLoader
          color="#36abd6"
          size={30}
          speedMultiplier={1}
          className="fixed top-30% z-10 "
        />
      </div>
    </div>
  );
};

export default LoadingPage;
