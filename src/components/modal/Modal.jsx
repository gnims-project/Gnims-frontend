import React from "react";
import Modal from "react-modal";
import MoonLoader from "react-spinners/MoonLoader";
import { useSelector } from "react-redux";

const IsModal = ({ onMoalClose, message, isLoding }) => {
  const modalStr = message.ModalStr;
  const modalState = useSelector((state) => state.SingupSlice.modal);

  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
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
      isOpen={modalState.isOpen}
      style={modalStyle}
      ariaHideApp={false}
      aria={{
        labelledby: "heading",
        describedby: "full_description",
      }}
      shouldCloseOnEsc={true}
    >
      <div className="grid grid-flow-row gap-[20px] text-center">
        {isLoding ? (
          <div className="flex flex-col items-center mt-[35px]">
            <MoonLoader
              color="#36a6d6"
              cssOverride={{}}
              loading
              size={50}
              speedMultiplier={1}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-[14px] mt-[10px]">
              <h1 className="px-[10px]  text-[#12396F] text-[18px] font-[700] whitespace-pre">
                {modalStr.modalTitle}
              </h1>
              <div className="h-[20px]">
                <p className="font-[400] text-[14px] text-[#12396F] whitespace-pre">
                  {modalStr.modalMessage}
                </p>
              </div>
            </div>
            <button
              className=" w-full bg-[#002C51] h-[40px] rounded-[4px] font-[600] text-[#fff]"
              onClick={onMoalClose}
            >
              확인
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default IsModal;
