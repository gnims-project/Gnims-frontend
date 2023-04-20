import React from "react";

const MainHeader = () => {
  const nickName = sessionStorage.getItem("nickname");
  const getRandom = Math.floor(Math.random() * (3 + 0) + 0);
  const welcomText = ["환영합니다.", "좋은하루 되세요!", "안녕하세요."];

  return (
    <div>
      <div className="mt-[30px] h-[56px] bg-[#FFFFFF] rounded-[10px] drop-shadow-lg">
        <p className="leading-[36px] p-[10px] font-[700] text-md tracking-tighter text-textNavy">
          {nickName} 님 {welcomText[getRandom]}
        </p>
      </div>
    </div>
  );
};

export default MainHeader;
