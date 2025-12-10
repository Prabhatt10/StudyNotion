// import React from 'react'
// import * as Icons from 'react-icons/vsc'
// import { matchPath, NavLink, useLocation } from 'react-router-dom'

// function SidebarLinks({ link, iconName }) {

//   const Icon = Icons[iconName];
//   const location = useLocation();

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <NavLink
//       to={link.path}
//       className={`relative px-8 py-2 text-sm font-medium flex items-center gap-x-2 
//       transition-all duration-200 
//       ${matchRoute(link.path) ? "bg-[#553F02] text-white" : "text-[#838894]"}`}
//     >

//       {/* FIXED — No extra braces */}
//       <span
//         className={`absolute left-0 top-0 h-full w-1 bg-[#E2B93B] 
//         transition-all duration-200 
//         ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
//       ></span>

//       {/* Icon */}
//       {Icon && <Icon className="text-lg" />}

//       {/* Text */}
//       <span>{link.name}</span>

//     </NavLink>
//   );
// }

// export default SidebarLinks;





import React from 'react'
import * as Icons from 'react-icons/vsc'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

function SidebarLinks({ link, iconName }) {

  const Icon = Icons[iconName];
  const location = useLocation();

  const isActive = matchPath({ path: link.path }, location.pathname);

  return (
    <NavLink
      to={link.path}
      className={`
        relative flex items-center gap-3
        px-4 py-2 md:px-8 
        text-sm font-medium transition-all duration-200 
        rounded-md md:rounded-none
        ${isActive ? "bg-[#553F02] text-white" : "text-[#838894] hover:text-white"}
      `}
    >

      {/* Active indicator bar */}
      <span
        className={`
          absolute left-0 top-0 h-full w-1 bg-[#E2B93B] 
          rounded-r-sm transition-all duration-200
          ${isActive ? "opacity-100" : "opacity-0"}
        `}
      ></span>

      {/* Icon */}
      {Icon && <Icon className="text-lg shrink-0" />}

      {/* Text */}
      <span className="truncate">{link.name}</span>

    </NavLink>
  );
}

export default SidebarLinks;
