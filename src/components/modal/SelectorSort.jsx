import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortList } from "../../redux/modules/ScheduleSlice";

const SelectorSort = ({ setModalOpen, sortList }) => {
  const dispatch = useDispatch();
  const [textColor, setTextColor] = useState(() =>
    sortList === "D-Day"
      ? {
          dDay: "text-textNavy",
          new: "text-[#6F6F6F]",
        }
      : { dDay: "text-[#6F6F6F]", new: "text-textNavy" }
  );

  const handleTextColor = (text) => {
    if (text === "DDAY") {
      setTextColor(() => ({
        dDay: "text-textNavy",
        new: "text-[#6F6F6F]",
      }));
      dispatch(setSortList("D-Day"));
    } else {
      setTextColor(() => ({
        dDay: "text-[#6F6F6F]",
        new: "text-textNavy",
      }));
      dispatch(setSortList("새로 등록된 일정"));
    }
  };
  const onHandlerClose = () => {
    setModalOpen(() => false);
  };
  return (
    <>
      <div className="h-full w-[375px]  bg-black bg-opacity-50  justify-center fixed bottom-0 z-10 flex ">
        <div className="flex flex-col  bottom-0 w-[375px] h-[160px] rounded-t-lg bg-white fixed ">
          <div className=" border-solid   border-[#BBD7FF] border-b-[1px] cursor-pointer">
            <div
              onClick={() => {
                handleTextColor("DDAY");
              }}
              className={`
                flex items-center ${textColor.dDay} font-bold h-[57px]   pl-[30px] pr-[30px]
              `}
            >
              D-DAY 순 정렬
            </div>
          </div>
          <div className="border-solid border-[#BBD7FF] border-b-[1px] cursor-pointer">
            <div
              onClick={() => {
                handleTextColor("NEW");
              }}
              className={`flex items-center font-bold h-[57px]  ml-[30px] ${textColor.new} pr-[30px]`}
            >
              새로 등록된 일정 순 정렬
            </div>
          </div>
          <div className="text-center">
            <div
              onClick={onHandlerClose}
              className=" inline-flex items-center font-bold h-[57px] ml-[30px]  cursor-pointer pr-[30px]"
            >
              닫기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectorSort;
