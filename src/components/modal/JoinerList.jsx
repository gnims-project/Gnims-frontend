import React, { useEffect, useState } from "react";

const JoinerList = ({ following, selectedId }) => {
  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);
  const selectHandler = () => selectedId.push(following.followId);

  console.log(selectedId);
  return (
    <div className="mt-[20px] p-[20px]">
      <div className="flex gap-[14px]" onClick={selectHandler}>
        <div className="w-[50px] h-[50px]">
          <img
            className="w-full h-full rounded-full"
            src={following.profile}
            alt="프로필"
          />
        </div>
        <div className="flex w-[124px] items-center">{following.username}</div>
      </div>
    </div>
  );
};

export default JoinerList;
