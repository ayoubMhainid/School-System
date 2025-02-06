import React from "react"
export const Input = ({type,name,placholder,value,width,onChange,required=true,maxLength,border,text}) => {
    return (
      <input type={type}
      name={name}
      placeholder={placholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      className={`border ${border ? `border-${border}` : 'border-gray-600'} ${text ? `text-${text}` : 'text-black'} px-3 py-1 text-md bg-inherit rounded-sm outline-none ${width ? `w-[${width}]` : "w-[100%]"}`} />
    )
  }