import { useEffect, useState } from "react";
import { Button } from "../../components/UI/Button";
import { Add } from "../../components/Modals/Add";
import { getExams } from "../../services/examServices";
import { useAppContext } from "../../context/AppContext";
import { errors } from "../../constants/Errors";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";

export const ManageExam = () => {
  const [examList, setExamList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  const { user } = useAppContext();

  useEffect(() => {
    const getAllExams = async () => {
      setErrorMessage(null);
      setLoading(true);
      const response = await getExams(user.token);
      setLoading(false);
      switch (response.status) {
        case 200:
          let listExam = [];
          response.data.exams.length
            ? (response.data.exams.map((element) =>
                element.map((item) => listExam.push(item))
              ),
              setExamList(listExam))
            : setErrorMessage(errors.notFound);
          break;
        default:
          setErrorMessage(errors.tryAgain);
          break;
      }
    };

    user.token && getAllExams();
  }, [user.token]);

  return (
    <div className="ml-6 mt-6 w-[85%]">
      <div className="w-[100%] px-2">
        <h1 className="text-3xl font-semibold mb-4">Manage exam</h1>
        <Button
          text={"Add exam"}
          width={"20%"}
          onClick={() => {
            setOpenAddUser(true);
          }}
        />
      </div>
      <div className="mt-4 px-2">
        {errorMessage && (
          <span className="text-red-300 text-xl font-semibold">
            {errorMessage}
          </span>
        )}
        {loading && <TableSkeleton />}
        {examList && examList.length && !loading ? (
          <Table
            heads={["Subject name", "Class name", "Exam name", "Date of exam"]}
            data={examList}
            viewButton={false}
            updateButton={true}
            deleteButton={true}
            keys={["subject.name", "class.class_name", "exam_name", "date"]}
            toUpdateOrDelete={"Exam"}
          />
        ) : null}
      </div>
      {openAddUser && <Add toAdd={"exam"} setOpen={setOpenAddUser} />}
    </div>
  );
};
