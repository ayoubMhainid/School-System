import React, { useState } from "react";
import { checkUserLogin } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-center items-center ">
        <div>
          <input
            name="email"
            value={formData.email}
            onChange={handleCahnge}
            type="email"
            placeholder="email"
            style={{ display: "block" }}
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleCahnge}
            type="password"
            placeholder="password"
            style={{ display: "block" }}
          />
          <button
            type="submit"
            className="bg-red-400 hover:bg-red-300 cursor-pointer"
          >
            login
          </button>
        </div>
      </div>
    </form>
  );
};
