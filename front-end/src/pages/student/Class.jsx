import React, { useEffect, useState } from "react";
import { getClassByStudent } from "../../services/classServices";
import { LinearProgress } from "@mui/material";
import { errors } from "../../constants/Errors";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { filterStudentsByClass } from "../../services/studentServices";
import { useAppContext } from "../../context/AppContext";

export const Class = () => {
  const [classe, setClasse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [students, setStudents] = useState([]);

  const { isMenuOpen } = useAppContext();

  const getClassByStudent_FUNCTION = async () => {
    setLoading(true);
    try {
      const response = await getClassByStudent(localStorage.getItem("token"));
      if (response.status === 200) {
        setClasse(response.data.classe);
      }
    } catch (error) {
      console.error("Error fetching class:", error);
      setErrorMessage(errors.tryAgain);
    } finally {
      setLoading(false);
    }
  };

  const filterStudentsByClass_Function = async (class_id) => {
    setLoading(true);
    try {
      const response = await filterStudentsByClass(
        localStorage.getItem("token"),
        class_id
      );
      if (response.status === 200) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setErrorMessage(errors.tryAgain);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getClassByStudent_FUNCTION();
  }, []);

  useEffect(() => {
    if (classe.length > 0) {
      filterStudentsByClass_Function(classe[0].id);
    }
  }, [classe]);

  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 w-[81%]">
        <div className="w-full px-2">
          <h1 className="text-3xl font-semibold">Class</h1>
        </div>

        {errorMessage && (
          <span className="text-red-300 text-xl font-semibold">
            {errorMessage}
          </span>
        )}

        {loading && <LinearProgress />}

        {!loading && classe.length > 0 && (
          <>
            {classe.map((c) => (
              <div key={c.id} className="mt-6">
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src="/class.jpg"
                      className="w-20 h-20 rounded-md"
                      alt="Class"
                    />
                  </div>
                  <div className="flex justify-start flex-col">
                    <span className="text-gray-400">
                      Class Name : {c.class_name}
                    </span>
                    <span className="text-gray-400">Section: {c.section}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        <hr className="mt-10" />
        <div className="mt-6">
          {loading && <TableSkeleton />}
          {students && students.length && !loading ? (
            <Table
              heads={["Full Name", "Username", "Gender"]}
              data={students}
              keys={["full_name", "username", "gender"]}
              getData={filterStudentsByClass_Function}
            />
          ) : null}
        </div>
      </div>
    )
  );
};
