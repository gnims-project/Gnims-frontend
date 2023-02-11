import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IsModal from "../modal/Modal";
import { useGetInfo } from "../../api/LoginApi";

const EmailLogin = () => {
  const navigate = useNavigate();
  // const [isOpen, setOpen] = useRecoilState(ModalState);
  // const [ModalStr, setModalStr] = useRecoilState(ModalState);
  //console.log(isOpen.isOpen);
  //서버 측에서 메시지 전달용
  //const { message } = useSelector((state) => state.__emailLogin);

  //서버에 전달하기 위한 input Ref 생성
  const userEmailRef = useRef();
  const userPasswordRef = useRef();

  //아이디 비밀번호가 틀렸을시 문구표시여부
  const [regulation, SetRegulation] = useState({
    regulationEmail: true,
    regulationPassword: true,
  });

  //이메일, 비밀번호 정규 표현식
  const emailRegulationExp =
    /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegulationExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,20}$/;

  //유효성검사
  const onValidity = (event) => {
    const { id, value } = event.target;

    if (id === "userEmail") {
      if (!emailRegulationExp.test(value)) {
        SetRegulation(() => ({ ...regulation, regulationEmail: false }));
      } else SetRegulation(() => ({ ...regulation, regulationEmail: true }));
    } else {
      if (!passwordRegulationExp.test(value)) {
        SetRegulation(() => ({ ...regulation, regulationPassword: false }));
      } else SetRegulation(() => ({ ...regulation, regulationPassword: true }));
    }
  };

  //모달창
  const onModalOpen = () => {
    //setOpen({ isOpen: true });
  };
  const onMoalClose = () => {
    //setOpen({ isOpen: false });
  };

  //서버에 전달
  const onSubmit = (event) => {
    event.preventDefault();

    const userEmailCurrent = userEmailRef.current;
    const userPasswordCurrent = userPasswordRef.current;
    const emailValue = userEmailCurrent.value;
    const passwordValue = userPasswordCurrent.value;

    //이메일 빈칸 및 유효성검사
    if (emailValue.trim() === "") {
      SetRegulation(() => ({ ...regulation, regulationEmail: false }));
      userEmailCurrent.focus();
      return;
    } else if (!emailRegulationExp.test(emailValue)) {
      SetRegulation(() => ({ ...regulation, regulationEmail: false }));
      return;
    }

    //비밀번호빈칸 및 유효성검사
    if (passwordValue.trim() === "") {
      SetRegulation(() => ({ ...regulation, regulationPassword: false }));
      userPasswordCurrent.focus();
      return;
    } else if (!passwordRegulationExp.test(passwordValue)) {
      SetRegulation(() => ({ ...regulation, regulationPassword: false }));
      userPasswordCurrent.focus();
      return;
    }
    const userInfo = { email: emailValue, password: passwordValue };
    loginAxios({ userInfo });
  };

  const loginAxios = async ({ userInfo }) => {
    // const { mutateAsync: emailLogin } = useGetInfo();
    // const email = userInfo.email;
    // const password = userInfo.password;
    // await emailLogin({ email, password })
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container max-sm bg-red-100 text-center">
        <div className="m-auto align-middle bg-red-200 grid grid-rows-4">
          <div className="bg-red-800 m-auto text-center">
            <div>로고</div>
          </div>
          <form className="bg-red-400  border-solid border-4">
            <div>
              <div className="bg-red-700 h-[100px]">
                <div className=" bg-red-500 grid grid-cols-6 gap-5 p-5">
                  <label
                    htmlFor="userEmail"
                    className=" bg-red-600 m-auto col-start-1 col-end-3 cursor-pointer"
                  >
                    email
                  </label>
                  <input
                    className="w-[200px] py-2 rounded-lg px-3"
                    type="text"
                    id="userEmail"
                    ref={userEmailRef}
                    placeholder="이메일을 입력해주세요."
                    onChange={onValidity}
                  />
                </div>
                <div className="p-1">
                  <p hidden={regulation.regulationEmail}>
                    이메일을 입력해주세요.
                  </p>
                </div>
              </div>
              <div className="bg-red-600 h-[100px]">
                <div className="grid grid-cols-6 gap-4">
                  <label
                    htmlFor="userPassword"
                    className="col-start-1 col-end-3 cursor-pointer"
                  >
                    password
                  </label>
                  <input
                    className="w-[200px] py-2 rounded-lg px-3"
                    type="password"
                    id="userPassword"
                    ref={userPasswordRef}
                    placeholder="비밀번호를 입력해주세요."
                    onChange={onValidity}
                  />
                </div>
                <p hidden={regulation.regulationPassword}>
                  8글자이상 입력 해주세요.
                </p>
              </div>
              <button onClick={onSubmit}>로그인</button>
            </div>
          </form>
          <div>
            <button>카카오 로그인</button>
            <button>네이버 로그인</button>
            <button onClick={() => navigate(`/signup`)}>회원가입</button>
          </div>
          {/* <IsModal isModalOpen={isOpen.isOpen} onMoalClose={onMoalClose}>
            {ModalStr.ModalStr}
          </IsModal> */}
        </div>
      </div>
    </>
  );
};

export default EmailLogin;
