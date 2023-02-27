import React, { useState } from "react";
import defaultprofileImg from "../../img/User-86.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";

const Main = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(defaultprofileImg);
  const [nickName, setNickname] = useState(sessionStorage.getItem("nickname"));
  useEffect(() => {
    const getemail = sessionStorage.getItem("email");
    const getprofilImg = sessionStorage.getItem("profileImage");
    console.log("useEffect실행");
    const userId = sessionStorage.getItem("userId");

    if (nickName && getemail) {
      if (getprofilImg) {
        setProfileImg(getprofilImg);
      }
    } else {
      navigate(`/login`);
    }
  }, [navigate, nickName]);

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
            <InfiniteScroll />
            <div className="flex flex-col gap-[30px] mt-[28px] rounded-[10px]">
              {/* {schedules?.map((list) => {
                return (
                  <MainScheduleCards key={list.eventId} schedules={list} />
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
