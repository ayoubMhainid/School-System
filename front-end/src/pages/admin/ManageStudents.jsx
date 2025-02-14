import React, { useEffect, useState } from 'react'
import { Input } from '../../components/UI/Input'
import { Select } from '../../components/UI/Select'
import { filterStudentsByGender, getStudents, getStudentsByClass, searchStudents } from '../../services/studentServices';
import { Table } from '../../components/Tables/Table';
import { Button } from '../../components/UI/Button';
import { Table as TableSkeleton}  from '../../components/Skeletons/Table';
import { getClasses } from '../../services/classServices';
import { errors } from '../../constants/Errors';

export const ManageStudents = () => {


  const [students,setStudents] = useState([]);
  const [username,setUsername] = useState('');

  const [classes,setClasses] = useState([]);
  const [selectedGender,setSelectedGender] = useState(''); 
  const [selectedClass,setSelectedClass] = useState();

  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);

  const [paginate,setPaginate] = useState(false);
  const [pagination,setPagination] = useState({
                                currentPage : 0,
                                lastPage : 0,
                                total : 0,
                              })

  const getStudents_FUNCTION = async (page) =>{
    setLoading(true);
    const response = await getStudents(localStorage.getItem('token'),page);
    setLoading(false);
    setPaginate(true);

    setPagination({
      currentPage : response.data.students.current_page,
      lastPage : response.data.students.last_page,
      total : response.data.students.total
    })
    
    if(response.data.students.data){
      setStudents(response.data.students.data)
    }
  }

  const getClasses_FUNCTION = async () =>{
    const response = await getClasses(localStorage.getItem('token'));
    response.status === 200 ? response.data.classes.length ? setClasses(response.data.classes) 
    : setErrorMessage(errors.notFound) : setErrorMessage(errors.tryAgain);    
  }

  const searchStudents_FUNCTION = async () =>{
    const response = await searchStudents(localStorage.getItem('token'),username);
    setPaginate(false);    
    
    response.status === 200 ? response.data.students.length ? setStudents(response.data.students)
    : setErrorMessage(errors.notFound) : setErrorMessage(errors.tryAgain);    
  }

  const getStudentsByClass_FUNCTION = async () =>{
    setErrorMessage('');
    const response = await getStudentsByClass(localStorage.getItem('token'),selectedClass);
    setPaginate(false);
    
    response.status === 200 ? response.data.students.length ? setStudents(response.data.students)
    : ( setErrorMessage(errors.notFound) , setStudents([]) ) : setErrorMessage(errors.tryAgain);  
  }

  const filterStudentsByGender_FUNCTION = async () =>{
    const response = await filterStudentsByGender(localStorage.getItem('token'),selectedGender);
    setPaginate(true);

    setPagination({
      currentPage : response.data.students.current_page,
      lastPage : response.data.students.last_page,
      total : response.data.students.total
    })
    
    response.status === 200 ? response.data.students.data.length ? setStudents(response.data.students.data)
    : ( setErrorMessage(errors.notFound) , setStudents([]) ) : setErrorMessage(errors.tryAgain);  
  }

  useEffect(() =>{
    username !== '' ? searchStudents_FUNCTION() : getStudents_FUNCTION(1);
  },[username])

  useEffect(() =>{
    selectedGender ? filterStudentsByGender_FUNCTION() : getStudents_FUNCTION(1);
  },[selectedGender]);

  useEffect(() =>{
    selectedClass ? getStudentsByClass_FUNCTION() : getStudents_FUNCTION(1);
  },[selectedClass])

  useEffect(() =>{
    getStudents_FUNCTION(1);
    getClasses_FUNCTION();
  },[])

  return (
    <div className='ml-6 mt-6 w-[85%]'>
        <div className='w-[100%] px-2'>
            <h1 className='text-3xl font-semibold'>Manage students</h1>
            <br></br>
            <div className='sm:flex block justify-between w-[100%]'>
              <div className='sm:flex flex-row gap-2 block w-[70%]'>
                <Input type={'text'} placholder={"Search for student"} border={'white'} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <Select title={"Filter by class"} width={'50%'} options={classes} ky={'class_name'} value={selectedClass} onchange={(e) => setSelectedClass(e.target.value)} valueToSelect={'id'}/>
                <Select title={"Filter by gender"} width={'50%'} options={['female','male']} value={selectedGender} onchange={(e) => setSelectedGender(e.target.value)}/>
              </div>
              <div>
                <Button text={'Add Student'} width={'20%'}/>
              </div>
            </div>
        </div>
        <div className='mt-4 px-2'>
          {
            errorMessage && <span className='text-red-300 text-xl font-semibold'>{errorMessage}</span>
          }
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
                      paginate={paginate}
                      getData={getStudents_FUNCTION}/>
            :null
          }
        </div>
    </div>
  )
}
