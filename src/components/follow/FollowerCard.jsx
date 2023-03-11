import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  __postFollowState,
  __getFollowerCount,
  __getFollowingCount,
} from "../../redux/modules/FollowSlice";

const FollowerCard = ({ follower }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(
    follower.followStatus === "INACTIVE"
  );

  const [btnColor, setBtnColor] = useState(
    follower.followStatus === "INACTIVE" ? "#002C51" : "#A31414"
  );

  const handleClick = (e) => {
    dispatch(__postFollowState({ id: follower.followId, state: "follower" }));
    setIsFollowed(!isFollowed);
  };

  useLayoutEffect(() => {
    if (isFollowed) setBtnColor("#002C51");
    else setBtnColor("#A31414");
  }, [follower]);

  return (
    <div className="flex gap-[90px] w-full mt-[16px]">
      <div
        className="flex gap-[14px]"
        onClick={() => {
          navigate(`/friends/${follower.followId}`);
          sessionStorage.setItem("clickedUserName", follower.username);
          sessionStorage.setItem("clickedUserImg", follower.profile);
        }}
      >
        <div className="w-[50px] h-[50px]">
          <img
            className="w-full h-full rounded-full"
            src={follower.profile}
            alt="프로필"
          />
        </div>
        <div className="flex w-[119px] text-sm font-[400px] items-center">
          {follower.username}
        </div>
      </div>
      {isFollowed ? (
        <div
          onClick={handleClick}
          className="flex items-center w-[62px] h-[39px] cursor-pointer justify-center text-sm rounded-[4px] text-white bg-[#002C51]"
        >
          팔로우
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="flex items-center w-[62px] h-[39px] cursor-pointer justify-center text-sm rounded-[4px] text-white bg-[#A31414]"
        >
          삭제
        </div>
      )}
    </div>
  );
};

export default FollowerCard;
