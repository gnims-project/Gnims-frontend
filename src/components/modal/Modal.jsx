import React, { useState } from "react";
import Modal from "react-modal";

const IsModal = ({ isModalOpen, onMoalClose, children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 10,
      right: 10,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      zIndex: 10,
    },
    content: {
      justifyContent: "center",
      background: "#fcfcfc",
      overflow: "auto",
      top: "42vh",
      left: "40vw",
      right: "40vw",
      bottom: "42vh",
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
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
      <div id="heading">{children}</div>
      <button className="mt-10" onClick={onMoalClose}>
        확인
      </button>
    </Modal>
  );
};

export default IsModal;
