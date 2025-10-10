import React from 'react';

function Highlight({ text }) {
  return (
    <span
      className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-[#537988] to-[#059ef1] bg-clip-text text-transparent whitespace-nowrap"
    >
      {text}
    </span>
  );
}

export default Highlight;
