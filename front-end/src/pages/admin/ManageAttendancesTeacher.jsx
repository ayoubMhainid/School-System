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

export const ManageAttendancesTeacher = () => {
  const { isMenuOpen, user } = useAppContext();
  const [teacherList, setTeacherList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });
  const [usernameSearch, setUsernameSearch] = useState("");
  const [teacherAttendance, setAeacherAttendance] = useState({});
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
    console.log("this creation attendance");
    setAeacherAttendance(teacherData);
    setOpenCreateAttendance(true);
  };

  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 w-[85%]">
        <h1 className="w-[100%] px-2 pb-2 text-3xl font-semibold">
          Manage Attendance
        </h1>
        <div className="px-2 w-[80%] lg:w-[50%]">
          <Input
            type={"text"}
            placholder={"Search by username"}
            border={"white"}
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
                  // toUpdateOrDelete={"User"}
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
            student={teacherAttendance}
            setOpen={setOpenCreateAttendance}
          />
        )}
      </div>
    )
  );
};
