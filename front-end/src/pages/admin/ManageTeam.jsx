import React, { useEffect, useState } from "react";
import { Table } from "../../components/Tables/Table";
import { getAdmins } from "../../services/adminServices";
import { errors } from "../../constants/Errors";
import { Button } from "../../components/UI/Button";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Add } from "../../components/Modals/Add";
import { useAppContext } from "../../context/AppContext";
export const ManageTeam = () => {
  const [admins, setAdmins] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { isMenuOpen } = useAppContext();

  const [paginate, setPaginate] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });

  const getAdmins_FUNCTION = async (page) => {
    setLoading(true);
    setPaginate(true);
    const response = await getAdmins(localStorage.getItem("token"), page);
    setLoading(false);
    console.log(response);

    response.status === 200
      ? response.data.admins
        ? setAdmins(response.data.admins.data)
        : setErrorMessage(errors.notFound)
      : setErrorMessage(errors.tryAgain);
    setPagination({
      currentPage: response.data.admins.current_page,
      lastPage: response.data.admins.last_page,
      total: response.data.admins.total,
    });
  };

  useEffect(() => {
    getAdmins_FUNCTION(1);
  }, []);

  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 w-[85%]">
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Admin Team</h1>
          <br></br>
          <div className="sm:flex block justify-between w-[100%]">
            <div>
              <Button
                text={"Add admin"}
                width={"20%"}
                onClick={() => setOpenAddUser(true)}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
          {loading && <TableSkeleton />}
          {admins && admins.length && !loading ? (
            <Table
              heads={["Full name", "Username", "Phone"]}
              data={admins}
              viewButton={true}
              deleteButton={true}
              keys={["full_name", "username", "phone"]}
              pagination={pagination}
              paginate={paginate}
              getData={getAdmins_FUNCTION}
              toUpdateOrDelete={"User"}
            />
          ) : null}
          {openAddUser && <Add toAdd={"admin"} setOpen={setOpenAddUser} />}
        </div>
      </div>
    )
  );
};
