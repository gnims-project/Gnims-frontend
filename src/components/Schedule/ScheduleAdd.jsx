import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { __postSchedule } from "../../redux/modules/ScheduleSlice";
import TopNavBar from "../layout/TopNavBar";
//네비바테스트 후 TopNavBar지워야합니다
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const ScheduleAdd = () => {
  //필요한 변수들
  const [selectedDate, setSelectedDate] = useState();
  const [selectedColor, setColorSelected] = useState("");
  const [bgColor, setBgColor] = useState("bg-sky-400/30");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [participants, setParticipants] = useState("");
  // const [schedules, setSchedules] = useState({
  //   id: 0,
  //   cardColor: "",
  //   date: "",
  //   time: "",
  //   subject: "",
  //   content: "",
  //   participantsId: "",
  // });
  const dispatch = useDispatch();
  const today = new Date().toISOString().slice(0, 10);

  //색상지정시 카드의 백그라운드컬러가 바뀌면서 selectedColor에 값이 입혀진다.
  const eventHandlerBlue = () => {
    setColorSelected("BLUE");
    setBgColor("bg-sky-400/20");
  };
  const eventHandlerGreen = () => {
    setColorSelected("GREEN");
    setBgColor("bg-teal-300/20");
  };
  const eventHandlerPurple = () => {
    setColorSelected("PURPLE");
    setBgColor("bg-violet-400/20");
  };

  //일정의 제목과 내용, 참여자 onChangeHandler
  const onSubjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };
  const onContentChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const onParticipantsChangeHandler = (e) => {
    setParticipants(e.target.value);
  };
  const [participantss, setParticipantss] = useState([]);
  if (participants.length > 0) {
    setParticipantss(participants);
  }

  //time값 구하는 작업
  const splicedDate = [selectedDate].toString().split(" ");
  const time = splicedDate[4];

  //전체내용을 서버로 보내는 부분.
  const scheduleAddHandler = async (e) => {
    e.preventDefault();

    if (subject.length > 0 && [selectedDate].toString().length > 0) {
      const newSchedule = {
        cardColor: selectedColor,
        date: selectedDate.toISOString().slice(0, 10),
        time: time,
        subject: subject,
        content: content,
        participantsId: participantss,
      };
      await dispatch(__postSchedule(newSchedule));
      setSubject("");
      setContent("");
      setParticipants("");
      setSelectedDate("");
      setBgColor("bg-sky-400/10");
      alert("등록이 완료되었습니다!");
      console.log(newSchedule);
    } else {
      alert("제목과 날짜,시간은 필수사항입니다!");
    }
  };

  useEffect(() => {
    console.log(today);
    // fetchSchedules();
  }, [selectedDate, selectedColor]);

  return (
    <>
      {/* //네비바테스트 후 TopNavBar지워야합니다  */}
      <TopNavBar />
      <div className="text-textNavy">
        <div
          className={`${bgColor} flex w-screen  pt-[50px] p-[20px] text-base`}
        >
          <form>
            <div className={"font-medium  mt-[20px]"}>
              카드 테마 색상
              <div className="mt-4 flex-row flex  ">
                <div
                  className="rounded w-[42px] h-[42px] bg-sora "
                  onClick={eventHandlerBlue}
                >
                  {}
                </div>
                <div
                  className="rounded ml-[17px] w-[42px] h-[42px] bg-nam"
                  onClick={eventHandlerGreen}
                >
                  {""}
                </div>
                <div
                  className="rounded ml-[17px] w-[42px] h-[42px] bg-parang"
                  onClick={eventHandlerPurple}
                >
                  {""}
                </div>
              </div>
            </div>
            <div className="mt-6 justify-center font-medium ">
              날짜와 시간
              <DatePicker
                className="shadow w-[335px] h-12 mt-4 bg-white justify-center text-l hover:bg-sky-100 rounded-md text-black font-light  text-center"
                dateFormat="yyyy년 MM월 dd일 h:mm aa"
                selected={selectedDate}
                minDate={new Date()}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                placeholderText="날짜를 선택해주세요!(필수)"
              />
            </div>
            {/* 참여자 input을 클릭시 친구 리스트가 */}
            <div className="mt-6 flex-col flex font-semibold ">
              참여자 (우선 Id로 받습니다)
              <input
                value={participants}
                onChange={onParticipantsChangeHandler}
                placeholder="일정을 함께할 친구가 있나요?"
                className="mt-4 shadow
              hover:bg-sky-100
              text-center
              w-[335px]
              h-12
              bg-white
              justify-center
              text-l
              rounded-md
              text-black
              font-light
              p-4
             "
              />
            </div>
            <div className="mt-6 flex-col flex font-medium ">
              일정 제목{" "}
              <input
                value={subject}
                onChange={onSubjectChangeHandler}
                placeholder="일정의 제목을 입력해주세요!(필수)"
                className="mt-4 shadow
              hover:bg-sky-100
              text-center
              w-[335px]
              h-12
              bg-white
              justify-center
              text-l
              rounded-md
              text-black
              font-light
              p-4"
              />
            </div>
            <div className="mt-6 flex-col flex font-medium ">
              일정 내용
              <input
                value={content}
                onChange={onContentChangeHandler}
                placeholder="일정의 자세한 내용이 있다면 입력해주세요."
                className="mt-4 
              shadow
              hover:bg-sky-100
              text-center
              w-[335px]
              h-56
              bg-white
              text-l
              rounded-md
              text-black
              font-light
             p-4
             place-itmes-start"
              />
            </div>
            <button
              onClick={scheduleAddHandler}
              className="mt-8 rounded-lg text-[16px] pt-[10px] font-semibold bg-[#015397] text-white text-center align-middle w-[335px] h-[40px] justify-center flex shadow"
            >
              등록 완료
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ScheduleAdd;
