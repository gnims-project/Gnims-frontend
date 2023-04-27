import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainScheduleReset, __getSchedule } from "../../redux/modules/ScheduleSlice";
import MainScheduleCards from "./MainScheduleCards";
import BottomNavi from "../layout/BottomNavi";
import desc from "../../img/desc.png";
import SelectorSort from "../modal/SelectorSort";
import MainHeader from "./MainHeader";

const Main = () => {
  const dispatch = useDispatch();

  const { schedules, sortList } = useSelector((state) => state.ScheduleSlice);
  const [modalOpen, setModalOpen] = useState(false);

  const showModalHandler = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (sortList === "D-Day") {
      dispatch(__getSchedule({ userId: userId, sortedBy: "event.dDay" }));
    } else {
      dispatch(__getSchedule({ userId: userId, sortedBy: "event.createAt" }));
    }
    return () => {
      dispatch(mainScheduleReset());
    };
  }, [sortList]);

  return (
    <>
      <div className="container">
        <div className="grid grid-flow-row gap-[26px] ml-[20px] mr-[20px] mb-[75px]">
          <MainHeader />
          <div className="flex cursor-pointer ">
            <div
              onClick={showModalHandler}
              className="bg-white  flex gap-[6px] p-[10px] text-center items-center h-[40px] border border-solid border-[#E8E8E8] rounded-[39px] shadow-md"
            >
              <div className="shadow-sm">
                <img src={desc} className="h-[15.5px] w-[13.54px]" alt="화살표모양, 오름차순정렬" />
              </div>
              <div>{sortList} 순</div>
            </div>
          </div>
          <div>
            {/* <InfiniteScroll /> */}
            <div className="flex flex-col gap-[30px]  rounded-[10px] ">
              {schedules?.map((list) => {
                return <MainScheduleCards key={list.eventId} schedules={list}></MainScheduleCards>;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0">
        {modalOpen ? false : <BottomNavi />}
        {/* <BottomNavi /> */}
        {modalOpen && <SelectorSort setModalOpen={setModalOpen} sortList={sortList} />}
      </div>
    </>
  );
};

export default Main;
