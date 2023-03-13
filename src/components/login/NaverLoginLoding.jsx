import axios from "axios";
import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import WelcomeModal from "../modal/WelcomeModal";

function NaverLoginLoding() {
  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [path, setPath] = useState("");
  const getToken = async () => {
    const navertoken = window.location.href.split("=")[1].split("&")[0];
    // sessionStorage.setItem("NaverAuthorization", navertoken);
  };

  const sendTokenAndGetAuthorization = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/social/naver-login`,

        { token: window.location.href.split("=")[1].split("&")[0] }
      )

      .then((res) => {
        //이미 멤버라면 Authorization이 담겨 올 것이고, member라고
        const email = res.data.data.email;
        if (res.data.message !== "non-member") {
          const accessToken = res.headers.get("Authorization");
          const nickname = res.data.data.nickname;
          const userId = res.data.data.userId;
          const profileImage = res.data.data.profileImage;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("nickname", nickname);
          sessionStorage.setItem("profileImage", profileImage);
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("socialCode", "social");
          setIsModalOpen(true);
          setMessage(nickname + "님, 어서오세요!");
          setPath("/main");
          return;

          //멤버가 아닐시 프로필 정보를 받는 페이지로 돌려야함
        } else if (res.data.message === "non-member") {
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("socialCode", "NAVER");
          setIsModalOpen(true);
          setMessage("그님스를 이용하려면 프로필 정보를 입력해줘야합니다.");
          setPath("/signup/setProfileName");
          return;
        }
      });
  };

  useEffect(() => {
    userAccessToken();
    getToken();
    sendTokenAndGetAuthorization();
  }, []);

  return (
    <div>
      {isModalOpen && <WelcomeModal message={message} path={path} />}
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <DotLoader
          color="#36abd6"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </div>
  );
}

export default NaverLoginLoding;
