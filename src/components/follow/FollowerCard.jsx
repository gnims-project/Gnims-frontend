import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __postFollowState } from "../../redux/modules/FollowSlice";

const FollowerCard = ({ follower }) => {
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(
    follower.followStatus === "ACTIVE"
  );

  const [btnColor, setBtnColor] = useState(
    follower.followStatus === "ACTIVE" ? "#A31414" : "#002C51"
  );

  const handleClick = (e) => {
    dispatch(__postFollowState(follower.followId));
    setIsFollowed(!isFollowed);
    if (isFollowed) setBtnColor("#002C51");
    else setBtnColor("#A31414");
  };

  return (
    <div className="flex gap-[90px] w-full mt-[16px]">
      <div className="flex gap-[14px]">
        <div className="w-[50px] h-[50px]">
          <img
            className="w-full h-full rounded-full"
            src={follower.profile}
            alt="프로필"
          />
        </div>
        <div className="flex w-[124px] items-center">{follower.username}</div>
      </div>
      {isFollowed ? (
        <div className="flex items-center w-[62px] h-[39px] justify-center text-sm rounded-[4px] text-white bg-[#A31414]">
          <span onClick={handleClick}>{isFollowed ? "취소" : "팔로우"}</span>
        </div>
      ) : (
        <div className="flex items-center w-[62px] h-[39px] justify-center text-sm rounded-[4px] text-white bg-[#002C51]">
          <span onClick={handleClick}>{isFollowed ? "취소" : "팔로우"}</span>
        </div>
      )}
    </div>
  );
};

export default FollowerCard;
