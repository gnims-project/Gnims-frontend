import React, { useState, useEffect, useRef, useCallback } from "react";
import { ScheduleApi } from "../../api/ScheduleApi";
import MainScheduleCards from "./MainScheduleCards";
import { useSelector, useDispatch } from "react-redux";
import { __getScrollPage } from "../../redux/modules/ScheduleSlice";

const InfiniteScroll = ({ schedules }) => {
  const dispatch = useDispatch();
  console.log(schedules);

  //리스트 생성
  const [scheduleList, setScheduleList] = useState(schedules);
  console.log(scheduleList);
  //페이징 생성
  const [page, setPage] = useState(1);
  console.log(page);
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
  const observerHandler = ([entries], observer) => {
    console.log(entries);
    console.log(entries.isIntersecting);
    if (entries.isIntersecting) {
      getSchedule({ userId: userId, page: page });
      observer.unobserve(entries.target);
      setPage((prev) => prev + 1);
    }
  };

  //데이터가져옴
  const getSchedule = useCallback(async (payload) => {
    setLoad(true);
    try {
      const { data } = await ScheduleApi.getInfiniteScrollPage(payload);
      const dataList = data.data;
      console.log(data);
      if (page === data.totalPage) {
        //마지막 페이지일 경우
        endRef.current = true;
        //noPostShow();
        setScheduleList((prev) => [...prev, ...dataList]); //리스트 추가
        //prevent_duple.current = true;
      } else {
        setScheduleList((prev) => [...prev, ...dataList]); //리스트 추가
        preventRef.current = true;
      }
      console.log(scheduleList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    console.log("useEffet실행");
    const observer = new IntersectionObserver(observerHandler, {
      threshold: 0.5,
    });
    //주시대상목록에 추가
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      observer && observer.disconnect();
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
