import React, { useEffect, useState } from "react";
import { Table } from "../../components/Tables/Table";
import { Button } from "../../components/UI/Button";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Add } from "../../components/Modals/Add";
import { getClassespaginate } from "../../services/classServices";
import { useAppContext } from "../../context/AppContext";

export const ManageClasses = () => {
  const [classe, setClasse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });
  const [openAddUser, setOpenAddUser] = useState(false);
  const { isMenuOpen } = useAppContext();

  const getClasses_FUNCTION = async (page) => {
    setLoading(true);
    try {
      const response = await getClassespaginate(
        localStorage.getItem("token"),
        page
      );
      console.log("Response from API:", response.data.classes.data);
      setPaginate(true);
      setPagination({
        currentPage: response.data.classes.current_page,
        lastPage: response.data.classes.last_page,
        total: response.data.classes.total,
      });
      if (response.data && response.data.classes.data) {
        setClasse(response.data.classes.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClasses_FUNCTION(1);
  }, []);

  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 md:w-[98%]">
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Manage Classes</h1>
          <br></br>
          <div className="sm:flex block justify-between w-[100%]">
            <div>
              <Button
                text={"Add Class"}
                width={"20%"}
                onClick={() => {
                  setOpenAddUser(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 px-2">
          {loading && <TableSkeleton />}
          {!loading && classe.length > 0 ? (
            <Table
              heads={["class_name", "section"]}
              data={classe}
              updateButton={true}
              deleteButton={true}
              keys={["class_name", "section"]}
              pagination={pagination}
              paginate={paginate}
              getData={getClasses_FUNCTION}
              toUpdateOrDelete={"Classe"}
            />
          ) : null}
        </div>
        {openAddUser && <Add toAdd="classe" setOpen={setOpenAddUser} />}
      </div>
    )
  );
};
