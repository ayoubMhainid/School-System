import React from "react";
export const Input = ({
  type,
  name,
  placholder,
  value,
  width,
  onChange,
  required = true,
  checked,
  maxLength,
  border,
  text,
  style,
  readOnly = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placholder}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      checked={checked}
      className={`border ${border ? `border-${border}` : "border-gray-600"} ${
        text ? `text-${text}` : "text-white"
      } px-3 py-1 text-md bg-inherit rounded-sm outline-none ${
        width ? `w-[${width}]` : "w-[100%]"
      } ${style}`}
    />
  );
};
