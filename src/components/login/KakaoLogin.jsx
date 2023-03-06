import React from "react";

const LoginButton = ({ onEvent, img }) => {
  return (
    <div
      className="h-[60px] w-[60px] justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
      onClick={onEvent}
    >
      <img
        className="h-full w-full rounded-full"
        src={img}
        alt="로그인버튼들"
      />
    </div>
  );
};

export default LoginButton;
