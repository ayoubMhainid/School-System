import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { BarChart, PieChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";
import { State } from "../../components/App/State";
import { AcademicCapIcon, BriefcaseIcon, CalendarDaysIcon, DocumentDuplicateIcon, Square2StackIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { getAdminDashboardData } from "../../services/dashboardServices";
import { errors } from "../../constants/Errors";
import moment from "moment/moment";

export const Dashboard = () => {
  const { isMenuOpen } = useAppContext();
  const [adminName,setAdminName] = useState('');
  const [counts,setCounts] = useState({});
  const [attendances,setAttendances] = useState([]);
  const [studentsAttendances,setStduentsAttendances] = useState([]);
  const [events,setEvents] = useState([]);
  const [exams,setExams] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');
  const months = [];


  attendances?.map((attendance) =>{
    months.push(String(attendance.month) + "-" + String(attendance.year));
  })

  const totalFemaleStudents = counts?.students - counts?.maleStudents;

  const getDashboardData_FUNCTION = async () =>{
    try{
      const response = await getAdminDashboardData(localStorage.getItem('token'))
      console.log(response);
      if(response.status === 200){
        setCounts(response.data.counts)
        setEvents(response.data.upcomingEvents)
        setExams(response.data.upcomingExams)
        setAttendances(response.data.teacherAttendances)
        setStduentsAttendances(response.data.studentAttendances)
        setAdminName(response.data.adminName.full_name)
      }

    }catch(error){
      setErrorMessage(errors.tryAgain)
    }
  }

  useEffect(() =>{
    getDashboardData_FUNCTION()
  },[])

  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div>
          <h1 className="text-xl font-semibold">Welcome, <span className="text-3xl text-blue-500 font-semibold">{adminName ? adminName : "Bijjo"}</span></h1>
        </div>
        <div className="sm:flex block flex-wrap mt-5 justify-between gap-2 px-2">
          <State svg={<AcademicCapIcon className="h-16 w-16" />} text={'Students'} count={counts.students} />
          <State svg={<BriefcaseIcon className="h-16 w-16" />} text={'Teachers'} count={counts.teachers} />
          <State svg={<WrenchScrewdriverIcon className="h-16 w-16" />} text={'Admins'} count={counts.admins} />
          <State svg={<CalendarDaysIcon className="h-16 w-16" />} text={'Events'} count={counts.events} />
          <State svg={<Square2StackIcon className="h-16 w-16" />} text={'Classes'} count={counts.classes} />
          <State svg={<DocumentDuplicateIcon className="h-16 w-16" />} text={'Subjects'} count={counts.subjects} />
        </div>


        <div className="w-[100%] px-2 mt-2 flex gap-2">
            <Box sx={{ textAlign: "center", backgroundColor: "gray", padding: 2, borderRadius: 2 }}>
                  <Typography variant="h6" color="black" gutterBottom>
                    Attendances records
                  </Typography>
                  <BarChart
                      className="bg-black text-white"
                      xAxis={[{ scaleType: 'band', data: months }]}
                      series={
                        attendances && [{data: attendances.map((attendance) =>{
                          return attendance.absent_teachers
                        }),label:"Teachers"},
                        {data: studentsAttendances.map((attendance) =>{
                          return attendance.absent_students
                        }),label:"Students",},
                        ]}
                      width={1050}
                      height={400}
                      title="Attendances records"
                      sx={{ backgroundColor: "white", color:"black", borderRadius: 2, padding: 2 }}
                    />
            </Box>
            <Box sx={{ textAlign: "center", backgroundColor: "white", padding: 2, borderRadius: 2 }}>
                  <Typography variant="h6" color="black" gutterBottom>
                    Total students by gender
                  </Typography>
                  <PieChart
                    className="bg-white text-black"
                    series={[
                      {
                        data: [
                          { id: 0, value: counts?.maleStudents, label: "Male" },
                          { id: 1, value: totalFemaleStudents, label: "Female" },
                        ],
                      },
                    ]}
                    sx={{
                      backgroundColor: "white", // Set background color to black
                      color: "black", // Set text color to white
                    }}
                    width={400}
                    height={400}
                  />
              </Box>
        </div>


        <div className="mt-5">
          <div>
            <h1 className="text-2xl font-semibold">Upcoming Events</h1>
            <div className="mt-2 sm:flex gap-2 flex-wrap px-3">
              {
                events && events.length ?
                  events.map((event) =>{
                    return <div className="bg-gray-900 text-white px-3 py-2 mb-2 sm:mb-1 rounded-md w-[100%] sm:w-[32%] cursor-pointer hover:bg-gray-950 duration-200">
                      <h1 className="text-xl font-semibold">{event.title} - <span className="text-gray-400 text-sm">{moment(event.created_at).fromNow()}</span></h1>
                      <p>{event.message}</p>
                      <span className={'text-gray-600'}>by {event.admin.full_name}</span>
                    </div>
                  })
                :null
              }
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <h1 className="text-2xl font-semibold">Upcoming Exams</h1>
            <div className="mt-2 flex gap-2 flex-wrap px-3">
              {
                exams && exams.length ?
                  exams.map((exam) =>{
                    return <div className="bg-gray-900 text-white px-3 py-2 sm:mb-1 w-[100%] sm:w-[32%] rounded-md cursor-pointer hover:bg-gray-950 duration-200">
                      <h1 className="text-xl font-semibold">{exam.exam_name} - <span className="text-gray-400 text-sm">{exam.date}</span></h1>
                      <p>Subject: {exam.subject.name}</p>
                      <p>Class: {exam.class.class_name}</p>
                    </div>
                  })
                :null
              }
            </div>
          </div>
        </div>
      </div>
    )
  );
};
