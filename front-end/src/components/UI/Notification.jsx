import React from "react";
import { useState } from "react"


export const Notification = ({message,type}) => {
    const [open,setOpen] = useState(true);
    setTimeout(() =>{
        setOpen(false)
    },3000)
  return(
    <div>
        {
            type === 'success' && open ?
                <div className="bg-green-200 z-10 rounded-3xl text-center py-1 border-2 border-green-900 px-3 animate-notificationAnimation fixed top-5 left-1/2 transform -translate-x-1/2">
                    ✔ <span className="text-md font-semibold text-green-700">{message}</span>
                </div>
            :null
        }
        {
            type === 'error' && open?
                <div className="bg-red-200 z-10 rounded-3xl text-center py-1 border-2 border-red-900 px-3 animate-notificationAnimation fixed top-5 left-1/2 transform -translate-x-1/2">
                    ❌ <span className="text-md font-semibold text-red-700">{message}</span>
                </div>
            :null
        }
    </div>
  )
}