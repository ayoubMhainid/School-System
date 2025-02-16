import React from "react";

<<<<<<< HEAD
export const Select = ({
  name,
  options,
  title,
  value,
  onchange,
  width,
  ky,
  valueToSelect,
}) => {
  return (
    <select
      className={`border border-white px-3 py-1 rounded-sm bg-gray-900 ${
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
=======
export const Select = ({options,title,value,onchange,width,ky,valueToSelect,bg,border}) => {
  return (<select className={`border ${border ? border : 'border-white'} px-3 py-1 rounded-sm ${bg ? bg : 'bg-gray-900'} ${width?`w-[${width}]`:'50%'}`}
                onChange={onchange}
                value={value}>
                <option>{title}</option>
                {
                    options ?
                        options.map((option) =>{
                            return <option value={valueToSelect ? option[valueToSelect] : option} className='text-lg'>
                              {
                                ky ? option[ky] : option
                              }
                            </option>
                        })
                    :null 
                }
>>>>>>> c6f1af8e4ad7dd9bdc60ea94138a9f8a52640a6c
    </select>
  );
};
