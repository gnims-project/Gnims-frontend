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
    follower.followStatus === "ACTIVE"
  );

  const [btnColor, setBtnColor] = useState(
    follower.followStatus === "ACTIVE" ? "#A31414" : "#002C51"
  );

  const handleClick = (e) => {
    dispatch(__postFollowState({ id: follower.followId, state: "follower" }));
    setIsFollowed(!isFollowed);
  };

  useLayoutEffect(() => {
    if (isFollowed) setBtnColor("#A31414");
    else setBtnColor("#002C51");
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
        <div className="flex w-[119px] items-center">{follower.username}</div>
      </div>
      {isFollowed ? (
        <div className="flex items-center w-[62px] h-[39px] justify-center text-sm rounded-[4px] text-white bg-[#A31414]">
          <span onClick={handleClick}>{isFollowed ? "삭제" : "팔로우"}</span>
        </div>
      ) : (
        <div className="flex items-center w-[62px] h-[39px] justify-center text-sm rounded-[4px] text-white bg-[#002C51]">
          <span onClick={handleClick}>{isFollowed ? "삭제" : "팔로우"}</span>
        </div>
      )}
    </div>
  );
};

export default FollowerCard;
