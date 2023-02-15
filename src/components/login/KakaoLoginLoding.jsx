import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __kakaologin } from "../../redux/modules/LoginSlice";

//인가코드를 백으로 전달하기 위한 페이지
const KakaoLoginLoding = () => {
  const dispatch = useDispatch();

  // new URL 객체에서 searchParams객체의 get메소드를 사용하여 'code'키의 값을 추출
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("카카오 인가코드", code);

  // 페이지가 로딩됨과 동시에 디스패치로 code 전달
  useEffect(() => {
    dispatch(__kakaologin(code));
  });
  return <div>카카오 로딩 페이지</div>;
};

export default KakaoLoginLoding;
