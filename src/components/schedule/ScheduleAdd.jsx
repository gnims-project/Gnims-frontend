import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  scheduleReset,
  __postSchedule,
  __editSchedule,
  __getScheduleDetail,
} from "../../redux/modules/ScheduleSlice";
import FollowingModal from "../modal/FollowingModal";
import ScheduleAddModal from "../modal/ScheduleAddModal";
import ScheduleModal from "../modal/ScheduleModal";

// state.type:"add" 은 스케줄 추가, state.type:edit은 수정
const ScheduleAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //스케줄 추가, 수정 분기를 결정할 state 값을 받아옴
  const { state } = useLocation();

  useEffect(() => {
    if (state.type === "edit") {
      dispatch(__getScheduleDetail(state.id));
    } else {
      dispatch(scheduleReset());
    }
  }, []);

  //전역으로 받아오는 state
  const oldSchedule = useSelector((state) => state.ScheduleSlice.oldschedules);
  console.log("수정할 스케줄", oldSchedule);

  //필요한 변수들
  //날짜
  const [selectedDate, setSelectedDate] = useState(
    state.type === "edit"
      ? new Date(oldSchedule.date + "T" + oldSchedule.time)
      : ""
  );

  const [selectedColor, setColorSelected] = useState(
    state.type === "edit" ? oldSchedule.cardColor : "sora"
  );

  //제목
  const [subject, setSubject] = useState(
    state.type === "edit" ? oldSchedule.subject : ""
  );

  //내용
  const [content, setContent] = useState(
    state.type === "edit" ? oldSchedule.content : ""
  );

  const [borderSora, setBorderSora] = useState(
    state.type !== "edit"
      ? "border-blackBorder"
      : oldSchedule.cardColor === "sora"
      ? "border-blackBorder"
      : "border-none"
  );
  const [borderPink, setBorderPink] = useState(
    state.type !== "edit"
      ? "border-none"
      : oldSchedule.cardColor === "pink"
      ? "border-blackBorder"
      : "border-none"
  );
  const [borderGreen, setBorderGreen] = useState(
    state.type !== "edit"
      ? "border-none"
      : oldSchedule.cardColor === "green"
      ? "border-blackBorder"
      : "border-none"
  );

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
  //팔로우 선택
  const [participants, setParticipants] = useState([]);
  const onParticipantsChangeHandler = (e) => {
    // setParticipants(e.target.value);
  };

  const joinerArray =
    sessionStorage.getItem("selectedJoiner") &&
    sessionStorage.getItem("selectedJoiner").split(",");

  participants.push(joinerArray);
  let joinerWithoutDuplicate = [...new Set(joinerArray)];

  //time값 구하는 작업
  const splicedDate = [selectedDate].toString().split(" ");
  const time = splicedDate[4];
  const selectedJoinersName = sessionStorage.getItem("selectedJoinerNames");
  //전체내용을 서버로 보내는 부분.
  const scheduleAddHandler = (e) => {
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

      state.type !== "edit"
        ? dispatch(
            __postSchedule({
              Schedule: newSchedule,
              userId: sessionStorage.getItem("userId"),
              dispatch: dispatch,
            })
          )
        : dispatch(
            __editSchedule({
              eventId: oldSchedule.eventId,
              Schedule: newSchedule,
              userId: sessionStorage.getItem("userId"),
              dispatch: dispatch,
            })
          );
      setCompleteModal(true);
      sessionStorage.removeItem("selectedJoiner");
      sessionStorage.removeItem("selectedJoinerNames");
      console.log("생성된 스케쥴:", newSchedule);
      setTimeout(() => navigate("/main"), 1000);
    } else {
      setModalOpen(true);
    }
  };
  const [followingListOpen, setFollowingListOpen] = useState(false);

  return (
    <>
      <div className="w-[375px]">
        {followingListOpen && (
          <FollowingModal setFollowingListOpen={setFollowingListOpen} />
        )}
        {modalOpen && <ScheduleModal setModalOpen={setModalOpen} />}
        {completeModal && (
          <ScheduleAddModal state={state} setCompleteModal={setCompleteModal} />
        )}
        <div className="text-[#121213] ">
          <div className={"bg-[#F8FCFF] flex p-[20px] text-base"}>
            <form>
              <div className={"font-medium mt-[20px]"}>
                카드 테마 색상
                <div className="flex flex-row mt-4 ">
                  <div
                    className={`${borderSora} border-solid border-[4px] cursor-pointer rounded-[4px] w-[42px] h-[42px] bg-sora`}
                    onClick={eventHandlerSora}
                  >
                    {""}
                  </div>
                  <div
                    className={`${borderPink} border-solid border-[4px] cursor-pointer rounded-[4px] ml-[17px] w-[42px] h-[42px] bg-pink`}
                    onClick={eventHandlerPink}
                  >
                    {""}
                  </div>
                  <div
                    className={`${borderGreen} border-solid border-[4px] cursor-pointer rounded-[4px] ml-[17px] w-[42px] h-[42px] bg-green`}
                    onClick={eventHandlerGreen}
                  >
                    {""}
                  </div>
                </div>
              </div>
              <div className="justify-center mt-6 font-medium ">
                날짜와 시간
                <DatePicker
                  className="relative -z-9 justify-center cursor-pointer w-[335px] h-12 mt-4 font-light text-center text-black rounded-md shadow bg-input placeholder-placeHolder text-l hover:bg-sky-100"
                  dateFormat="yyyy년 MM월 dd일 h:mm aa"
                  selected={selectedDate}
                  minDate={new Date()}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  placeholderText="날짜를 선택해주세요!(필수)"
                />
              </div>
              {/* 참여자 input을 클릭시 친구 리스트가 */}
              <div className="flex cursor-pointer flex-col mt-6 font-semibold">
                참여자
                <div
                  // value={}
                  onClick={() => {
                    setFollowingListOpen(true);
                  }}
                  onChange={() => onParticipantsChangeHandler}
                  placeholder="함께할 친구들을 선택해주세요.(최대 5명)"
                  className={`mt-4 shadow hover:bg-sky-100 text-center placeholder-placeHolder w-[335px] h-12 bg-input justify-center text-l rounded-md text-black font-light p-4 ${
                    state.type === "edit" ? "pointer-events-none" : ""
                  }`}
                  disabled={state.type === "edit"}
                >
                  {state.type === "edit" ? (
                    <div className="text-placeHolder">
                      수정중에는 참여자를 변경 할 수 없습니다.
                    </div>
                  ) : joinerWithoutDuplicate.length > 0 ? (
                    <div className=" text-placeHolder">
                      {selectedJoinersName}
                    </div>
                  ) : (
                    <div className=" text-placeHolder">
                      함께할 친구들을 선택해주세요.(최대 5명)
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-6 font-medium ">
                일정 제목{" "}
                <input
                  value={subject}
                  onChange={onSubjectChangeHandler}
                  placeholder="일정 제목을 입력해주세요!(필수, 최대 20자)"
                  maxlength="20"
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
                  maxlength="200"
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
      </div>
    </>
  );
};

export default ScheduleAdd;
