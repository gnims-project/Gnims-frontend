import React, { forwardRef } from "react";

const LoginSignupInputBox = forwardRef((props, ref) => {
  const { placeholder, onChange, id } = props;
  return (
    <>
      <div>
        <input
          className="w-full px-3 h-[50px] focus:placeholder-[#12396f] placeholder-[#12396fa1] "
          type="text"
          id={id}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
});

export default LoginSignupInputBox;
