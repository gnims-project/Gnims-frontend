import React, { useState } from "react";
import defaultprofileImg from "../../img/User-86.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainScheduleCards from "./MainScheduleCards";
import { useDispatch, useSelector } from "react-redux";
import { __getSchedule } from "../../redux/modules/ScheduleSlice";
//import InfiniteScroll from "./InfiniteScroll";

const Main = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(defaultprofileImg);
  const [nickName, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.ScheduleSlice);
  const { isLoding } = useSelector((state) => state.ScheduleSlice);
  console.log(schedules);

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const getnickName = window.localStorage.getItem("nickname");
    const getprofilImg = window.localStorage.getItem("profileImage");
    const getEmail = window.localStorage.getItem("email");
    if (getnickName && getEmail) {
      setNickname(() => getnickName);
      setEmail(() => getEmail);
      if (getprofilImg) {
        setProfileImg(getprofilImg);
      }
      dispatch(__getSchedule(userId));
    } else {
      navigate(`/login`);
    }
  }, [navigate, dispatch]);

  return (
    <>
      <div className="container">
        <div className="grid grid-flow-row mt-[] ml-[20px] mr-[20px]">
          <div className="mt-[30px] w-full h-[80px] bg-[#FFFFFF] rounded-[10px] drop-shadow-lg">
            <div className="flex flex-row gap-[10px]">
              <div className="p-[10px]">
                <img
                  className="h-[60px] w-[60px] rounded-full"
                  src={profileImg}
                  alt="프로필이미지"
                />
              </div>
              <div className="flex items-center">
                <p className="p-[10px] font-[700] text-[20px] text-textNavy">
                  {nickName} 님
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* <InfiniteScroll /> */}
            <div className="flex flex-col gap-[30px] mt-[28px] rounded-[10px]">
              {schedules?.map((list) => {
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

export default Main;
