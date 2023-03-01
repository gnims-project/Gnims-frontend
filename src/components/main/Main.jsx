import React, { useState } from "react";
import defaultprofileImg from "../../img/User-86.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import { useDispatch, useSelector } from "react-redux";
import MainScheduleCards from "./MainScheduleCards";
import ScheduleSlice, {
  __getSchedule,
} from "../../redux/modules/ScheduleSlice";
import BottomNavi from "../layout/BottomNavi";
import desc from "../../img/desc.png";
import SelectorSort from "../modal/SelectorSort";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.ScheduleSlice);
  const [profileImg, setProfileImg] = useState(defaultprofileImg);
  const [nickName, setNickname] = useState(sessionStorage.getItem("nickname"));
  const [sortList, setSortList] = useState("D-Day");
  const [modalOpen, setModalOpen] = useState(false);
  const getRandom = Math.floor(Math.random() * (4 + 0) + 0);
  const welcomText = [
    "환영합니다.",
    "오늘도 그님스가 응원할게요.",
    "좋은하루 되세요!",
    "안녕하세요.",
  ];

  const showModalHandler = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const getemail = sessionStorage.getItem("email");
    const getprofilImg = sessionStorage.getItem("profileImage");
    const userId = sessionStorage.getItem("userId");

    if (nickName && getemail) {
      if (getprofilImg) {
        setProfileImg(getprofilImg);
      }
      dispatch(__getSchedule(userId));
    } else {
      navigate(`/login`);
    }
  }, [navigate, nickName]);

  return (
    <>
      <div className="container">
        <div className="grid grid-flow-row gap-[26px] ml-[20px] mr-[20px] mb-[75px]">
          <div className="mt-[30px] h-[56px] bg-[#FFFFFF] rounded-[10px] drop-shadow-lg">
            <div className="">
              <div className="">
                <p className="leading-[36px] p-[10px] font-[700] text-[20px] text-textNavy">
                  {nickName}님 {welcomText[getRandom]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex cursor-pointer ">
            <div
              onClick={showModalHandler}
              className=" bg-white  flex gap-[6px] p-[10px] text-center items-center h-[40px] border border-solid border-[#E8E8E8] rounded-[39px] shadow-md"
            >
              <div className="shadow-sm  ">
                <img
                  src={desc}
                  className="h-[15.5px] w-[13.54px]"
                  alt="화살표모양, 오름차순정렬"
                />
              </div>
              <div>{sortList} 순</div>
            </div>
          </div>
          <div>
            {/* <InfiniteScroll /> */}
            <div className="flex flex-col gap-[30px]  rounded-[10px] ">
              {schedules?.map((list) => {
                return (
                  <MainScheduleCards key={list.eventId} schedules={list} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0">
        {modalOpen ? false : <BottomNavi />}
        {modalOpen && (
          <SelectorSort setModalOpen={setModalOpen} setSortList={setSortList} />
        )}
      </div>
    </>
  );
};

export default Main;
