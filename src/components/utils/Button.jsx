import React from "react";

function Button({
  children,
  type = "submit",
  bgColor = "bg-gray-900",
  textColor = "text-white",
  className = "",
  width = "w-full",
  ...props
}) {
  return (
    <div>
      <button
        type={type}
        className={`p-2 rounded-md duration-300 hover:bg-gray-800 ${width} ${bgColor} ${textColor} ${className} `}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
