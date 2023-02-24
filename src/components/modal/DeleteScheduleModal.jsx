import React from "react";

const DeleteScheduleModal = (confirmDeleteHandler, setDeleteModalOpen) => {
  return (
    <div>
      딜리트모달이지롱{" "}
      <div className="text-black pt-8 items-center w-[300px] h-[167px]  text-center rounded-[16px] fixed top-[250px] bg-white">
        <div className="text-[18px] font-bold flex flex-col ">
          해당 일정을 삭제하시겠습니까?{" "}
        </div>
        <div className="mt-[14px] text-[14px] text-[#6F6F6F]">
          삭제된 일정은 복구가 불가능합니다.
        </div>
        <button
          className="bg-[#A31414] rounded-[4px] h-[40px] w-[127px] text-white mt-[18px]"
          onClick={confirmDeleteHandler}
        >
          삭제
        </button>
        <button
          className="ml-[14px] h-[40px] rounded-[4px] border-solid border-black border-[1px] w-[127px] text-black mt-[18px]"
          onClick={() => setDeleteModalOpen(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteScheduleModal;
