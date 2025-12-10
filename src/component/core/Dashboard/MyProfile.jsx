// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import IconButton from '../../common/IconButton';
// import { RiEditBoxLine } from "react-icons/ri"
// import { formattedDate } from '../../../utils/DateFormatter';

// function MyProfile() {

//   const {user} = useSelector((state) => state.profile);
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1 className="mb-14 text-3xl font-medium text-[#F1F2FF] ">
//         My Profile
//       </h1>
      
//       <div className="flex items-center justify-between rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
//         <div className="flex items-center gap-x-4">
//           <img 
//             src={user?.image}
//             alt={`profile-${user?.firstName}`}
//           />
//           <div className='space-y-1'>
//             <p className="text-lg font-semibold text-[#F1F2FF] ">
//               {
//                 user?.firstName + " " + user?.lastName
//               }
//             </p>
//             <p className='text-sm text-[#838894]'>
//               {user?.email}
//             </p>
//           </div>
//         </div>

//         <IconButton 
//           text = "Edit"
//           onClick = {() => navigate('/dashboard/settings')}
//         >
//           <RiEditBoxLine />
//         </IconButton>
//       </div>

//       <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
//         <div className="flex w-full items-center justify-between">
//           <p className="text-lg font-semibold text-[#F1F2FF] ">
//             About
//           </p>
//           <IconButton
//           text="Edit"
//           onClick={() => {
//             navigate("/dashboard/settings")
//           }}
//           >
//             <RiEditBoxLine />
//           </IconButton>
//         </div>

//         <p
//           className={`${user?.additionalDetail?.about ? "text-[#F1F2FF]" : "text-[#6E727F] "}`}
//         >
//           {user?.additionalDetail?.about ?? "Write Something About Yourself"}
//         </p>
//       </div>

//       <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
//         <div className="flex w-full items-center justify-between">
//           <p className="text-lg font-semibold text-[#F1F2FF] " >
//             Personal Details
//           </p>
//           <IconButton
//             text="Edit"
//             onClick={() => {
//               navigate("/dashboard/settings")
//             }}
//           >
//             <RiEditBoxLine />
//           </IconButton>
//         </div>

//         <div className="flex max-w-[500px] justify-between">
//           <div className="flex flex-col gap-y-5">
//             <div>
//               <p className="mb-2 text-sm text-[#424854] ">
//                 First Name
//               </p>
//               <p className="text-sm font-medium text-[#F1F2FF] ">
//                 {user?.firstName}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-[#424854] ">
//                 Email
//               </p>
//               <p className="text-sm font-medium text-[#F1F2FF]">
//                 {user?.email}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-[#424854] ">
//                 Gender
//               </p>
//               <p className="text-sm font-medium text-[#F1F2FF] ">
//                 {user?.additionalDetail?.gender ?? "Add Gender"}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col gap-y-5">
//             <div>
//               <p className='mb-2 text-sm text-[#424854] '>
//                 Last Name
//               </p>
//               <p className='text-sm font-medium text-[#F1F2FF] '>
//                 {user?.lastName}
//               </p>
//             </div>
//             <div>
//               <p className='mb-2 text-sm text-[#424854] '>
//                 Phone Number
//               </p>
//               <p className='text-sm font-medium text-[#F1F2FF] '>
//                 {user?.additionalDetail?.contactNumber ?? "Add Phone Number"}
//               </p>
//             </div>
//             <div>
//               <p className='mb-2 text-sm text-[#424854] '>
//                 Date of Birth
//               </p>
//               <p className='text-sm font-medium text-[#F1F2FF] '>
//                 {formattedDate(user?.additionalDetail?.dateOfBirth) ?? "Add Date of Birth"}
//               </p>
//             </div>

//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default MyProfile


import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconButton from '../../common/IconButton';
import { RiEditBoxLine } from "react-icons/ri"
import { formattedDate } from '../../../utils/DateFormatter';

function MyProfile() {

  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 sm:px-6">

      <h1 className="mb-10 text-2xl sm:text-3xl font-medium text-[#F1F2FF]">
        My Profile
      </h1>

      {/* ----------- TOP PROFILE CARD ----------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between 
                      gap-6 rounded-md border border-[#2C333F] bg-[#161D29] p-6 md:p-8">

        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
          />

          <div className="space-y-1">
            <p className="text-lg font-semibold text-[#F1F2FF]">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-[#838894]">
              {user?.email}
            </p>
          </div>
        </div>

        <IconButton
          text="Edit"
          onClick={() => navigate('/dashboard/settings')}
        >
          <RiEditBoxLine />
        </IconButton>
      </div>

      {/* ----------- ABOUT SECTION ----------- */}
      <div className="my-10 flex flex-col gap-6 rounded-md border border-[#2C333F] bg-[#161D29] p-6 md:p-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg font-semibold text-[#F1F2FF]">
            About
          </p>
          <IconButton
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconButton>
        </div>

        <p className={`${user?.additionalDetails?.about ? "text-[#F1F2FF]" : "text-[#6E727F]"}`}>
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* ----------- PERSONAL DETAILS ----------- */}
      <div className="my-10 flex flex-col gap-6 rounded-md border border-[#2C333F] bg-[#161D29] p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg font-semibold text-[#F1F2FF]">
            Personal Details
          </p>
          <IconButton
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconButton>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-1 text-sm text-[#424854]">First Name</p>
              <p className="text-sm font-medium text-[#F1F2FF]">{user?.firstName}</p>
            </div>

            <div>
              <p className="mb-1 text-sm text-[#424854]">Email</p>
              <p className="text-sm font-medium text-[#F1F2FF]">{user?.email}</p>
            </div>

            <div>
              <p className="mb-1 text-sm text-[#424854]">Gender</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-1 text-sm text-[#424854]">Last Name</p>
              <p className="text-sm font-medium text-[#F1F2FF]">{user?.lastName}</p>
            </div>

            <div>
              <p className="mb-1 text-sm text-[#424854]">Phone Number</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {user?.additionalDetails?.contactNumber ?? "Add Phone Number"}
              </p>
            </div>

            <div>
              <p className="mb-1 text-sm text-[#424854]">Date of Birth</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date of Birth"}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default MyProfile
