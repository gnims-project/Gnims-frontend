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
        setSchedule(appData.data.data);
        console.log(schedule);
      }, []);
  };
  // const a = schedule.invitees.length;
  // const [index, setIndex] = useState("0");
  // setIndex(id);
  useEffect(() => {
    fetchTodos();
  }, []);
  // console.log(schedule);
  // console.log(schedule.invitees.length);
  // console.log(schedule.invitees);
  // console.log(a.length);
  const invitees = schedule.invitees;
  console.log(schedule);
  console.log(invitees);
  return (
    <div>
      {schedule.invitees.length !== 1 ? (
        <div className="mt-[30px] h-[98px] ml-[20px]">
          참여자{" "}
          <div className="bg-[#CEE4F8] h-[50px] w-[335px] mt-[20px] p-[15px] shadow flex rounded-lg">
            {/* {schedule.invitees} */}
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
export default ScheduleDetailParticipants;
