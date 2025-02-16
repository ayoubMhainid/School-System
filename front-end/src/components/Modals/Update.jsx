import { useEffect, useState } from "react";
import React from "react";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { updateUserCredentials } from "../../services/userServices";
import { errors } from "../../constants/Errors";
import { Notification } from "../UI/Notification";
import { Select } from "../UI/Select";
import { getTeachers } from "../../services/teacherServices";
import { getClasses } from "../../services/classServices";
import { UpdateSubject } from "../../services/subjectServices";

export const Update = ({ modal, setModal }) => {
  const [teacher, setTeacher] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(modal?.data?.teacher_id);
  const [selectedClass, setSelectedClass] = useState(modal?.data?.class_id);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [userCredentialsForm, setUserCredentialsForm] = useState({
    id: modal?.data?.user?.id,
    email: "",
    password: "",
  });

  const [subjectData, setSubjectData] = useState({
    id: modal?.data?.id,
    subjectName: modal?.data?.name,
    teacherName: modal?.data?.teacher?.full_name,
    className: modal?.data?.class?.class_name,
    teacherId: modal?.data?.teacher_id,
    classId: modal?.data?.class_id,
  });

  const handleChangeUserCredentials = (e) => {
    const { name, value } = e.target;
    setUserCredentialsForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getClasse = async () => {
    setLoading(true);
    const response = await getClasses(localStorage.getItem("token"));
    if (response.data.classes) {
      setClasses(response.data.classes);
      setLoading(false);
    }
  };
  const getTeacher = async () => {
    setLoading(true);
    const response = await getTeachers(localStorage.getItem("token"));
    if (response.data) {
      setTeacher(response.data.teachers.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getClasse();
    getTeacher();
  }, []);
  const handleChangeSubject = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const update_FUNCTION = async (e) => {
    e.preventDefault();

    try {
      setNotification(null);
      setLoading(true);
      if (modal.toUpdateOrDelete === "User") {
        const response = await updateUserCredentials(
          localStorage.getItem("token"),
          userCredentialsForm
        );
        setLoading(false);

        response.status === 200
          ? response.data.message
            ? (setNotification({
                type: "success",
                message: response.data.message,
              }),
              setTimeout(() => {
                setModal({ type: "" });
              }, 3000),
              (modal.data.user.email = userCredentialsForm.email))
            : setNotification({ type: "error", message: errors.tryAgain })
          : setNotification({ type: "error", message: errors.notFound });
      } else if (modal.toUpdateOrDelete === "Subject") {
        const response = await UpdateSubject(
          localStorage.getItem("token"),
          subjectData
        );
        setLoading(false);
        response.status === 200
          ? response.data.message
            ? (setNotification({
                type: "success",
                message: response.data.message,
              }),
              setTimeout(() => {
                setModal({ type: "" });
              }, 3000))
            : setNotification({ type: "error", message: errors.tryAgain })
          : setNotification({ type: "error", message: errors.notFound });
      }
    } catch (error) {
      setLoading(false);
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({ type: "error", message: errors.tryAgain });
    }
  };

  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Update {modal.toUpdateOrDelete} Credentials
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to update {modal.toUpdateOrDelete} DATA
          </p>
        </div>
        <form className="mt-6" onSubmit={update_FUNCTION}>
          {modal.toUpdateOrDelete === "User" && (
            <>
              <Label text={"Email"} />
              <Input
                type="text"
                name={"email"}
                value={userCredentialsForm.email}
                onChange={handleChangeUserCredentials}
                placholder={modal.data.user.email}
                border="black"
                text="black"
              />
              <Label text={"Password"} />
              <Input
                type="password"
                name={"password"}
                value={userCredentialsForm.password}
                onChange={handleChangeUserCredentials}
                placholder="*********"
                border="black"
                text="black"
              />
            </>
          )}
          {modal.toUpdateOrDelete === "Subject" && (
            <>
              <Label text={"Subject name"} />
              <Input
                type="text"
                name="subject_name"
                onChange={handleChangeSubject}
                placholder={subjectData.subjectName}
                border="black"
                text="black"
              />

              <Label text={`Teacher (${subjectData.teacherName})`} />
              <br></br>
              <Select
                width={"100%"}
                bg={"white"}
                border={"black"}
                title={"change classe"}
                options={teacher}
                value={selectedTeacher}
                onchange={(e) => {
                  setSelectedTeacher(e.target.value);
                  handleChangeSubject({
                    target: { name: "teacherId", value: e.target.value },
                  });
                }}
                ky={"full_name"}
                valueToSelect="id"
              />

              <br></br>
              <Label text={`Class (${subjectData.className})`} />
              <br></br>
              <Select
                width={"100%"}
                bg={"white"}
                border={"black"}
                title={"Select Class"}
                options={classes}
                value={selectedClass}
                onchange={(e) => {
                  setSelectedClass(e.target.value);
                  handleChangeSubject({
                    target: { name: "classId", value: e.target.value },
                  });
                }}
                ky={"class_name"}
                valueToSelect="id"
              />
            </>
          )}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setModal({ type: "" })}
              bg="bg-gray-200"
              color="text-gray-900"
            />
            <Button
              type="submit"
              text="Save"
              loading={loading}
              bg="bg-blue-600"
            />
          </div>
        </form>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
      </div>
    </div>
  );
};
