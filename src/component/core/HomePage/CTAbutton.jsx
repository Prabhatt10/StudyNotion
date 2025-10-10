import React from 'react';
import { Link } from 'react-router-dom';

function CTAbutton({ children, active, LinkTo }) {
  return (
    <Link to={LinkTo}>
      <div
        className={`text-center text-[13px] sm:text-sm md:text-base px-4 sm:px-5 py-2 sm:py-3 rounded-md font-bold transition-all duration-200 transform
          hover:scale-95 active:scale-90 cursor-pointer
          ${active ? 'bg-yellow-500 text-black' : 'bg-[#161D29] text-white'}
        `}
      >
        {children}
      </div>
    </Link>
  );
}

export default CTAbutton;
