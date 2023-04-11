import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import kebab from "../../img/kebab.png";
import BottomNavi from "../layout/BottomNavi";
import KebabModal from "../modal/KebabButtonModal";
import { useDispatch, useSelector } from "react-redux";
import { __getScheduleDetail, scheduleReset } from "../../redux/modules/ScheduleSlice";
import schedulealoneIcon from "../../img/schedulealone.png";

const ScheduleDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const schedule = useSelector((state) => state.ScheduleSlice.oldschedules);

  useLayoutEffect(() => {
    dispatch(__getScheduleDetail(id));
    return () => {
      dispatch(scheduleReset());
    };
  }, [dispatch, id]);

  const time = schedule.time?.split(":", 2).join(":");
  const joiner = schedule.invitees;
  const numberOfJoiner = joiner && joiner.length;
  const hostId = schedule.hostId;
  // let isHidden;
  // if (hostId !== Number(sessionStorage.getItem("userId"))) {
  //   isHidden = "hidden";
  // }
  //code refactored Mar22
  const isHidden = hostId !== Number(sessionStorage.getItem("userId")) ? "hidden" : undefined;

  const showModalHandler = () => {
    setModalOpen(true);
  };
  //id구하기

  //isHidden은 해당 스케쥴이 본인의 스케쥴이 아닐 땐 케밥버튼이 보이지 않게하기 위해 쓰인다. 기본값은 flex이고,

  return (
    <div className="width-[375px]">
      <div className="bg-[#F8FCFF] h-full width-[375px]">
        <div className="fixed bottom-0">
          {/* 케밥모달이 열리면 bottomNavi는 사라집니다 */}
          {modalOpen ? false : <BottomNavi />}
        </div>
        {modalOpen && <KebabModal setModalOpen={setModalOpen} id={id} />}
        <div
          className={`h-[202px] bg-${schedule.cardColor} pl-[18px] w-[375px] pt-[23px] pr-[21px] text-white align-
           `}
        >
          <div className="flex space-x-3 text-[18px]  font-extralight ">
            <div>{schedule.date}</div> <div> {time}</div>
            <div className="w-[160px] flex pl-[155px]" onClick={showModalHandler}>
              <img className={`h-[20px] ${isHidden} row cursor-pointer `} src={kebab} alt="케밥메뉴" />
            </div>
          </div>
          <div className="mt-[28px] font-semibold text-[24px]">{schedule.subject}</div>
          <div className="place-content-end font-extralight flex text-[18px] mt-[66px]">
            D-
            {schedule.dday === 0 ? <div>DAY</div> : <div>{schedule.dday}</div>}
          </div>
        </div>
        <div className="">
          <div>
            {/* 참여자는 2명이상일 때부터 화면에 보입니다. */}
            {numberOfJoiner !== 1 ? (
              <div className="mt-[30px] ml-[20px] h-[98px]">
                참여자
                <div className="bg-white h-[50px] border-solid border-[1px] border-[#E2E2E2] w-[335px] mt-[20px] p-[15px] lg flex rounded-lg">
                  {joiner &&
                    joiner.map((a) => {
                      return <span className="text-sm ml-[5px]">{a.username}</span>;
                    })}
                </div>
              </div>
            ) : (
              false
            )}
          </div>
          {/* 일정의 내용이 없을 땐 화면에 보이지 않습니다. */}
          {schedule.content ? (
            <div className="h-[234px] ml-[20px] mt-[30px] mb-[8px] ">
              일정내용{" "}
              <div className="bg-white border-solid border-[1px] border-[#E2E2E2] word-wrap break-words whitespace-normal h-[186px] w-[335px] mt-[20px] p-[20px] flex rounded-lg">
                <div className="w-[295px] ">{schedule.content}</div>
              </div>
            </div>
          ) : (
            false
          )}
          {!schedule.content && numberOfJoiner === 1 ? (
            <div className="m-auto justify-center items-center mt-[80px]">
              <img
                src={schedulealoneIcon}
                alt="gnimslogo"
                className="m-auto w-[167px] h-[153px] flex justify-center items-center"
              />
              <div className="font-medium mt-[30px] text-[20px] text-center text-black">
                혼자만의 일정이군요! <br />
                때로는 개인시간도 중요한 법이죠.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
