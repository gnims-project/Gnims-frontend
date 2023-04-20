import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __postFollowState } from "../../redux/modules/FollowSlice";
import { useParams } from "react-router-dom";
import refreshIcon from "../../img/refresh.png";

const FriendsHeader = ({ status }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const friendName = sessionStorage.getItem("clickedUserName");
  const friendImg = sessionStorage.getItem("clickedUserImg");

  const [button, setButton] = useState(false);

  const refresh = () => {
    window.location.reload();
  };

  const handleClick = () => {
    dispatch(__postFollowState({ id: id, state: "following" }));
    setButton(true);
  };
  return (
    <div>
      <div className="mt-[30px] w-full h-[80px] bg-[#FFFFFF] rounded-[10px] drop-shadow-lg">
        <div className="flex flex-row gap-[10px]">
          <div className="p-[10px]">
            <img className="h-[60px] w-[60px] rounded-full" src={friendImg} alt="프로필이미지" />
          </div>
          {status === 200 ? (
            <div className="flex items-center">
              <p className="p-[10px] font-[700] text-[20px] text-textNavy">{friendName}님의 스케쥴입니다!</p>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="p-[10px] font-bold text-[20px]">{friendName}님</p>
              <div className="ml-[55px] mb-[20px]">
                {button ? (
                  <div
                    onClick={refresh}
                    className="flex  items-center w-[90px] mx-auto h-[39px] justify-center mt-[20px] rounded-[4px] cursor-pointer"
                  >
                    <img src={refreshIcon} alt="새로고침" className="h-[26px]" />
                  </div>
                ) : (
                  <div
                    onClick={handleClick}
                    className="flex items-center w-[90px] mx-auto h-[39px] justify-center mt-[20px] rounded-[4px] text-white bg-[#002C51] cursor-pointer"
                  >
                    팔로우하기
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsHeader;
