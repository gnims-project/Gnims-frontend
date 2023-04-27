import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../shared/AxiosInstance";
import Friends200 from "./Friends200";
import Friends403 from "./Friends403";

const FriendsMain = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(200);
  const [schedule, setSchedule] = useState();

  const getSchdule = async () => {
    try {
      await instance.get(`/users/${id}/events`).then((response) => {
        setSchedule(response.data.data);
      });
    } catch (e) {
      if (e.response.status === 403) {
        setStatus(403);
      }
    }
  };

  useLayoutEffect(() => {
    getSchdule();
  }, []);

  return (
    <>
      <div className="container">
        <div className="grid grid-flow-row mt-[] ml-[20px] mr-[20px]">
          {status === 200 ? (
            // 200일 때  (팔로우한 유저일 때) 보여지는 일정페이지
            <Friends200 schedule={schedule} status={status} />
          ) : (
            //403일 때  (팔로우하지 않은 유일 때) 보여지는 에러페이지
            <Friends403 status={status} />
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsMain;
