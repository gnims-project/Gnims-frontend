import React, { useEffect, useRef } from "react";

const KebabModal = ({ setModalOpen, modalOpen }) => {
  const scheduleEditHandler = () => {};
  const scheduleDeleteHandler = () => {};
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="h-[734px] w-[375px] bg-black bg-opacity-50 flex justify-center fixed ">
      <div
        // ref={modalRef}
        className="p-8 inset-x-0 bottom-0 w-[375px] h-[160px] absolute rounded-t-lg bg-white"
      >
        {" "}
        <button onClick={closeModal}>x</button>
        <div onClick={scheduleEditHandler} className="text-[#12396F] h-[60px]">
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
