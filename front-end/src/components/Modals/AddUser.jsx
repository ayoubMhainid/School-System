import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { getClasses } from "../../services/classServices";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { createStudent } from "../../services/studentServices";

export const AddUser = ({ setOpenAjoute, data }) => {
  const [studentData, setStudentData] = useState({});
  const [classList, setClassList] = useState([]);
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useAppContext();
  // const addUserRole = "student";
  const _student = "student";
  const _teacher = "teacher";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);
    try {
      if (addUserRole === _student) {
        const response = await createStudent(user.token, studentData);
      } else {
        const response = "this else try";
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({ type: "error", message: error.response.message });
      } else {
        setNotification({ type: "error", message: "try later again" });
      }
    }
  };

  useEffect(() => {
    const viewclasses = async () => {
      try {
        setNotification(null);
        const response = await getClasses(user.token);
        setClassList(response.data.classes);
      } catch (error) {
        if (error.response) {
          setNotification({ type: "error", message: error.response.message });
        } else {
          setNotification({ type: "error", message: "try later again" });
        }
      }
    };

    user.token && viewclasses();
  }, [user.token]);

  if (data === _student) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                Create student
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Fill this inputs to create student
              </p>
            </div>

            <Label text={"fullname"} />
            <Input
              type="text"
              name="full_name"
              value={studentData.full_name}
              onChange={handleChange}
              placholder="fullname"
              border="black"
              text="black"
            />

            <div className="flex items-center">
              <div className="w-[30%] flex">
                <Label text={"male"} />
                <Input
                  width={"900px"}
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  border="black"
                  text="black"
                />
              </div>
              <div className="w-[30%] flex">
                <Label text={"female"} />
                <Input
                  width={"900px"}
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  border="black"
                  text="black"
                />
              </div>
            </div>

            <Label text={"phone"} />
            <Input
              type="number"
              name="phone"
              value={studentData.phone}
              onChange={handleChange}
              placholder="phone"
              border="black"
              text="black"
            />

            <Label text={"Email"} />
            <Input
              type="text"
              name="email"
              value={studentData.email}
              onChange={handleChange}
              placholder="ex: bijo@gmail.com"
              border="black"
              text="black"
            />
            <Label text={"Password"} />
            <Input
              type="password"
              name="password"
              value={studentData.password}
              onChange={handleChange}
              placholder="●●●●●●●●"
              border="black"
              text="black"
            />

            <Label text="classes" />
            {/* <label>classe</label> */}
            <select
              className={
                "border border-gray-600  text-black px-3 py-1 text-md bg-inherit rounded-sm outline-none w-[100%]"
              }
              name="class_id"
              value={studentData.class_id}
              onChange={handleChange}
            >
              <option>select class</option>
              {classList &&
                classList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.class_name}
                  </option>
                ))}
            </select>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                text="Cancel"
                onClick={() => setOpenAjoute(false)}
                bg="bg-gray-200"
                color="gray-900"
              />
              <Button
                type="submit"
                text="create student"
                loading={loading}
                bg="bg-blue-600"
                color="white"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
  if (data === _teacher) {
    return (
      <div className="bg-green-400 text-white">teacher teacher teacher</div>
    );
  }
};
