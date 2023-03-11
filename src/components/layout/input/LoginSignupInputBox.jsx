import React, { forwardRef } from "react";

const LoginSignupInputBox = forwardRef((props, ref) => {
  const { type, placeholder, onChange, id, bgColor, maxLength } = props;
  return (
    <>
      <div>
        <input
          className={`w-full px-3 h-[50px] ${bgColor} placeholder-inputPlaceHoldText`}
          type={type}
          id={id}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          autoComplete="off"
        />
      </div>
    </>
  );
});

export default LoginSignupInputBox;
