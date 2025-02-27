import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Layout } from "./layouts/Layout";
import { Dashboard } from "./pages/admin/Dashboard";
import { ManageStudents } from "./pages/admin/ManageStudents";
import { ManageTeam } from "./pages/admin/ManageTeam";
import { PersisLogin } from "./pages/auth/PersisLogin";
import { ManageSubjects } from "./pages/admin/MannageSubjects";
import Profile from "./pages/admin/Profile";
import { ManageClasses } from "./pages/admin/ManageClasses";
import { ManageTeacher } from "./pages/admin/ManageTeacher";
import { ManageAnnouncement } from "./pages/admin/ManageAnnouncement";
import { ManageEvents } from "./pages/admin/ManageEvents";
import { Notifications } from "./shared/Notifications";
import { ManageClasse } from "./pages/teacher/ManageClasse";
import { ManageSubject } from "./pages/teacher/ManageSubject";
import { Event } from "./shared/Event";
import { Profile as ProfilePage } from "./shared/Profile";
import { ManageAttendance } from "./pages/teacher/ManageAttendance";
import { Announcements } from "./shared/Announcements";
import { ManageExam } from "./pages/teacher/ManageExam";
import { SecretKeys } from "./pages/admin/SecretKeys";
import { Teachers } from "./pages/student/Teachers";
import { Admins } from "./shared/Admins";
import { ManageAttendances } from "./pages/admin/ManageAttendances";
import { Home } from "./pages/student/Home";
import { Home as HomeTeacher } from "./pages/teacher/Home";
import { GradeStudents } from "./pages/teacher/GradeStudents";
import { Exams } from "./pages/student/Exams";

function App() {
  return (
    <Routes>
      <Route path="/sign_in" element={<Login />} />

      <Route element={<PersisLogin />}>
        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/Subjects" element={<ManageSubjects />} />
          <Route path="/admin/teachers" element={<ManageTeacher />} />
          <Route path="/admin/team" element={<ManageTeam />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/admin/classes" element={<ManageClasses />} />
          <Route path="/admin/announcement" element={<ManageAnnouncement />} />
          <Route path="/admin/attencances" element={<ManageAttendances />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/user/notifications" element={<Notifications />} />
          <Route path="/teacher/classes" element={<ManageClasse />} />
          <Route path="/teacher/subjects" element={<ManageSubject />} />
          <Route path="/teacher/exams" element={<ManageExam />} />
          <Route path="/teacher/attendance" element={<ManageAttendance />} />
          <Route path="/user/events" element={<Event />} />
          <Route path="/user/announcements" element={<Announcements />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/admin/keys" element={<SecretKeys />} />
          <Route path="/student/teachers" element={<Teachers />} />
          <Route path="/user/admins" element={<Admins />} />

          <Route path="/student/home" element={<Home />} />
          <Route path="/teacher/home" element={<HomeTeacher />} />
          <Route path="/teacher/grades" element={<GradeStudents />} />
          
          <Route path="/student/exams" element={<Exams /> } />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
