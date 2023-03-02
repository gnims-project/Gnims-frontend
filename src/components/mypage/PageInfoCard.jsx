import React from "react";

const PageInfoCard = ({ profileImg, nickname, children }) => {
  return (
    <div>
      <div className="flex p-5 gap-[30px]  justify-items-center">
        <div className="flex-none p-2 w-[86px] h-[86px] ">
          <img
            className="rounded-full"
            src={profileImg}
            alt="사용자 프로필 사진"
          />
        </div>
        <div className="pt-2 border-2 w-full">
          <div className="text-[18px] pt-[12px] leading-[21px] w-[198px]">
            <span className="font-[600]">{nickname}</span>님{children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageInfoCard;
