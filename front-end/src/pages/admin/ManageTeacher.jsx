import React, { useEffect, useState } from "react";
import { Input } from "../../components/UI/Input";
import { Select } from "../../components/UI/Select";
import { Button } from "../../components/UI/Button";
import { useAppContext } from "../../context/AppContext";
import { errors } from "../../constants/Errors";
import { getClasses } from "../../services/classServices";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import {
  getTeachers,
  getTeachersByClass,
  searchTeachersByUsername,
} from "../../services/teacherServices";
import { Add } from "../../components/Modals/Add";

export const ManageTeacher = () => {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [dataSearch, setDataSearch] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });

  const { user, isMenuOpen } = useAppContext();

  const handleCahnge = (e) => {
    const { name, value } = e.target;
    setDataSearch((perv) => ({ ...perv, [name]: value }));
  };

  const getTeachers_FUNCTION = async (page) => {
    setLoading(true);
    const response = await getTeachers(user.token, page);
    setLoading(false);
    switch (response.status) {
      case 200:
        setPaginate(true);
        const _response = response.data.teachers;
        setPagination({
          currentPage: _response.current_page,
          lastPage: _response.last_page,
          total: _response.total,
        });
        _response.data.length
          ? setTeachers(_response.data)
          : setErrorMessage(errors.notFound);
        break;
      default:
        setErrorMessage(errors.tryAgain);
        break;
    }
  };

  useEffect(() => {
    const searchTeacherUsername = async () => {
      setErrorMessage(null);
      setLoading(true);
      const response = await searchTeachersByUsername(
        user.token,
        dataSearch.username
      );
      setTeachers(null);
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
            ? setTeachers(_response.data)
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

    const viewClasses = async () => {
      const response = await getClasses(user.token);
      response.status == 200
        ? response.data.classes.length
          ? setClasses(response.data.classes)
          : setErrorMessage(errors.notFound)
        : setErrorMessage(errors.tryAgain);
    };

    if (user.token) {
      if (dataSearch.username) {
        searchTeacherUsername();
      } else {
        viewClasses();
        getTeachers_FUNCTION(1);
      }
    }
  }, [user.token, dataSearch.username]);

  useEffect(() => {
    const searchTeacherByClass = async () => {
      setErrorMessage(null);
      const response = await getTeachersByClass(
        user.token,
        dataSearch.class_id
      );
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
            ? setTeachers(_response.data)
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
    if (user.token) {
      if (dataSearch.class_id) {
        if (dataSearch.class_id !== "Filter by class") {
          searchTeacherByClass();
        } else {
          setErrorMessage(null);
          getTeachers_FUNCTION(1);
        }
      }
    }
  }, [dataSearch.class_id]);

  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 w-[85%]">
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Manage students</h1>
          <br></br>
          <div className="sm:flex block justify-between w-[100%]">
            <div className="sm:flex flex-row gap-2 block w-[70%]">
              <Input
                type={"text"}
                name="username"
                placholder={"Search for student"}
                border={"white"}
                value={dataSearch.username}
                onChange={handleCahnge}
              />
              <Select
                name="class_id"
                title={"Filter by class"}
                width={"50%"}
                options={classes}
                ky={"class_name"}
                value={dataSearch.class_id}
                onchange={handleCahnge}
                valueToSelect={"id"}
              />
            </div>
            <div>
              <Button
                text={"Add Teacher"}
                width={"20%"}
                onClick={() => {
                  setOpenAddUser(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
          {loading && <TableSkeleton />}
          {teachers && teachers.length > 0 && !loading ? (
            <Table
              heads={["Full name", "Username", "specialization"]}
              data={teachers}
              viewButton={true}
              updateButton={true}
              deleteButton={true}
              keys={["full_name", "username", "specialization"]}
              pagination={pagination}
              paginate={paginate}
              getData={getTeachers_FUNCTION}
              toUpdateOrDelete={"User"}
            />
          ) : null}
        </div>
        {openAddUser && <Add toAdd="teacher" setOpen={setOpenAddUser} />}
      </div>
    )
  );
};
