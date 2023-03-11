import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPastSchedlue } from "../../redux/modules/ScheduleSlice";
import MainScheduleCards from "../main/MainScheduleCards";
import PageInfoCard from "./PageInfoCard";

const PastEvents = () => {
  const dispatch = useDispatch();
  const { pastSchedules } = useSelector((state) => state.ScheduleSlice);
  const nickname = sessionStorage.getItem("nickname");
  const profileImg = sessionStorage.getItem("profileImage");

  useEffect(() => {
    dispatch(__getPastSchedlue());
  }, []);

  return (
    <div className="container container-md pt-[34px] pr-[19px] pl-[21px]">
      <div className="grid grid-flow-row gap-[24px] ">
        <div>
          <PageInfoCard profileImg={profileImg} nickname={nickname}>
            ,<p>멋진 일대기를 돌아볼까요?</p>
          </PageInfoCard>
        </div>
        <div className="grid grid-flow-row gap-[30px]">
          {pastSchedules.map((list) => (
            <MainScheduleCards key={list.eventId} schedules={list} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastEvents;
