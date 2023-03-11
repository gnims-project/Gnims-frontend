import React, { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postFollowState } from "../../redux/modules/FollowSlice";

const FollowingCard = ({ following }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(
    following.followStatus === "ACTIVE" || "INIT"
  );
  const [btnColor, setBtnColor] = useState(
    following.followStatus === "ACTIVE" || "INIT" ? "#A31414" : "#002C51"
  );

  const handleClick = (e) => {
    dispatch(
      __postFollowState({
        id: following.followId,
        state: "following",
      })
    );
    setIsFollowed(!isFollowed);
  };

  useLayoutEffect(() => {
    if (isFollowed) setBtnColor("#A31414");
    else setBtnColor("#002C51");
  }, [following]);

  return (
    <div className="flex gap-[90px] w-full mt-[16px]">
      <div
        className="flex gap-[14px]"
        onClick={() => {
          navigate(`/friends/${following.followId}`);
          sessionStorage.setItem("clickedUserName", following.username);
          sessionStorage.setItem("clickedUserImg", following.profile);
        }}
      >
        <div className="w-[50px] h-[50px]">
          <img
            className="w-full h-full rounded-full"
            src={following.profile}
            alt="프로필"
          />
        </div>
        <div className="flex w-[119px] text-sm font-[400] items-center">
          {following.username}
        </div>
      </div>
      {isFollowed ? (
        <div
          onClick={handleClick}
          className="flex items-center w-[62px] h-[39px]  justify-center text-sm rounded-[4px] text-white bg-[#A31414] cursor-pointer"
        >
          삭제
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="flex items-center w-[62px] h-[39px] justify-center text-sm rounded-[4px] text-white bg-[#002C51] cursor-pointer"
        >
          팔로우
        </div>
      )}
    </div>
  );
};

export default FollowingCard;
