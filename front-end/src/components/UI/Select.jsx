import React from 'react'

export const Select = ({options,title,value,onchange,width}) => {
  return (<select className={`border border-white px-3 py-1 rounded-sm bg-gray-900 ${width?`w-[${width}]`:'50%'}`}
                onChange={onchange}
                value={value}>
                <option>{title}</option>
                {
                    options ?
                        options.map((option) =>{
                            return <option value={option}>{option}</option>
                        })
                    :null 
                }
    </select>
  )
}
