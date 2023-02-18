import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import kebab from "../../img/kebab.png";
import BottomNavi from "../layout/BottomNavi";
import TopNavBar from "../layout/TopNavBar";
import KebabModal from "../modal/KebabButtonModal";
import ScheduleDetailParticipants from "./ScheduleDetailParticipants";

const ScheduleDetail = () => {
  //  모달 노출시키는 여부
  const [modalOpen, setModalOpen] = useState(false);
  const showModalHandler = () => {
    setModalOpen(true);
  };
  //id구하기
  const { id } = useParams();

  //데이터베이스를 담을 schedule변수.
  const [schedule, setSchedule] = useState([]);
  const fetchTodos = async () => {
    await axios
      // .get(`https://eb.jxxhxxx.shop/v2/events/5`, {
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

  // const subject = schedule.data.subject;
  // const [index, setIndex] = useState("0");
  // setIndex(id);
  useEffect(() => {
    fetchTodos();
  }, [id]);
  console.log(schedule);

  const numberOfJoiner = schedule.invitees.length;
  console.log(numberOfJoiner);

  const joinerList = [];
  for (let i = 0; i < numberOfJoiner; i++) {
    joinerList.push(
      <div className="ml-[5px]">{schedule.invitees[i].username}</div>
    );
  }

  return (
    <div className="bg-[#EDF7FF] h-[734px] width-[375px]">
      <TopNavBar />
      <div>
        {modalOpen && <KebabModal setModalOpen={setModalOpen} />}
        {/* bg는 유저가 등록시에 선택한 cardColor로   */}
        <div
          // bg-${schedule.data.cardColor}
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
            {schedule.dday === 0 ? <div>day</div> : <div>{schedule.dday}</div>}
          </div>
        </div>
        <div className="text-[#12396F]">
          <div>
            {numberOfJoiner !== 1 ? (
              <div className="mt-[30px] h-[98px] ml-[20px]">
                참여자{" "}
                <div className="bg-[#CEE4F8] h-[50px] w-[335px] mt-[20px] p-[15px] shadow flex rounded-lg">
                  {joinerList}
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
          <div className="h-[234px] mt-[30px] mb-[8px] ml-[20px]">
            일정내용{" "}
            <div className="bg-[#CEE4F8] shadow h-[186px] w-[335px] mt-[20px] p-[15px] flex rounded-lg">
              {schedule.content}
            </div>
          </div>
        </div>{" "}
      </div>
      {modalOpen ? false : <BottomNavi />}
    </div>
  );
};

export default memo(ScheduleDetail);
