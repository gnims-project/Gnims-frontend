import React, { useState, useEffect, useRef, useCallback } from "react";
import { ScheduleApi } from "../../api/ScheduleApi";
import MainScheduleCards from "./MainScheduleCards";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getScrollPage } from "../../redux/modules/ScheduleSlice";
import { pagePlus } from "../../redux/modules/ScheduleSlice";
import axios from "axios";

const InfiniteScroll = () => {
  //리스트 생성
  const [scheduleList, setScheduleList] = useState();
  //페이징 생성
  const [page, setPage] = useState(0);
  //로딩여부
  const [load, setLoad] = useState(true);
  //중복 실행 방저
  const preventRef = useRef(true);
  //모든 글 로드 확인
  const endRef = useRef(false);
  //옵저버 확인
  const observerRef = useRef(null);
  const userId = window.localStorage.getItem("userId");

  //옵저버 핸들링 함수
  const observerHandler = ([entries]) => {
    console.log(entries);
    console.log(endRef.current);
    if (!endRef.current && entries.isIntersecting) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  //데이터가져옴
  const getSchedule = useCallback(async (payload) => {
    setLoad(true);
    try {
      const { data } = await ScheduleApi.getInfiniteScrollPage(payload);
      const dataList = data.data;
      console.log(dataList);
      setScheduleList(() => ({ dataList }));
      console.log(scheduleList);
    } catch {
    } finally {
    }
  }, []);

  useEffect(() => {
    if (page !== 0) getSchedule({ userId: userId, page: page });
  }, [page, userId, getSchedule]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerHandler, {
      threshold: 0.5,
    });
    //주시대상목록에 추가
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <div className="wrap min-h-[100vh]">
        {scheduleList && (
          <>
            <div className="flex flex-col gap-[30px] mt-[28px] rounded-[10px] ">
              {scheduleList.map((list, index) => {
                return <MainScheduleCards key={index} schedules={list} />;
              })}
            </div>
          </>
        )}
        {load && <div className="py-3 bg-blue-500 text-center">로딩 중</div>}
        <div
          ref={observerRef}
          className="py-3 bg-red-500 text-white text-center"
        >
          옵저버 Element
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
