import React from "react";

const Label = ({ children }) => {
  return (
    <>
      <div className="h-[40px] flex items-center">
        <div className>
          <label
            htmlFor="userEmail"
            className="cursor-pointer  text-[#12396F] font-[600]"
          >
            {children}
          </label>
        </div>
      </div>
    </>
  );
};

export default Label;
