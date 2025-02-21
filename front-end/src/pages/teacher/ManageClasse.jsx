import React, { useEffect, useState } from "react";
import { getClassesAndStudentsByTeacher } from "../../services/classServices";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Table } from "../../components/Tables/Table";
import { errors } from "../../constants/Errors";
import { useAppContext } from "../../context/AppContext";
export const ManageClasse = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { isMenuOpen } = useAppContext();
  const getClassesAndStudentsByTeacher_FUNCTION = async () => {
    try {
      setLoading(true);
      const response = await getClassesAndStudentsByTeacher(
        localStorage.getItem("token")
      );
      console.log(response.data);
      if (response.status === 200) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      setErrorMessage(errors.tryAgain)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClassesAndStudentsByTeacher_FUNCTION();
  }, []);
  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Manage Classes</h1>
          <br></br>
        </div>
        <div className="mt-4 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
          {loading && <TableSkeleton />}
          {students && students.length && !loading ? (
            <Table
              heads={["Class name", "Section", "Students Count"]}
              data={students}
              viewButton={true}
              keys={["class_name", "section", "student_count"]}
              getData={getClassesAndStudentsByTeacher_FUNCTION}
              toUpdateOrDelete={"User"}
            />
          ) : null}
        </div>
      </div>
    )
  );
};
