import React from "react";

const PageInfoCard = ({ profileImg, nickname, children }) => {
  return (
    <div>
      <div className="h-full flex pl-5 gap-[30px]  pb-5 justify-items-center">
        <div className="flex-[50%] cursor-pointer">
          <img className="rounded-full w-[86px] h-[86px] " src={profileImg} alt="사용자 프로필 사진" />
        </div>
        <div className="w-full pt-2 border-2 ">
          <div className="text-[18px] pt-[12px] leading-[21px] tracking-tighter w-[198px]">
            <span className="font-[600]">{nickname}</span> 님{children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageInfoCard;
