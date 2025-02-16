import React, { useEffect } from "react";
import { useState } from "react"
import { getSubjects } from "../../services/subjectServices";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Button } from "../../components/UI/Button";
import { Add } from "../../components/Modals/Add";


export const ManageSubjects = () => {
    const [subject , setSubject] = useState([])
    const [loading, setLoading] = useState(false);
    const [openAddSubject,setOpenAddSubject] = useState(false);

    const [paginate, setPaginate] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        lastPage: 0,
        total: 0,
      });
    

    const getSubject = async (page) => {
        setLoading(true);
        const response = await getSubjects(localStorage.getItem("token"),page);
        setPaginate(true);
        setLoading(false)
        setPagination({
            currentPage: response.data.current_page,
            lastPage: response.data.last_page,
            total: response.data.total,
          });
        if (response.data){
            setSubject(response.data.data)
            
        }
    }
    useEffect(() => {
        getSubject(1);
      }, []);
    return (
        <div className={`ml-6 mt-6 w-[81%]`}>
            <div className='w-[100%] px-2'>
                <h1 className='text-3xl font-semibold'>Manage subjects</h1>
                <br></br>
                <div className='sm:flex block justify-between w-[100%]'>
                    <div>
                        <Button text={'Add Subject'} width={'20%'} onClick={() => setOpenAddSubject(true)}/>
                    </div>
                </div>
            </div>
            <div className="mt-4 px-2">
                {loading && <TableSkeleton />}
                {
                    subject && subject.length && !loading ? (
                    <Table
                        heads={["teacher_id", "class_id", "name"]}
                        data={subject}
                        viewButton={true}
                        updateButton={true}
                        deleteButton={true}
                        keys={["teacher_id", "class_id", "name"]}
                        pagination={pagination}
                        paginate={paginate}
                        getData={getSubject}
                        toUpdateOrDelete={"Subject"}
                        />
                ):null
                }
                {
                    openAddSubject && <Add toAdd={'subject'} setOpen={setOpenAddSubject} />
                }
            </div>
        </div>
    );
};