import React from "react";

const LoginButton = ({ onEvent, img }) => {
  return (
    <div className="h-[60px] w-[60px] justify-center rounded-full" onClick={onEvent}>
      <img className="w-full h-full rounded-full" src={img} alt="로그인버튼들" />
    </div>
  );
};

export default LoginButton;
