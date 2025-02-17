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
import { Select } from "../UI/Select";
<<<<<<< HEAD
import { AddSubjects, getallSubject, getSubjects } from "../../services/subjectServices";
=======
import { createAnnouncement } from "../../services/announcementServices";
>>>>>>> 7daee80 (ManageAnnouncement and modification in AnnoncementController)

export const Add = ({ setOpen, toAdd }) => {
  const [dataUser, setDataUser] = useState({});
  const [dataSubject, setDataSubject] = useState({});
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const [newSubject, setNewSubject] = useState({
    teacher_id: "",
    class_id: "",
    name: ""
  });
  
  const [subject, setSubject] = useState([]);
  
  
  const { user } = useAppContext();

  const _student = "student";
  const _teacher = "teacher";
  const _admin = "admin";
  const _subject = "subject";
  const _announcement = "announcement";

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

  console.log(dataUser);
  
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
          console.log(response);
          break;

        case _admin:
          response = await createAdmin(user.token, dataUser);
          setNotification({ type: "success", message: response.data.message });
          console.log(response);
          break;
          case _subject:
            response = await AddSubjects(user.token, newSubject);
            setNotification({ type: "success", message: response.data.message });
            console.log(response);
            break;

        case _announcement:
          response = await createAnnouncement(user.token, dataUser);
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

<<<<<<< HEAD
            {toAdd !== _subject && (
              <>
                <Label text={"Fullname"} />
=======
            {toAdd !== _subject || toAdd !== _announcement && (
              <>
                <Label text={"fullname"} />
>>>>>>> 7daee80 (ManageAnnouncement and modification in AnnoncementController)
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

<<<<<<< HEAD
            {toAdd !== _subject && (
              <>
                <Label text={"Phone"} />
=======
            {toAdd !== _subject || toAdd !== _announcement && (
              <>
                <Label text={"phone"} />
>>>>>>> 7daee80 (ManageAnnouncement and modification in AnnoncementController)
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
<<<<<<< HEAD
                  name="name"
                  value={dataSubject.name}
                  onChange={handleChangeSubject}
=======
                  name="subject_name"
                  value={dataUser.address}
                  onChange={handleChange}
>>>>>>> 7daee80 (ManageAnnouncement and modification in AnnoncementController)
                  placholder="Ex: CLOUD-NATIVE"
                  border="black"
                  text="black"
                />

                <Label text={"Teacher"} />
                <br></br>
<<<<<<< HEAD
                <select className="w-[100%] border border-black py-1" name="teacher_id"  onChange={handleChangeSubject}>
                    <option>select teacher</option>
                  {
                    subject.map((s)=>{
                      return <option value={s.teacher.id}>{s.teacher.full_name}</option>
                    })
                  }
                </select>
                <br></br>
                <Label text={"Class"} />
                <br></br>
                <select className="w-[100%] border border-black py-1" name="class_id"  onChange={handleChangeSubject}>
                  <option>select class</option>
                  {
                    subject.map((s)=>{
                      return <option value={s.class.id}>{s.class.class_name}</option>
                    })
                  }
                </select>

=======
                <Select
                  title={"Select teacher"}
                  bg={"bg-white"}
                  width={"100%"}
                  border={"border-black"}
                />
                <br></br>
                <Label text={"Class"} />
                <br></br>
                <Select
                  title={"Select Class"}
                  bg={"bg-white"}
                  width={"100%"}
                  border={"border-black"}
                />
>>>>>>> 7daee80 (ManageAnnouncement and modification in AnnoncementController)
              </>
            )}

            {toAdd !== _admin && toAdd !== _subject || toAdd !== _announcement && (
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

<<<<<<< HEAD
            {toAdd !== _subject && (
=======
            {toAdd !== _subject || toAdd !== _announcement && (
>>>>>>> 7daee80 (ManageAnnouncement and modification in AnnoncementController)
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

           

            {toAdd === _announcement && (
              <>
                <Input
                  name="title"
                  type="text"
                  placholder="Title"
                  value={dataUser.title}
                  onChange={handleChange}
                  border="black"
                  text="black"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={dataUser.message}
                  onChange={handleChange}
                  className="border pr-2"
                /><br></br>
                <select
                  className={
                    "border border-gray-600  text-black px-3 py-1 text-md bg-inherit rounded-sm outline-none w-[100%]"
                  }
                  name="receiver"
                  value={dataUser.receiver}
                  onChange={handleChange}
                >
                  <option value="students">Students</option>
                  <option value="teachers">Teachers</option>
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
