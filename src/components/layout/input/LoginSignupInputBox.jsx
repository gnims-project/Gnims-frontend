import React, { forwardRef } from "react";

const LoginSignupInputBox = forwardRef((props, ref) => {
  const { type, placeholder, onChange, id, bgColor, shadow } = props;
  return (
    <>
      <div>
        <input
          // className={`w-full px-3 h-[50px] ${bgColor} focus:bg-inputBoxFocus placeholder-inputText `}
          className={`w-full px-3 h-[50px] ${bgColor} ${shadow} placeholder-inputPlaceHoldText`}
          type={type}
          id={id}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
    </>
  );
});

export default LoginSignupInputBox;
