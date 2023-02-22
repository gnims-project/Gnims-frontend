import React, { useState } from "react";
import Modal from "react-modal";

const IsModal = ({ isModalOpen, onMoalClose, message }) => {
  const modalStr = message.ModalStr;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 10,
      right: 10,
      bottom: 0,
      backgroundColor: "#53535339",
      zIndex: 10,
    },
    content: {
      justifyContent: "center",
      background: "#fcfcfc",
      overflow: "auto",
      left: "calc(50% - 300px/2 + 0.5px)",
      top: "calc(50% - 167px/2)",
      height: "167px",
      width: "300px",
      WebkitOverflowScrolling: "touch",
      borderRadius: "16px",
      outline: "none",
      zIndex: 10,
      padding: "16px",
    },
  };
  return (
    <Modal
      isOpen={isModalOpen}
      style={modalStyle}
      ariaHideApp={false}
      aria={{
        labelledby: "heading",
        describedby: "full_description",
      }}
      shouldCloseOnEsc={false}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <div className="grid grid-flow-row gap-[20px] text-center">
        <div className="flex flex-col items-center gap-[14px] mt-[10px]">
          <h1 className="px-[10px]  text-[#12396F] text-[18px] font-[700] whitespace-pre-line">
            {modalStr.modalTitle}
          </h1>
          <p className="font-[400] text-[14px] text-[#12396F] whitespace-pre">
            {modalStr.modalMessage}
          </p>
        </div>
        <button
          className=" w-full bg-[#002C51] h-[40px] rounded-[4px] font-[600] text-[#fff]"
          onClick={onMoalClose}
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default IsModal;
