import { useEffect, useState } from "react";
import { Input } from "../../components/UI/Input";
import { useAppContext } from "../../context/AppContext";
import { errors } from "../../constants/Errors";
import {
  getTeachers,
  searchTeachersByUsername,
} from "../../services/teacherServices";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import CreateAttendance from "../../components/Modals/CreateAttendance";
import { getAttendance } from "../../services/attendanceServices";

export const ManageAttendancesTeacher = () => {
  const { isMenuOpen, user } = useAppContext();
  const [teacherList, setTeacherList] = useState([]);
  const [teacherListAttendance, setTeacherListAttendance] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageAttendance, setErrorMessageAttendance] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [paginate, setPaginate] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });
  const [usernameSearch, setUsernameSearch] = useState("");
  const [teacherAttendance, setTeacherAttendance] = useState({});
  const [openCreateAttendance, setOpenCreateAttendance] = useState(false);

  const viewTeachers = async (page) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const response = await getTeachers(user.token, page);
      setLoading(false);
      const _respense = response.data.teachers;
      _respense.data.length
        ? (setPaginate(true),
          setPagination({
            currentPage: _respense.current_page,
            lastPage: _respense.last_page,
            total: _respense.total,
          }),
          setTeacherList(_respense.data))
        : setErrorMessage(errors.notFound);
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : setErrorMessage(errors.tryAgain);
    }
  };

  useEffect(() => {
    user.token && viewTeachers(1);
  }, [user.token]);

  useEffect(() => {
    const searchTeacherUsername = async () => {
      setErrorMessage(null);
      setLoading(true);
      const response = await searchTeachersByUsername(
        user.token,
        usernameSearch
      );
      setTeacherList(null);
      setLoading(false);
      const _response = response.data.teachers;
      switch (response.status) {
        case 200:
          setPaginate(true);
          setPagination({
            currentPage: _response.current_page,
            lastPage: _response.last_page,
            total: _response.total,
          });
          _response.data.length
            ? setTeacherList(_response.data)
            : setErrorMessage(errors.notFound);
          break;
        case 404:
          setErrorMessage(_response.data.message);
          break;
        default:
          setErrorMessage(errors.tryAgain);
          break;
      }
    };

    user.token && usernameSearch && searchTeacherUsername();
  }, [usernameSearch]);

  const creationAttendance = (teacherData) => {
    setTeacherAttendance(teacherData);
    setOpenCreateAttendance(true);
  };

  const viewAttendance = async (page) => {
    setErrorMessageAttendance(null);
    setLoadingAttendance(true);
    try {
      const response = await getAttendance(user.token, page);
      setLoadingAttendance(false);
      const _respense = response.data.attendanceTeacher;
      _respense.data.length
        ? (setPaginate(true),
          setPagination({
            currentPage: _respense.current_page,
            lastPage: _respense.last_page,
            total: _respense.total,
          }),
          setTeacherListAttendance(_respense.data))
        : setErrorMessageAttendance(errors.notFound);
    } catch (error) {
      error.response
        ? setErrorMessageAttendance(error.response.data.message)
        : setErrorMessageAttendance(errors.tryAgain);
    }
  };
  useEffect(() => {
    user.token && viewAttendance(1);
  }, [user.token]);

  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 md:w-[98%]">
        <h1 className="w-[100%] px-2 pb-4 text-3xl font-semibold">
          Manage Attendance
        </h1>
        <div className="px-2 w-[80%] lg:w-[50%]">
          <h6 className="w-[100%] px-2 pb-2 text-2xl font-semibold">
            Teachers
          </h6>
          <Input
            type={"text"}
            placholder={"Search by username"}
            value={usernameSearch}
            onChange={(e) => setUsernameSearch(e.target.value)}
          />
        </div>
        <div className="mt-4 px-2">
          {!errorMessage ? (
            !loading ? (
              teacherList &&
              teacherList.length && (
                <Table
                  heads={["Full name", "Username", "phone", "specialization"]}
                  data={teacherList}
                  viewButton
                  attendanceButton={creationAttendance}
                  keys={["full_name", "username", "phone", "specialization"]}
                  pagination={pagination}
                  paginate={paginate}
                  getData={viewTeachers}
                />
              )
            ) : (
              <TableSkeleton />
            )
          ) : (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
        </div>
        <h6 className="w-[100%] px-2 pt-4 text-2xl font-semibold">
          Attendance teachers
        </h6>
        <div className="mt-4 px-2">
          {!errorMessageAttendance ? (
            !loadingAttendance ? (
              teacherListAttendance &&
              teacherListAttendance.length && (
                <Table
                  heads={["Full name", "Date","Month", "Total hours"]}
                  data={teacherListAttendance}
                  keys={["user.teacher.full_name", "year",'month', "total_hours"]}
                  pagination={pagination}
                  paginate={paginate}
                  getData={viewAttendance}
                />
              )
            ) : (
              <TableSkeleton />
            )
          ) : (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
        </div>
        {openCreateAttendance && (
          <CreateAttendance
            role="admin"
            student={teacherAttendance}
            setOpen={setOpenCreateAttendance}
          />
        )}
      </div>
    )
  );
};
