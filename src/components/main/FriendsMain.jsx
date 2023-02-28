import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../shared/AxiosInstance";
import FriendsScheduleCard from "./FriendsScheduleCard";

const FriendsMain = () => {
  const id = useParams();
  const followid = id.id;
  const [schedule, setSchedule] = useState();
  const friendName = sessionStorage.getItem("clickedUserName");
  const friendImg = sessionStorage.getItem("clickedUserImg");
  const getSchdule = async () => {
    await instance.get(`/users/${followid}/events`).then((appData) => {
      setSchedule(appData.data.data);
    }, []);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearSessionStorage);
    getSchdule();
    // 컴포넌트가 언마운트될 때, beforeunload 이벤트 해제
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);

  const clearSessionStorage = () => {
    // 세션 스토리지 지우기
    sessionStorage.removeItem("clickedUserName");
    sessionStorage.removeItem("clickedUserImg");
    console.log("비웠다");
  };
  return (
    <>
      <div className="container">
        <div className="grid grid-flow-row mt-[] ml-[20px] mr-[20px]">
          <div className="mt-[30px] w-full h-[80px] bg-[#FFFFFF] rounded-[10px] drop-shadow-lg">
            <div className="flex flex-row gap-[10px]">
              <div className="p-[10px]">
                <img
                  className="h-[60px] w-[60px] rounded-full"
                  src={friendImg}
                  alt="프로필이미지"
                />
              </div>
              <div className="flex items-center">
                <p className="p-[10px] font-[700] text-[20px] text-textNavy">
                  {friendName}님의 스케쥴입니다!
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* <InfiniteScroll /> */}
            <div className="flex flex-col gap-[30px] mt-[28px] rounded-[10px]">
              {schedule?.map((list) => {
                return (
                  <FriendsScheduleCard key={list.eventId} schedules={list} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsMain;
