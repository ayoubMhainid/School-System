import { CircularProgress } from '@mui/material'
import React from 'react'

export const Loading = () => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-white justify-center backdrop-blur-md">
        <span className='text-3xl'>Loading...</span>
    </div>
  )
}
