import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Vector from "../../img/arrow.svg";
import { __getFollowerCount, __getFollowingCount } from "../../redux/modules/FollowSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //팔로잉과 팔로워 수를 가져오는 스테이트
  const followerCounter = useSelector((state) => state.FollowSlice.follower.followerCount);
  const followingCounter = useSelector((state) => state.FollowSlice.following.followingCount);
  //로컬 스토리지에 있는 데이터를 가져오는 코드
  const nickname = sessionStorage.getItem("nickname");
  const email = sessionStorage.getItem("email");
  const profileImage = sessionStorage.getItem("profileImage");
  const FeedbackForm =
    "https://docs.google.com/forms/d/e/1FAIpQLSdOP_FEmMG5f0OtAER0ha4PR53XdXX6qVGLGMxYevd_ixD4QA/viewform";

  //페이지 렌더링시 팔로우 정보를 가져와야함
  useEffect(() => {
    dispatch(__getFollowerCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(__getFollowingCount());
  }, [dispatch]);

  return (
    <div>
      <div className="flex p-5 gap-[30px] justify-items-center">
        <div className="w-[86px] h-[86px]">
          <img
            className="rounded-full cursor-pointer object-fill w-[86px] h-[86px]"
            src={profileImage}
            alt="이미지"
            onClick={() => {
              navigate("/editProfile");
            }}
          />
        </div>
        <div className="inline-block pt-2">
          <div className="text-lg font-semibold leading-[21px] tracking-tighter">{nickname} 님</div>
          <div className="text-[14px] text-[#121213] leading-[17px] font-light tracking-tighter align-top">{email}</div>
          <div className="flex pt-2 cursor-pointer gap-[40px]" onClick={() => navigate("/follow")}>
            <div className="text-sm font-normal">팔로잉 {followingCounter}</div>
            <div className="text-sm font-normal">팔로워 {followerCounter}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-baseline pt-10">
        <div
          onClick={() => {
            navigate("/editProfile");
          }}
          className="flex gap-[160px] p-[15px] border-b-[1px] border-[#E8E8E8] border-solid bg-white w-[375px] h-[50px] cursor-pointer"
        >
          <span className="text-sm w-[175px] h-[20px]">프로필 변경</span>
          <img src={Vector} alt="화살표" className="h-[24px] w-[22px]" />
        </div>
        {sessionStorage.getItem("socialCode") ? null : (
          <div
            onClick={() => {
              navigate("/login/auth/InputEmail");
            }}
            className="flex gap-[160px] p-[15px] border-b-[1px] border-[#E8E8E8] border-solid bg-white w-[375px] h-[50px] cursor-pointer"
          >
            <span className="text-sm w-[175px] h-[20px]">비밀번호 재설정</span>
            <img src={Vector} alt="화살표" className="h-[24px] w-[22px]" />
          </div>
        )}
        <div
          onClick={() => {
            navigate("/pastEvents");
          }}
          className="flex gap-[160px] p-[15px] border-b-[1px] border-[#E8E8E8] border-solid bg-white w-[375px] h-[50px] cursor-pointer"
        >
          <span className="text-sm w-[175px] h-[20px]">나의 지난 일정</span>

          <img src={Vector} alt="화살표" className="h-[24px] w-[22px]" />
        </div>
        <div
          onClick={() => {
            navigate("/scheduleinvitation");
          }}
          className="flex gap-[160px] p-[15px] border-b-[1px] border-[#E8E8E8] border-solid bg-white w-[375px] h-[50px] cursor-pointer"
        >
          <span className="text-sm w-[175px] h-[20px]">내게 온 초대 목록</span>
          <img src={Vector} alt="화살표" className="h-[24px] w-[22px]" />
        </div>
        <div
          onClick={() => {
            window.open(FeedbackForm);
          }}
          className="flex gap-[160px] p-[15px] border-b-[1px] border-[#E8E8E8] border-solid bg-white w-[375px] h-[50px] cursor-pointer"
        >
          <span className="text-sm w-[175px] h-[20px]">그님스 피드백 보내기</span>
          <img src={Vector} alt="화살표" className="h-[24px] w-[22px]" />
        </div>
        <div
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
          className="flex gap-[160px] mt-[22px] p-[15px] border-b-[1px] border-[#E8E8E8] border-solid bg-white w-[375px] h-[50px] cursor-pointer"
        >
          <span className="text-sm text-[#911A33] w-[175px] h-[20px]">로그아웃</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
