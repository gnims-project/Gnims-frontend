import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import profilImg from "../../img/ProfilImg.png";
import { SignupApi } from "../../api/Signup";
import IsModal from "../modal/Modal";
import axios from "axios";

const SetProfileImg = () => {
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState("");
  const { singup, NameNickName, userInfo } = useSelector(
    (state) => state.SingupSlice
  );
  const imgRef = useRef();
  const [image, setImage] = useState(profilImg);
  const [imageFile, setImageFile] = useState("");

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
    console.log(imgRef.current.files[0]);
    setImageFile(imgRef.current.files[0]);
    const imgFile = imgRef.current.files[0];
    const formData = new FormData();
    if (imgFile !== undefined) {
      formData.append("image", imgFile);
    } else {
      formData.append("image", null);
    }

    if (singup === "emailLogin") {
      const url = "http://hayangaeul.shop/auth/signup";
      const data = {
        username: userInfo.username,
        nickname: userInfo.nickname,
        email: userInfo.email,
        password: userInfo.password,
      };
      sginupAxios({ data, formData, url });
    } else {
      const url = "http://hayangaeul.shop/social/signup";
      const data = {
        username: NameNickName.nickname,
        nickname: NameNickName.username,
        email: window.localStorage.getItem("email"),
      };

      //소셜 회원가입 API가 나왔을때
      sginupAxios({ data, formData, url });
    }
  };

  //모달창
  const onModalOpen = () => {
    setOpen({ isOpen: true });
  };
  const onMoalClose = () => {
    setOpen({ isOpen: false });
  };

  //이메일 회원가입시 백단 연결
  const sginupAxios = async ({ formData, data, url }) => {
    console.log(data);
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
        console.log(response);
        setModalStr(() => response.message);
        onModalOpen();
        navigator("/login");
      })
      .catch((error) => {
        console.log(error);
        // const { data } = error.response;
        // if (data.status === 401) {
        //   console.log(data.message);
        //   setModalStr(data.message);
        //   onModalOpen();
        // }
      });
  };

  //소셜회원가입시 백단 연결

  return (
    <div>
      <div className="App" style={{ marginTop: "100px" }}>
        <img src={image} alt="프로필이미지" />
        <label htmlFor="profileImg">프로필 이미지 추가</label>
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
        <div>
          <button onClick={onSingup}>그님스시작하기</button>
        </div>
      </div>
      <IsModal isModalOpen={isOpen.isOpen} onMoalClose={onMoalClose}>
        {ModalStr}
      </IsModal>
    </div>
  );
};

export default SetProfileImg;
