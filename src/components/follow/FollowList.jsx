import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getFollower,
  __getFollowing,
  __getFollowerCount,
  __getFollowingCount,
} from "../../redux/modules/FollowSlice";
import FollowerCard from "./FollowerCard";
import FollowingCard from "./FollowingCard";

const FollowList = () => {
  const dispatch = useDispatch();
  //탭 상태 변화
  const [activeTab, setActiveTab] = useState("following");

  //조건부 렌더링 설정하기 위한 스테이트
  const [bdColor, setBdColor] = useState({
    followerBD: "border-b-[1px] border-black",
    followingBD: "",
  });
  const followerList = useSelector((state) => state.FollowSlice.followerList);
  const followingList = useSelector((state) => state.FollowSlice.followingList);
  const followerCounter = useSelector(
    (state) => state.FollowSlice.followerCount
  );
  const followingCounter = useSelector(
    (state) => state.FollowSlice.followingCount
  );

  useEffect(() => {
    dispatch(__getFollowing());
  }, []);

  useEffect(() => {
    dispatch(__getFollowerCount());
    dispatch(__getFollowingCount());
  }, [followerCounter, followingCounter]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "following") {
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
          className={`${bdColor.followerBD} w-1/2 h-[40px] p-[10px] text-[18px] cursor-pointer`}
          onClick={() => handleTabChange("following")}
        >
          팔로잉 {followingCounter}명
        </button>
        <button
          className={`${bdColor.followingBD} w-1/2 h-[40px] p-[10px] text-[18px] cursor-pointer`}
          onClick={() => handleTabChange("follower")}
        >
          팔로워 {followerCounter}명
        </button>
      </div>
      <div>
        {activeTab === "following" ? (
          <div>
            {followingList.map((following) => {
              return (
                <FollowingCard key={following.followId} following={following} />
              );
            })}
          </div>
        ) : (
          <div>
            {followerList.map((follower) => {
              return (
                <FollowerCard key={follower.followId} follower={follower} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowList;
