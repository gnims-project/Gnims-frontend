import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import kebab from "../../img/kebab.png";
import BottomNavi from "../layout/BottomNavi";
import TopNavBar from "../layout/TopNavBar";
import KebabModal from "../modal/KebabButtonModal";

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

  useEffect(() => {
    fetchTodos();
  }, []);

  const joiner = schedule.invitees;
  console.log(joiner);

  console.log(schedule.invitees);
  const numberOfJoiner = joiner && joiner.length;

  return (
    <div className="bg-[#EDF7FF] h-[734px] width-[375px]">
      <TopNavBar />
      <div>
        {modalOpen && <KebabModal setModalOpen={setModalOpen} />}
        <div
          className={`h-[250px] bg-${schedule.cardColor} pl-[18px] pt-[71px] pr-[21px] text-white`}
        >
          <div className="flex flex-row-reverse">
            <img
              className="h-[20px] flex "
              src={kebab}
              alt="케밥메뉴"
              onClick={showModalHandler}
            />
          </div>
          <div className="flex space-x-3 text-[18px] mt-[-18px] font-light ">
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
                <div className="bg-[#CEE4F8] h-[50px] w-[335px] mt-[20px] p-[15px] shadow flex rounded-lg">
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
              <div className="bg-[#CEE4F8] shadow h-[186px] w-[335px] mt-[20px] p-[15px] flex rounded-lg">
                {schedule.content}
              </div>
            </div>
          ) : (
            false
          )}
        </div>{" "}
      </div>
      {modalOpen ? false : <BottomNavi />}
    </div>
  );
};

export default memo(ScheduleDetail);
