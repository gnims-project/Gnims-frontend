import React, { useRef, useState } from "react";
import inputImgIcon from "../../img/Component01.png";

const ProfileEdit = () => {
  const imgRef = useRef();
  const profileImage = localStorage.getItem("profileImage");
  const [image, setImage] = useState(profileImage);
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

  const editHandler = () => {};
  return (
    <div>
      <div className="text-left text-[25px] font-thin mt-[30px] ml-[15px]">
        현재 설정된 프로필이미지를 <br />
        변경할 수 있어요.
      </div>
      <div className="grid grid-flow-row ml-[20px] mr-[20px]">
        <div className="grid grid-flow-row gap-[9px]">
          <div className="font-[700] text-[32px] text-textBlack"></div>
          <div className="text-textBlack font-[400] text-[24px]">
            <label htmlFor="userName" className="cursor-pointer "></label>
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
            className="h-[50px] rounded w-full bg-[#002C51] font-[700] text-[#ffff] mt-[24px]"
            onClick={editHandler}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
