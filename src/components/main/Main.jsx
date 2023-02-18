import React, { useState } from "react";
import defaultprofileImg from "../../img/User-86.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getSchedule } from "../../redux/modules/ScheduleSlice";
import MainScheduleCards from "./MainScheduleCards";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schedules } = useSelector((state) => state.ScheduleSlice);
  const [profileImg, setProfileImg] = useState(defaultprofileImg);
  const [nickName, setNickname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getnickName = window.localStorage.getItem("nickname");
    const getprofilImg = window.localStorage.getItem("profileImage");
    const getEmail = window.localStorage.getItem("email");
    const userId = window.localStorage.getItem("userId");
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
  }, [dispatch, navigate, email]);

  console.log(schedules);

  return (
    <div className="container md">
      <div className="grid grid-flow-row ml-[20px] mr-[20px]">
        <div className="mt-[78px] w-full h-[80px] bg-[#FFFFFF]">
          <div className="flex flex-row gap-[10px]">
            <div className="p-[10px]">
              <img
                className="h-[60px] w-[60px]  rounded-full"
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
          <div className="flex flex-col gap-[30px] mt-[28px] rounded-[10px]">
            {schedules.map((list) => {
              return <MainScheduleCards key={list.eventId} schedules={list} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
