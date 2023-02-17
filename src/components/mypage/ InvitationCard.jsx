import React from "react";
import { useSelector } from "react-redux";

const InvitationCard = ({ invit }) => {
  console.log("뭘까요?", invit);

  return (
    <div>
      <div className="rounded-[10px] mx-[20px] w-[335px] h-[184px] bg-gray-500">
        <div className="flex gap-[50px] relative top-[16px] ">
          <div className="flex ml-[23px]  gap-[20px]">
            <span className="text-sm">{invit.date}</span>
            <span className="text-sm">{invit.time}</span>
          </div>
          <span className="text-sm">from.{invit.invitees.username}</span>
        </div>
        <div className="ml-[23px] relative top-[20px]">
          <div className="p-2 text-md">
            일이삼사오육칠팔구십일이삼사오육칠팔구십
          </div>
        </div>
        <div className="flex relative top-[44px] h-[57px] text-center items-center border-t-[1px] border-[#BBD7FF] border-solid">
          <div className="flex items-center justify-center flex-1 h-full text-center text-md">
            거절
          </div>
          <div className="flex text-center justify-center items-center flex-1 border-l-[1px] h-full border-[#BBD7FF] border-solid text-md">
            수락
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
