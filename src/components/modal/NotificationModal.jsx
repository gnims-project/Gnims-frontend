import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({ close, content }) => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-[375px] bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
      <div className="text-black pt-8 items-center w-[300px] h-[167px]  text-center rounded-[16px] fixed top-[250px] bg-white">
        <div className="text-[18px] font-bold flex flex-col ">
          초대가 도착했습니다!
        </div>
        <div className="mt-[14px] text-[14px] text-[#6F6F6F]">{content}</div>
        <button
          className="bg-[#002C51] rounded-[4px] h-[40px] w-[127px] text-white mt-[18px]"
          onClick={() => navigate("/notification")}
        >
          알림페이지 가기
        </button>{" "}
        <button
          className="ml-[14px] h-[40px] rounded-[4px] border-solid border-black border-[1px] w-[127px] text-black mt-[18px]"
          onClick={() => close()}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
