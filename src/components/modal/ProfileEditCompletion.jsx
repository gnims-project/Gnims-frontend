import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileEditCompletion = ({ modalMessage }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-[375px] bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
      <div className="text-black p-9 items-center w-[300px] h-[167px]  text-center rounded-[16px] fixed top-[200px] bg-white">
        <div className="text-[18px]  font-bold flex flex-col ">{modalMessage}</div>
        <button
          className="bg-[#002C51]  rounded-[4px] h-[40px] w-[127px] text-white mt-[32px]"
          onClick={() => navigate("/profile")}
        >
          확인
        </button>{" "}
      </div>{" "}
    </div>
  );
};

export default ProfileEditCompletion;
