import React from "react";
import developIng from "../img/developIng.png";

const DevelopIng = () => {
  return (
    <div className="relative top-[230px]">
      <div className="flex flex-col gap-[40px] items-center mx-auto w-[167px] h-[237px]">
        <div>
          <img src={developIng} alt="개발중" />
        </div>
        <div className="text-[20px] leading-[24px]">아직 개발중 이에요.</div>
      </div>
    </div>
  );
};

export default DevelopIng;
