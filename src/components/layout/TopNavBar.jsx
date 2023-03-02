import React from "react";
import searchIcon from "../../img/searchIcon.png";
import plusIcon from "../../img/plusIcon.png";
import notifyIcon from "../../img/notifyIcon.png";
import { useNavigate } from "react-router-dom";
import gnimsLogo from "../../img/gnimsLogo.png";

const TopNavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[48px] bg-white opacity-80 flex justify-between pr-[13px] pl-[13px]">
      <div className="h-[48px] w-[217px]">
        <img
          src={gnimsLogo}
          alt="gnimsLogo"
          className="mt-[15px] h-[20px] w-[73px] cursor-pointer"
          onClick={() => {
            navigate("/main");
          }}
        />
      </div>
      <div className="flex flex-row gap-[19px]">
        <img
          className="h-[24px] w-[24px] flex left-[255px] cursor-pointer mt-[13px]"
          src={searchIcon}
          alt="검색버튼"
          //navigate 경로는 검색페이지루트가 정해지면 변경하면됩니다
          onClick={() => {
            navigate("/userSearch");
            console.log("검색페이지로이동");
          }}
        />
        <img
          className="h-[24px] cursor-pointer w-[24px] flex left-[293px] mt-[13px]"
          src={plusIcon}
          alt="추가버튼"
          onClick={() => {
            console.log("스케쥴추가페이지로이동!");
            //스케줄 추가를 하기 위한 파라미터 값을 넘긴다.
            navigate("/schedule", { state: { type: "add", id: "" } });
          }}
        />
        <img
          className="h-[24px] w-[24px] cursor-pointer flex left-[331px] mt-[13px]"
          src={notifyIcon}
          alt="알림버튼"
          onClick={() => {
            console.log("알림페이지로 이동");
            navigate("/notification");
          }}
        />
      </div>
    </div>
  );
};

export default TopNavBar;
