import React from "react";
import searchIcon from "../../img/searchIcon.png";
import plusIcon from "../../img/plusIcon.png";
import notifyIcon from "../../img/notifyIcon.png";
import { useNavigate } from "react-router-dom";
const TopNavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="h-[48px] w-screen top-0 fixed bg-white opacity-80 flex ">
        <div className="h-[48px] w-[217px] text-white bg-textNavy text-[40px] pl-4">
          GNIMS
        </div>
        <img
          className="h-[24px] w-[24px] flex absolute left-[255px] mt-[13px]"
          src={searchIcon}
          alt="검색버튼"
          //navigate 경로는 검색페이지루트가 정해지면 변경하면됩니다
          onClick={() => {
            navigate("/login");
            console.log("검색페이지로이동");
          }}
        />
        <img
          className="h-[24px] w-[24px] flex absolute left-[293px] mt-[13px]"
          src={plusIcon}
          alt="추가버튼"
          onClick={() => {
            console.log("스케쥴추가페이지로이동!");
            navigate("/schedule");
          }}
        />
        <img
          className="h-[24px] w-[24px] flex absolute left-[331px] mt-[13px]
      "
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
