import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getInvitation } from "../../redux/modules/InvitationSlice";
import InvitationCard from "./ InvitationCard";
import PageInfoCard from "./PageInfoCard";

const ScheduleInvitation = () => {
  const nickname = localStorage.getItem("nickname");
  const profileImage = localStorage.getItem("profileImage");
  const dispatch = useDispatch();

  const { isLoading, error, invitation } = useSelector(
    (state) => state.InvitationSlice
  );
  console.log("무슨 스테이트?", invitation);

  useEffect(() => {
    dispatch(__getInvitation());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="flex p-5 gap-[30px] justify-items-center">
        <div className="">
          <img
            className="rounded-full object-fill w-[86px] h-[86px]"
            src={profileImage}
            alt="사용자 프로필 사진"
          />
        </div>
        <div>
          <div className="text-[18px] font-[600] w-[198px] h-[44] py-[20px] leading-[21px]">
            <span>{nickname} 님에게 온 일정 초대를 한 번에 볼 수 있어요.</span>
          </div>
        </div>
      </div>
      <div>
        {invitation.map((invit) => (
          <InvitationCard key={invit.eventId} invit={invit} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleInvitation;
