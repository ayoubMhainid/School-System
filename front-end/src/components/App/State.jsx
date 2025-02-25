import React from 'react'

export const State = ({svg,text,count}) => {
  return (
<div className="flex justify-between px-3 py-1 rounded-lg items-center sm:w-[32%] w-[100%] mb-2 sm:mb-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-300 bg-[length:200%_200%] animate-[bg-move_3s_infinite_linear]">
        <div className='flex gap-2 items-center'>
            <span className='text-3xl font-semibold'>{count}</span>
            <span className='text-xl font-semibold'>{text}</span>
        </div>
        <div>
            {svg}
        </div>
    </div>
  )
}
