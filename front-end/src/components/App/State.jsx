import React from 'react'

export const State = ({svg,text,count}) => {
  return (
    <div className={`flex justify-between px-3 py-1 rounded-lg items-center sm:w-[32%] w-[100%] mb-2 sm:mb-0 bg-linear-to-r from-indigo-500 to-cyan-400`}>
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
