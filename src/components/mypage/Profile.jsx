import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nickname = window.localStorage.getItem("nickname");
  const email = window.localStorage.getItem("email");
  const profileImage = window.localStorage.getItem("profileImage");

  useEffect(() => {}, []);

  return (
    <div>
      <div className="flex p-5 gap-[30px] justify-items-center">
        <div className="p-2 border-2 border-red-500 border-solid w-[86px] h-[86px]">
          <img className="rounded-full" src={profileImage} alt="프로필" />
        </div>
        <div className="inline-block pt-2 border-2 border-blue-500 border-solid">
          <div className="text-lg font-semibold">{nickname}</div>
          <div className="text-sm font-light align-top">{email}</div>
          <div className="flex pt-2 gap-2.5">
            <div>팔로잉 1</div>
            <div>팔로워 22</div>
          </div>
        </div>
      </div>
      <div className="grid gap-2.5 pt-10 justify-items-center">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="p-2.5 border-2 border-blue-500 border-solid w-[335px] h-[50px]"
        >
          <p>비밀번호 재설정</p>
        </div>
        <div className="p-2.5 border-2 border-blue-500 border-solid w-[335px] h-[50px]">
          나의 지난 일정
        </div>
        <div className="p-2.5 border-2 border-blue-500 border-solid w-[335px] h-[50px]">
          내게 온 초대 목록
        </div>
        <div className="p-2.5 border-2 border-blue-500 border-solid w-[335px] h-[50px]">
          알림 설정
        </div>
        <div className="p-2.5 border-2 border-blue-500 border-solid w-[335px] h-[50px]">
          그님스 피드백 보내기
        </div>
      </div>
    </div>
  );
};

export default Profile;
