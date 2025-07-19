import React, { useId, forwardRef } from "react";

function Input({ label, type = "text", className = "", ref, ...props }) {
  const id = useId();
  return (
    <div className="">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        ref={ref}
        className={`duration-300 p-3 rounded-md border w-full outline-none my-2 bg-white ${className}`}
        name={id}
        {...props}
      />
    </div>
  );
}

export default Input;
