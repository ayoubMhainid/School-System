import React from 'react'
import student from '../../../public/students.png'
import mark from '../../../public/note.png'
import ann from '../../../public/announcement.png'
import event from '../../../public/event.png'
import teacher from '../../../public/teacher.png'
import school from '../../../public/school.jpg'
import contact from '../../../public/contact.png'
import logo from '../../../public/logo.png'
import { motion } from 'framer-motion'; 
import { useAppContext } from '../../context/AppContext';
import { Button } from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
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
        <motion.div
          id="home"
          className="w-[100%] h-screen flex flex-col lg:flex-row lg:justify-center py-25 px-3 lg:py-45 lg:px-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5 }}
        >
          <motion.div
            className="lg:w-[60%] w-[100%]"
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}   
            transition={{ duration: 2 }}
          >
            <img className="lg:w-[95%] md:w-[100%]" src="/manageTeacher.jpg" alt="Student Image" />
          </motion.div>

          
          <motion.div
            className="top-60 left-20 transform lg:w-[50%] text-black"
            initial={{ x: 100, opacity: 0 }}  
            animate={{ x: 0, opacity: 1 }}   
            transition={{ duration: 2 }}
          >
            <h1 className=" text-2xl   text-gray-500 font-semibold mb-6 md:mb-6 lg:text-gray-500">Explore Our Services</h1>
        <h1 className=" lg:text-5xl lg:w-[100%] w-[70%] text-2xl font-semibold mb-6">Welcome to Teacher Management</h1>
        <h3 className=" w-[100%] text-xl text-gray-500   ">
        Managing teachers involves effective planning and organization to ensure high-quality education, including supporting and guiding them, evaluating their performance, and providing a motivating work environment that fosters professional growth and innovation.</h3>
        <div className='border-2 py-1 md:w-[40%] rounded-3xl mt-8 text-xl hover:bg-gray-500 duration-200'>
          <Button type={'submet'} text={'SEE MORE'} color={'black'}  bg={'black'} onClick={()=>navigate('/teacher/classes')}/>
        </div>
          </motion.div>
        </motion.div>

      <motion.div id='offering' className='w-[100%]  py-30 lg:px-7 px-2 2xl:px-20'
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }}   
      transition={{ duration: 4.5 }}
      viewport={{ once: true }}>
        <h1 className='text-gray-500 text-xl text-center mb-8'>Our Offerings</h1>
        <h1 className='text-black text-5xl text-center font-semibold mb-20'>Our Mission</h1>
        <div className='flex flex-col md:flex-row md:justify-between md:space-x-15 md:px-10'>
        <div class="flex flex-col md:flex-row justify-center gap-6 p-6">
  <div class="w-full md:w-1/4 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
    <img class="w-full h-48 object-cover" src="/AttendanceTeacher.jpeg" alt="Card Image 1"/>
    <div class="px-6 py-4">
      <div class="font-bold text-3xl mb-2 text-gray-700 ">Attendance</div>
      <p class="text-gray-700 text-xl">
        Attendance is the act of being present at a designated place, like school, work, or an event. It helps track participation, responsibility, and commitment. Good attendance often reflects reliability and discipline, playing an important role in performance and success.
      </p>
    </div>
  </div>


  <div class="w-full md:w-1/4 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
    <img class="w-full h-48 object-cover" src="/manageClassTeacher.jpeg" alt="Card Image 2"/>
    <div class="px-6 py-4">
      <div class="font-bold text-3xl mb-2 text-gray-700 ">Manage Class</div>
      <p class="text-gray-700 text-xl">
        Managing a class involves organizing and overseeing classroom activities to create a positive and productive learning environment. It includes setting rules, maintaining discipline, planning lessons, and engaging students. Effective class management helps ensure smooth communication, active participation, and academic success.
      </p>
    </div>
  </div>

  <div class="w-full md:w-1/4 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
    <img class="w-full h-48 object-cover" src="/EventsTeacher.jpeg" alt="Card Image 3"/>
    <div class="px-6 py-4">
      <div class="font-bold text-3xl mb-2 text-gray-700 ">Events</div>
      <p class="text-gray-700 text-xl">
      Events are organized activities that bring people together for a common purpose, like celebrations, meetings, or learning sessions. They help foster communication, teamwork, and a sense of community. Well-planned events create memorable experiences and encourage participation and engagement.
      </p>
    </div>
  </div>

  <div class="w-full md:w-1/4 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
    <img class="w-full h-48 object-cover" src="/mangeExamTeacher.jpg" alt="Card Image 4"/>
    <div class="px-6 py-4">
      <div class="font-bold text-3xl mb-2 text-gray-700">Manage Exams</div>
      <p class="text-gray-700 text-xl">
        Managing exams involves planning, organizing, and overseeing the entire examination process to ensure fairness, efficiency, and accuracy. It includes tasks like preparing exam schedules, creating question papers, coordinating with invigilators, and providing clear instructions to students. Effective exam management also involves handling logistics and maintaining security
      </p>
    </div>
  </div>
</div>
        </div>
      </motion.div>
      <motion.div
        id="us"
        className="w-full flex flex-col lg:flex-row items-center py-16 px-6 lg:px-20 2xl:px-40 gap-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 4.5 }}
        viewport={{ once: true }}
      >
        
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ x: -100, opacity: 0 }}  
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 2 }}
        >
          <img className="w-full rounded-lg shadow-lg" src="/AboutTeacher.jpeg" alt="Student Image" />
        </motion.div>

        <motion.div
          className="lg:w-1/2 2xl:w-1/2 bg-gray-900 text-white p-8 lg:p-12 rounded-2xl shadow-lg"
          initial={{ x: 100, opacity: 0 }}  
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 2 }}
        >
          <h1 className="text-3xl lg:text-5xl font-semibold 2xl:text-6xl mb-4">About Us</h1>
          <p className="text-lg lg:text-xl 2xl:text-3xl leading-relaxed text-gray-300">
          Effective teacher management requires clear communication, realistic expectations, and professional development to support growth and quality education. Encouraging collaboration, providing regular feedback, and recognizing efforts foster motivation and improvement. A fair evaluation system ensures accountability and addresses concerns effectively.
          </p>
        </motion.div>
      </motion.div>


      <div className='w-[100%] py-25 px-3 lg:py-45 lg:px-20'
      >
        <h1 className='text-gray-500 text-xl text-center mb-8'>Get in Touch</h1>
        <h1 className='text-black text-5xl text-center font-semibold mb-30'>Contact</h1>

        <motion.div
          className="flex flex-col lg:flex-row"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 4.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="top-60 left-20 transform lg:w-[50%] text-black lg:mt-30"
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}    
            transition={{ duration: 2 }}
          >
            <h1 className="text-xl text-gray-500 font-semibold mb-6 md:mb-6 lg:text-gray-500 2xl:text-4xl">
              Join Our Community
            </h1>
            <h1 className="lg:text-5xl lg:w-[90%] w-[70%] text-2xl font-semibold mb-6 2xl:text-7xl">
              Unlock Your Educational Potential
            </h1>
            <h3 className="lg:w-[90%] text-xl 2xl:text-3xl text-gray-500">
              Embark on a transformative educational journey with us. Explore our dynamic programs, engage with our renowned faculty, and become part of a vibrant student community that empowers you to reach new heights of success.
            </h3>
            <div className="border-2 py-1 md:w-[40%] 2xl:w-[60%] rounded-3xl mt-8 text-xl hover:bg-gray-500 duration-200">
              <Button type="submit" text="Enroll Today" color="black" bg="black" onClick={() => navigate('/sign_in')} />
            </div>
          </motion.div>

          <motion.div
            className="lg:w-[60%] w-[100%]"
            initial={{ x: 200, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}   
            transition={{ duration: 4 }}
          >
            <img className="lg:w-[95%] md:w-[100%]" src={contact} alt="Student Image" />
          </motion.div>
        </motion.div>

        
      </div>
      <footer id='contact' className="bg-black text-white py-15">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
              <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Have questions or need support? Reach out to us!</p>
              <p className="text-gray-300">Email: SchoolManagement@example.com</p>
              <p className="text-gray-300">Phone: 06 82 71 85 35</p>
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
              
            </div>
          </div>
          
          <div className="text-center mt-15">
            <p className="text-gray-500">&copy; 2025 Our Platform. All Rights Reserved.</p>
          </div>
        </footer>

    </div>
  )
}
