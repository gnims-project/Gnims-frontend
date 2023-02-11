import React from "react";
import Modal from "react-modal";

const IsModal = ({ isModalOpen, onMoalClose, children }) => {
  return (
    <Modal isOpen={isModalOpen}>
      <div>{children}</div>
      <button onClick={onMoalClose}>확인</button>
    </Modal>
  );
};

export default IsModal;
