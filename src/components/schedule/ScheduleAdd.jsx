import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postSchedule } from "../../redux/modules/ScheduleSlice";
import FollowingModal from "../modal/FollowingModal";
import ScheduleAddModal from "../modal/ScheduleAddModal";
import ScheduleModal from "../modal/ScheduleModal";

const ScheduleAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //필요한 변수들
  const [selectedDate, setSelectedDate] = useState();
  const [selectedColor, setColorSelected] = useState("sora");
  const today = new Date().toISOString().slice(0, 10);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [borderSora, setBorderSora] = useState("border-blackBorder");
  const [borderPink, setBorderPink] = useState("border-none");
  const [borderGreen, setBorderGreen] = useState("border-none");

  //완료모달&경고모달
  const [modalOpen, setModalOpen] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  //색상지정시 카드의 백그라운드컬러가 바뀌면서 selectedColor에 값이 입혀진다.
  const eventHandlerSora = () => {
    setColorSelected("sora");
    setBorderSora("border-blackBorder");
    setBorderPink("border-none");
    setBorderGreen("border-none");
  };
  const eventHandlerPink = () => {
    setColorSelected("pink");
    setBorderSora("border-none");
    setBorderPink("border-blackBorder");
    setBorderGreen("border-none");
  };
  const eventHandlerGreen = () => {
    setColorSelected("green");
    setBorderSora("border-none");
    setBorderPink("border-none");
    setBorderGreen("border-blackBorder");
  };
  //일정의 제목과 내용, 참여자 onChangeHandler
  const onSubjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };
  const onContentChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const [participants, setParticipants] = useState([]);
  const onParticipantsChangeHandler = (e) => {
    // setParticipants(e.target.value);
  };

  const joinerArray =
    localStorage.getItem("selectedJoiner") &&
    localStorage.getItem("selectedJoiner").split(",");

  participants.push(joinerArray);
  let joinerWithoutDuplicate = [...new Set(joinerArray)];

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
        participantsId: joinerWithoutDuplicate,
      };
      await dispatch(
        __postSchedule({
          Schedule: newSchedule,
          userId: window.localStorage.getItem("userId"),
          dispatch: dispatch,
        })
      );
      localStorage.removeItem("selectedJoiner");
      console.log("생성된 스케쥴:", newSchedule);
      setCompleteModal(true);
      navigate("/main");
    } else {
      setModalOpen(true);
    }
  };
  const [followingListOpen, setFollowingListOpen] = useState(false);

  useEffect(() => {
    console.log("오늘의 날짜는", today);

    // fetchSchedules();
  }, []);

  return (
    <>
      {/* //네비바테스트 후 TopNavBar지워야합니다  */}
      {followingListOpen && (
        <FollowingModal setFollowingListOpen={setFollowingListOpen} />
      )}
      {modalOpen && <ScheduleModal setModalOpen={setModalOpen} />}
      {completeModal && (
        <ScheduleAddModal setCompleteModal={setCompleteModal} />
      )}
      <div className="text-[#121213]">
        <div className={"bg-[#F8FCFF] flex p-[20px] text-base"}>
          <form>
            <div className={"font-medium mt-[20px]"}>
              카드 테마 색상
              <div className="flex flex-row mt-4 ">
                <div
                  className={`${borderSora} border-solid border-[4px] rounded-[4px] w-[42px] h-[42px] bg-sora`}
                  onClick={eventHandlerSora}
                >
                  {""}
                </div>
                <div
                  className={`${borderPink} border-solid border-[4px] rounded-[4px] ml-[17px] w-[42px] h-[42px] bg-pink`}
                  onClick={eventHandlerPink}
                >
                  {""}
                </div>
                <div
                  className={`${borderGreen} border-solid border-[4px] rounded-[4px] ml-[17px] w-[42px] h-[42px] bg-green`}
                  onClick={eventHandlerGreen}
                >
                  {""}
                </div>
              </div>
            </div>
            <div className="justify-center mt-6 font-medium ">
              날짜와 시간
              <DatePicker
                className="static justify-center w-full h-12 mt-4 font-light text-center text-black bg-input rounded-md shadow placeholder-placeHolder text-l hover:bg-sky-100"
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
              참여자
              <input
                // value={}
                onClick={() => {
                  setFollowingListOpen(true);
                }}
                onChange={() => onParticipantsChangeHandler}
                placeholder="함께할 친구들을 선택해주세요.(최대 4명)"
                className="mt-4 shadow 
              hover:bg-sky-100
              text-center placeholder-placeHolder
              w-[335px]
              h-12
              bg-input
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
              hover:bg-sky-100 placeholder-placeHolder
              text-center
              w-[335px]
              h-12
              bg-input
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
                placeholder="일정 내용을 입력해주세요.(선택)"
                className="mt-4
              shadow
              hover:bg-sky-100 placeholder-placeHolder
              text-center
              w-[335px]
              h-56
              bg-input
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
      </div>
    </>
  );
};

export default ScheduleAdd;
