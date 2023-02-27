import React, { useState, useEffect, useRef, useCallback } from "react";
import { ScheduleApi } from "../../api/ScheduleApi";
import MainScheduleCards from "./MainScheduleCards";
import { useDispatch, useSelector } from "react-redux";
import { __getScrollPage } from "../../redux/modules/ScheduleSlice";

const InfiniteScroll = () => {
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.ScheduleSlice);
  console.log("무한스케줄 리스트", schedules);
  //리스트 생성
  const [scheduleList, setScheduleList] = useState(schedules);
  console.log("무한스크롤에 set스케줄", scheduleList);
  //페이징 생성
  const [page, setPage] = useState(1);
  //로딩여부
  const [load, setLoad] = useState(true);
  //중복 실행 방저
  const preventRef = useRef(true);
  //모든 글 로드 확인
  const endRef = useRef(false);
  //옵저버 확인
  const observerRef = useRef(null);
  const userId = sessionStorage.getItem("userId");

  //옵저버 핸들링 함수
  const observerHandler = ([entries], observer) => {
    console.log("옵저버 실행여부");
    console.log(endRef.current);
    if (entries.isIntersecting && !endRef) {
      console.log("데이터를 가져오는지 확인");
      getSchedule({ userId: userId, page: page });
      observer.unobserve(entries.target);
      setPage((prev) => prev + 1);
    }
  };

  const getSchedule = useCallback(
    async (payload) => {
      setLoad(true);
      try {
        const data = await ScheduleApi.getInfiniteScrollPage(payload);
        const dataList = data.data.data;
        if (page === data.totalPage) {
          endRef.current = true;
          setScheduleList((prevList) => [...prevList, ...dataList]);
        }
        setScheduleList((prevList) => [...prevList, ...dataList]);
        preventRef.current = true;
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    },
    [page]
  );

  useEffect(() => {
    console.log("useEffect실행");
    const userId = sessionStorage.getItem("userId");
    dispatch(__getScrollPage({ userId: userId, page: 0 }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerHandler, {
      threshold: 0.5,
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      observer && observer.disconnect();
    };
  }, [page]);

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
