import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { getAllTeacherOfStudent } from "../../services/teacherServices";


export const Teachers = () => {
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(false);


  const [paginate, setPaginate] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });

  const getTeachers = async () => {
    setLoading(true);
    const response = await getAllTeacherOfStudent(localStorage.getItem("token"));
    console.log(response.data)
    setPaginate(true);
    setLoading(false);
    setPagination({
      currentPage: response.data.subjects.current_page,
      lastPage: response.data.subjects.last_page,
      total: response.data.subjects.total,
    });
    if (response.data) {
      setTeacher(response.data.subjects.data);
    }
  };
  useEffect(() => {
    getTeachers(1);
    console.log(teacher)
  }, []);
  return (
    <div className={`ml-6 mt-6 w-[81%]`}>
      <div className="w-[100%] px-2">
        <h1 className="text-3xl font-semibold">Teachers</h1>
        <br></br>
      </div>
      <div className="mt-4 px-2">
        {loading && <TableSkeleton />}
        {teacher && teacher.length && !loading ? (
          <Table
            heads={["Teacher name", "Class", "Subject name"]}
            data={teacher}
            viewButton={true}
            updateButton={false}
            deleteButton={false}
            keys={["teacher.full_name", "class.class_name", "name"]}
            pagination={pagination}
            paginate={paginate}
            getData={getTeachers}
            toUpdateOrDelete={"Subject"}
            studentTeachers
          />
        ) : null}
      </div>
    </div>
  );
};
