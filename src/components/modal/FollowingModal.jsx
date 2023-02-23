import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFollowing } from "../../redux/modules/FollowSlice";
import JoinerList from "./JoinerList";

const FollowingModal = ({ setFollowingListOpen, selectedId }) => {
  const dispatch = useDispatch();
  const submitHandler = () => {
    const filteredSelectedId = [...new Set(selectedId)];
    localStorage.setItem("selectJoiner", filteredSelectedId);
    setFollowingListOpen(false);
  };
  const followingList = useSelector((state) => state.FollowSlice.followingList);
  useEffect(() => {
    dispatch(__getFollowing());
  }, [dispatch]);
  console.log(selectedId);
  const closeFollowModal = () => {
    setFollowingListOpen(false);
  };
  return (
    <>
      <div className="h-full w-[375px]  bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
        <div className="text-black pt-8 items-center w-[300px] h-[560px] text-center rounded-[16px] mt-[60px] z-20 bg-white ">
          함께할 참여자를 선택해주세요!
          <div>
            {followingList.map((following) => {
              return (
                <JoinerList
                  key={following.followId}
                  following={following}
                  selectedId={selectedId}
                />
              );
            })}
          </div>
          <div className="mt-[20px]">
            <button
              className="bg-sora h-[25px] w-[50px] rounded text-white"
              onClick={closeFollowModal}
            >
              닫기
            </button>
            <button
              className="bg-sora h-[25px] w-[50px] rounded ml-[10px] text-white"
              onClick={submitHandler}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingModal;
