import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categoriesEndpoints } from "../../services/api";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  useEffect(() => {
    const fetchSubLinks = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categoriesEndpoints.GET_ALL_CATEGORIES_API);
        const apiData = res?.data?.allTags || [];
        setSubLinks(Array.isArray(apiData) ? apiData : []);
      } catch (error) {
        console.error("Could not fetch Categories:", error);
        setSubLinks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubLinks();
  }, []);

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-b-[#2C333F] ${
        location.pathname !== "/" ? "bg-[#161D29]" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-[1260px] items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <img
            src={Logo}
            width={160}
            height={42}
            loading="lazy"
            alt="StudyNotion Logo"
          />
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <RxCross2 /> : <RxHamburgerMenu />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex">
          <ul className="flex flex-row gap-x-6 text-[#DBDDEA]">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div
                    className={`flex items-center gap-1 group relative cursor-pointer ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-[#FFE83D]"
                        : "text-[#DBDDEA]"
                    }`}
                  >
                    <p>{link.title}</p>
                    <IoMdArrowDropdown />
                    {/* Dropdown */}
                    <div
                      className="invisible absolute left-1/2 top-full translate-x-[-50%] mt-2
                      flex flex-col rounded-md bg-[#F1F2FF] p-4 text-[#000814] opacity-0
                      transition-all duration-200 group-hover:visible group-hover:opacity-100 
                      w-[250px] z-50 shadow-lg"
                    >
                      <div
                        className="absolute left-1/2 top-0 h-4 w-4 rotate-45 bg-[#F1F2FF]
                        translate-y-[-50%] -translate-x-[50%]"
                      ></div>

                      {loading ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                      ) : subLinks.length > 0 ? (
                        subLinks.map((sublink, idx) => (
                          <Link
                            to={`/catalog/${sublink.name
                              ?.replace(/\s+/g, "-")
                              ?.toLowerCase()}`}
                            key={idx}
                            className="hover:text-yellow-500 py-1"
                          >
                            {sublink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No categories</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-[#FFE83D]"
                          : "text-[#DBDDEA]"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Buttons */}
        <div className="hidden lg:flex flex-row gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <>
              <Link to="/login">
                <button className="border border-[#2C333F] bg-[#161D29] px-[15px] py-[9px] text-[#AFB2BF] rounded-md">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="border border-[#2C333F] bg-[#161D29] px-[15px] py-[9px] text-[#AFB2BF] rounded-md">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token && <ProfileDropdown />}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#161D29] border-t border-[#2C333F] lg:hidden z-40">
          <ul className="flex flex-col gap-3 text-[#DBDDEA] p-4">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <details className="group">
                    <summary className="flex items-center gap-1 cursor-pointer">
                      {link.title} <IoMdArrowDropdown />
                    </summary>
                    <div className="flex flex-col pl-4 mt-2 text-sm">
                      {loading ? (
                        <p className="text-gray-400">Loading...</p>
                      ) : subLinks.length > 0 ? (
                        subLinks.map((sublink, idx) => (
                          <Link
                            key={idx}
                            to={`/catalog/${sublink.name
                              ?.replace(/\s+/g, "-")
                              ?.toLowerCase()}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1 hover:text-yellow-400"
                          >
                            {sublink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-gray-400">No categories</p>
                      )}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={link?.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block ${
                      matchRoute(link?.path)
                        ? "text-[#FFE83D]"
                        : "text-[#DBDDEA]"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}

            <div className="flex flex-col gap-3 pt-3 border-t border-[#2C333F]">
              {user && user?.accountType !== "Instructor" && (
                <Link
                  to="/dashboard/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative flex items-center gap-2"
                >
                  <AiOutlineShoppingCart size={20} />
                  Cart
                  {totalItems > 0 && (
                    <span className="bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              {!token ? (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full border border-[#2C333F] bg-[#161D29] py-2 text-[#AFB2BF] rounded-md">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full border border-[#2C333F] bg-[#161D29] py-2 text-[#AFB2BF] rounded-md">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <ProfileDropdown />
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
