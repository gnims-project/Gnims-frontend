import React, { useCallback, useEffect, useState } from "react";
import searchIcon from "../../img/searchIcon.png";
import { debounce } from "lodash";
import { UserApi } from "../../api/UserApi";
import SearchCards from "./SearchCards";

const UserSearch = () => {
  const [user, setUser] = useState([]);

  const onUserSearch = (event) => {
    const { value } = event.target;
    console.log(value);
    handlePrice(value);
  };

  const handlePrice = useCallback(
    debounce(async (payload) => {
      try {
        console.log(payload);
        const response = await UserApi.userSearch(payload);
        const userInfo = response.data;
        console.log(userInfo);
        setUser(() => userInfo);
      } catch (e) {
        console.log("api 호출 실패");
      }
    }, 3000),
    []
  );

  useEffect(() => {
    handlePrice();
  }, []);
  return (
    <div className="container md mb-[50px]">
      <div className="">
        <div className="relative">
          <input
            onChange={onUserSearch}
            className=" w-full h-[50px] py-[10px] pl-[20px] pr-[40px]"
            placeholder="찾고자 하는 사용자 이름을 입력해 주세요."
          ></input>
          <img
            className="absolute top-[20px] right-[40px]"
            src={searchIcon}
            alt="돋보기 아이콘"
          />
        </div>
        <div className="px-[20px]">
          {user.map((list) => {
            return <SearchCards key={list.userId} userInfo={list} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
