// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { __postFollowState } from "../../redux/modules/FollowSlice";

// const FollowerCard = ({ follower }) => {
//   const dispatch = useDispatch();

//   const handleClick = (e) => {
//     dispatch(__postFollowState(follower.followId));
//   };
//   useEffect(() => {}, [follower]);

//   return (
//     <div className="flex gap-[14px] w-full mt-[16px]">
//       <div className="w-[50px] h-[50px]">
//         <img
//           className="w-full h-full rounded-full"
//           src={follower.profile}
//           alt="프로필"
//         />
//       </div>
//       <div className="flex items-center">{follower.username}</div>
//       <div className="flex items-center">
//         <button onClick={handleClick}>
//           {follower.followStatus === "ACTIVE" ? "취소" : "팔로우"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FollowerCard;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { __postFollowState } from "../../redux/modules/FollowSlice";

const FollowerCard = ({ follower }) => {
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(
    follower.followStatus === "ACTIVE"
  );

  const handleClick = (e) => {
    dispatch(__postFollowState(follower.followId));
    setIsFollowed(!isFollowed);
  };

  useEffect(() => {
    setIsFollowed(follower.followStatus === "ACTIVE");
  }, [follower]);

  return (
    <div className="flex gap-[14px] w-full mt-[16px]">
      <div className="w-[50px] h-[50px]">
        <img
          className="w-full h-full rounded-full"
          src={follower.profile}
          alt="프로필"
        />
      </div>
      <div className="flex items-center">{follower.username}</div>
      <div className="flex items-center">
        <button onClick={handleClick}>{isFollowed ? "취소" : "팔로우"}</button>
      </div>
    </div>
  );
};

export default FollowerCard;
