import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { getExamsOfStudent } from "../../services/examServices";
import { useAppContext } from "../../context/AppContext";

export const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isMenuOpen } = useAppContext();

  const [paginate, setPaginate] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });

  const getExams_FUNCTION = async (page) => {
    setLoading(true);
    const response = await getExamsOfStudent(
      localStorage.getItem("token"),
      page
    );
    console.log(response);
    setLoading(false);
    setPaginate(true);
    setPagination({
      currentPage: response.data.exams.current_page,
      lastPage: response.data.exams.last_page,
      total: response.data.exams.total,
    });
    if (response.data) {
      setExams(response.data.exams.data);
    }
  };
  useEffect(() => {
    getExams_FUNCTION(1);
  }, []);
  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 md:w-[98%]">
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Exams</h1>
          <br></br>
        </div>
        <div className="mt-4 px-2">
          {loading && <TableSkeleton />}
          {exams && exams.length && !loading ? (
            <Table
              heads={["Subject", "Exam", "Teacher", "Date"]}
              data={exams}
              viewButton={false}
              updateButton={false}
              deleteButton={false}
              keys={[
                "subject.name",
                "exam_name",
                "subject.teacher.full_name",
                "date",
              ]}
              pagination={pagination}
              paginate={paginate}
              getData={getExams_FUNCTION}
              //toUpdateOrDelete={"Subject"}
              studentTeachers
            />
          ) : null}
        </div>
      </div>
    )
  );
};
