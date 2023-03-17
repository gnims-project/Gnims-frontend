import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotificationModal = ({ close, content }) => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-[375px] bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="text-black pt-8 items-center w-[300px] h-[167px]  text-center rounded-[16px] fixed top-[38%] bg-white"
      >
        <div className="text-[18px] font-bold flex flex-col ">알림이 도착했습니다!</div>
        <div className="mt-[14px] text-[14px] text-[#6F6F6F]">{content}</div>
        <button
          className="bg-[#002C51] rounded-[4px] h-[40px] w-[127px] text-white mt-[18px]"
          onClick={() => navigate("/notification")}
        >
          알림페이지 가기
        </button>{" "}
        <button
          className="ml-[14px] h-[40px] rounded-[4px] border-solid border-black border-[1px] w-[127px] text-black mt-[18px]"
          onClick={() => close()}
        >
          닫기
        </button>
      </motion.div>
    </div>
  );
};

export default NotificationModal;
