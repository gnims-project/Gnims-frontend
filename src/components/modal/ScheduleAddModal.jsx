import React from "react";

const ScheduleAddModal = (setCompleteModal) => {
  const closeModal = () => {
    setCompleteModal(false);
  };
  return (
    <div>
      <div className="h-screen w-[375px] bg-black bg-opacity-50 flex justify-center fixed items-center">
        <div className="pt-12 items-center w-[300px] h-[167px] text-center fixed top-[230px] rounded-[16px] bg-white">
          <div className="text-[18px] font-bold flex flex-col">
            일정이 추가되었습니다!
          </div>
          <button
            className="bg-[#002C51] h-[40px] w-[268px] text-white mt-[18px]"
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAddModal;
