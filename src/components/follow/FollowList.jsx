import React, { useState } from "react";

const FollowList = () => {
  const tapmenu = ["팔로우", "팔로워"];
  const [editmode, setEditMode] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-5">
        <div>
          <button className="bg-blue-500 h-5"> 뒤로 </button>
        </div>
        <div>
          <div className="text-center">팔로우 목록</div>
        </div>
      </div>
      <div className="flex text-center">
        {tapmenu.map((index) => {
          return (
            <div
              key={index}
              className="pt-3 border-solid border-2 border-black w-1/2 h-10"
            >
              {index}
            </div>
          );
        })}
      </div>
      <div className="flex space-x-50">
        <div className="flex">
          <div>프로필사진</div>
          <div>유저이름</div>
        </div>
        <button>팔로우</button>
      </div>
    </div>
  );
};

export default FollowList;
