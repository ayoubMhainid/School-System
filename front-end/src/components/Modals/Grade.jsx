import React, { useEffect, useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
// import { addAttendance } from "../../services/attendanceServices";
// import { useAppContext } from "../../context/AppContext";
import { Notification } from "../UI/Notification";
import { Label } from "../UI/Label";
import { addMark, getMark } from "../../services/markServices";
import { LinearProgress } from "@mui/material";
import { errors } from "../../constants/Errors";

const Grade = ({ modal, setModal, selectedExam }) => {
  const [loading, setLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(true);
  const [notification, setNotification] = useState({});
  const [mark, setMark] = useState({
    examId: selectedExam.id,
    studentId: modal.data.id,
    mark: "",
    remark: "",
  });
  console.log(modal);
  console.log(mark.examId);

  const handleChange = (e) => {
    setMark({ ...mark, [e.target.name]: e.target.value });
  };

  const getMark_FUNCTION = async () => {
    try {
      const response = await getMark(
        localStorage.getItem("token"),
        mark.studentId,
        mark.examId
      );
      console.log(response);

      setMarkLoading(false);
      response.status === 200 ? setMark(response.data.mark) : null;
    } catch (error) {
      setMarkLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    setNotification(null);
    try {
      const response = await addMark(localStorage.getItem("token"), mark);
      response.status === 200
        ? setNotification({ type: "success", message: response.data.message })
        : null;
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      } else {
        setNotification({ type: "error", message: errors.tryAgain });
      }
    }
  };

  useEffect(() => {
    getMark_FUNCTION();
  }, []);

  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center"></div>
        <h2 className="text-xl font-semibold mb-4">
          Add/Update mark to {modal.data.full_name}
        </h2>

        {markLoading && <LinearProgress />}
        {!markLoading && (
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <Label text={"Student id"} />
              <Input
                type="number"
                name="studentId"
                value={mark.studentId}
                readOnly
                text={"black"}
              />
            </div>

            <div className="mb-2">
              <Label text={"Mark"} />
              <Input
                type="number"
                name="mark"
                placholder={"Between 0-20"}
                value={mark.mark}
                onChange={handleChange}
                text={"black"}
              />
            </div>

            <div className="mb-2">
              <Label text={"Remark"} />
              <textarea
                name="remark"
                onChange={handleChange}
                value={mark.remark}
                placeholder="Ex: good job"
                maxLength="255"
                className="border border-gray-600 text-black resize-none px-3 py-1 text-md bg-inherit rounded-sm outline-none w-[100%]"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                text="Cancel"
                onClick={() => setModal({ type: "" })}
                bg="bg-gray-200"
                color="gray-900"
              />
              <Button
                type="submit"
                text={`Add/Update note`}
                loading={loading}
                bg="bg-blue-600"
              />
            </div>
          </form>
        )}
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

export default Grade;
