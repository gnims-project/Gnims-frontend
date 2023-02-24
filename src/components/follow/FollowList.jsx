import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFollower, __getFollowing } from "../../redux/modules/FollowSlice";
import FollowerCard from "./FollowerCard";
import FollowingCard from "./FollowingCard";

const FollowList = () => {
  const dispatch = useDispatch();
  //탭 상태 변화
  const [activeTab, setActiveTab] = useState("follower");

  //조건부 렌더링 설정하기 위한 스테이트
  const [bdColor, setBdColor] = useState({
    followerBD: "border-b-[1px] border-black",
    followingBD: "",
  });
  const followerList = useSelector((state) => state.FollowSlice.followerList);
  const followingList = useSelector((state) => state.FollowSlice.followingList);

  useEffect(() => {
    dispatch(__getFollower());
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "follower") {
      //
      setBdColor({
        followerBD: "border-b-[1px] border-black",
        followingBD: "",
      });
      dispatch(__getFollower());
    } else {
      setBdColor({
        followerBD: "",
        followingBD: "border-b-[1px] border-black",
      });
      dispatch(__getFollowing());
    }
  };

  return (
    <div className="relative grid top-[30px] gap-[10px] px-[20px]">
      <div className="flex">
        <button
          className={`${bdColor.followerBD} w-1/2 h-[40px] p-[10px] text-[18px]`}
          onClick={() => handleTabChange("follower")}
        >
          팔로워
        </button>
        <button
          className={`${bdColor.followingBD} w-1/2 h-[40px] p-[10px] text-[18px]`}
          onClick={() => handleTabChange("following")}
        >
          팔로잉
        </button>
      </div>
      <div>
        {activeTab === "follower" ? (
          <div>
            {followerList.map((follower) => {
              return (
                <FollowerCard key={follower.followId} follower={follower} />
              );
            })}
          </div>
        ) : (
          <div>
            {followingList.map((following) => {
              return (
                <FollowingCard key={following.followId} following={following} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowList;
