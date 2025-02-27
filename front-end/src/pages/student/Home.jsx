import React from 'react'
import student from '../../../public/students.png'
import { useAppContext } from '../../context/AppContext';
export const Home = () => {
    const {isMenuOpen } = useAppContext();
  
  return (    
    <div className="rounded-md shadow-md w-full">
      <div className='py-4 bg-gray-300 text-black px-2 fixed w-full'>
        home
      </div>
      <div className="w-full relative">
            
        <div className="absolute top-60 left-20 transform  px-8">
          <h1 className="text-white text-8xl font-semibold mb-15">Welcome There,</h1>
          <h3 className="text-white w-xl text-xl">
            Take Charge of Your Learning Journey: Discover Our All-In-One Student Management Tools to Simplify Your Academic Experience and Support Your Success
          </h3>
          <button></button>
        </div>
      </div>
    </div>

    
    
  )
}
