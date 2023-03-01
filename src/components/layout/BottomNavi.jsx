import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { offFollow, onFollow, offMy, onMy, offHome, onHome } from "../../img";

const BottomNavi = () => {
  //클릭했을때 아이콘이 바뀌게 하기 위한 스테이트
  const [onIcon, setOnicon] = useState();
  // const [onIcon, setOnicon] = useState(true,false,false]); 이런 방법도 있음
  const navigate = useNavigate();

  //클릭했을때 아이콘을 바꾸기 위한 함수
  const handleIconClick = (iconName) => {
    setOnicon(iconName);
  };

  return (
    <div className="relative">
      <div className="min-w-[375px] h-[50px] bg-white items-center justify-center flex">
        <div className="flex gap-[77px] pt-[13px] justify-center">
          <div
            onClick={() => {
              // setOnicon([true,false,false])
              handleIconClick("follow");
              navigate("/follow");
            }}
            className="w-[24px] cursor-pointer h-[24px]"
          >
            <img
              src={onIcon === "follow" ? onFollow : offFollow}
              alt="팔로우"
            />
            {/* <img src={onIcon[0] ? onFollow : offFollow} alt="팔로우" /> */}
          </div>
          <div
            onClick={() => {
              // setOnicon([false,ture,false])
              handleIconClick("home");
              navigate("/main");
            }}
            className="w-[24px] h-[24px] cursor-pointer"
          >
            <img src={onIcon === "home" ? onHome : offHome} alt="홈" />
            {/* <img src={onIcon[1]? onHome : offHome} alt="홈" /> */}
          </div>
          <div
            onClick={() => {
              // setOnicon([false,false,true])
              handleIconClick("My");
              navigate("/profile");
            }}
            className="cursor-pointer px-[3.5px] c py-[5.5px] w-[24px] h-[24px]"
          >
            <img src={onIcon === "My" ? onMy : offMy} alt="마이" />
            {/* <img src={onIcon[2] ? onMy : offMy} alt="마이" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavi;
