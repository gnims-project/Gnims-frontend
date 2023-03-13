import React, { useState } from "react";
import deleteIcon from "../../img/deleteIcon.png";
import editIcon from "../../img/editIcon.png";
import barIcon from "../../img/bar.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deleteSchedule } from "../../redux/modules/ScheduleSlice";
import DeleteScheduleModal from "./DeleteScheduleModal";

const KebabModal = ({ setModalOpen, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scheduleEditHandler = () => {
    //스케줄 변경을 위한 파라미터 값을 넘긴다.
    navigate(`/schedule/edit`, { state: { type: "edit", id: id } });
  };
  const scheduleDeleteHandler = () => {
    setDeleteModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const userId = sessionStorage.getItem("userId");

  const confirmDeleteHandler = () => {
    //DELETE 기능넣으면 됨
    dispatch(__deleteSchedule({ id, userId, dispatch }));
    navigate("/main");
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      <div className="h-full w-[375px] bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
        {deleteModalOpen ? (
          // <DeleteScheduleModal/>
          <div className="text-black pt-8 items-center w-[300px] h-[167px] text-center rounded-[16px] fixed top-[38%] z-20 bg-white ">
            <div className="text-[18px] font-bold flex flex-col ">
              해당 일정을 삭제하시겠습니까?{" "}
            </div>
            <div className="mt-[14px] text-[14px] text-[#6F6F6F]">
              삭제된 일정은 복구가 불가능합니다.
            </div>
            <button
              className="bg-[#A31414] rounded-[4px]  h-[40px] w-[127px] text-white mt-[18px]"
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
        ) : (
          //이하는 모두 케밥버튼눌렀을 때 수정&삭제 모달
          <div className=" bottom-0 w-[375px] h-[205px] rounded-t-lg bg-white fixed ">
            <div className="h-[25px]  pt-[11px]">
              <img
                src={barIcon}
                alt="bar"
                className="w-[80px] h-[3px] m-auto"
              />
            </div>
            <div
              onClick={scheduleEditHandler}
              className="cursor-pointer text-[#121213] font-bold pt-[23px] h-[60px] flex row border-solid border-[rgb(226,226,226)] border-b-[1px]"
            >
              <img
                src={editIcon}
                alt="edit"
                className="w-[18px] h-[18px] ml-[30px] mr-[20px]"
              />
              수정
            </div>
            <div
              onClick={scheduleDeleteHandler}
              className="cursor-pointer text-[#A31414] font-bold pt-[23px] h-[60px] flex row border-solid border-[rgb(226,226,226)] border-b-[1px]"
            >
              <img
                src={deleteIcon}
                alt="delete"
                className="w-[24px] h-[24px] ml-[30px] mr-[20px] z-0"
              />
              삭제
            </div>
            <div
              className="cursor-pointer m-auto text-center pt-[22px] h-[60px] font-bold"
              onClick={closeModal}
            >
              닫기
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KebabModal;
