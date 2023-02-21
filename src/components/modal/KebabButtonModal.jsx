import React, { useEffect, useRef, useState } from "react";
import deleteIcon from "../../img/deleteIcon.png";
import editIcon from "../../img/editIcon.png";

const KebabModal = ({ setModalOpen, modalOpen }) => {
  const scheduleEditHandler = () => {};
  const scheduleDeleteHandler = () => {
    setDeleteModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const [kebabClose, setKebabClose] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      <div className="h-screen w-[375px] mt-[48px] bg-black bg-opacity-50 flex justify-center fixed z-1 ">
        {deleteModalOpen ? (
          <div></div>
        ) : (
          <div className="inset-x-0 bottom-0 w-[375px] h-[177px] mb-6 absolute rounded-t-lg bg-white z-2">
            <button className="" onClick={closeModal}>
              x
            </button>
            <div
              onClick={scheduleEditHandler}
              className="text-[#12396F] pt-[23px] h-[57px] flex row border-solid border-[#BBD7FF] border-b-[1px]"
            >
              <img
                src={editIcon}
                alt="edit"
                className="w-[24px] h-[24px] ml-[30px] mr-[20px]"
              />
              수정
            </div>
            <div
              onClick={scheduleDeleteHandler}
              className="text-[#A31414] flex row  h-[60px] pt-[23px] ml-[30px] mb-[17px] "
            >
              <img
                src={deleteIcon}
                alt="delete"
                className="w-[24px] h-[24px] mr-[20px]"
              />
              삭제
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KebabModal;
