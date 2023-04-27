import React from "react";
import unfollowingUser from "../../img/questionmark.png";
import FriendsHeader from "./FriendsHeader";

const Friends403 = ({ status }) => {
  const friendName = sessionStorage.getItem("clickedUserName");

  return (
    <div>
      <>
        <div>
          <FriendsHeader status={status} />
          <img className="h-[153px] mt-[100px] m-auto w-[167px]" src={unfollowingUser} alt="팔로우하지않는유저" />
          <div className="text-[22px] mt-[40px] text-center">
            현재
            <span className="font-bold ml-[3px]">팔로우 하고있지 않은</span> 유저예요.
            <br />
            <div className="text-[22px] mt-[5px] text-center">
              {friendName}님의 스케쥴을 확인하시려면 <br />
              <div className="mt-[5px]">팔로우해주세요.</div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Friends403;
