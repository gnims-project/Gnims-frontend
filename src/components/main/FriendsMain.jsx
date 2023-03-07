import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { instance } from "../../shared/AxiosInstance";
import FriednsScheduleCard from "./FriednsScheduleCard";
import { __postFollowState } from "../../redux/modules/FollowSlice";

const FriendsMain = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const [status, setStatus] = useState(200);
  const followid = id.id;
  const [button, setButton] = useState(false);
  const [schedule, setSchedule] = useState();

  const friendName = sessionStorage.getItem("clickedUserName");
  const friendImg = sessionStorage.getItem("clickedUserImg");

  const getSchdule = async () => {
    try {
      await instance.get(`/users/${followid}/events`).then((response) => {
        setSchedule(response.data.data);
      });
    } catch (e) {
      if (e.response.status === 403) {
        setStatus(403);
        console.log(status);
      }
    }
  };
  const refresh = () => {
    window.location.reload();
  };
  const handleClick = () => {
    dispatch(__postFollowState({ id: id.id, state: "following" }));
    setButton(true);
    // window.location.reload();
  };
  useLayoutEffect(() => {
    getSchdule();
  }, []);

  return (
    <>
      <div className="container">
        <div className="grid grid-flow-row mt-[] ml-[20px] mr-[20px]">
          <div>
            {status === 200 ? (
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
                <div className="flex flex-col gap-[30px] mt-[28px] rounded-[10px]">
                  {schedule?.map((list) => {
                    return (
                      <FriednsScheduleCard
                        key={list.eventId}
                        schedules={list}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-[22px] mt-[100px] font-extralight ">
                현재 팔로우하고있지 않은 유저입니다!
                <br />
                <div className="text-[16px] mt-[20px] text-center">
                  {friendName}님의 스케쥴을 확인하시려면 <br />
                  팔로우해주세요
                </div>
                <img
                  className="h-[80px] m-auto mt-[30px] w-[80px] rounded-full"
                  src={friendImg}
                  alt="프로필이미지"
                />
                <div className="flex items-center w-[110px] mx-auto h-[39px] justify-center mt-[20px] text-[12px] rounded-[4px] text-white bg-[#002C51] cursor-pointer">
                  <span onClick={button ? refresh : handleClick}>
                    {button ? (
                      <span>한번만 더 클릭해줭</span>
                    ) : (
                      <span>{friendName}님 팔로우하기</span>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsMain;
