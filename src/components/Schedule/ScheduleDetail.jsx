import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import kebab from "../../img/kebab.png";
import BottomNavi from "../layout/BottomNavi";
import KebabModal from "../modal/KebabButtonModal";
import gnimsIcon from "../../img/gnimslogo1.png";

const ScheduleDetail = () => {
  //  모달 노출시키는 여부
  const [modalOpen, setModalOpen] = useState(false);
  const showModalHandler = () => {
    setModalOpen(true);
  };
  //id구하기
  const { id } = useParams();

  //데이터베이스를 담을 schedule
  const [schedule, setSchedule] = useState([]);
  const fetchTodos = async () => {
    await axios
      .get(`https://eb.jxxhxxx.shop/events/${id}`, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((appData) => {
        setSchedule(appData.data.data);
      }, []);
  };
  const time = schedule.time?.split(":", 2).join(":");
  console.log(schedule);
  useEffect(() => {
    fetchTodos();
  }, []);

  const joiner = schedule.invitees;
  console.log(joiner);
  const numberOfJoiner = joiner && joiner.length;
  const hostId = schedule.hostId;
  //isHidden은 해당 스케쥴이 본인의 스케쥴이 아닐 땐 케밥버튼이 보이지 않게하기 위해 쓰인다. 기본값은 flex이고,
  let isHidden = "";
  //스케쥴의 참여자에 로그인한 본인의 닉네임이 포함되지 않으면 hidden값이 입혀진다.
  if (hostId !== Number(localStorage.getItem("userId"))) {
    isHidden = "hidden";
  }
  console.log(hostId === Number(localStorage.getItem("userId")));
  console.log(hostId);
  console.log(Number(localStorage.getItem("userId")));

  return (
    <div className="bg-[#EDF7FF] h-full width-[375px]">
      <div>
        <div className="fixed bottom-0">
          {/* 케밥모달이 열리면 bottomNavi는 사라집니다 */}
          {modalOpen ? false : <BottomNavi />}
        </div>
        {modalOpen && <KebabModal setModalOpen={setModalOpen} id={id} />}
        <div
          className={`h-[212px] bg-${schedule.cardColor} pl-[18px] pt-[23px] pr-[21px] text-white`}
        >
          <div className="flex flex-row-reverse ">
            <img
              className={`h-[20px] ${isHidden} row`}
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
          <div className="place-content-end font-light flex text-[18px] mt-[70px]">
            D-
            {schedule.dday === 0 ? <div>DAY</div> : <div>{schedule.dday}</div>}
          </div>
        </div>
        <div className="text-[#12396F]">
          <div>
            {/* 참여자는 2명이상일 때부터 화면에 보입니다. */}
            {numberOfJoiner !== 1 ? (
              <div className="mt-[30px] h-[98px] ml-[20px]">
                참여자
                <div className="bg-[#CEE4F8] h-[50px] w-[335px] mt-[20px] p-[15px] drop-shadow-lg flex rounded-lg">
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
            <div className="h-[234px] mt-[30px] mb-[8px] ml-[20px]">
              일정내용{" "}
              <div className="bg-[#CEE4F8] shadow-lg h-[186px] w-[335px] mt-[20px] p-[15px] flex rounded-lg">
                {schedule.content}
              </div>
            </div>
          ) : (
            false
          )}
          {!schedule.content && numberOfJoiner === 1 ? (
            <div>
              <img
                src={gnimsIcon}
                alt="gnimslogo"
                className="ml-[50px] opacity-[60%] h-[100px] flex justify-center mt-[80px]"
              />
              <div className="font-bold mt-[30px] text-center">
                혼자만의 일정이군요! 좋은 하루 되세요!
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(ScheduleDetail);
