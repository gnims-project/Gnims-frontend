import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const ScheduleAdd = () => {
  //필요한 변수들
  const [selectedDate, setSelectedDate] = useState();
  const [selectedColor, setColorSelected] = useState("");
  const [bgColor, setBgColor] = useState("bg-sky-400/30");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  //색상지정시 카드의 백그라운드컬러가 바뀌면서 selectedColor에 값이 입혀진다.
  const eventHandlerBlue = () => {
    setColorSelected("blue");
    setBgColor("bg-sky-400/30");
  };
  const eventHandlerGreen = () => {
    setColorSelected("green");
    setBgColor("bg-teal-300/30");
  };
  const eventHandlerPurple = () => {
    setColorSelected("purple");
    setBgColor("bg-violet-400/30");
  };

  //일정의 제목과 내용, 참여자 onChangeHandler
  const onSubjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };
  const onContentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    console.log(selectedColor);
    console.log(selectedDate);
    console.log(subject, content);
  }, [selectedDate, selectedColor]);

  return (
    <div className="mt-6 ">
      <div className={`${bgColor} flex w-screen h-screen p-4`}>
        <form>
          <div
            className={"font-semibold underline mt-6 decoration-indigo-500/30"}
          >
            카드 테마 색상
            <div className="mt-4 flex-row flex  ">
              <div
                className="rounded ml-6 w-8 h-8 bg-sky-400 "
                onClick={eventHandlerBlue}
              >
                {}
              </div>
              <div
                className="rounded ml-6 w-8 h-8 bg-teal-300  "
                onClick={eventHandlerGreen}
              >
                {""}
              </div>
              <div
                className="rounded ml-6 w-8 h-8 bg-violet-400 "
                onClick={eventHandlerPurple}
              >
                {""}
              </div>
            </div>
          </div>
          <div className="mt-6 justify-center font-semibold underline decoration-indigo-500/30 ">
            날짜와 시간
            <DatePicker
              showIcon
              className="shadow ml-6 w-full h-12 mt-4 bg-white justify-center text-l hover:bg-sky-100 rounded-md text-black font-medium  text-center"
              dateFormat="yyyy년 MM월 dd일 h:mm aa"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              placeholderText="날짜를 선택해주세요!"
            />
          </div>

          <div className="mt-6 font-semibold underline decoration-indigo-500/30">
            참여자
            <input
              className="mt-4 shadow
              hover:bg-sky-100
              ml-6
              w-full
              h-12
              bg-white
              justify-center
              text-l
              rounded-md
              text-black
              font-medium
             "
            />
          </div>
          <div className="mt-6 font-semibold underline decoration-indigo-500/30">
            일정 제목{" "}
            <input
              value={subject}
              onChange={onSubjectChangeHandler}
              className="mt-4 shadow
              hover:bg-sky-100
              ml-6
              w-full
              h-12
              bg-white
              justify-center
              text-l
              rounded-md
              text-black
              font-medium
              p-4"
            />
          </div>
          <div className="mt-6 font-semibold underline decoration-indigo-500/30">
            일정 내용
            <input
              value={content}
              onChange={onContentChangeHandler}
              className="mt-4 
              shadow
              hover:bg-sky-100
              ml-6
              w-full
              h-56
              bg-white
              text-l
              rounded-md
              text-black
              font-medium
             p-4
             place-itmes-start"
            />
          </div>
          <button className="mt-8 rounded-lg text-center align-middle border-white w-full h-12 border justify-center flex shadow">
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAdd;
