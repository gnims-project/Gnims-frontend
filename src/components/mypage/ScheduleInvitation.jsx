import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../page/LoadingPage";
import { __getInvitation } from "../../redux/modules/InvitationSlice";
import InvitationCard from "./ InvitationCard";
import PageInfoCard from "./PageInfoCard";

const ScheduleInvitation = () => {
  const nickname = sessionStorage.getItem("nickname");
  const profileImage = sessionStorage.getItem("profileImage");
  const dispatch = useDispatch();

  const { isLoading, error, invitation } = useSelector(
    (state) => state.InvitationSlice
  );
  console.log("무슨 스테이트?", invitation);

  useEffect(() => {
    dispatch(__getInvitation());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="flex p-5 gap-[30px] justify-items-center">
        <PageInfoCard profileImg={profileImage} nickname={nickname}>
          에게 온 일정 초대를 한 번에 볼 수 있어요.
        </PageInfoCard>
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
