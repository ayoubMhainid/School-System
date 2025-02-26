import React, { useEffect, useState } from "react";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Table } from "../../components/Tables/Table";
import { errors } from "../../constants/Errors";
import { useAppContext } from "../../context/AppContext";
import { getSubjectsByTeacher } from "../../services/subjectServices";
import { Select } from "../../components/UI/Select";
import { getExamsBySubject } from "../../services/examServices";
import { getStudentsByClass } from "../../services/studentServices";

export const GradeStudents = () => {
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [exams,setExams] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { isMenuOpen } = useAppContext();
    const [selectedSubject,setSelectedSubject] = useState();
    const [selectedExam,setSelectedExam] = useState({exam_name:'',class_id:0,exam_id:0});
    const [students,setStudents] = useState(false);

    const getSubjectsByTeacher_FUNCTION = async () =>{
        const response = await getSubjectsByTeacher(localStorage.getItem('token'));
        
        response.status === 200 ?
            setSubjects(response.data.subjects)
        : setErrorMessage(errors.notFound)
    }
    
    const getExamsBySubject_FUNCTION = async () =>{
        const response = await getExamsBySubject(localStorage.getItem('token'),selectedSubject);
        response.status === 200 ?
        (setExams(response.data.exams))
        : setErrorMessage(errors.notFound)
    }

    const getStudents_FUNCTION = async () =>{
        setErrorMessage("");
        setLoading(true);
        const response = await getStudentsByClass(localStorage.getItem('token'),selectedExam.class_id);
        setLoading(false);
        response.status === 200 ?
            setStudents(response.data.students)
            : setErrorMessage(errors.notFound);
    }

    console.log(selectedExam);
    
    
    useEffect(() =>{
        selectedSubject !== undefined && getExamsBySubject_FUNCTION();
        selectedExam.class_id !== 0 && getStudents_FUNCTION();
    }, [selectedSubject,selectedExam])

    useEffect(() => {
        getSubjectsByTeacher_FUNCTION();
    }, []);
  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Grade students</h1>
          <br></br>
        </div>
        <div className="mt-4 px-2">
            {errorMessage && (
                <span className="text-red-300 text-xl font-semibold">
                {errorMessage}
                </span>
            )}
            <p className="text-lg font-semibold">Select a subject and an exam to get students</p><br></br>
            <div className="flex gap-2">
                <Select options={subjects}
                    title={'Select subject'}
                    ky={'name'}
                    width={'30%'}
                    onchange={(e) => (setSelectedSubject(e.target.value), setSelectedExam({exam_name:'',class_id:0,exam_id:0}))}
                    value={selectedSubject}
                    valueToSelect={'id'}/>

                    <select className="bg-gray-900 px-3 rounded-sm border border-white"
                        value={selectedExam.class_id} 
                        onChange={(e) => {
                            const selectedExamObj = exams.find(exam => exam.class_id === parseInt(e.target.value));
                            setSelectedExam(selectedExamObj || { exam_name: '', class_id: 0, exam_id: 0 });
                        }}>
                        <option value="">Select exam</option>
                        {
                            exams.length > 0 &&
                            exams.map((exam) => (
                                <option key={exam.exam_id} value={exam.class_id}>
                                    {exam.exam_name}
                                </option>
                            ))
                        }
                    </select>
                    
            </div>
            {loading && <TableSkeleton />}
            <div className="mt-2">
                {students && students.length && !loading ? (
                    <Table
                    heads={["Full name", "Username", "Phone number"]}
                    data={students}
                    viewButton={true}
                    gradeButton={true}
                    keys={["full_name", "username", "phone"]}
                    selectedExam={selectedExam}
                    toUpdateOrDelete={"User"}
                    />
                ) : null}
            </div>
        </div>
      </div>
    )
  );
};
