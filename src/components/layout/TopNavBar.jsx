import React, { useEffect, useState } from "react";
import searchIcon from "../../img/searchIcon.svg";
import plusIcon from "../../img/plusIcon.svg";
import notifyIcon from "../../img/notifyIcon.svg";
import { useNavigate } from "react-router-dom";
import gnimsLogo from "../../img/gnimsLogo.png";
import { instance } from "../../shared/AxiosInstance";
import Point from "../../img/point.png";
import { EventSourcePolyfill } from "event-source-polyfill";
import NotificationModal from "../modal/NotificationModal";

const TopNavBar = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [allchecked, setAllChecked] = useState("");

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
      eventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_BASE_URL}/connection`,
        {
          //headers에 토큰을 꼭 담아줘야 500이 안뜬다.
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
          },
        }
      );

      eventSource.onopen = () => {};
      eventSource.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        const message = data.message;
        setContent(message);
        setOpen(true);
      };
      eventSource.addEventListener("follow", async (e) => {
        const data = JSON.parse(e.data);
        const message = data.message;
        setContent(message);
        setOpen(true);
      });
      eventSource.addEventListener("invite", async (e) => {
        const data = JSON.parse(e.data);
        const message = data.message;
        setContent(message);
        setOpen(true);
      });
      eventSource.addEventListener("invite_response", async (e) => {
        const data = JSON.parse(e.data);
        const message = data.message;
        setContent(message);
        setOpen(true);
      });
    } catch (error) {
      if (eventSource) eventSource.close();
    }
  };
  useEffect(() => {
    fetchSse();
    getNoti();
    //컴포넌트가 언마운트될 때 eventSource를 닫음
    return () => {
      eventSource && eventSource.close();
    };
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
        <div className="flex flex-row gap-[23px]">
          <img
            className="h-[19px] w-[19px] flex cursor-pointer mt-[18px]"
            src={searchIcon}
            alt="검색버튼"
            onClick={() => {
              navigate("/userSearch");
            }}
          />
          <img
            className="h-[14px] cursor-pointer w-[14px] flex mt-[19px]"
            src={plusIcon}
            alt="추가버튼"
            onClick={() => {
              //스케줄 추가를 하기 위한 파라미터 값을 넘긴다.
              navigate("/schedule", { state: { type: "add", id: "" } });
            }}
          />
          <div className={`w-[30px] bg-${allchecked}`}>
            <img
              className="h-[21px] w-[18px] cursor-pointer flex  mt-[15px]"
              src={notifyIcon}
              alt="알림버튼"
              onClick={() => {
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
