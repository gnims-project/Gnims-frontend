import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refuseInvitation, acceptInvitation } from "../../redux/modules/InvitationSlice";
import InvitaionResponse from "../modal/InvitaionResponse";

const InvitationCard = ({ invit }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const hourClock = invit.time.split(":", 2)[0];
  let hour = 0;
  const min = invit.time.split(":", 2)[1];
  const morningAfternoon = ["오전", "오후"];
  if (hourClock > 12) {
    hour = hourClock - 12;
  } else {
    hour = hourClock;
  }
  const time = `${hour}:${min}`;
  const bgColor = `bg-${invit.cardColor}`;

  const dispatch = useDispatch();

  const onRefuseHanddler = (e) => {
    setOpen(true);
    e.stopPropagation();
    setMessage("초대를 거절하시겠습니까?");
  };

  const onAcceptHanddler = (e) => {
    setOpen(true);
    e.stopPropagation();
    setMessage("초대를 수락하시겠습니까?");
  };

  return (
    <div>
      {open && <InvitaionResponse message={message} setOpen={setOpen} invit={invit} />}
      <div className="rounded-[10px] mb-[30px] mx-[20px] w-[335px] h-[184px] bg-white shadow-md">
        <div className={`flex items-center h-[14px] ${bgColor} rounded-t-[10px]`}>
          <ul className="ml-[10px] flex flex-row gap-[4px]">
            {[0, 1, 2].map((list) => (
              <li key={list} className="bg-white h-[4px] w-[4px] rounded-full" />
            ))}
          </ul>
        </div>
        <div className="flex relative top-[16px]">
          <div className="flex gap-[30px] m-auto">
            <span className="text-sm">{invit.date}</span>
            {hourClock > 12 ? (
              <span className="text-sm">{`${morningAfternoon[1]} ${time}`}</span>
            ) : (
              <span className="text-sm">{`${morningAfternoon[0]} ${time}`}</span>
            )}

            <span className="text-sm truncate">from.{invit.hostname}</span>
          </div>
        </div>
        <div className="mx-[23px] relative top-[40px]">
          <div className="h-[58px] truncate text-md">{invit.subject}</div>
        </div>
        <div className="flex relative top-[36px] h-[57px] text-center items-center border-t-[1px] border-[#E8E8E8] border-solid">
          <div
            onClick={onRefuseHanddler}
            className="flex items-center justify-center flex-1 h-full text-center text-md"
          >
            거절
          </div>
          <div
            onClick={onAcceptHanddler}
            className="flex text-center justify-center items-center flex-1 border-l-[1px] h-full border-[#E8E8E8] border-solid text-md"
          >
            수락
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
