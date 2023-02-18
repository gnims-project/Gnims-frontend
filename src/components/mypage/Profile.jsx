import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Vector from "../../img/Vector.png";
import basicImg from "../../img/User-86.png";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 임시로 사용하는 데이터
  // localStorage.setItem("nickname", "동퐈");
  // localStorage.setItem("email", "cdh0283@gmail.com");
  // localStorage.setItem("profileImage", "");

  //로컬 스토리지에 있는 데이터를 가져오는 코드
  const nickname = localStorage.getItem("nickname");
  const email = localStorage.getItem("email");
  const profileImage = localStorage.getItem("profileImage");

  //페이지 렌더링시 팔로우 정보를 가져와야함
  useEffect(() => {}, []);

  return (
    <div>
      <div className="flex p-5 gap-[30px] justify-items-center">
        <div className="p-2  w-[86px] h-[86px]">
          <img className="rounded-full" src={profileImage} alr="이미지" />
        </div>
        <div className="inline-block pt-2">
          <div className="text-lg font-semibold leading-[21px]">
            {nickname} 님
          </div>
          <div className="text-[14px] leading-[17px] font-light align-top">
            {email}
          </div>
          <div className="flex gap-10 pt-2">
            <div className="text-[16px] font-normal leading-[17px]">
              팔로잉 1
            </div>
            <div className="text-[16px]  font-normal leading-[17px]">
              팔로워 22
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-baseline pt-10">
        <div
          onClick={() => {
            navigate();
          }}
          className="flex gap-[130px] p-[15px] border-b-[1px] border-[#BBD7FF] border-solid bg-white w-[375px] h-[50px]"
        >
          <span className="text-sm w-[175px] h-[20px]">비밀번호 재설정</span>
          <img src={Vector} alr="화살표" />
        </div>
        <div
          onClick={() => {
            navigate();
          }}
          className="flex gap-[130px] p-[15px] border-b-[1px] border-[#BBD7FF] border-solid bg-white w-[375px] h-[50px]"
        >
          <span className="text-sm w-[175px] h-[20px]">나의 지난 일정</span>
          <img src={Vector} alr="화살표" />
        </div>
        <div
          onClick={() => {
            navigate("/scheduleinvitation");
          }}
          className="flex gap-[130px] p-[15px] border-b-[1px] border-[#BBD7FF] border-solid bg-white w-[375px] h-[50px]"
        >
          <span className="text-sm w-[175px] h-[20px]">내게 온 초대 목록</span>
          <img src={Vector} alr="화살표" />
        </div>
        <div
          onClick={() => {
            navigate();
          }}
          className="flex gap-[130px] p-[15px] border-b-[1px] border-[#BBD7FF] border-solid bg-white w-[375px] h-[50px]"
        >
          <span className="text-sm w-[175px] h-[20px]">알림 설정</span>
          <img src={Vector} alr="화살표" />
        </div>
        <div
          onClick={() => {
            navigate();
          }}
          className="flex gap-[130px] p-[15px] border-b-[1px] border-[#BBD7FF] border-solid bg-white w-[375px] h-[50px]"
        >
          <span className="text-sm w-[175px] h-[20px]">
            그님스 피드백 보내기
          </span>
          <img src={Vector} alr="화살표" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
