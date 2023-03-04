import React, { useEffect, useState } from "react";
import searchIcon from "../../img/searchIcon.png";
import plusIcon from "../../img/plusIcon.png";
import notifyIcon from "../../img/notifyIcon.png";
import { useNavigate } from "react-router-dom";
import gnimsLogo from "../../img/gnimsLogo.png";
import { instance } from "../../shared/AxiosInstance";
import Point from "../../img/point.png";
import { EventSourcePolyfill } from "event-source-polyfill";
import NotificationModal from "../modal/NotificationModal";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../redux/modules/ModalSlice";

const TopNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  // const { isOpen = false, message = "" } = useSelector(
  //   (state) => state.modal || {}
  // );
  const [open, setOpen] = useState(false);
  const [allchecked, setAllChecked] = useState("");
  // const handleModalOpen = (message) => {
  //   dispatch(openModal({ isOpen: true, message }));
  // };
  // const handleCloseModal = () => {
  //   dispatch(closeModal());
  // };
  const close = () => setOpen(false);
  //DB불러오는 getNoti
  const getNoti = async () => {
    await instance.get("/notifications").then((res) => {
      const notilist = res.data.data.map((data) => data.isChecked);
      notilist.filter((a) => a === false).length > 0
        ? setAllChecked("")
        : setAllChecked("hidden");
    });
  };

  let eventSource;
  const fetchSse = async () => {
    try {
      //EventSource생성.
      eventSource = new EventSourcePolyfill("https://eb.jxxhxxx.shop/connect", {
        //headers에 토큰을 꼭 담아줘야 500이 안뜬다.
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
        // withCredentials: true,
      });
      // SSE 연결 성공 시 호출되는 이벤트 핸들러
      eventSource.onopen = () => {
        console.log("SSE 연결완료");
      };
      eventSource.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        const message = data.message;
        setContent(message);
        setOpen(true);
        // handleModalOpen(message);
        await setAllChecked("");
      };
      eventSource.addEventListener("follow", async (e) => {
        const data = JSON.parse(e.data);
        const message = data.message;
        setContent(message);
        setOpen(true);
        // handleModalOpen(message);

        await setAllChecked("");
      });
      eventSource.addEventListener("invite", async (e) => {
        const data = JSON.parse(e.data);
        const message = data.message;
        setContent(message);
        // handleModalOpen(message);
        setOpen(true);
        await setAllChecked("");
      });
    } catch (error) {
      console.log("에러발생:", error);
      if (eventSource) eventSource.close();
    }
  };
  useEffect(() => {
    fetchSse();
    getNoti();
    //컴포넌트가 언마운트될 때 eventSource를 닫음
    //return () => {
    //   eventSource && eventSource.close();
    // };
  }, []);

  return (
    <div className="">
      {open && <NotificationModal content={content} close={close} />}
      <div className="h-[48px] bg-white opacity-80 flex justify-between pr-[13px] pl-[13px]">
        <div className="h-[48px] w-[217px]">
          <img
            src={gnimsLogo}
            alt="gnimsLogo"
            className="mt-[15px] h-[20px] w-[73px] cursor-pointer"
            onClick={() => {
              navigate("/main");
            }}
          />
        </div>
        <div className="flex flex-row gap-[19px]">
          <img
            className="h-[24px] w-[24px] flex left-[255px] cursor-pointer mt-[13px]"
            src={searchIcon}
            alt="검색버튼"
            //navigate 경로는 검색페이지루트가 정해지면 변경하면됩니다
            onClick={() => {
              navigate("/userSearch");
              console.log("검색페이지로이동");
            }}
          />
          <img
            className="h-[24px] cursor-pointer w-[24px] flex left-[293px] mt-[13px]"
            src={plusIcon}
            alt="추가버튼"
            onClick={() => {
              console.log("스케쥴추가페이지로이동!");
              //스케줄 추가를 하기 위한 파라미터 값을 넘긴다.
              navigate("/schedule", { state: { type: "add", id: "" } });
            }}
          />
          <div className={`w-[30px] bg-${allchecked}`}>
            <img
              className="h-[24px] w-[24px] cursor-pointer flex left-[331px] mt-[13px]"
              src={notifyIcon}
              alt="알림버튼"
              onClick={() => {
                console.log("알림페이지로 이동");
                navigate("/notification");
              }}
            />
            <img
              src={Point}
              alt="알림표시"
              className={`${allchecked} ml-[20px]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
