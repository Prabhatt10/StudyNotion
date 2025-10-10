import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <footer className="bg-[#161D29] text-[#6E727F]">
      <div className="w-11/12 max-w-[1260px] mx-auto py-10 md:py-14">
        {/* Top */}
        <div className="border-b border-[#2C333F] pb-8 md:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left half */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {/* Company */}
                <div className="space-y-3">
                  <img
                    src={Logo}
                    alt="Studynotion logo"
                    className="h-8 w-auto sm:h-10 object-contain"
                  />
                  <h2 className="text-[#C5C7D4] font-semibold text-sm sm:text-base">
                    Company
                  </h2>
                  <nav className="flex flex-col gap-2 text-xs sm:text-sm">
                    {["About", "Careers", "Affiliates"].map((ele, i) => (
                      <Link
                        key={i}
                        to={ele.toLowerCase()}
                        className="hover:text-[#C5C7D4] transition-colors"
                      >
                        {ele}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex gap-4 text-xl">
                    <a href="#" aria-label="Facebook" className="hover:text-[#C5C7D4] transition-colors">
                      <FaFacebook />
                    </a>
                    <a href="#" aria-label="Google" className="hover:text-[#C5C7D4] transition-colors">
                      <FaGoogle />
                    </a>
                    <a href="#" aria-label="Twitter" className="hover:text-[#C5C7D4] transition-colors">
                      <FaTwitter />
                    </a>
                    <a href="#" aria-label="YouTube" className="hover:text-[#C5C7D4] transition-colors">
                      <FaYoutube />
                    </a>
                  </div>
                </div>

                {/* Resources + Support */}
                <div>
                  <h2 className="text-[#C5C7D4] font-semibold text-sm sm:text-base">
                    Resources
                  </h2>
                  <nav className="mt-2 flex flex-col gap-2 text-xs sm:text-sm">
                    {Resources.map((ele, index) => (
                      <Link
                        key={index}
                        to={ele.split(" ").join("-").toLowerCase()}
                        className="hover:text-[#C5C7D4] transition-colors"
                      >
                        {ele}
                      </Link>
                    ))}
                  </nav>
                  <h3 className="mt-6 text-[#C5C7D4] font-semibold text-sm sm:text-base">
                    Support
                  </h3>
                  <div className="mt-2 text-xs sm:text-sm">
                    <Link
                      to={"/help-center"}
                      className="hover:text-[#C5C7D4] transition-colors"
                    >
                      Help Center
                    </Link>
                  </div>
                </div>

                {/* Plans + Community */}
                <div>
                  <h2 className="text-[#C5C7D4] font-semibold text-sm sm:text-base">
                    Plans
                  </h2>
                  <nav className="mt-2 flex flex-col gap-2 text-xs sm:text-sm">
                    {Plans.map((ele, index) => (
                      <Link
                        key={index}
                        to={ele.split(" ").join("-").toLowerCase()}
                        className="hover:text-[#C5C7D4] transition-colors"
                      >
                        {ele}
                      </Link>
                    ))}
                  </nav>

                  <h3 className="mt-6 text-[#C5C7D4] font-semibold text-sm sm:text-base">
                    Community
                  </h3>
                  <nav className="mt-2 flex flex-col gap-2 text-xs sm:text-sm">
                    {Community.map((ele, index) => (
                      <Link
                        key={index}
                        to={ele.split(" ").join("-").toLowerCase()}
                        className="hover:text-[#C5C7D4] transition-colors"
                      >
                        {ele}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Right half */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {FooterLink2.map((ele, i) => (
                  <div key={i}>
                    <h2 className="text-[#C5C7D4] font-semibold text-sm sm:text-base">
                      {ele.title}
                    </h2>
                    <nav className="mt-2 flex flex-col gap-2 text-xs sm:text-sm">
                      {ele.links.map((link, index) => (
                        <Link
                          key={index}
                          to={link.link}
                          className="hover:text-[#C5C7D4] transition-colors"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
              {BottomFooter.map((ele, i) => (
                <Link
                  key={i}
                  to={ele.split(" ").join("-").toLocaleLowerCase()}
                  className="px-0 sm:px-3 border-none sm:border-r sm:border-[#2C333F] last:border-none hover:text-[#C5C7D4] transition-colors"
                >
                  {ele}
                </Link>
              ))}
            </div>
            <div className="text-center text-[#C5C7D4]">
              Made with ❤️ StudyNotion © 2023 StudyNotion
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
