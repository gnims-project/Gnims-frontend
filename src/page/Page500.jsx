import React from "react";
import { useNavigate } from "react-router-dom";
import Icon500 from "../img/500.png";

const Page500 = () => {
  const navigate = useNavigate();
  return (
    <div className="relative top-[230px]">
      <div className="flex flex-col gap-[40px] items-center mx-auto w-[167px] h-[237px]">
        <div>
          <img src={Icon500} alt="500" />
        </div>
      </div>
      <div className="flex flex-col items-center mx-auto ">
        <div className="text-[20px] leading-[24px]">
          네트워크 연결 상태가 좋지 않아요.
        </div>
        <div className="text-[20px] leading-[24px]">
          잠시후 다시 시도해주세요.
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/main");
        }}
        className="mt-[80px] mx-auto rounded-lg text-[16px] pt-[15px] font-semibold bg-[#002C51] text-white text-center align-middle w-[335px] h-[50px] justify-center flex shadow"
      >
        확인
      </button>
    </div>
  );
};

export default Page500;
