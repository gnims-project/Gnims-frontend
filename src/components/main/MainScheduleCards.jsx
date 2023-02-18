import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainScheduleCards = ({ schedules }) => {
  const navigate = useNavigate();
  const invitees = schedules.invitees;
  const time = schedules.time.split(":", 2).join(":");

  const [dDay, setDday] = useState({
    hidden: false,
    dDay: schedules.dday,
  });

  const [inviteesList, setInviteesList] = useState({
    hidden: true,
    inviteesList: "",
  });

  useEffect(() => {
    if (dDay.dDay === 0) {
      setDday(() => ({
        ...dDay,
        dDay: "D",
      }));
    } else if (dDay.dDay < 0) {
      setDday(() => ({
        ...dDay,
        dDay: "D",
        hidden: true,
      }));
    }
    if (invitees.length > 1) {
      setInviteesList(() => ({
        hidden: false,
        inviteesList: `${schedules.invitees[0].username} 외 ${
          invitees.length - 1
        } 명`,
      }));
    }
  }, [invitees, dDay, schedules.invitees]);

  const onDetail = () => {
    navigate(`/detail/${schedules.eventId}`);
  };

  return (
    <div
      onClick={onDetail}
      className=" w-[335px] h-[180px] bg-[#538EDF] rounded-[10px] pt-[20px] pl-[22px] "
    >
      <div className=" text-[#ffff]">
        <div className="grid grid-flow-row gap-[19px]">
          <div className="flex flex-row h-[21px] gap-[22px] text-[18px] font-[400]">
            <div>{schedules.date}</div>
            <div>{time}</div>
          </div>
          <div className="grid grid-flow-row gap-[17px]">
            <div className="text-[18px] font-[700]">
              <div>{schedules.subject}</div>
            </div>

            <div className="h-[40px]">
              <div
                hidden={inviteesList.hidden}
                className="flex flex-row gap-[20px] "
              >
                <div className="flex -space-x-5 overflow-hidden">
                  {invitees.map((list) => {
                    return (
                      <div
                        key={list.username}
                        className="flex  rounded-full border-white border-2"
                      >
                        <img
                          className="inline-block h-[40px] w-[40px] rounded-full ring-2 "
                          src={list.profile}
                          alt="프로필이미지"
                        ></img>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center">
                  {inviteesList.inviteesList}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[40px] ">
        <div hidden={dDay.hidden} className="flex items-center w-full rigth-0 ">
          <div className="text-[#FFFFFF] font-[400] text-[18px]">
            {dDay.dDay}-DAY
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScheduleCards;
