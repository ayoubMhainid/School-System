import React, { useState } from "react";
import { checkUserLogin } from "../../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Button } from "../../components/UI/Button";
import { Notification } from "../../components/UI/Notification";
import { useAppContext } from "../../context/AppContext";

export const Login = () => {
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();

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

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      response.data.role == "admin"
        ? navigate("/admin/dashboard")
        : navigate("/home");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      } else {
        setNotification({ type: "error", message: "try later agin" });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="bg-dark border border-gray-300 rounded-md shadow-2xl flex flex-col justify-evenly w-[85%] h-[75%] sm:w-[500px] sm:h-[400px] p-3 sm:p-6">
          <div>
            <h1 className="text-4xl">Sign in</h1>
            <h4>Ask admin to create an account for you</h4>
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
