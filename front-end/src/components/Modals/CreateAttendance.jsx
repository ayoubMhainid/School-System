import React, { useEffect, useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { addAttendance } from "../../services/attendanceServices";
import { useAppContext } from "../../context/AppContext";
import { Notification } from "../UI/Notification";
import { Label } from "../UI/Label";

const CreateAttendance = ({ onSubmit, student }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [attendance, setAttendance] = useState({
    user_id: student?.id || "",
    time: "",
    date: null,
    status: "absent",
    nbHours : 0
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
      if (response.status === 200) {
        setNotification({type:"success",message:response.data.message})
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
    CreateAttendance_FUNCTION(attendance);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
        <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
          <div className="text-center"></div>
          <h2 className="text-xl font-semibold mb-4">Create Attendance</h2>

          <div className="mb-2">
            <Label text={'User id'} />
            <Input
              type="text"
              name="user_id"
              value={attendance.user_id}
              readOnly
              text={'black'}
            />
          </div>

          <div className="mb-2">
            <Label text={'Date'} />
            <Input
              type="date"
              name="date"
              value={attendance.date}
              onChange={handleChange}
              text={'black'}
            />
          </div>

          <div className="mb-2">
            <Label text={'Nb hours'} />
            <select
              name="nbHours"
              value={attendance.nbHours}
              onChange={handleChange}
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
            <Label text={'Time'} />
            <select
              name="time"
              value={attendance.time}
              onChange={handleChange}
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
            <Label text={'Status'} />
            <select
              required
              name="status"
              value={attendance.status}
              onChange={handleChange}
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
              onClick={() => onSubmit(null)}
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
