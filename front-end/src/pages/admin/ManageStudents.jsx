import React from 'react'
import { Input } from '../../components/UI/Input'
import { Select } from '../../components/UI/Select'

export const ManageStudents = () => {
  return (
    <div className='ml-6 mt-6 w-[85%]'>
        <div className='w-[70%]'>
            <h1 className='text-3xl font-semibold'>Manage students</h1>
            <br></br>
            <div className='gap-2 flex'>
              <Input type={'text'} placholder={"Search for student"} border={'white'}/>
              <Select title={"Filter by class"} width={'60%'}/>
              <Select title={"Filter by gender"} width={'60%'}/>
            </div>
        </div>
    </div>
  )
}
