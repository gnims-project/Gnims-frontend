import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfileEditCompletion = ({ modalMessage }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-[375px] bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="text-black p-9 items-center w-[300px] h-[167px]  text-center rounded-[16px] fixed top-[200px] bg-white"
      >
        <div className="text-[18px]  font-bold flex flex-col ">{modalMessage}</div>
        <button
          className="bg-[#002C51]  rounded-[4px] h-[40px] w-[127px] text-white mt-[32px]"
          onClick={() => navigate("/profile")}
        >
          확인
        </button>{" "}
      </motion.div>{" "}
    </div>
  );
};

export default ProfileEditCompletion;
