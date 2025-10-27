import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close dropdown on outside click
 useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  const handleLogout = () => {
    dispatch(logout(navigate))
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-x-1 focus:outline-none"
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[32px] sm:w-[36px] rounded-full object-cover border border-[#424854]"
        />
        <AiOutlineCaretDown
          className={`text-sm text-[#AFB2BF] transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-[#2C333F] overflow-hidden rounded-md border border-[#2C333F] bg-[#161D29] shadow-lg w-44 sm:w-48 animate-slideDown"
        >
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA] transition-all duration-200"
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>

          {/* Logout Option */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-red-400 hover:bg-[#161D29] hover:text-[#DBDDEA] transition-all duration-200"
          >
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
