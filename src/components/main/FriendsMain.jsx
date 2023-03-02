import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../shared/AxiosInstance";
import MainScheduleCards from "./MainScheduleCards";

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
    getSchdule();
  }, []);

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
                  <MainScheduleCards key={list.eventId} schedules={list} />
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
