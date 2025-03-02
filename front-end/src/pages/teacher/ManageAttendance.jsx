import React, { useEffect, useState } from "react";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Table } from "../../components/Tables/Table";
import { errors } from "../../constants/Errors";
import { useAppContext } from "../../context/AppContext";
import { getStudentsByClass } from "../../services/studentServices";
import { getClassesByTeacher_2 } from "../../services/classServices";
import CreateAttendance from "../../components/Modals/CreateAttendance";
import {
  getAttendanceByClass,
  getNbHoursOfAbsentStudents,
} from "../../services/attendanceStudServices";
export const ManageAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [studAtten, setStudAtten] = useState([]);
  const [absenthours, setAbsentHours] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { isMenuOpen } = useAppContext();
  const [paginate, setPaginate] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });

  const [openCreateAttendance, setOpenCreateAttendance] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classSelected, setClassSelected] = useState(null);

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
      setLoadingStudents(false);
      console.log(response.data);
      if (response.status === 200) {
        setStudents(response.data.students);
      }
    } catch (error) {
      setLoadingStudents(false);
      console.error("Error fetching classes:", error);
      setErrorMessage(errors.tryAgain);
    }
  };

  const getStudentsAttendanceByClass_FUNCTION = async (page) => {
    // if (!class_id) return;
    try {
      setLoading(true);
      const response = await getAttendanceByClass(
        localStorage.getItem("token"),
        classSelected,
        page
      );
      setLoading(false);
      setPaginate(true);
      if (response.status === 200) {
        console.log(response.data);
        setPagination({
          currentPage: response.data.attendances.current_page,
          lastPage: response.data.attendances.last_page,
          total: response.data.attendances.total,
        });
        setStudAtten(response.data.attendances.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching classes:", error);
      setErrorMessage(errors.tryAgain);
    }
  };

  const getNbHoursOfAbsentStudents_FUNCTION = async (class_id) => {
    try {
      setLoading(true);
      const response = await getNbHoursOfAbsentStudents(
        localStorage.getItem("token"),
        class_id
      );
      setLoading(false);
      console.log(response.data);
      if (response.status === 200) {
        setAbsentHours(response.data.absent_hours);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching absent_hours:", error);
      setErrorMessage(errors.tryAgain);
    }
  };

  useEffect(() => {
    classSelected && getStudentsAttendanceByClass_FUNCTION(1);
  }, [classSelected]);

  useEffect(() => {
    getClassesByTeacher_FUNCTION();
  }, []);

  const handleOpenAttendanceModal = (student) => {
    setSelectedStudent(student);
    setOpenCreateAttendance(true);
  };
  const handleCreateAttendance = (attendance) => {
    if (attendance) {
      const updatedRecords = [...studAtten, attendance];
      setStudAtten(updatedRecords);
      localStorage.setItem("studAtten", JSON.stringify(updatedRecords));
    }
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
          {loading ? (
            <TableSkeleton />
          ) : (
            <select
              className="border border-gray-600 px-3 py-1 text-md bg-black rounded-sm outline-none w-[30%] mb-2"
              onChange={(e) => {
                getStudentsByClass_FUNCTION(e.target.value);
                getNbHoursOfAbsentStudents_FUNCTION(e.target.value);
                setClassSelected(e.target.value);
              }}
            >
              <option value="">Select class</option>
              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.class_name}
                </option>
              ))}
            </select>
          )}

          {loadingStudents ? (
            <TableSkeleton />
          ) : (
            <>
              {students.length > 0 && (
                <div>
                  <h3 className="text-3xl font-semibold">Students</h3>
                  <Table
                    heads={["Full name", "Username", "Phone"]}
                    data={students}
                    viewButton={true}
                    attendanceButton={handleOpenAttendanceModal}
                    keys={["full_name", "username", "phone"]}
                    getData={getStudentsByClass_FUNCTION}
                  />
                </div>
              )}
            </>
          )}

          {loading ? (
            <TableSkeleton />
          ) : (
            <>
              {studAtten.length > 0 && (
                <>
                  <h3 className="text-3xl font-semibold">
                    Attendance Students
                  </h3>
                  <Table
                    heads={[
                      "Student ID",
                      "Class ID",
                      "Date",
                      "NbHours",
                      "Time",
                      "Status",
                    ]}
                    data={studAtten}
                    deleteButton={true}
                    keys={[
                      "student_id",
                      "class_id",
                      "date",
                      "nbHours",
                      "time",
                      "status",
                    ]}
                    getData={getStudentsAttendanceByClass_FUNCTION}
                    paginate={paginate}
                    pagination={pagination}
                    toUpdateOrDelete={"Attendance"}
                  />
                </>
              )}
            </>
          )}

          {loading ? (
            <TableSkeleton />
          ) : (
            <>
              {absenthours.length > 0 && (
                <div>
                  <h3 className="text-3xl font-semibold">Absent Hours</h3>
                  <Table
                    heads={["Student ID", "Year", "Month", "Total Hours"]}
                    data={absenthours}
                    keys={["student_id", "year", "month", "total_hours"]}
                    getData={getNbHoursOfAbsentStudents_FUNCTION}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {openCreateAttendance && (
          <CreateAttendance
            role="teacher"
            student={selectedStudent}
            onSubmit={handleCreateAttendance}
            setOpen={setOpenCreateAttendance}
          />
        )}
      </div>
    )
  );
};
