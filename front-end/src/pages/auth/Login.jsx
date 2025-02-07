import React, { useState } from "react";
import { checkUserLogin } from "../../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Button } from "../../components/UI/Button";
import { Notification } from "../../components/UI/Notification";

export const Login = () => {
  const [notification, setNotification] = useState({});
  // const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleCahnge = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);
    try {
      const response = await checkUserLogin(formData);
      setLoading(false);
      if (response.status === 200) {
        if (response.data.role == "admin") {
          localStorage.setItem("token", response.data.token);
          navigate("/admin/dashboard");
        } else if (response.data.role == "teacher") {
          localStorage.setItem("token", response.data.token);
          navigate("/teacher/home");
        } else {
          localStorage.setItem("token", response.data.token);
          navigate("/student/home");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(response);
        setNotification({ type: "error", message: error.response });
      } else {
        setNotification({ type: "error", message: "try later agin" });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="bg-white border border-gray-300 rounded-md shadow-2xl flex flex-col justify-evenly w-[85%] h-[75%] sm:w-[500px] sm:h-[400px] p-3 sm:p-6">
          <div>
            <h1 className="text-4xl">Sign in</h1>
            <h4>
              D'ont have an account ?
              <Link to={"/register"} className="text-blue-500 underline">
                Sign up
              </Link>
            </h4>
          </div>
          <div>
            <Label text={"Email"} />
            <Input
              style="block"
              type={"email"}
              name={"email"}
              placholder={"ex:john00.0@exemple.com"}
              value={formData.email}
              onChange={handleCahnge}
            />
          </div>
          <div>
            <Label text={"Password"} />
            <Input
              style="block"
              type={"password"}
              name={"password"}
              placholder={"********"}
              value={formData.password}
              onChange={handleCahnge}
            />
            <Link
              className="float-end text-blue-500 underline"
              to={"/forgotPassword"}
            >
              Forgot Password?
            </Link>
          </div>
          <Button type={"submit"} text={"Sign in"} loading={loading} />
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
