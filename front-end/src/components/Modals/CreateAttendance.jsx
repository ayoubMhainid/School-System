import React, { useEffect, useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { addAttendance } from "../../services/attendanceServices";
import { useAppContext } from "../../context/AppContext";
import { Notification } from "../UI/Notification";

const CreateAttendance = ({ onSubmit, student }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [attendance, setAttendance] = useState({
    user_id: student?.id || "",
    time: "",
    status: "absent",
  });

  const { user } = useAppContext();

  useEffect(() => {
    setAttendance((prev) => ({ ...prev, user_id: student?.id || "" }));
  }, [student]);

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const CreateAttendance_FUNCTION = async (data) => {
    setLoading(true);
    setNotification(null)
    try {
      const response = await addAttendance(localStorage.getItem("token"), data);
      console.log("Response from API:", response.data.attendance);
      if (response.status === 200) {
        alert("Attendance created successfully");
        onSubmit(response.data.attendance);
        setAttendance(response.data.attendance);
        setNotification({ type: "success", message: response.data.message });
      }
    } catch (error) {
      console.error("Error creating attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!attendance.time) {
      alert("Please select a time.");
      return;
    }

    CreateAttendance_FUNCTION(attendance);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
        <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
          <div className="text-center"></div>
          <h2 className="text-xl font-semibold mb-4">Create Attendance</h2>

          {/* Read-only User ID */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              User ID
            </label>
            <Input
              type="text"
              name="user_id"
              value={attendance.user_id}
              readOnly
              className="border-gray-400 bg-gray-200 cursor-not-allowed w-full text-black"
            />
          </div>

          {/* Attendance Time */}
          <div className="border-b border-gray-200 mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Time
            </label>
            <select
              name="time"
              value={attendance.time}
              onChange={handleChange}
              className="w-full bg-black text-white"
            >
              <option value="">Select time</option>
              <option value="8:00-10:00">8:00-10:00</option>
              <option value="10:00-12:00">10:00-12:00</option>
              <option value="14:00-16:00">14:00-16:00</option>
              <option value="16:00-18:00">16:00-18:00</option>
              <option value="8:00-12:00">8:00-12:00</option>
              <option value="14:00-18:00">14:00-18:00</option>
            </select>
          </div>

          {/* Attendance Status */}
          <>
            <label className="block text-gray-600 text-sm font-medium">
              Status
            </label>
            <select
              name="status"
              value={attendance.status}
              onChange={handleChange}
              className="w-full bg-black text-white"
            >
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => onSubmit(null)}
              bg="bg-blue-600"
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
