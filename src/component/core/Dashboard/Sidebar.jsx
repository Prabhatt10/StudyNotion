// import React, { useState } from 'react'
// import SidebarLinks from '../../../data/dashboard-links'
// import { useSelector, useDispatch } from 'react-redux'
// import SidebarLink from './SidebarLinks'
// import { VscSignOut } from 'react-icons/vsc'
// import ConfirmationModal from '../../common/ConfirmationModal'
// import { logout } from '../../../services/operations/authAPI'
// import { useNavigate } from 'react-router-dom'

// function Sidebar() {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, loading: profileLoading } = useSelector((state) => state.profile)
//   const { loading: authLoading } = useSelector((state) => state.auth)

//   const [confirmationModal, setConfirmationModal] = useState(null);

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-r-[#2C333F] bg-[#161D29]">
//         <div className='spinner'></div>
//       </div>
//     )
//   }

//   return (
//     <div className="h-[calc(100vh-3.5rem)] min-w-[220px] w-[220px] flex flex-col border-r border-r-[#2C333F] bg-[#161D29] py-10">

//       {/* Sidebar Links */}
//       <div className='flex flex-col'>
//         {SidebarLinks.map((link) => {
//           if (link.type && user?.accountType !== link.type) return null
//           return <SidebarLink key={link.id} link={link} iconName={link.icon} />
//         })}
//       </div>

//       <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-[#2C333F]" />

//       {/* Settings + Logout */}
//       <div className='flex flex-col'>
//         <SidebarLink
//           link={{ name: "Settings", path: "/dashboard/settings", icon: "VscSettingsGear" }}
//         />

//         <button
//           onClick={() =>
//             setConfirmationModal({
//               text1: "Are You Sure?",
//               text2: "You will be logged out of your account.",
//               btn1Text: "Logout",
//               btn2Text: "Cancel",

//               // FIXED HANDLER
//               btn1Handler: () => {
//                 setConfirmationModal(null);
//                 dispatch(logout(navigate));
//               },

//               btn2Handler: () => setConfirmationModal(null),
//             })
//           }
//           className="px-8 py-2 text-sm font-medium text-[#838894]"
//         >
//           <div className='flex items-center gap-x-2'>
//             <VscSignOut className='text-lg' />
//             <span>Logout</span>
//           </div>
//         </button>
//       </div>

//       {/* Modal */}
//       {confirmationModal && (
//         <ConfirmationModal modalData={confirmationModal} />
//       )}
//     </div>
//   )
// }

// export default Sidebar







import React, { useState } from 'react'
import SidebarLinks from '../../../data/dashboard-links'
import { useSelector, useDispatch } from 'react-redux'
import SidebarLink from './SidebarLinks'
import { VscSignOut, VscMenu } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'
import { logout } from '../../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'

function Sidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [open, setOpen] = useState(false); // MOBILE SIDEBAR TOGGLE

  if (profileLoading || authLoading) {
    return (
      <div className="hidden md:grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-r-[#2C333F] bg-[#161D29]">
        <div className='spinner'></div>
      </div>
    )
  }

  return (
    <>
      {/* ---------------- MOBILE TOGGLE BUTTON (ONLY SHOWN ON SMALL SCREENS) ---------------- */}
      <button
        className="md:hidden p-3 text-[#F1F2FF]"
        onClick={() => setOpen(true)}
      >
        <VscMenu size={28} />
      </button>

      {/* ---------------- SIDEBAR (RESPONSIVE) ---------------- */}
      <div
        className={`
          fixed md:static top-0 left-0 h-[100vh] md:h-[calc(100vh-3.5rem)] 
          w-[260px] md:min-w-[220px] md:w-[220px] 
          bg-[#161D29] border-r border-[#2C333F] py-10 z-50 
          flex flex-col transition-transform duration-300 
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON (MOBILE ONLY) */}
        <button
          className="md:hidden absolute top-4 right-4 text-[#F1F2FF] text-xl"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* Sidebar Links */}
        <div className='flex flex-col px-4'>
          {SidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return <SidebarLink key={link.id} link={link} iconName={link.icon} />
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-[#2C333F]" />

        {/* Settings + Logout */}
        <div className='flex flex-col px-4'>
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings", icon: "VscSettingsGear" }}
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  setConfirmationModal(null)
                  dispatch(logout(navigate))
                },
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-2 py-2 text-sm font-medium text-[#838894]"
          >
            <div className='flex items-center gap-x-2'>
              <VscSignOut className='text-lg' />
              <span>Logout</span>
            </div>
          </button>
        </div>

        {/* Modal */}
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>

      {/* ---------------- MOBILE BACKDROP ---------------- */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
