import React, { useState, useEffect, useRef } from "react";

import MainScheduleCards from "./MainScheduleCards";
import { useDispatch, useSelector } from "react-redux";
import { __getScrollPage } from "../../redux/modules/ScheduleSlice";
import MoonLoader from "react-spinners/MoonLoader";

const InfiniteScroll = () => {
  const dispatch = useDispatch();
  const { schedules, isLoading } = useSelector((state) => state.ScheduleSlice);
  //페이징 생성
  const [page, setPage] = useState(0);
  //중복 실행 방저
  const preventRef = useRef(true);
  //모든 글 로드 확인
  const endRef = useRef(false);
  //옵저버 확인
  const observerRef = useRef(null);
  const userId = sessionStorage.getItem("userId");

  //옵저버 핸들링 함수
  const observerHandler = ([entries], observer) => {
    if (entries.isIntersecting && !endRef.current) {
      if (page !== 0) {
        dispatch(
          __getScrollPage({ userId: userId, page: page, endRef, preventRef })
        );
      }
      observer.unobserve(entries.target);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    dispatch(
      __getScrollPage({ userId: userId, page: page, endRef, preventRef })
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerHandler, {
      threshold: 0.5,
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      observer && observer.disconnect();
    };
  }, [schedules]);

  return (
    <>
      <div className="wrap min-h-[100vh]">
        {schedules && (
          <>
            <div className="flex flex-col gap-[30px]  rounded-[10px] ">
              {schedules.map((list, index) => {
                return <MainScheduleCards key={index} schedules={list} />;
              })}
            </div>
          </>
        )}
        {isLoading && (
          <div className="flex flex-col items-center mt-[20px]">
            <MoonLoader
              color="#36a6d6"
              cssOverride={{}}
              loading
              size={30}
              speedMultiplier={1}
            />
          </div>
        )}
        <div ref={observerRef} className="h-[10px]"></div>
      </div>
    </>
  );
};

export default InfiniteScroll;
