import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

export const AddUser = () => {
  const [studentData, setStudentData] = useState({});

  const { addUserRole } = useAppContext();
  const _student = "student";
  const _teacher = "teacher";

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setStudentData({ ...studentData, [name]: value ? value : checked });
  };

  if (addUserRole === _student) {
    return (
      <from>
        <div className="bg-red-400 text-white">
          <label>fullName</label>
          <input
            type="text"
            name="full_name"
            value={studentData.full_name}
            onChange={handleChange}
          />
          <br />

          <label>gender</label>
          <input
            type="radio"
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
          />
          <br />

          <label>phone</label>
          <input
            type="tel"
            name="phone"
            value={studentData.phone}
            onChange={handleChange}
          />
          <br />

          <label>email</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
          />
          <br />

          <label>password</label>
          <input
            type="password"
            name="password"
            value={studentData.password}
            onChange={handleChange}
          />
          <br />

          <label>classe</label>
          <select
            name="class_id"
            value={studentData.class_id}
            onChange={handleChange}
          >
            <option value="1">ID202</option>
            <option value="2">DD201</option>
            <option value="3">GC203</option>
          </select>
        </div>
      </from>
    );
  }
  if (addUserRole === _teacher) {
    return (
      <div className="bg-green-400 text-white">teacher teacher teacher</div>
    );
  }
};
