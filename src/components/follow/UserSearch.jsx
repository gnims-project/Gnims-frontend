import React, { useCallback, useEffect, useState } from "react";
import searchIcon from "../../img/searchIcon.svg";
import { debounce } from "lodash";
import { UserApi } from "../../api/UserApi";
import SearchCards from "./SearchCards";
import { useRef } from "react";
import LoadingPage from "../../page/LoadingPage";

const UserSearch = () => {
  const [user, setUser] = useState([]);
  const userSearchName = useRef();
  const [time, Settime] = useState(0);
  const [loading, setLoading] = useState(false);
  const onUserSearch = (event) => {
    setLoading(true);
    const { value } = event.target;
    Settime(() => 1000);
    handleSearch(value);
  };

  const handleSearch = debounce(async (payload) => {
    try {
      const response = await UserApi.userSearch(payload);
      const userInfo = response.data;
      setUser(() => userInfo);
      setLoading(false);
    } catch (e) {
      // console.log("api 호출 실패");
    }
  }, time);

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="container md mb-[50px]">
      {loading && <LoadingPage />}
      <div className="">
        <div className="relative">
          <input
            onChange={onUserSearch}
            className=" w-full h-[50px] py-[10px] pl-[20px] pr-[40px]"
            placeholder="찾고자 하는 사용자 이름을 입력해 주세요."
            ref={userSearchName}
          ></input>
          <div
            className=" cursor-pointer"
            onClick={() => {
              Settime(() => 0);
              handleSearch(userSearchName.current.value);
            }}
          >
            <img className="absolute top-[15px] right-[15px]" src={searchIcon} alt="돋보기 아이콘" />
          </div>
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
