import React, { useEffect, useState } from "react";
import { getClasses } from "../../services/classServices";
import { Table } from "../../components/Tables/Table";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";

export const ManageClasses = () => {
    const [classe, setClasse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginate, setPaginate] = useState(false);
    const [pagination, setPagination] = useState({
      currentPage: 0,
      lastPage: 0,
      total: 0,
    });

    const getClasse = async (page) => {
        setLoading(true);
        try {
            const response = await getClasses(localStorage.getItem("token"), page);
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
        getClasse(1)
    }, []);

    return (
        <div className="ml-6 mt-6 w-[81%]">
            <div className="w-[100%] px-2">
                <h1 className="text-3xl font-semibold">Manage classes</h1>
                <br /><br />
            </div>
            <div>
                {loading && <TableSkeleton />}
                {!loading && classe.length > 0 ? (
                    <Table
                        heads={["class_name", "section", "teacher_id"]}
                        data={classe}
                        viewButton={true}
                        updateButton={true}
                        deleteButton={true}
                        keys={["class_name", "section", "teacher_id"]}
                        pagination={pagination}
                        paginate={paginate}
                        getData={getClasse}
                        toUpdateOrDelete={"classe"}
                    />
                ) : null}
            </div>
        </div>
    );
};
