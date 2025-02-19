import React from 'react'

export const Notification = () => {
    const array = [1,2,3,4,5,6,7,8];
  return (
    <>
        
        {
            array.map(() =>{
                return <div className='bg-gray-900 animate-pulse w-[100%] px-2 h-[100px] mb-2'>
                    
                    </div>
            })
        }
    </>
  )
}
