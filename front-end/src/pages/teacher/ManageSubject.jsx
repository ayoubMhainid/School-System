import React, { useEffect, useState } from "react";

import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Table } from "../../components/Tables/Table";
import { errors } from "../../constants/Errors";
import { useAppContext } from "../../context/AppContext";
import { getSubjectsByTeacher } from "../../services/subjectServices";
export const ManageSubject = () => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { isMenuOpen } = useAppContext();
  const getSubjectsByTeacher_FUNCTION = async () => {
    try {
      setLoading(true);
      const response = await getSubjectsByTeacher(
        localStorage.getItem("token")
      );
      if (response.status === 200) {
        setSubjects(response.data.subjects);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setErrorMessage(errors.tryAgain);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubjectsByTeacher_FUNCTION();
  }, []);
  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Manage Subjects</h1>
          <br></br>
        </div>
        <div className="mt-4 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
          {loading && <TableSkeleton />}
          {subjects && subjects.length && !loading ? (
            <Table
              heads={["id", "Class name", "Subject name"]}
              data={subjects}
              keys={["id", "class_name", "name"]}
              getData={getSubjectsByTeacher_FUNCTION}
              toUpdateOrDelete={"User"}
            />
          ) : null}
        </div>
      </div>
    )
  );
};
