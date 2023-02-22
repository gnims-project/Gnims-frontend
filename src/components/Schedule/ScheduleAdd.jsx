import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BottomNavi from "../layout/BottomNavi";
import { __postSchedule } from "../../redux/modules/ScheduleSlice";
import TopNavBar from "../layout/TopNavBar";
import ScheduleModal from "../modal/ScheduleModal";
//네비바테스트 후 TopNavBar지워야합니다
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const ScheduleAdd = () => {
  //필요한 변수들
  const [selectedDate, setSelectedDate] = useState();
  const [selectedColor, setColorSelected] = useState("sora");
  const [bgColor, setBgColor] = useState("bg-sora");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [participants, setParticipants] = useState("");
  const [borderSora, setBorderSora] = useState("border-white");
  const [borderNam, setBorderNam] = useState("border-none");
  const [borderParang, setBorderParang] = useState("border-none");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = new Date().toISOString().slice(0, 10);

  //색상지정시 카드의 백그라운드컬러가 바뀌면서 selectedColor에 값이 입혀진다.
  const eventHandlerSora = () => {
    setColorSelected("sora");
    setBgColor("bg-sora");
    setBorderSora("border-white");
    setBorderNam("border-none");
    setBorderParang("border-none");
  };
  const eventHandlerNam = () => {
    setColorSelected("nam");
    setBgColor("bg-nam");
    setBorderSora("border-none");
    setBorderNam("border-white");
    setBorderParang("border-none");
  };
  const eventHandlerParang = () => {
    setColorSelected("parang");
    setBgColor("bg-parang");
    setBorderSora("border-none");
    setBorderNam("border-none");
    setBorderParang("border-white");
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
        participantsId: [3],
      };
      await dispatch(
        __postSchedule({
          Schedule: newSchedule,
          userId: window.localStorage.getItem("userId"),
          dispatch,
        })
      );
      setSubject("");
      setContent("");
      setParticipants("");
      setSelectedDate("");
      setBgColor("bg-sora");
      alert("등록이 완료되었습니다!");
      console.log("생성된 스케쥴:", newSchedule);
      navigate("/main");
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    console.log("오늘의 날짜는", today);
    // console.log(border);
    // fetchSchedules();
  }, []);

  return (
    <>
      {/* //네비바테스트 후 TopNavBar지워야합니다  */}
      <TopNavBar />
      {modalOpen && <ScheduleModal setModalOpen={setModalOpen} />}
      <div className="text-white mb-[50px]">
        <div
          className={`${bgColor} flex w-screen pt-[50px] p-[20px] text-base`}
        >
          <form>
            <div className={"font-medium  mt-[20px]"}>
              카드 테마 색상
              <div className="flex flex-row mt-4 ">
                <div
                  className={`${borderSora} border-solid border-[4px] rounded-[4px] w-[42px] h-[42px] bg-sora`}
                  onClick={eventHandlerSora}
                >
                  {""}
                </div>
                <div
                  className={`${borderNam} border-solid border-[4px] rounded-[4px] ml-[17px] w-[42px] h-[42px] bg-nam`}
                  onClick={eventHandlerNam}
                >
                  {""}
                </div>
                <div
                  className={`${borderParang} border-solid border-[4px] rounded-[4px] ml-[17px] w-[42px] h-[42px] bg-parang`}
                  onClick={eventHandlerParang}
                >
                  {""}
                </div>
              </div>
            </div>
            <div className="justify-center mt-6 font-medium ">
              날짜와 시간
              <DatePicker
                className="static placeholder-textNavy shadow w-[335px] h-12 mt-4 bg-white justify-center text-l hover:bg-sky-100 rounded-md text-black font-light  text-center"
                dateFormat="yyyy년 MM월 dd일 h:mm aa"
                selected={selectedDate}
                minDate={new Date()}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                placeholderText="날짜를 선택해주세요!(필수)"
              />
            </div>
            {/* 참여자 input을 클릭시 친구 리스트가 */}
            <div className="flex flex-col mt-6 font-semibold ">
              참여자 (우선 Id로 받습니다)
              <input
                value={participants}
                onChange={() => onParticipantsChangeHandler}
                placeholder="함께할 친구들을 선택해주세요.(최대 4명)"
                className="mt-4 shadow 
              hover:bg-sky-100
              text-center placeholder-textNavy
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
            <div className="flex flex-col mt-6 font-medium ">
              일정 제목{" "}
              <input
                value={subject}
                onChange={onSubjectChangeHandler}
                placeholder="일정 제목을 입력해주세요!(필수)"
                className="mt-4 shadow
              hover:bg-sky-100 placeholder-textNavy
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
            <div className="flex flex-col mt-6 font-medium ">
              일정 내용
              <input
                value={content}
                onChange={onContentChangeHandler}
                placeholder="일정 내용을 입력해주세요."
                className="mt-4
              shadow
              hover:bg-sky-100 placeholder-textNavy
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
              className="mt-8 rounded-lg text-[16px] pt-[15px] font-semibold bg-[#002C51] text-white text-center align-middle w-[335px] h-[50px] justify-center flex shadow"
            >
              등록 완료
            </button>
          </form>
        </div>
        <BottomNavi />
      </div>
    </>
  );
};

export default ScheduleAdd;
