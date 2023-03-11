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
  const follower = useSelector((state) => state.FollowSlice.follower);
  const following = useSelector((state) => state.FollowSlice.following);

  useEffect(() => {
    dispatch(__getFollowing());
  }, []);

  useEffect(() => {
    dispatch(__getFollowerCount());
    dispatch(__getFollowingCount());
  }, [follower, following]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "following") {
      setBdColor({
        followerBD: "border-b-[1px] border-black",
        followingBD: "",
      });
      dispatch(__getFollowing());
    } else {
      setBdColor({
        followerBD: "",
        followingBD: "border-b-[1px] border-black",
      });
      dispatch(__getFollower());
    }
  };

  return (
    <div className="relative grid top-[30px] gap-[10px] px-[20px]">
      <div className="flex">
        <button
          className={`${bdColor.followerBD} w-1/2 h-[40px] p-[10px] text-[18px] font-[400] leading-[21px] cursor-pointer`}
          onClick={() => handleTabChange("following")}
        >
          팔로잉 {following.followingCount}명
        </button>
        <button
          className={`${bdColor.followingBD} w-1/2 h-[40px] p-[10px] text-[18px] font-[400] leading-[21px] cursor-pointer`}
          onClick={() => handleTabChange("follower")}
        >
          팔로워 {follower.followerCount}명
        </button>
      </div>
      <div>
        {activeTab === "following" ? (
          <div>
            {following.followingList?.map((following) => {
              return (
                <FollowingCard key={following.followId} following={following} />
              );
            })}
          </div>
        ) : (
          <div>
            {follower.followerList?.map((follower) => {
              return (
                <FollowerCard
                  key={follower.followId}
                  follower={follower}
                  following={following}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowList;
