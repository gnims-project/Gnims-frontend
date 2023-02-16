import React, { useRef, useState } from "react";
import kebab from "../../img/kebab.png";
import BottomNavi from "../layout/BottomNavi";
import TopNavBar from "../layout/TopNavBar";
import KebabModal from "../modal/KebabButtonModal";

const ScheduleDetail = () => {
  //  모달 노출시키는 여부
  const [modalOpen, setModalOpen] = useState(false);
  const showModalHandler = () => {
    setModalOpen(true);
  };

  return (
    <div className="bg-[#EDF7FF] h-[734px] width-[375px]">
      <TopNavBar />
      <div>
        {modalOpen && <KebabModal setModalOpen={setModalOpen} />}
        {/* bg는 유저가 등록시에 선택한 cardColor로   */}
        <div className="h-[250px] bg-[#538EDF] pl-[18px] pt-[71px] pr-[21px] text-white">
          <div className="flex flex-row-reverse">
            <img
              className="h-[20px] flex "
              src={kebab}
              alt="케밥메뉴"
              onClick={showModalHandler}
            />
          </div>
          <div className="flex space-x-3 text-[18px] mt-[-18px] font-light ">
            <div>23.02.06</div> <div> 오후 6:00</div>{" "}
          </div>
          <div className="mt-[28px] font-semibold text-[24px]">
            선희랑 마라탕 먹으러 가기
          </div>{" "}
          <div className="place-content-end font-light flex text-[18px] mt-[70px]">
            D-Day
          </div>
        </div>
        <div className="text-[#12396F]">
          <div className="mt-[30px] h-[98px] ml-[20px]">
            참여자{" "}
            <div className="bg-[#CEE4F8] h-[50px] w-[335px] mt-[20px] p-[15px] shadow flex rounded-lg">
              본인 포함 4명, 참여자 없으면 아예 뜨지 않습니다
            </div>
          </div>
          <div className="h-[234px] mt-[30px] mb-[8px] ml-[20px]">
            일정내용{" "}
            <div className="bg-[#CEE4F8] shadow h-[186px] w-[335px] mt-[20px] p-[15px] flex rounded-lg">
              여기에 내용이 들어갑니다
            </div>
          </div>
        </div>{" "}
      </div>
      <BottomNavi />
    </div>
  );
};

export default ScheduleDetail;
