import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { instance } from "../../shared/AxiosInstance";
import FriednsScheduleCard from "./FriednsScheduleCard";
import { __postFollowState } from "../../redux/modules/FollowSlice";
import unfollowingUser from "../../img/questionmark.png";
import refreshIcon from "../../img/refresh.png";

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
              <>
                <div className="mt-[30px] w-full h-[80px] bg-[#FFFFFF] rounded-[10px] drop-shadow-lg">
                  <div className="flex flex-row gap-[10px] ">
                    <div className="p-[10px]">
                      <img
                        className="h-[60px] w-[60px] rounded-full"
                        src={friendImg}
                        alt="프로필이미지"
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="p-[10px] font-bold text-[20px]">
                        {friendName}님
                      </p>
                      <div className="ml-[55px] mb-[20px]">
                        {button ? (
                          <div
                            onClick={refresh}
                            className="flex  items-center w-[90px] mx-auto h-[39px] justify-center mt-[20px] rounded-[4px] text-white bg-[#FFFFFF] cursor-pointer"
                          >
                            <img
                              src={refreshIcon}
                              alt="새로고침"
                              className="h-[26px]"
                            />
                          </div>
                        ) : (
                          <div
                            onClick={handleClick}
                            className="flex font-extralight items-center w-[90px] mx-auto h-[39px] justify-center mt-[20px] rounded-[4px] text-white bg-[#002C51] cursor-pointer"
                          >
                            팔로우하기
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <img
                    className="h-[153px] mt-[100px] m-auto w-[167px]"
                    src={unfollowingUser}
                    alt="팔로우하지않는유저"
                  />
                  <div className="text-[22px] mt-[40px] font-extralight text-center">
                    현재
                    <span className="font-black ml-[3px]">
                      팔로우 하고있지 않은
                    </span>{" "}
                    유저예요.
                    <br />
                    <div className="text-[22px] mt-[5px] text-center">
                      {friendName}님의 스케쥴을 확인하시려면 <br />
                      <div className="mt-[5px]">팔로우해주세요.</div>
                    </div>
                  </div>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsMain;
