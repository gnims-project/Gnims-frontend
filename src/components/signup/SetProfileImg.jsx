import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profilImg from "../../img/ProfilImg.png";
import inputImgIcon from "../../img/Component01.png";
import IsModal from "../modal/Modal";
import axios from "axios";
import { useNavigate } from "react-router";
import LoadingPage from "../../page/LoadingPage";
import { __closeModal, __openModal } from "../../redux/modules/SingupSlice";
const SetProfileImg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });
  const singup = sessionStorage.getItem("singup");
  const imgRef = useRef();
  const [image, setImage] = useState(profilImg);
  const [imageFile, setImageFile] = useState("");
  const [disabled, setDisabled] = useState(false);
  const imagePreview = () => {
    const reader = new FileReader();
    reader.readAsDataURL(imgRef.current.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  const onSingup = async () => {
    //폼데이터 변환
    setLoading(true);
    setImageFile(imgRef.current.files[0]);
    const imgFile = imgRef.current.files[0];
    const formData = new FormData();
    if (imgFile !== undefined) {
      formData.append("image", imgFile);
    } else {
      formData.append("image", null);
    }
    if (singup === "emailLogin") {
      const url = `${process.env.REACT_APP_BASE_URL}/auth/signup`;
      const data = {
        username: sessionStorage.getItem("userName"),
        nickname: sessionStorage.getItem("nickname"),
        email: sessionStorage.getItem("email"),
        password: sessionStorage.getItem("password"),
      };
      sginupAxios({ data, formData, url });
    } else {
      const url = `${process.env.REACT_APP_BASE_URL}/social/signup`;
      const data = {
        username: sessionStorage.getItem("userName"),
        nickname: sessionStorage.getItem("nickname"),
        email: sessionStorage.getItem("email"),
        socialCode: sessionStorage.getItem("socialCode"),
      };
      //소셜 회원가입 API가 나왔을때
      sginupAxios({ data, formData, url });
    }
  };

  //모달창

  const onMoalClose = () => {
    dispatch(__closeModal(dispatch));
    if (disabled) {
      navigate("/login");
    }
  };

  //이메일 회원가입시 백단 연결
  const sginupAxios = async ({ formData, data, url }) => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("data", blob);

    await axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setDisabled(() => true);

          setModalStr({
            modalTitle: "회원가입완료!",
            modalMessage: "그님스와 함께 약속들을 관리해보아요!",
          });
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("password");
          sessionStorage.removeItem("nickname");
          sessionStorage.removeItem("singup");
          dispatch(__openModal());
          setLoading(false);
        }
      })
      .catch((error) => {
        setDisabled(() => false);
        const { data } = error.response;
        if (data.status === 400) {
          if (Array.isArray(data.messages)) {
            setModalStr({
              modalTitle: data.messages[0],
              modalMessage: "다시 한 번 확인해주세요",
            });
          } else {
            setModalStr({
              modalTitle: "다시 한 번 확인해주세요",
              modalMessage: "닉네임과 이름을 다시 한 번 확인해주세요.",
            });
          }

          dispatch(__openModal());
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    setLoading(false);
  }, []);

  //소셜회원가입시 백단 연결

  return (
    <div className="App container md mt-[110px] ">
      {loading && <LoadingPage />}
      <div className="grid grid-flow-row ml-[20px] mr-[20px]">
        <div className="grid grid-flow-row gap-[9px]">
          <div className="font-[700] text-[32px] text-textBlack">
            <h1>이제 마지막 단계예요.</h1>
          </div>
          <div className="text-textBlack font-[400] text-[24px]">
            <label htmlFor="userName" className="cursor-pointer ">
              <p> 그님스 이용을 위해 </p>
              <p>프로필 사진을 설정해주세요.</p>
            </label>
          </div>
        </div>
        <div>
          <div className="mt-[53px]">
            <div className="mt-[75px] mb-[125px] relative">
              <div className="h-[100px] w-[100px] justify-center mx-auto">
                <img
                  className="w-full h-full rounded-full drop-shadow-lg"
                  src={image}
                  alt="프로필이미지"
                />
              </div>
              <div className="h-[40px] w-[40px] justify-center mx-auto absolute right-0 left-14 bottom-0 ">
                <label htmlFor="profileImg">
                  <img
                    className="w-full h-full rounded-full drop-shadow-lg"
                    src={inputImgIcon}
                    alt="프로필이미지"
                  />
                </label>
              </div>
            </div>

            <div>
              <input
                //모든타입의 이미지허용
                accept="image/*"
                id="profileImg"
                type="file"
                ref={imgRef}
                style={{ display: "none" }}
                multiple
                onChange={imagePreview}
              />
            </div>
          </div>
          <button
            disabled={disabled}
            onClick={onSingup}
            className="h-[50px] rounded w-full bg-[#002C51] font-[700] text-[#ffff] mt-[24px]"
          >
            그님스시작하기
          </button>
        </div>
      </div>
      <IsModal onMoalClose={onMoalClose} message={{ ModalStr }} />
    </div>
  );
};

export default SetProfileImg;
