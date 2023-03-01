import React from "react";
import { useNavigate } from "react-router-dom";
import backIncom from "../../img/arrowback.png";
const TopNavTitleBar = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="relative ">
      <div className="h-[48px] w-full bg-white flex items-center">
        <div className="h-[48px]">
          <img
            className="h-[24px] w-[24px] cursor-pointer absolute left-[21px] mt-[13px]"
            src={backIncom}
            alt="검색버튼"
            //navigate 경로는 검색페이지루트가 정해지면 변경하면됩니다
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className="m-auto flex items-center text-textBlack font-lg text-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TopNavTitleBar;
