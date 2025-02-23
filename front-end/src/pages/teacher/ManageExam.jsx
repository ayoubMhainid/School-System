import { useState } from "react";
import { Button } from "../../components/UI/Button";
import { Add } from "../../components/modals/Add";

export const ManageExam = () => {
  const [openAddUser, setOpenAddUser] = useState(false);
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
      {openAddUser && <Add toAdd={"exam"} setOpen={setOpenAddUser} />}
    </div>
  );
};
