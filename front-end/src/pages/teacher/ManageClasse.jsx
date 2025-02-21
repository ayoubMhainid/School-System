import React, { useEffect, useState } from 'react'
import { getClassesByTeacher } from '../../services/classServices'
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { Table } from '../../components/Tables/Table';
export const ManageClasse = () => {
    const [loading,setLoading] = useState(false)
    const [classes,setClasses] = useState([])
    const getClassesByTeacher_FUNCTION = async (id) =>{
        try{
            setLoading(true);
            const response = await getClassesByTeacher(localStorage.getItem("token",id))
            console.log(response.data.classes)
            if (response.status === 200){
                setClasses(response.data.classes);
            }
        }catch(error){
            console.error("Error fetching classes:", error);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getClassesByTeacher_FUNCTION()
    }, []);
  return (
    <div className="mt-4 px-2">
                    {loading && <TableSkeleton />}
                    {!loading && (
                        <Table
                            heads={["id","class_name", "section","student_count"]}
                            data={classes}
                            viewButton={true}
                            updateButton={true}
                            deleteButton={true}
                            keys={["id","class_name", "section","student_count"]}
                            getData={getClassesByTeacher_FUNCTION}
                            toUpdateOrDelete={"Classe"}
                        />
                    )}
                </div>
  )
}
