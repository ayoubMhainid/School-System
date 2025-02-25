import React, { useEffect, useState } from "react";
import { getClassesAndStudentsByTeacher } from "../../services/classServices";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Table } from "../../components/Tables/Table";
import { errors } from "../../constants/Errors";
import { useAppContext } from "../../context/AppContext";
import { getSubjectsByTeacher } from "../../services/subjectServices";
import { Select } from "../../components/UI/Select";
import { getExamsBySubject } from "../../services/examServices";

export const GradeStudents = () => {
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [exams,setExams] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { isMenuOpen } = useAppContext();
    const [selectedSubject,setSelectedSubject] = useState();
    const [selectedClass,setSelectedClass] = useState();
    const [students,setStudents] = useState(false);

    const getSubjectsByTeacher_FUNCTION = async () =>{
        const response = await getSubjectsByTeacher(localStorage.getItem('token'));
        console.log(response);
        
        response.status === 200 ?
            setSubjects(response.data.subjects)
        : setErrorMessage(errors.notFound)
    }
    
    const getExamsBySubject_FUNCTION = async () =>{
        const response = await getExamsBySubject(localStorage.getItem('token'),selectedSubject);
        console.log(response);
        response.status === 200 ?
        setExams(response.data.exams)
        : setErrorMessage(errors.notFound)
    }

    const getStudents_FUNCTION = async () =>{
        setErrorMessage("");
        // get STUDENTS BY SELECTED CLASS
    }
    useEffect(() =>{
        selectedSubject !== undefined && getExamsBySubject_FUNCTION();
    }, [selectedSubject])
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
            <div className="flex gap-2">
                <Select options={subjects}
                    title={'Select subject'}
                    ky={'name'}
                    width={'30%'}
                    onchange={(e) => setSelectedSubject(e.target.value)}
                    value={selectedSubject}
                    valueToSelect={'id'}/>

                <Select options={exams}
                    title={'Select exam'}
                    ky={'exam_name'}
                    width={'30%'}
                    onchange={(e) => setSelectedClass(e.target.value)}
                    value={selectedClass}
                    valueToSelect={'class_id'}/>
            </div>
            {loading && <TableSkeleton />}
            {/* {students && students.length && !loading ? (
                <Table
                heads={["Class name", "Section", "Students Count"]}
                data={students}
                viewButton={true}
                keys={["class_name", "section", "student_count"]}
                getData={getClassesAndStudentsByTeacher_FUNCTION}
                toUpdateOrDelete={"User"}
                />
            ) : null} */}
        </div>
      </div>
    )
  );
};
