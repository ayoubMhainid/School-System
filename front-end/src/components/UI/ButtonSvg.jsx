import React from 'react'

export const ButtonSvg = ({svg,color}) => {
  return (
    <button className={`px-3 py-1 rounded-sm duration-200 ${color === 'red' && 'bg-red-500 hover:bg-red-700'}
                        ${color === 'blue' && 'bg-blue-500 hover:bg-blue-700'}
                        ${color === 'blue' && 'bg-green-600 hover:bg-green-800'}
    `}>
        {svg}
    </button>
  )
}
