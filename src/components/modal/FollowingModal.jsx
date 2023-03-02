import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFollowing } from "../../redux/modules/FollowSlice";
import JoinerList from "./JoinerList";

const FollowingModal = ({ setFollowingListOpen }) => {
  const dispatch = useDispatch();
  //   const [selectedUserIds, setSelectedUserIds] = useState([]);
  const submitHandler = () => {
    const filteredSelectedId = [...new Set(selectedUserIds)];
    const filteredSelectedNames = [...new Set(selectedUserNames)];
    sessionStorage.setItem("selectedJoiner", filteredSelectedId);
    sessionStorage.setItem("selectedJoinerNames", filteredSelectedNames);
    setFollowingListOpen(false);
  };
  const followingList = useSelector((state) => state.FollowSlice.followingList);
  useEffect(() => {
    dispatch(__getFollowing());
  }, [dispatch]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUserNames, setSelectedUserNames] = useState([]);
  const closeFollowModal = () => {
    setFollowingListOpen(false);
  };
  return (
    <>
      <div className="h-full w-[375px]  bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex">
        <div className="text-black pt-8 items-center w-[300px] h-[560px] text-center rounded-[16px] mt-[60px] z-20 bg-white ">
          참여자 선택
          <div className="overflow-auto h-[400px] mt-[25px]">
            {followingList.map((following) => {
              return (
                <JoinerList
                  key={following.followId}
                  following={following}
                  setSelectedUserIds={setSelectedUserIds}
                  selectedUserIds={selectedUserIds}
                  setSelectedUserNames={setSelectedUserNames}
                  selectedUserNames={selectedUserNames}
                />
              );
            })}
          </div>
          <div className="h-[40px] w-[268px] flex place-content-center mt-[20px] m-auto">
            <button
              className="h-[40px] w-[100px] rounded text-[#6F6F6F] "
              onClick={closeFollowModal}
            >
              닫기
            </button>
            <button
              className=" h-[40px] w-[100px] rounded ml-[10px] text-[#002C51]"
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
