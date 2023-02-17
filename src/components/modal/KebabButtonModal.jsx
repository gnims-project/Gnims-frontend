import React, { useEffect, useRef } from "react";

const KebabModal = ({ setModalOpen, modalOpen }) => {
  const scheduleEditHandler = () => {};
  const scheduleDeleteHandler = () => {};
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="h-[686px] w-[375px] mt-[48px] bg-black bg-opacity-50 flex justify-center fixed ">
      <div className="inset-x-0 bottom-[50px] w-[375px] h-[160px] absolute rounded-t-lg bg-white">
        {" "}
        <button onClick={closeModal}>x</button>
        <div
          onClick={scheduleEditHandler}
          className="text-[#12396F] pt-[23px] h-[57px] border-solid border-[1px]"
        >
          수정
        </div>
        <div
          onClick={scheduleDeleteHandler}
          className="text-[#DE0D0D] h-[60px]"
        >
          삭제
        </div>
      </div>
    </div>
  );
};

export default KebabModal;
