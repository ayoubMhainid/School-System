import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getAuthenticatedUserData } from "../services/userServices";
import { errors } from "../constants/Errors";
import { LinearProgress } from "@mui/material";
import { Input } from "../components/UI/Input";
import { Label } from "../components/UI/Label";
import { getClasses } from "../services/classServices";
import { Select } from "../components/UI/Select";
import { Button } from "../components/UI/Button";
import { Notification } from "../components/UI/Notification";
import { updateStudentData } from "../services/studentServices";
import { updateTeacherData } from "../services/teacherServices";
import { updateAdminData } from "../services/adminServices";

export const Profile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { isMenuOpen } = useAppContext();
  const [userRole, setUserRole] = useState("");
  const [userData, setUserData] = useState(null);
  const [classes, setClasses] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialeFormData, setInitialFormData] = useState({});
  const [notification, setNotification] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getAuthenticatedUserData_FUNCTION = async () => {
    setLoading(true);
    var response = await getAuthenticatedUserData(
      localStorage.getItem("token")
    );
    setLoading(false);
    if (response.status === 200) {
      setUserRole(response.data.role);
      setUserData(response.data.userData);
      const newFormData = {
        ...response.data.userData,
        email: response.data.userData.user.email,
      };

      setFormData(newFormData);
      setInitialFormData(newFormData);
    } else {
      setErrorMessage(errors.tryAgain);
    }
    return response.data.userRole;
  };

  const getClasses_FUNCTION = async () => {
    let response = await getClasses(localStorage.getItem("token"));
    response.data.classes
      ? setClasses(response.data.classes)
      : setErrorMessage(errors.tryAgain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    try {
      setUpdateLoading(true);
      switch (userRole) {
        case "student":
          const response = await updateStudentData(
            localStorage.getItem("token"),
            formData
          );
          setUpdateLoading(false);
          response.status === 200
            ? setNotification({
                type: "success",
                message: response.data.message,
              })
            : setNotification({ type: "error", message: errors.notFound });
          break;
        case "teacher":
          const response2 = await updateTeacherData(
            localStorage.getItem("token"),
            formData
          );
          setUpdateLoading(false);
          response2.status === 200
            ? setNotification({
                type: "success",
                message: response2.data.message,
              })
            : setNotification({ type: "error", message: errors.notFound });
          break;
        case "admin":
          const response3 = await updateAdminData(
            localStorage.getItem("token"),
            formData
          );
          setUpdateLoading(false);
          response3.status === 200
            ? setNotification({
                type: "success",
                message: response3.data.message,
              })
            : setNotification({ type: "error", message: errors.notFound });
          break;
      }
    } catch (error) {
      if (error.response) {
        setUpdateLoading(false);
        error.response.data.message
          ? setNotification({
              type: "error",
              message: error.response.data.message,
            })
          : setNotification({ type: "error", message: errors.tryAgain });
      }
    }
  };

  useEffect(() => {
    getAuthenticatedUserData_FUNCTION();
    getAuthenticatedUserData() && getClasses_FUNCTION();
  }, []);
  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 md:w-[98%]">
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="mt-4 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
          {loading && <LinearProgress />}
          {!loading && userData ? (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-4">
                <div>
                  <img
                    src={userData.profile_picture}
                    className="w-20 h-20 rounded-full"
                    alt="Profile"
                  />
                </div>
                <div className="flex justify-start flex-col">
                  <span className="text-2xl font-semibold">
                    {userData.full_name}
                  </span>
                  <span className="text-gray-400">{userData.phone}</span>
                  <span className="text-blue-400">{userData.username}</span>
                </div>
              </div>
              <br></br>
              <hr></hr>
              <div className="mt-4">
                <table className="w-[100%]">
                  <tr>
                    <td className="px-3 py-2">
                      <Label text={"Full name"} />
                    </td>
                    <td className="px-3 py-2">
                      <Label text={"Phone"} />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <Input
                        type={"text"}
                        value={formData.full_name}
                        name={"full_name"}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="px-3">
                      <Input
                        type={"text"}
                        value={formData.phone}
                        onChange={handleChange}
                        name={"phone"}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2">
                      <Label text={"Username"} />
                    </td>
                    <td className="px-3 py-2">
                      <Label text={"Email"} />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <Input
                        type={"text"}
                        value={formData.username}
                        name={"username"}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="px-3">
                      <Input
                        type={"text"}
                        value={formData.email}
                        name={"email"}
                        onChange={handleChange}
                        readOnly={true}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2">
                      <Label text={"Secret Key"} />
                    </td>
                    <td className="px-3 py-2">
                      {(userRole === "teacher" || userRole === "student") && (
                        <Label text={"Adress"} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <Input
                        type={"text"}
                        placholder={"Enter the secret here"}
                        name={"secretKey"}
                        value={formData.secretKey}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="px-3">
                      {(userRole === "teacher" || userRole === "student") && (
                        <Input
                          type={"text"}
                          name={"address"}
                          value={formData.address}
                          onChange={handleChange}
                        />
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2">
                      {userRole === "teacher" && (
                        <Label text={"Specialization"} />
                      )}
                      {userRole === "student" && (
                        <Label text={"Date of birth"} />
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {userRole === "student" && <Label text={"Gender"} />}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-3">
                      {userRole === "teacher" && (
                        <Input
                          type={"text"}
                          name={"specialization"}
                          value={formData.specialization}
                          onChange={handleChange}
                        />
                      )}
                      {userRole === "student" && (
                        <Input
                          type={"date"}
                          name={"date_of_birth"}
                          value={formData.date_of_birth}
                          onChange={handleChange}
                        />
                      )}
                    </td>
                    <td className="px-3">
                      {userRole === "student" && (
                        <div className="flex justify-start items-center gap-10">
                          <div className="flex items-center">
                            <Input
                              type={"radio"}
                              name={"gender"}
                              value={"male"}
                              width={"20%"}
                              checked={formData.gender === "male"}
                              onChange={handleChange}
                            />
                            <Label text={"Male"} />
                          </div>
                          <div className="flex items-center">
                            <Input
                              type={"radio"}
                              name={"gender"}
                              value={"female"}
                              width={"20%"}
                              checked={formData.gender === "female"}
                              onChange={handleChange}
                            />
                            <Label text={"Female"} />
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-3 py-2">
                      {userRole === "student" && (
                        <Label text={`Class (${userData.class.class_name})`} />
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-3">
                      {userRole === "student" && (
                        <Select
                          onchange={handleChange}
                          name={"class_id"}
                          options={classes}
                          ky={"class_name"}
                          valueToSelect={"id"}
                          value={formData.class_id}
                          width={"100%"}
                          bg={"black"}
                          title={"Your class"}
                        />
                      )}
                    </td>
                  </tr>
                </table>
              </div>
              <div className="flex justify-end mt-2 px-3 gap-2">
                <Button
                  text={"Cancel"}
                  width={"20%"}
                  bg={"bg-gray-700"}
                  type={"reset"}
                  onClick={() => setFormData(initialeFormData)}
                />
                <Button
                  text={"Save"}
                  loading={updateLoading}
                  type={"submit"}
                  width={"20%"}
                  bg={"bg-green-700"}
                />
              </div>
            </form>
          ) : null}
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
        </div>
      </div>
    )
  );
};
