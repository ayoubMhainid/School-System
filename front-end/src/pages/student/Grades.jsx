import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import {getExamsOfStudent } from "../../services/examServices";
import { getMarks } from "../../services/markServices";
import { errors } from "../../constants/Errors";


export const Grades = () => {

    const [loading,setLoading] = useState(false);
    const [marks,setMarks] = useState([]);
    const [errorMessage,setErrorMessage] = useState('')

    const [pagination, setPagination] = useState({
            currentPage: 0,
            lastPage: 0,
            total: 0,
        });

    const getMarks_FUNCTION = async (page) =>{
        setLoading(true)
        const response = await getMarks(localStorage.getItem('token'),page);
        console.log(response);
        setLoading(false)
        
        response.status === 200 ?
            (setMarks(response.data.marks.data),
            setPagination({
                currentPage : response.data.marks.current_page,
                lastPage : response.data.marks.last_page,
                total : response.data.marks.total,
            })
            )
        :   setErrorMessage(errors.notFound);
    }

    useEffect(() =>{
        getMarks_FUNCTION(1);
    },[])
  return (
    <div className={`ml-6 mt-6 w-[81%]`}>
      <div className="w-[100%] px-2">
        <h1 className="text-3xl font-semibold">Grades</h1>
        <br></br>
      </div>
      <div className="mt-4 px-2">
        {loading && <TableSkeleton />}
        {marks && marks.length && !loading ? (
          <Table
            heads={["Exam name", "Mark", "Remark"]}
            data={marks}
            keys={["exam.exam_name", "mark", "remark"]}
            pagination={pagination}
            paginate={true}
            getData={getMarks_FUNCTION}
          />
        ) : null}
      </div>
    </div>
  );
};
