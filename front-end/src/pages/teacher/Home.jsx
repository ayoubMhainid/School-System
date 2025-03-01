import React from 'react'
import ann from '../../../public/announcement.png'
import event from '../../../public/event.png'
import school from '../../../public/school.jpg'
import contact from '../../../public/contact.png'


import { useAppContext } from '../../context/AppContext';
import { Button } from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const {isMenuOpen } = useAppContext();
    const navigate = useNavigate();
  return (    
    
    <div className="rounded-md shadow-md w-full  bg-white">
      <header className="bg-black text-white fixed top-0 left-0 w-full z-50 py-1 px-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-semibold ">
              <img src={logo} className='w-60' alt="" />
            </div>
            <nav className="space-x-6 hidden md:block">
              <a href="#home" className="text-white hover:text-gray-300">Home</a>
              <a href="#offering" className="text-white hover:text-gray-300">Services</a>
              <a href="#us" className="text-white hover:text-gray-300">About Us</a>
              <a href="#contact" className="text-white hover:text-gray-300">Contact</a>
            </nav>
          </div>
        </header>
      <div className="w-[100%] h-screen flex flex-col lg:flex-row lg:justify-center py-25 px-3 lg:py-45 lg:px-50">
        <div className='lg:w-[60%] w-[100%] '>
          <img className='lg:w-[95%] md:w-[100%]' src="/manageTeacher.jpg" alt="Mange teacher" />
        </div>
        <div className=" top-60 left-20 transform lg:w-[50%] text-black">
          <h1 className=" text-2xl   text-gray-500 font-semibold mb-6 md:mb-6 lg:text-gray-500">Explore Our Services</h1>
          <h1 className=" lg:text-5xl lg:w-[100%] w-[70%] text-2xl font-semibold mb-6">Welcome to Teacher Management</h1>
          <h3 className=" w-[100%] text-xl text-gray-500   ">
          Managing teachers involves effective planning and organization to ensure high-quality education, including supporting and guiding them, evaluating their performance, and providing a motivating work environment that fosters professional growth and innovation.</h3>
          <div className='border-2 py-1 md:w-[40%] rounded-3xl mt-8 text-xl hover:bg-gray-500 duration-200'>
            <Button type={'submet'} text={'SEE MORE'} color={'black'}  bg={'black'} onClick={()=>navigate('/teacher/classes')}/>
          </div>
        </div>
      </div>
      <div className='w-[100%]  py-30 lg:px-7 px-2 2xl:px-50'>
        <h1 className='text-gray-500 text-xl text-center mb-8'>Our Offerings</h1>
        <h1 className='text-black text-5xl text-center font-semibold mb-20'>Our Mission</h1>
        <div className='flex flex-col md:flex-row md:justify-between md:space-x-15 md:px-10'>
          <div className='mb-10'>
            <img src="/ManageExams.jpg" className='w-[100%]' alt="" />
            <div className='text-black border-1 px-2 py-4 rounded-md'>
              <h1 className='text-2xl mb-3'>Manage Exams</h1>
              <h2 className='text-gray-600'>Teachers are responsible for preparing exam papers on time.</h2>
              <h2 className='text-gray-600'>Teachers must supervise students during exams.</h2>
              <h2 className='text-gray-600'>Exam guidelines should be clearly explained by the teacher.</h2>
              <h2 className='text-gray-600'>Teachers need to ensure a fair and quiet exam environment.</h2>
            </div>
          </div>
          <div className='mb-3'>
            <img src="/attandanceTeacher.jpg" className='w-[100%]' alt="" />
            <div className='text-black border-1 px-2 py-4 rounded-md'>
              <h1 className='text-2xl mb-3'>Attendance</h1>
              <h2 className='text-gray-600'>Teachers must take student attendance every morning.</h2>
              <h2 className='text-gray-600'>Attendance records should be updated daily by the teacher.</h2>
              <h2 className='text-gray-600'>Teachers are responsible for monitoring students' punctuality.</h2>
              <h2 className='text-gray-600'>Teachers should follow up on students with frequent absences.</h2>
            </div>
          </div><div className='mb-3'>
            <img src={ann} className='w-[100%]' alt="" />
            <div className='text-black border-1 px-2 py-4 rounded-md'>
              <h1 className='text-2xl mb-3'>Manage Class</h1>
              <h2 className='text-gray-600'>Teachers are responsible for maintaining discipline in the classroom.</h2>
              <h2 className='text-gray-600'>Classroom schedules must be followed by all teachers.</h2>
              <h2 className='text-gray-600'>Teachers should encourage student participation in class activities.</h2>
              <h2 className='text-gray-600'>Managing class behavior is an important part of a teacher’s role.</h2>
            </div>
          </div><div className='mb-3'>
            <img src={event} className='w-[100%]' alt="" />
            <div className='text-black border-1 px-2 py-4 rounded-md'>
              <h1 className='text-2xl mb-3'>Events & Announcements </h1>
              <h2 className='text-gray-600'>Teachers' meeting will be held on Wednesday afternoon.</h2>
              <h2 className='text-gray-600'>Training sessions for teachers start next week.</h2>
              <h2 className='text-gray-600'>Teachers are requested to submit exam papers by Friday.</h2>
              <h2 className='text-gray-600'>Announcements regarding teacher evaluations will be shared soon.</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%]  flex flex-col lg:flex-row  py-25 px-3 lg:py-45 lg:px-50 2xl:px-80">
        <div className='lg:w-[55%] 2xl:w-[45%] w-[100%] '>
          <img className='lg:w-[100%] md:w-[100%] rounded-2xl' src={school} alt="Student Image" />
        </div>
        <div className="  transform lg:absolute lg:right-40 lg:w-[40%] 2xl:w-[30%] 2xl:right-170  2xl:mt-40 text-white bg-gray-900 px-10 py-10 lg:mt-17 rounded-2xl">
          <h1 className=" lg:text-5xl lg:w-[100%] w-[70%] text-2xl font-semibold mb-6 2xl:text-7xl">About us</h1>
          <h3 className=" w-[100%] text-xl text-gray-400  2xl:text-3xl ">
            Our site offers a comprehensive platform for students to thrive academically. You can explore passionate teachers who inspire and guide you, while accessing resources curated by top professionals. Stay informed about exciting school events, updates, and important announcements to keep you engaged with a dynamic community. Easily track your academic progress, view detailed reports of your achievements, and prepare for exams with personalized insights. With real-time notifications, you’ll stay connected with teachers, classmates, and deadlines, ensuring you never miss out on anything important. Our goal is to empower you to unlock your full potential and succeed.
          </h3>
        </div>
      </div>
      <div className='w-[100%] py-25 px-3 lg:py-45 lg:px-20'>
        <h1 className='text-gray-500 text-xl text-center mb-8'>Get in Touch</h1>
        <h1 className='text-black text-5xl text-center font-semibold mb-30'>Contact</h1>

        <div className=" flex flex-col lg:flex-row ">
          <div className=" top-60 left-20 transform lg:w-[50%] text-black lg:mt-30">
            <h1 className=" text-xl   text-gray-500 font-semibold mb-6 md:mb-6 lg:text-gray-500">Join Our Community</h1>
            <h1 className=" lg:text-5xl lg:w-[90%] w-[70%] text-2xl font-semibold mb-6">Unlock Your Educational Potential</h1>
            <h3 className=" lg:w-[90%] text-xl text-gray-500   ">
            Embark on a transformative educational journey with us. Explore our dynamic programs, engage with our renowned faculty, and become part of a vibrant student community that empowers you to reach new heights of success                </h3>
            <div className='border-2 py-1 md:w-[40%] rounded-3xl mt-8 text-xl hover:bg-gray-500 duration-200'>
              <Button type={'submet'} text={'Enroll Today'} color={'black'}  bg={'black'} onClick={()=>navigate('/login')}/>
            </div>
          </div>
          <div className='lg:w-[60%] w-[100%]'>
            <img className='lg:w-[95%] md:w-[100%]' src={contact} alt="Student Image" />
          </div>
        </div>
        
      </div>
      <footer className="bg-black text-white py-15">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
              <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Have questions or need support? Reach out to us!</p>
              <p className="text-gray-300">Email: support@example.com</p>
              <p className="text-gray-300">Phone: (123) 456-7890</p>
            </div>
            
            <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
              <h3 className="text-2xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Academic Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Career Guidance</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Extracurricular Activities</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Community Engagement</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-15">
            <p className="text-gray-500">&copy; 2025 Our Platform. All Rights Reserved.</p>
          </div>
        </footer>

    </div>
  )
}
