import React from "react";
import { useNavigate } from "react-router-dom";

const ScheduleAddModal = ({ state }) => {
  const navigate = useNavigate();
  const closeModal = () => navigate("/main");

  return (
    <div>
      <div className="h-screen w-[375px] bg-black bg-opacity-50 flex justify-center items-center fixed z-10 mt-[-48px]">
        <div className="pt-8  items-center w-[300px] h-[150px] text-center fixed top-[38%] rounded-[16px] bg-white">
          {state.type === "edit" ? (
            <div className="text-[18px] font-bold flex flex-col">일정이 수정 되었습니다!</div>
          ) : (
            <div className="text-[18px] font-bold flex flex-col">일정이 추가되었습니다!</div>
          )}
          <button className="bg-[#002C51] mt-8 h-[40px] w-[268px] text-white  rounded-sm" onClick={closeModal}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAddModal;
