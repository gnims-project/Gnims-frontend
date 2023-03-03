import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import kebab from "../../img/kebab.png";
import BottomNavi from "../layout/BottomNavi";
import KebabModal from "../modal/KebabButtonModal";
import { useDispatch, useSelector } from "react-redux";
import { __getScheduleDetail } from "../../redux/modules/ScheduleSlice";
import schedulealoneIcon from "../../img/schedulealone.png";

const ScheduleDetail = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.ScheduleSlice.oldschedules);
  //  모달 노출시키는 여부
  const [modalOpen, setModalOpen] = useState(false);
  const showModalHandler = () => {
    setModalOpen(true);
  };
  //id구하기
  const { id } = useParams();
  const time = schedule.time?.split(":", 2).join(":");
  useEffect(() => {
    dispatch(__getScheduleDetail(id));
  }, []);
  const joiner = schedule.invitees;
  console.log(joiner);
  const numberOfJoiner = joiner && joiner.length;
  const hostId = schedule.hostId;
  //isHidden은 해당 스케쥴이 본인의 스케쥴이 아닐 땐 케밥버튼이 보이지 않게하기 위해 쓰인다. 기본값은 flex이고,
  let isHidden;
  //스케쥴의 참여자에 로그인한 본인의 닉네임이 포함되지 않으면 hidden값이 입혀진다.
  if (hostId !== Number(sessionStorage.getItem("userId"))) {
    isHidden = "hidden";
  }

  return (
    <div>
      <div className="bg-[#F8FCFF] h-full width-[375px]">
        <div>
          <div className="fixed bottom-0">
            {/* 케밥모달이 열리면 bottomNavi는 사라집니다 */}
            {modalOpen ? false : <BottomNavi />}
          </div>
          {modalOpen && <KebabModal setModalOpen={setModalOpen} id={id} />}
          <div
            className={`h-[212px] bg-${schedule.cardColor} pl-[18px] w-[375px] pt-[23px] pr-[21px] text-white 
           `}
          >
            <div className="flex flex-row-reverse ">
              <img
                className={`h-[20px] ${isHidden} row cursor-pointer`}
                src={kebab}
                alt="케밥메뉴"
                onClick={showModalHandler}
              />
            </div>
            <div className="flex space-x-3 text-[18px]  font-light ">
              <div>{schedule.date}</div> <div> {time}</div>
            </div>
            <div className="mt-[28px] font-semibold text-[24px]">
              {schedule.subject}
            </div>{" "}
            <div className="place-content-end font-light flex text-[18px] mt-[45px]">
              D-
              {schedule.dday === 0 ? (
                <div>DAY</div>
              ) : (
                <div>{schedule.dday}</div>
              )}
            </div>
          </div>
          <div className="">
            <div>
              {/* 참여자는 2명이상일 때부터 화면에 보입니다. */}
              {numberOfJoiner !== 1 ? (
                <div className="mt-[30px] h-[98px] ml-[20px]">
                  참여자
                  <div className="bg-white h-[50px] w-[335px] mt-[20px] p-[15px] drop-shadow-lg flex rounded-lg">
                    {joiner &&
                      joiner.map((a) => {
                        return (
                          <span className="text-sm ml-[5px]">{a.username}</span>
                        );
                      })}
                  </div>
                </div>
              ) : (
                false
              )}
            </div>
            {/* 일정의 내용이 없을 땐 화면에 보이지 않습니다. */}
            {schedule.content ? (
              <div className="h-[234px] w-[375px] mt-[30px] mb-[8px] ml-[20px]">
                일정내용{" "}
                <div className="bg-white word-wrap break-words whitespace-normal  shadow-lg h-[186px] w-[335px] mt-[20px] p-[20px] flex rounded-lg">
                  <div className="w-[295px] relative">{schedule.content}</div>
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
    </div>
  );
};

export default ScheduleDetail;
