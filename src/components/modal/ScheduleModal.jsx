import React from "react";

const ScheduleModal = ({ setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="h-screen w-[375px] bg-black bg-opacity-50 flex justify-center fixed items-center">
      <div className="text-textNavy pt-8 items-center w-[300px] h-[167px] absolute text-center rounded-[16px] bg-white">
        <div className="text-[18px] font-bold flex flex-col">
          일정을 추가할 수 없어요.
        </div>
        <div className="mt-[14px] text-[14px]">
          날짜와 시간, 일정제목은 <br />
          필수 입력사항이예요.
        </div>
        <button
          className="bg-[#002C51] h-[40px] w-[268px] text-white mt-[18px]"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;
