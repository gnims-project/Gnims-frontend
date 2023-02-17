import React from "react";
import { useDispatch } from "react-redux";
import {
  refuseInvitation,
  acceptInvitation,
} from "../../redux/modules/InvitationSlice";

const InvitationCard = ({ invit }) => {
  console.log("뭘까요?", invit);
  console.log("뭘까요?2", invit.invitees[0].username);

  const dispatch = useDispatch();

  const onRefuseHanddler = (e) => {
    e.stopPropagation();
    const result = window.confirm("거절?");
    if (result) {
      return dispatch(refuseInvitation(invit.eventId));
    }
  };

  const onAcceptHanddler = (e) => {
    e.stopPropagation();
    const result = window.confirm("수락?");
    if (result) {
      return dispatch(acceptInvitation(invit.eventId));
    }
  };

  return (
    <div>
      <div className="rounded-[10px] my-[10px] mx-[20px] w-[335px] h-[184px] bg-gray-500">
        <div className="flex gap-[50px] relative top-[16px]">
          <div className="flex ml-[23px] gap-[20px]">
            <span className="text-sm">{invit.date}</span>
            <span className="text-sm">{invit.time}</span>
          </div>
          {invit.invitees.map((invitees) => {
            console.log("이름 맵", invitees);
            return <span className="text-sm">from.{invitees.username}</span>;
          })}
        </div>
        <div className="mx-[23px] relative top-[20px]">
          <div className="h-[58px] truncate text-md">{invit.subject}</div>
        </div>
        <div className="flex relative top-[50px] h-[57px] text-center items-center border-t-[1px] border-[#BBD7FF] border-solid">
          <div
            onClick={onRefuseHanddler}
            className="flex items-center justify-center flex-1 h-full text-center text-md"
          >
            거절
          </div>
          <div
            onClick={onAcceptHanddler}
            className="flex text-center justify-center items-center flex-1 border-l-[1px] h-full border-[#BBD7FF] border-solid text-md"
          >
            수락
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
