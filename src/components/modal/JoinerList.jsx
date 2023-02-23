import React, { useEffect } from "react";

const JoinerList = ({ following, selectedUserIds, setSelectedUserIds }) => {
  useEffect(() => {
    console.log(selectedUserIds);
  }, [selectedUserIds]);

  function selectHandler(followId) {
    // 기존 선택된 사용자 ID 리스트에서 해당 아이디가 이미 선택되어 있는지 확인
    if (selectedUserIds.includes(followId)) {
      // 이미 선택되어 있으면 선택 해제
      setSelectedUserIds(selectedUserIds.filter((id) => id !== followId));
    } else {
      // 선택되어 있지 않으면 선택
      setSelectedUserIds([...selectedUserIds, followId]);
    }
  }
  return (
    <div className="mt-[20px] text-textNavy">
      <div className="pl-[10px] pr-[10px]">
        <div
          className="flex gap-[14px] pl-[15px] bg-[#F4F4F4]"
          onClick={() => selectHandler(following.followId)}
        >
          <div className="w-[50px] h-[50px]">
            <img
              className="w-full h-full rounded-full"
              src={following.profile}
              alt="프로필"
            />
          </div>
          <div className="flex w-[124px] items-center ">
            {following.username}
            {selectedUserIds.includes(following.followId)
              ? "  (선택된 자) "
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinerList;
