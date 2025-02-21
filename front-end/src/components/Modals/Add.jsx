import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { createClasse, getClasses } from "../../services/classServices";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { createStudent } from "../../services/studentServices";
import { Notification } from "../UI/Notification";
import { createTeacher } from "../../services/teacherServices";
import { createAdmin } from "../../services/adminServices";
import { Select } from "../UI/Select";
import { AddSubjects, getallSubject, getSubjects } from "../../services/subjectServices";
import { createNotification } from "../../services/notificationServices";
import { createAnnouncement } from "../../services/announcementServices";

export const Add = ({ setOpen, toAdd }) => {
  const [dataUser, setDataUser] = useState({});
  const [dataSubject, setDataSubject] = useState({});
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const [newSubject, setNewSubject] = useState({
    teacher_id: "",
    class_id: "",
    name: "",
  });

  const [subject, setSubject] = useState([]);

  const { user } = useAppContext();

  const _student = "student";
  const _teacher = "teacher";
  const _admin = "admin";
  const _subject = "subject";
  const _announcement = "announcement";
  const _classe = "classe";
  const _notification = "notification";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeSubject = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };
  const getSubject = async () => {
    const response = await getallSubject(localStorage.getItem("token"));
    if (response.data) {
      setSubject(response.data.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);
    try {
      let response;
      switch (toAdd) {
        case _student:
          response = await createStudent(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          break;

        case _teacher:
          response = await createTeacher(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          break;
        
        case _admin:
          response = await createAdmin(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          break;
      
        case _subject:
          response = await AddSubjects(user.token, newSubject);
          setNotification({ type: "success", message: response.data.message });
          break;
        
        case _classe:
          response = await createClasse(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          break;
        
        case _announcement:
          response = await createAnnouncement(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          break;

        case _notification :
          response = await createNotification(user.token,dataUser)
          setNotification({ type: "success", message: response.data.message });
          break;
        
        default:
          setNotification({ type: "error", message: "Unauthorized" });
          break;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    user.token && toAdd === _student && viewclasses();
  }, [user.token]);
  useEffect(() => {
    getSubject();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
          <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {`Add ${toAdd}`}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {`Fill this inputs to add new ${toAdd}`}
              </p>
            </div>

            {(toAdd === _admin || toAdd === _teacher || toAdd === _student) &&(
              <>
                <Label text={"Fullname"} />
                <Input
                  type="text"
                  name="full_name"
                  value={dataUser.full_name}
                  onChange={handleChange}
                  placholder="Ex: Joen doe"
                  border="black"
                  text="black"
                />
              </>
            )}

            {toAdd === _student && (
              <>
                <div className="flex items-center">
                  <div className="w-[30%] flex">
                    <Label text={"Male"} />
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
                    <Label text={"Female"} />
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
                <Label text={"Date de naissance"} />
                <Input
                  type="date"
                  name="date_of_birth"
                  value={dataUser.date_of_birth}
                  onChange={handleChange}
                  border="black"
                  text="black"
                />
              </>
            )}

            {(toAdd === _admin || toAdd === _teacher || toAdd === _student) && (
              <>
                <Label text={"Phone"} />
                <Input
                  type="number"
                  name="phone"
                  value={dataUser.phone}
                  onChange={handleChange}
                  placholder="Ex: 0659520000"
                  border="black"
                  text="black"
                />
              </>
            )}

            {toAdd === _teacher && (
              <>
                <Label text={"Specialization"} />
                <Input
                  type="text"
                  name="specialization"
                  value={dataUser.specialization}
                  onChange={handleChange}
                  placholder="Ex: IT"
                  border="black"
                  text="black"
                />
              </>
            )}

            {toAdd === _subject && (
              <>
                <Label text={"Subject name"} />
                <Input
                  type="text"
                  name="name"
                  value={dataSubject.name}
                  onChange={handleChangeSubject}
                  placholder="Ex: CLOUD-NATIVE"
                  border="black"
                  text="black"
                />

                <Label text={"Teacher"} />
                <br></br>
                <select
                  className="w-[100%] border border-black py-1"
                  name="teacher_id"
                  onChange={handleChangeSubject}
                >
                  <option>select teacher</option>
                  {subject.map((s) => {
                    return (
                      <option value={s.teacher.id}>
                        {s.teacher.full_name}
                      </option>
                    );
                  })}
                </select>
                <br></br>
                <Label text={"Class"} />
                <br></br>
                <select
                  className="w-[100%] border border-black py-1"
                  name="class_id"
                  onChange={handleChangeSubject}
                >
                  <option>select class</option>
                  {subject.map((s) => {
                    return (
                      <option value={s.class.id}>{s.class.class_name}</option>
                    );
                  })}
                </select>
              </>
            )}

            {(toAdd === _admin || toAdd === _teacher || toAdd === _student) &&(
              <>
                <Label text={"Address"} />
                <Input
                  type="text"
                  name="address"
                  value={dataUser.address}
                  onChange={handleChange}
                  placholder="Ex: 213 Lot HAMA officiel, tiznit"
                  border="black"
                  text="black"
                />
              </>
            )}

            {(toAdd === _admin || toAdd === _teacher || toAdd === _student) && (
              <>
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
                  placholder="********"
                  border="black"
                  text="black"
                />
              </>
            )}


            {(toAdd === _notification) && (
              <>
                <Label text={"Receiver id"} />
                <Input
                  type="number"
                  name="receiver_id"
                  value={dataUser.receiver_id}
                  onChange={handleChange}
                  placholder="Enter a valid user id"
                  border="black"
                  text="black"
                />
                <Label text={"Message"} /><br></br>
                <textarea name="content" 
                required
                placeholder="Max chars: 300" onChange={handleChange}
                className="border border-black px-3 py-1 rounded-sm w-[100%] resize-none outline-none h-32"></textarea>
              </>
            )}    

            {toAdd === _student && (
              <>
                <Label text="Classes" />

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
            {toAdd === _classe && (
              <>
                <Label text="Class Name" />
                <Input
                  type="text"
                  name="class_name"
                  onChange={handleChange}
                  placholder="classe name"
                  border="black"
                  text="black"
                />

                <Label text="section" />
                <Input
                  type="text"
                  name="section"
                  onChange={handleChange}
                  placholder="section"
                  border="black"
                  text="black"
                />

                <Label text="Teacher id" />
                <Input
                  type="text"
                  name="teacher_id"
                  onChange={handleChange}
                  placholder="teacher id"
                  border="black"
                  text="black"
                />
              </>
            )}

            {toAdd === _announcement && (
              <>
                <Label text="Title" />
                <Input
                  type="text"
                  name="title"
                  value={dataUser.title}
                  onChange={handleChange}
                  placholder="title"
                  border="black"
                  text="black"
                />
                <Label text="Receiver" />
                <select
                  className={
                    "border border-gray-600  text-black px-3 py-1 text-md bg-inherit rounded-sm outline-none w-[100%]"
                  }
                  name="receiver"
                  value={dataUser.receiver}
                  onChange={handleChange}
                >
                  <option value="students">students</option>
                  <option value="teachers">teachers</option>
                </select>
                <Label text="Message" /> <br></br>
                <textarea
                  className={
                    "border border-gray-600 resize-none outline-none text-black px-3 py-1 text-md bg-inherit rounded-sm outline-none w-[100%]"
                  }
                  name="message"
                  value={dataUser.message}
                  onChange={handleChange}
                  placeholder="Message"
                ></textarea>
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
                text={`Create ${toAdd}`}
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
    </>
  );
};
