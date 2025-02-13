import React, { useEffect, useState } from 'react'
import { Input } from '../../components/UI/Input'
import { Select } from '../../components/UI/Select'
import { getStudents } from '../../services/studentServices';
import { Table } from '../../components/Tables/Table';
import { Button } from '../../components/UI/Button';
import { Table as TableSkeleton}  from '../../components/Skeletons/Table';

export const ManageStudents = () => {
  const [students,setStudents] = useState([]);
  const [loading,setLoading] = useState(false);
  const [pagination,setPagination] = useState({
    currentPage : 0,
    lastPage : 0,
    total : 0,
  })

  const getStudents_FUNCTION = async (page) =>{
    setLoading(true);
    const response = await getStudents(localStorage.getItem('token'),page);
    setLoading(false);
    
    setPagination({
      currentPage : response.data.students.current_page,
      lastPage : response.data.students.last_page,
      total : response.data.students.total
    })
    
    if(response.data.students.data){
      setStudents(response.data.students.data)
    }
  }  

  useEffect(() =>{
    getStudents_FUNCTION(1)
  },[])
  return (
    <div className='ml-6 mt-6 w-[85%]'>
        <div className='w-[100%] px-2'>
            <h1 className='text-3xl font-semibold'>Manage students</h1>
            <br></br>
            <div className='sm:flex block justify-between w-[100%]'>
              <div className='sm:flex flex-row gap-2 block w-[70%]'>
                <Input type={'text'} placholder={"Search for student"} border={'white'}/>
                <Select title={"Filter by class"} width={'50%'}/>
                <Select title={"Filter by gender"} width={'50%'}/>
              </div>
              <div>
                <Button text={'Add Student'} width={'20%'}/>
              </div>
            </div>
        </div>
        <div className='mt-4 px-2'>
          {
            loading && <TableSkeleton />
          }
          {
            students && students.length && !loading?
              <Table heads={['Full name','Username','Gender','Date of birth']}
                      data={students}
                      viewButton={true}
                      updateButton={true}
                      deleteButton={true}
                      keys={['full_name','username','gender','date_of_birth']} 
                      pagination={pagination}
                      getData={getStudents_FUNCTION}/>
            :null
          }
        </div>
    </div>
  )
}
