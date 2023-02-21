import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { __postFollowState } from "../../redux/modules/FollowSlice";

const FollowingCard = ({ following }) => {
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(
    following.followStatus === "ACTIVE" && "INIt"
  );

  const handleClick = (e) => {
    dispatch(__postFollowState(following.followId));
    setIsFollowed(!isFollowed);
  };

  useEffect(() => {
    setIsFollowed(following.followStatus === "ACTIVE");
  }, [following]);

  return (
    <div className="flex gap-[90px] w-full mt-[16px]">
      <div className="flex gap-[14px]">
        <div className="w-[50px] h-[50px]">
          <img
            className="w-full h-full rounded-full"
            src={following.profile}
            alt="프로필"
          />
        </div>
        <div className="flex w-[124px] items-center">{following.username}</div>
      </div>
      <div
        className="flex items-center w-[62px] h-[39px] text-sm rounded-[4px] p-[10px] text-white bg-[#A31414]
"
      >
        <button className="text-center" onClick={handleClick}>
          {isFollowed ? "취소" : "팔로우"}
        </button>
      </div>
    </div>
  );
};

export default FollowingCard;
