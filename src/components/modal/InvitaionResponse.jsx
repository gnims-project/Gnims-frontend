import React from "react";
import { useDispatch } from "react-redux";
import { refuseInvitation, acceptInvitation } from "../../redux/modules/InvitationSlice";
import { motion } from "framer-motion";
const InvitaionResponse = ({ message, setOpen, invit }) => {
  const dispatch = useDispatch();

  const approveHandler = () => dispatch(acceptInvitation(invit.eventId));
  const rejectHandler = () => dispatch(refuseInvitation(invit.eventId));
  return (
    <div>
      <div className="h-full w-[375px] bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="text-black pt-8 items-center w-[300px] h-[167px]  text-center rounded-[16px] fixed top-[38%] bg-white"
        >
          <div className="text-[18px] font-bold flex flex-col ">{message}</div>
          <button
            className="bg-[#002C51] rounded-[4px] h-[40px] w-[127px] text-white mt-[38px]"
            onClick={message === "초대를 수락하시겠습니까?" ? approveHandler : rejectHandler}
          >
            확인
          </button>
          <button
            className="ml-[14px] h-[40px] rounded-[4px] border-solid border-black border-[1px] w-[127px] text-black mt-[18px]"
            onClick={() => {
              setOpen(false);
            }}
          >
            닫기
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default InvitaionResponse;
