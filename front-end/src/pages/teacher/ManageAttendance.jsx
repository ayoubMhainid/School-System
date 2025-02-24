import React, { useEffect, useState } from "react";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Table } from "../../components/Tables/Table";
import { errors } from "../../constants/Errors";
import { useAppContext } from "../../context/AppContext";
import { getStudentsByClass } from "../../services/studentServices";
import { getClassesByTeacher_2 } from "../../services/classServices";
import CreateAttendance from "../../components/Modals/CreateAttendance";
export const ManageAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const { isMenuOpen } = useAppContext();

  const [openCreateAttendance, setOpenCreateAttendance] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const getClassesByTeacher_FUNCTION = async () => {
    try {
      setLoading(true);
      const response = await getClassesByTeacher_2(
        localStorage.getItem("token")
      );
      console.log(response.data);
      if (response.status === 200) {
        setClasses(response.data.classes);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      setErrorMessage(errors.tryAgain);
    } finally {
      setLoading(false);
    }
  };

  const getStudentsByClass_FUNCTION = async (class_id) => {
    if (!class_id) return;
    try {
      setLoadingStudents(true);
      const response = await getStudentsByClass(
        localStorage.getItem("token"),
        class_id
      );
      console.log(response.data);
      if (response.status === 200) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      setErrorMessage(errors.tryAgain);
    } finally {
      setLoadingStudents(false);
    }
  };


  useEffect(() => {
    getClassesByTeacher_FUNCTION();
  }, []);

  const handleOpenAttendanceModal = (student) => {
    setSelectedStudent(student);
    setOpenCreateAttendance(true);
  };
  const handleCreateAttendance = (attendance) => {
    if (attendance) {
      setAttendanceRecords((prev) => [...prev, attendance]);
    }
    setOpenCreateAttendance(false);
  };
  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Manage Attendance</h1>
          <br></br>
        </div>
        <div className="mt-2 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
          {loading && <TableSkeleton />}
          <select
            className="border border-gray-600 px-3 py-1 text-md bg-black rounded-sm outline-none w-[30%] mb-2"
            onChange={(e) => getStudentsByClass_FUNCTION(e.target.value)}
          >
            <option value="">Select class</option>
            {classes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.class_name}
              </option>
            ))}
          </select>

          {loadingStudents ? (
            <TableSkeleton />
          ) : (
            students.length > 0 && (
              <Table
                heads={["Full name", "Username", "Phone"]}
                data={students}
                viewButton={true}
                attendanceButton={handleOpenAttendanceModal}
                keys={["full_name", "username", "phone"]}
                getData={getStudentsByClass_FUNCTION}
              />
            )
          )}
        </div>
        {openCreateAttendance && (
          <CreateAttendance
            student={selectedStudent}
            onSubmit={handleCreateAttendance}
          />
        )}
        <div className="mt-4 px-2">
          {loading ? (
            <TableSkeleton />
          ) : (
            attendanceRecords.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold">Attendance Records</h2>
                <Table
                  heads={["User ID", "Time", "Status"]}
                  viewButton={true}
                  deleteButton={true}
                  data={attendanceRecords}
                  keys={["user_id", "time", "status"]}
                />
              </>
            )
          )}
        </div>
      </div>
    )
  );
};
