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
import {
  getClasses,
  getClassesByTeacherAuth,
  updateClass,
} from "../../services/classServices";
import {
  getSubjectsByteacherAndClass,
  UpdateSubject,
} from "../../services/subjectServices";
import { updateExam } from "../../services/examServices";

export const Update = ({ modal, setModal }) => {
  const [teacher, setTeacher] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(
    modal?.data?.teacher_id
  );
  const [selectedClass, setSelectedClass] = useState(modal?.data?.class_id);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [userCredentialsForm, setUserCredentialsForm] = useState({
    id: modal?.data?.user?.id,
    email: "",
    password: "",
  });

  const [classExam, setClassExam] = useState([]);
  const [subjectExam, setSubjectExam] = useState([]);
  const [selectData, setExamData] = useState({
    subjectName: modal?.data?.subject?.name,
    subjectId: modal?.data?.subject?.id,
    className: modal?.data?.class?.class_name,
    classId: modal?.data?.class?.id,
  });
  const [examData, setExamDataUpdate] = useState({
    // id: modal?.data?.id,
    exam_name: modal?.data?.exam_name,
    class_id: modal?.data?.class?.id,
    subject_id: modal?.data?.subject?.id,
    date: modal?.data?.date,
  });

  const [subjectData, setSubjectData] = useState({
    id: modal?.data?.id,
    subjectName: modal?.data?.name,
    teacherName: modal?.data?.teacher?.full_name,
    className: modal?.data?.class?.class_name,
    teacherId: modal?.data?.teacher_id,
    classId: modal?.data?.class_id,
  });

  const [classData, setClassData] = useState({
    class_name: modal?.data?.class_name,
    teacher_id: modal?.data?.teacher_id,
    teacher_name: modal?.data?.teacher?.full_name,
    section: modal?.data?.section,
  });

  const handleChangeUserCredentials = (e) => {
    const { name, value } = e.target;
    setUserCredentialsForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getClasse = async () => {
    const response = await getClasses(localStorage.getItem("token"));
    if (response.data.classes) {
      console.log(response);
      
      setClasses(response.data.classes);
    }
  };
  const getTeacher = async () => {
    const response = await getTeachers(localStorage.getItem("token"));
    if (response.data) {
      setTeacher(response.data.teachers.data);
    }
  };

  useEffect(() => {
    const viewclasses = async () => {
      setNotification(null);
      try {
        const response = await getClassesByTeacherAuth(
          localStorage.getItem("token")
        );
        response.data.classes.length
          ? setClassExam(response.data.classes)
          : setNotification({ type: "error", message: errors.tryAgain });
      } catch (error) {
        error.response
          ? setNotification({ type: "error", message: error.response.message })
          : setNotification({ type: "error", message: "try later again" });
      }
    };
    modal.toUpdateOrDelete === "Exam" && viewclasses();
  }, []);

  useEffect(() => {
    const viewSubjectByTeacher = async () => {
      setNotification(null);
      try {
        const response = await getSubjectsByteacherAndClass(
          localStorage.getItem("token"),
          examData.class_id
        );
        response.data.subjects.length
          ? setSubjectExam(response.data.subjects)
          : setNotification({ type: "error", message: errors.tryAgain });
      } catch (error) {
        error.response
          ? setNotification({ type: "error", message: error.response.message })
          : setNotification({ type: "error", message: "try later again" });
      }
    };

    examData.class_id &&
      examData.class_id !== "change class" &&
      viewSubjectByTeacher();
  }, [examData.class_id]);

  useEffect(() => {
    getClasse();
    getTeacher();
  }, []);

  const handleChangeExam = (e) => {
    const { name, value } = e.target;
    setExamDataUpdate({ ...examData, [name]: value });
  };

  const handleChangeSubject = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeClass = (e) => {
    const { name, value } = e.target;
    setClassData((prevData) => ({
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
      } else if (modal.toUpdateOrDelete === "Classe") {
        const response = await updateClass(
          localStorage.getItem("token"),
          modal.data.id,
          classData
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
      } else if (modal.toUpdateOrDelete === "Exam") {
        const response = await updateExam(
          localStorage.getItem("token"),
          modal.data.id,
          examData
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
      console.log(error.response);
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
          {modal.toUpdateOrDelete === "Exam" && (
            <>
              <Label text="Content exam" />
              <textarea
                name="exam_name"
                value={examData.exam_name}
                onChange={handleChangeExam}
                placeholder={!examData.exam_name && "exam name"}
                maxLength="255"
                className="border border-gray-600 text-black px-3 py-1 text-md bg-inherit rounded-sm outline-none w-[100%]"
              />
              <Label text={"Class"} />
              <select
                className="w-[100%] border border-black py-1"
                name="class_id"
                onChange={handleChangeExam}
              >
                <option value={selectData.className && selectData.classId}>
                  {selectData.className ? selectData.className : "Change class"}
                </option>

                {classExam.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.class_name}
                  </option>
                ))}
              </select>
              <Label text="Subject" />
              <select
                className="w-[100%] border border-black py-1"
                name="subject_id"
                onChange={handleChangeExam}
              >
                <option value={selectData.subjectName && selectData.subjectId}>
                  {selectData.subjectName
                    ? selectData.subjectName
                    : "Change subject"}
                </option>
                {subjectExam.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {/* {errorMessage && (
                <span className="text-red-500 block">{errorMessage}</span>
              )} */}
              <Label text={"Date"} />
              <Input
                type="date"
                name="date"
                value={examData.date}
                onChange={handleChangeExam}
                border="black"
                text="black"
              />
            </>
          )}

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
                name={"subject_name"}
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
          {modal.toUpdateOrDelete === "Classe" && (
            <>
              <Label text={"Classe name"} />
              <Input
                type="text"
                name="class_name"
                onChange={handleChangeClass}
                value={classData.class_name}
                border="black"
                text="black"
              />

              <Label text={`Teacher (${classData.teacher_name})`} />
              <Select
                width={"100%"}
                bg={"white"}
                border={"black"}
                title={"change Teacher"}
                options={teacher}
                value={selectedTeacher}
                onchange={(e) => {
                  handleChangeClass({
                    target: { name: "teacher_id", value: e.target.value },
                  });
                }}
                ky={"full_name"}
                valueToSelect="id"
              />

              <Label text={"Section"} />
              <Input
                type="text"
                name="section"
                onChange={handleChangeClass}
                value={classData.section}
                border="black"
                text="black"
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
