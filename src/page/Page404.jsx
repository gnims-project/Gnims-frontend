import React from "react";
import Icon404 from "../img/404.png";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="relative top-[230px]">
      <div className="flex flex-col gap-[40px] items-center mx-auto w-[167px] h-[237px]">
        <div>
          <img src={Icon404} alt="404" />
        </div>
      </div>
      <div className="flex flex-col items-center mx-auto">
        <div className="text-[20px] leading-[24px]">
          페이지를 찾을 수 없어요.
        </div>
        <div className="text-[20px] leading-[24px]">
          입력하신 주소를 다시 확인해주세요.
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/main");
        }}
        className="mt-[80px] mx-auto rounded-lg text-[16px] pt-[15px] font-semibold bg-[#002C51] text-white text-center align-middle w-[335px] h-[50px] justify-center flex shadow"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default Page404;
