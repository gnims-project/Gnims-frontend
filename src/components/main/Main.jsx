import React, { useState } from "react";
import defaultprofileImg from "../../img/User-86.png";
import frends from "../../img/Friends.png";
import Vector from "../../img/Vector.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate;
  const [profileImg, setProfileImg] = useState("");
  const [nickName, setNickname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getnickName = window.localStorage.getItem("nickname");
    const getprofilImg = window.localStorage.getItem("profileImage");
    const getEmail = window.localStorage.getItem("nickname");

    if (nickName && getEmail) {
      setEmail(() => getEmail);
      if (getprofilImg === undefined) {
        setProfileImg(profileImg);
      }
    } else {
      navigate("/login");
    }

    console.log(getprofilImg);
  }, []);

  return (
    <div className="container md ">
      <div className="grid grid-flow-row ml-[20px] mr-[20px]">
        <div className="mt-[78px] w-full h-[80px] bg-[#FFFFFF]">
          <div className="flex flex-row gap-[10px]">
            <div className="p-[10px]">
              <img
                className="h-[60px] w-[60px]"
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
        <div className="mt-[28px] rounded-[10px]">
          <div className=" w-[335px] h-[180px] bg-[#538EDF] rounded-[10px]  pt-[20px] pl-[22px] ">
            <div className=" text-[#ffff]">
              <div className="grid grid-flow-row gap-[19px]">
                <div className="flex flex-row h-[21px] gap-[22px] text-[18px] font-[400]">
                  <div>23.02.06</div>
                  <div>오후 6:00</div>
                </div>
                <div className="grid grid-flow-row gap-[17px]">
                  <div className="text-[18px] font-[700]">
                    <div>선희랑 마라탕 먹으러가기</div>
                  </div>
                  <div className="flex flex-row gap-[20px]">
                    <div className="flex -space-x-5 overflow-hidden">
                      <div className="flex  rounded-full border-white border-2">
                        <img
                          className="inline-block h-[40px] w-[40px] rounded-full ring-2 "
                          src={profileImg}
                          alt="프로필이미지"
                        ></img>
                      </div>
                      <div className="flex  rounded-full border-white border-2">
                        <img
                          className="h-[40px] w-[40px] inline-block rounded-full ring-2"
                          src={profileImg}
                          alt="프로필이미지"
                        ></img>
                      </div>
                      <div className="flex  rounded-full border-white border-2">
                        <img
                          className="h-[40px] w-[40px] inline-block rounded-full ring-2"
                          src={profileImg}
                          alt="프로필이미지"
                        ></img>
                      </div>
                    </div>
                    <div className="flex items-center">이재헌님 외 2명</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center h-[40px] w-full rigth-0 ">
              <div className="text-[#FFFFFF] font-[400] text-[18px]">D-DAY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
