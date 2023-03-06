import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postFollowState } from "../../redux/modules/FollowSlice";

const SearchCards = ({ userInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(userInfo.isFollowed === true);

  const [btnColor, setBtnColor] = useState(
    userInfo.isFollowed === true ? null : "#002C51"
  );

  const handleClick = (e) => {
    dispatch(
      __postFollowState({
        id: userInfo.userId,
        state: "following",
      })
    );
    setIsFollowed(!isFollowed);
    if (isFollowed) setBtnColor("#002C51");
    else setBtnColor(null);
  };

  return (
    <div className="flex gap-[90px] w-full mt-[16px]">
      <div
        className="flex gap-[14px]"
        onClick={() => {
          navigate(`/friends/${userInfo.userId}`);
          sessionStorage.setItem("clickedUserName", userInfo.username);
          sessionStorage.setItem("clickedUserImg", userInfo.profileImage);
        }}
      >
        <div className="w-[50px] h-[50px]">
          <img
            className="w-full h-full rounded-full"
            src={userInfo.profileImage}
            alt="프로필"
          />
        </div>
        <div className="flex w-[119px] items-center">{userInfo.username}</div>
      </div>
      {isFollowed || (
        <div className="flex items-center w-[62px] h-[39px] justify-center text-sm rounded-[4px] text-white bg-[#002C51] cursor-pointer">
          <span onClick={handleClick}>{isFollowed || "팔로우"}</span>
        </div>
      )}
    </div>
  );
};

export default SearchCards;
