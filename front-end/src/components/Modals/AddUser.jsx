import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { getClasses } from "../../services/classServices";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { createStudent } from "../../services/studentServices";
import { Notification } from "../UI/Notification";
import { createTeacher } from "../../services/teacherServices";
import { createAdmin } from "../../services/adminServices";

export const AddUser = ({ setOpen, userRole }) => {
  const [dataUser, setDataUser] = useState({});
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const { user } = useAppContext();

  const _student = "student";
  const _teacher = "teacher";
  const _admin = "admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);
    try {
      let response;
      switch (userRole) {
        case _student:
          response = await createStudent(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          break;

        case _teacher:
          response = await createTeacher(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          console.log(response);
          break;

        case _admin:
          response = await createAdmin(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          console.log(response);
          break;

        default:
          setNotification({ type: "error", message: "Unauthorized" });
          break;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({ type: "error", message: "try later again" });
    }
  };

  useEffect(() => {
    const viewclasses = async () => {
      try {
        setNotification(null);
        const response = await getClasses(user.token);
        setClassList(response.data.classes);
      } catch (error) {
        error.response
          ? setNotification({ type: "error", message: error.response.message })
          : setNotification({ type: "error", message: "try later again" });
      }
    };
    user.token && userRole === _student && viewclasses();
  }, [user.token]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
          <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {`Create ${
                  userRole === _student
                    ? "student"
                    : userRole === _teacher
                    ? "teacher"
                    : "admin"
                }`}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {`Fill this inputs to create ${
                  userRole === _student
                    ? "student"
                    : userRole === _teacher
                    ? "teacher"
                    : "admin"
                }`}
              </p>
            </div>

            <Label text={"fullname"} />
            <Input
              type="text"
              name="full_name"
              value={dataUser.full_name}
              onChange={handleChange}
              placholder="fullname"
              border="black"
              text="black"
            />

            {userRole === _student && (
              <>
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
                      value="female"
                      onChange={handleChange}
                      border="black"
                      text="black"
                    />
                  </div>
                </div>
                <Label text={"date de naissance"} />
                <Input
                  type="date"
                  name="date_of_birth"
                  value={dataUser.date_of_birth}
                  onChange={handleChange}
                  placholder="date of birth"
                  border="black"
                  text="black"
                />
              </>
            )}

            <Label text={"phone"} />
            <Input
              type="number"
              name="phone"
              value={dataUser.phone}
              onChange={handleChange}
              placholder="phone"
              border="black"
              text="black"
            />

            {userRole === _teacher && (
              <>
                <Label text={"specialization"} />
                <Input
                  type="text"
                  name="specialization"
                  value={dataUser.specialization}
                  onChange={handleChange}
                  placholder="specialization"
                  border="black"
                  text="black"
                />
              </>
            )}

            {userRole !== _admin && (
              <>
                <Label text={"address"} />
                <Input
                  type="text"
                  name="address"
                  value={dataUser.address}
                  onChange={handleChange}
                  placholder="your address"
                  border="black"
                  text="black"
                />
              </>
            )}

            <Label text={"Email"} />
            <Input
              type="text"
              name="email"
              value={dataUser.email}
              onChange={handleChange}
              placholder="ex: bijo@gmail.com"
              border="black"
              text="black"
            />
            <Label text={"Password"} />
            <Input
              type="password"
              name="password"
              value={dataUser.password}
              onChange={handleChange}
              placholder="●●●●●●●●"
              border="black"
              text="black"
            />

            {userRole === _student && (
              <>
                <Label text="classes" />

                <select
                  className={
                    "border border-gray-600  text-black px-3 py-1 text-md bg-inherit rounded-sm outline-none w-[100%]"
                  }
                  name="class_id"
                  value={dataUser.class_id}
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
              </>
            )}

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
                text="create student"
                loading={loading}
                bg="bg-blue-600"
                color="white"
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
    </>
  );
};
