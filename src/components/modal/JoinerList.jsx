import React, { useEffect } from "react";
import selectedIcon from "../../img/participantsSelected.svg";

//props로 받아올 것들...
const JoinerList = ({
  following,
  selectedUserIds,
  setSelectedUserIds,
  setSelectedUserNames,
  selectedUserNames,
}) => {
  function selectHandler(followId) {
    // 기존 선택된 사용자 ID 리스트에서 해당 아이디가 이미 선택되어 있는지 확인
    if (selectedUserIds.includes(followId)) {
      // 이미 선택되어 있으면 선택 해제
      setSelectedUserIds(selectedUserIds.filter((id) => id !== followId));
      //username도 화면에 띄워줘야하기 때문에 따로 리스트를 만들어 저장한다.
      setSelectedUserNames(
        selectedUserNames.filter((id) => id !== following.username)
      );
    } else {
      // 최대 인원 수 5명을 초과하는 경우 선택이 되지 않음
      if (selectedUserIds.length >= 5) {
        return;
      }
      // 선택되어 있지 않으면 선택
      setSelectedUserIds([...selectedUserIds, followId]);
      setSelectedUserNames([...selectedUserNames, following.username]);
    }
  }
  //선택되었을 때 배경색이 하늘색으로 바뀜
  const bgStyle = selectedUserIds.includes(following.followId)
    ? { backgroundColor: "#E3F0F5" }
    : {};
  //선택된리스트에 불포함이면 백그라운드컬러 없음

  return (
    <div className="mt-[20px] ">
      <div className="pl-[10px] pr-[10px]">
        <div
          className="flex p-[10px] rounded-[10px]"
          //배경색바뀌는부분
          style={bgStyle}
          onClick={() => selectHandler(following.followId)}
        >
          <div className="w-[50px] h-[50px]">
            <img
              className="w-full h-full rounded-full"
              src={following.profile}
              alt="프로필"
            />
          </div>
          <div className="flex w-[124px] items-center ml-[40px] ">
            {following.username}
            {selectedUserIds.includes(following.followId) ? (
              <img src={selectedIcon} alt="선택아이콘" className="ml-[60px]" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinerList;
