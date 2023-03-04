import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainScheduleCards = ({ schedules }) => {
  const navigate = useNavigate();
  const invitees = schedules.invitees;

  const hourClock = schedules.time.split(":", 2)[0];
  let hour = 0;
  const min = schedules.time.split(":", 2)[1];
  const morningAfternoon = ["오전", "오후"];
  if (hourClock > 12) {
    hour = hourClock - 12;
  } else {
    hour = hourClock;
  }
  const time = `${hour}:${min}`;
  const bgColor = `bg-${schedules.cardColor}`;

  const [inviteesList, setInviteesList] = useState({
    hidden: true,
    inviteesList: "",
  });

  useEffect(() => {
    if (invitees.length > 1) {
      setInviteesList(() => ({
        hidden: false,
        inviteesList: `${schedules.invitees[0].username} 외 ${
          invitees.length - 1
        } 명`,
      }));
    }
  }, [invitees, schedules.invitees]);

  const onDetail = () => {
    navigate(`/detail/${schedules.eventId}`);
  };

  return (
    <div
      onClick={onDetail}
      className={`w-[335px] h-[180px] bg-white rounded-[10px]  border border-solid border-[#E8E8E8]  shadow-md`}
    >
      <div
        className={`flex items-center  h-[14px] ${bgColor} rounded-t-[10px] `}
      >
        <ul className="ml-[9px] flex flex-row gap-[4px]">
          {[0, 1, 2].map((list) => (
            <li key={list} className="bg-white h-[4px] w-[4px] rounded-full" />
          ))}
        </ul>
      </div>

      <div className="pt-[20px] pl-[22px] pr-[22px]">
        <div className="text-textBlack ">
          <div className="grid grid-flow-row gap-[20px]">
            <div className="flex flex-row h-[21px] gap-[25px] text-[16px] font-[400]">
              <div>{schedules.date}</div>
              {hourClock > 12 ? (
                <div>{` ${morningAfternoon[1]} ${time}`}</div>
              ) : (
                <div>
                  {morningAfternoon[0]}
                  {time}
                </div>
              )}
              <div className="font-[700]">
                D-
                {schedules.dday === 0 ? <>DAY</> : <>{schedules.dday}</>}
              </div>
            </div>

            <div className="grid grid-flow-row gap-[17px]">
              <div className="text-[18px] font-[700]">
                <div>{schedules.subject}</div>
              </div>

              <div className="h-[40px]">
                <div hidden={inviteesList.hidden} className="flex space-x-32">
                  <div className="flex -space-x-5 overflow-hidden ">
                    {invitees.map((list, index) => {
                      return (
                        <div
                          key={index}
                          className="flex  rounded-full border-white border-2"
                        >
                          <img
                            className="inline-block h-[40px] w-[40px] rounded-full"
                            src={list.profile}
                            alt="프로필이미지"
                          ></img>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center text-[#6F6F6F]">
                    {inviteesList.inviteesList}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[40px] text-rigth">
          <div className="items-center text-right w-full rigth-0 "></div>
        </div>
      </div>
    </div>
  );
};

export default MainScheduleCards;
