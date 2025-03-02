import React, { useEffect, useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { addAttendance } from "../../services/attendanceStudServices";
import { useAppContext } from "../../context/AppContext";
import { Notification } from "../UI/Notification";
import { Label } from "../UI/Label";
import { addAttendanceTeacher } from "../../services/attendanceServices";

const CreateAttendance = ({ onSubmit, student, setOpen, role }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [attendance, setAttendance] = useState({
    student_id: student?.id || "",
    class_id: student?.class_id || "",
    time: "",
    date: null,
    status: "absent",
    nbHours: 0,
  });

  const [teacherAttendance, setTeacherAttendance] = useState({
    user_id: student?.user_id,
    status: "absent",
  });

  const _teacher = "teacher";
  const _admin = "admin";

  const { user } = useAppContext();

  const handleChangeTeacher = (e) => {
    const { name, value } = e.target;
    setTeacherAttendance({ ...teacherAttendance, [name]: value });
  };

  useEffect(() => {
    setAttendance((prev) => ({
      ...prev,
      student_id: student?.id || "",
      class_id: student.class_id || "",
    }));
  }, [student]);

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const CreateAttendance_FUNCTION = async (data) => {
    setLoading(true);
    setNotification(null);
    try {
      const response = await addAttendance(localStorage.getItem("token"), data);
      if (response.status === 200) {
        setNotification({ type: "success", message: response.data.message });
        onSubmit(response.data.attendances.data);
        setAttendance(response.data.attendances);
        setNotification({ type: "success", message: response.data.message });
      }
    } catch (error) {
      console.error("Error creating attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAttendanceTeacher_FUNCTION = async () => {
    setNotification(null);
    setLoading(true);
    try {
      const response = await addAttendanceTeacher(
        localStorage.getItem("token"),
        teacherAttendance
      );
      setLoading(false);
      setNotification({ type: "success", message: response.data.message });
    } catch (error) {
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({ type: "error", message: "try later again" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === _teacher) {
      CreateAttendance_FUNCTION(attendance);
    } else if (role === _admin) {
      createAttendanceTeacher_FUNCTION();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
        <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
          <div className="text-center"></div>
          <h2 className="text-xl font-semibold mb-4">Create Attendance</h2>

          <div className="mb-2">
            <Label text={role === _teacher ? "Student id" : "User_id"} />
            <Input
              type="text"
              name={role === _teacher ? "student_id" : "user_id"}
              value={
                role === _teacher
                  ? attendance.student_id
                  : teacherAttendance.user_id
              }
              readOnly
              text={"black"}
            />
          </div>

          {role === _teacher && (
            <div className="mb-2">
              <Label text={"Class id"} />
              <Input
                type="text"
                name="class_id"
                value={attendance.class_id}
                readOnly
                text={"black"}
              />
            </div>
          )}

          <div className="mb-2">
            <Label text={"Date"} />
            <Input
              type="date"
              name="date"
              value={
                role === _teacher ? attendance.date : teacherAttendance.date
              }
              onChange={role === _teacher ? handleChange : handleChangeTeacher}
              text={"black"}
            />
          </div>

          <div className="mb-2">
            <Label text={"Nb hours"} />
            <select
              name="nbHours"
              value={
                role === _teacher
                  ? attendance.nbHours
                  : teacherAttendance.nbHours
              }
              onChange={role === _teacher ? handleChange : handleChangeTeacher}
              className="w-full bg-white text-black px-3 py-1 border border-black rounded-sm"
            >
              <option value="">Select number of hours</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </div>

          <div className="border-b border-gray-200 mb-2">
            <Label text={"Time"} />
            <select
              name="time"
              value={
                role === _teacher ? attendance.time : teacherAttendance.time
              }
              onChange={role === _teacher ? handleChange : handleChangeTeacher}
              className="w-full bg-white text-black px-3 py-1 border border-black rounded-sm"
            >
              <option value="">Select time</option>
              <option value="8:30-10:30">8:30-10:30</option>
              <option value="10:30-12:30">10:30-12:30</option>
              <option value="14:30-16:30">14:30-16:30</option>
              <option value="16:30-18:30">16:30-18:30</option>
              <option value="8:30-12:30">8:30-12:30</option>
              <option value="14:30-18:30">14:30-18:30</option>
              <option value="8:30-18:30">8:30-18:30</option>
            </select>
          </div>

          <>
            <Label text={"Status"} />
            <select
              required
              name="status"
              value={
                role === _teacher ? attendance.status : teacherAttendance.status
              }
              onChange={role === _teacher ? handleChange : handleChangeTeacher}
              className="w-full bg-white text-black px-3 py-1 border border-black rounded-sm"
            >
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpen(false)}
              bg="bg-gray-200"
              color="gray-900"
            />
            <Button
              type="submit"
              text={`Create Attendance`}
              loading={loading}
              bg="bg-blue-600"
            />
          </div>
        </div>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
      </div>
    </form>
  );
};

export default CreateAttendance;
