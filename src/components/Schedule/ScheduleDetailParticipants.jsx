// import axios from "axios";
// import React, { memo, useCallback, useEffect, useState } from "react";

// const ScheduleDetailParticipants = (schedules) => {
//   const invitees = schedules.invitees;
//   const [inviteesList, setInviteesList] = useState({
//     hidden: true,
//     inviteesList: "",
//   });

//   useEffect(() => {
//     if (invitees.length > 1) {
//       setInviteesList(() => ({
//         hidden: false,
//         inviteesList: `${schedules.invitees[0].username} 외 ${
//           invitees.length - 1
//         } 명`,
//       }));
//     }
//     // fetchTodos();
//   }, []);

//   return (
//     <div>
//       {/* {numberOfJoiner !== 1 ? ( */}
//       <div className="mt-[30px] h-[98px] ml-[20px]">
//         참여자{" "}
//         <div className="bg-[#CEE4F8] h-[50px] w-[335px] mt-[20px] p-[15px] shadow flex rounded-lg">
//           {invitees.map((list) => {
//             return (
//               <div
//                 key={list.username}
//                 className="flex  rounded-full border-white border-2"
//               >
//                 <img
//                   className="inline-block h-[40px] w-[40px] rounded-full ring-2 "
//                   src={list.profile}
//                   alt="프로필이미지"
//                 ></img>
//               </div>
//             );
//           })}
//         </div>
//         {/* ) : (
//         <div />
//       )} */}
//       </div>
//     </div>
//   );
// };
// export default ScheduleDetailParticipants;
