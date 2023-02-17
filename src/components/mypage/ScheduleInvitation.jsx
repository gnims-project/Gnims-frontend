import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import basicImg from "../../img/User-86.png";
import { __getInvitation } from "../../redux/modules/InvitationSlice";
import InvitationCard from "./ InvitationCard";

const ScheduleInvitation = () => {
  localStorage.setItem("nickname", "동퐈");
  const nickname = localStorage.getItem("nickname");

  const dispatch = useDispatch();
  const { isLoading, error, data } = useSelector(
    (state) => state.InvitationSlice
  );

  useEffect(() => {
    dispatch(__getInvitation());
  }, []);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="flex p-5 gap-[30px] justify-items-center">
        <div className="flex-none p-2 w-[86px] h-[86px] border-2 border-solid border-red-500">
          <img className="rounded-full" src={basicImg} />
        </div>
        <div className="pt-2 border-2 border-red-500 border-solid">
          <div className="text-[18px] pt-[12px] leading-[21px]">
            <span>
              {nickname} 님에게 온 일정 초대를 한 번에 확인 할 수 있습니다.
            </span>
          </div>
        </div>
      </div>
      <div>
        {data.map((invit) => (
          <InvitationCard key={invit.eventId} invit={invit} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleInvitation;
