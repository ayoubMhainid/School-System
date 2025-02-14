import React from 'react'

export const ButtonSvg = ({svg,color,onclick}) => {
  return (
    <button className={`px-3 py-1 rounded-sm duration-200 cursor-pointer ${color === 'red' && 'bg-red-500 hover:bg-red-700'}
                        ${color === 'blue' && 'bg-blue-500 hover:bg-blue-700'}
                        ${color === 'green' && 'bg-green-500 hover:bg-green-700'}
    `}
    onClick={onclick}
    >
        {svg}
    </button>
  )
}
