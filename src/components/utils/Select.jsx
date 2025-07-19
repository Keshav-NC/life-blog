import { useId } from "react";

function Select({ options = [], label, className = "", ref, ...props }) {
  const id = useId();
  return (
    <div className="w-full  rounded-md flex items-center gap-3">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={`border outline-none rounded-md cursor-pointer bg-white w-full p-3 ${className}`}
        ref={ref}
        id={id}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
