import React, { useEffect, useState } from "react";
import { getClassesAndStudentsByTeacher } from "../../services/classServices";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Table } from "../../components/Tables/Table";
export const ManageClasse = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const getClassesAndStudentsByTeacher_FUNCTION = async () => {
    try {
      setLoading(true);
      const response = await getClassesAndStudentsByTeacher(
        localStorage.getItem("token")
      );
      console.log(response.data);
      if (response.status === 200) {
        setClasses(response.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClassesAndStudentsByTeacher_FUNCTION();
  }, []);
  return (
    <div className="mt-4 px-2">
      {loading && <TableSkeleton />}
      {!loading && (
        <Table
          heads={["id", "class_name", "section", "student_count"]}
          data={classes}
          viewButton={true}
          updateButton={true}
          deleteButton={true}
          keys={["id", "class_name", "section", "student_count"]}
          getData={getClassesAndStudentsByTeacher_FUNCTION}
          toUpdateOrDelete={"Classe"}
        />
      )}
    </div>
  );
};
