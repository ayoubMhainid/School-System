import React from "react";

export const Select = ({
  name,
  options,
  title,
  value,
  onchange,
  width,
  ky,
  valueToSelect,
  bg,
  border,
}) => {
  return (
    <select
      className={`border ${
        border ? border : "border-white"
      } px-3 py-1 rounded-sm ${bg ? bg : "bg-gray-900"} ${
        width ? `w-[${width}]` : "50%"
      }`}
      onChange={onchange}
      value={value}
      name={name}
    >
      <option>{title}</option>
      {options
        ? options.map((option) => {
            return (
              <option
                value={valueToSelect ? option[valueToSelect] : option}
                className="text-lg"
              >
                {ky ? option[ky] : option}
              </option>
            );
          })
        : null}
    </select>
  );
};
