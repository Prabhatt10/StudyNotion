import React from 'react'

function IconButton({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] 
        ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"} 
        cursor-pointer ${customClasses}`}
      type={type}
    >
      {/* ALWAYS render text */}
      <span>{text}</span>

      {/* Render icon or children only if passed */}
      {children && children}
    </button>
  )
}

export default IconButton
