import React from "react";
import FriendsHeader from "./FriendsHeader";
import MainScheduleCards from "./MainScheduleCards";

const Friends200 = ({ schedule, status }) => {
  return (
    <div>
      <FriendsHeader status={status} />
      <div className="flex flex-col gap-[30px] mt-[28px] rounded-[10px]">
        {schedule?.map((list) => (
          <MainScheduleCards key={list.eventId} schedules={list} />
        ))}
      </div>
    </div>
  );
};

export default Friends200;
