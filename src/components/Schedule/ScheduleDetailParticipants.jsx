import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";

const ScheduleDetailParticipants = () => {
  const [schedule, setSchedule] = useState([]);

  const fetchTodos = async () => {
    await axios
      .get(`https://eb.jxxhxxx.shop/v2/events/5`, {
        // .get(`https://eb.jxxhxxx.shop/events/${id}`, {
        // .get("http://localhost:3001/todos", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((appData) => {
        //useparam으로 id찾는게 가능해지면 data[index]로 처리.
        setSchedule(appData.data.data);
      }, []);
  };

  // const [index, setIndex] = useState("0");
  // setIndex(id);
  useEffect(() => {
    fetchTodos();
  }, []);
  console.log(schedule);
  // const joiners = schedule.data.invitees;
  //joiners는 나를 포함한 참여자 배열
  // console.log(joiners);
  return (
    <div>
      {[schedule.invitees].length !== 1 ? (
        <div className="mt-[30px] h-[98px] ml-[20px]">
          참여자{" "}
          <div className="bg-[#CEE4F8] h-[50px] w-[335px] mt-[20px] p-[15px] shadow flex rounded-lg">
            {schedule.data.invitees}
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export default memo(ScheduleDetailParticipants);
