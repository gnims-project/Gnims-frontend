import React from "react";
import Home from "../../img/Home.png";
import MY from "../../img/MY.png";
import Friends from "../../img/Friends.png";
import { useNavigate } from "react-router-dom";

const BottomNavi = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="fixed top-[617px] w-[375px] h-[50px] bg-white opacity-80">
        <div className="flex gap-[77px] pt-[13px] justify-center">
          <div
            onClick={() => {
              navigate();
            }}
            className="w-[24px] h-[24px]"
          >
            <img src={Friends} alt="친구" />
          </div>
          <div
            onClick={() => {
              navigate();
            }}
            className="w-[24px] h-[24px]"
          >
            <img src={Home} alt="홈" />
          </div>
          <div
            onClick={() => {
              navigate();
            }}
            className="px-[3.5px] py-[5.5px] w-[24px] h-[24px]"
          >
            <img src={MY} alt="마이" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavi;
