import React, { useEffect, useState } from 'react'
import { getAdmins } from '../services/adminServices';
import { LinearProgress } from '@mui/material';
import { Table } from '../components/Tables/Table';
import { Pagination } from '../components/UI/Paginations';

export const Admins = () => {
    const [admins , setAdmins] = useState([]);
    const [loading , setLoading] = useState(false);
    const [paginate, setPaginate] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        lastPage: 0,
        total: 0,
    });

    const getAdmin = async (page) => {
        try{
            setLoading(true);
            const response = await getAdmins(localStorage.getItem('token'),page);
            setPagination({
                currentPage: response.data.admins.current_page,
                lastPage: response.data.admins.last_page,
                total: response.data.admins.total,
            });
            if(response.data.admins){
                setAdmins(response.data.admins.data)
            }            
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            setLoading(false);
        }
    }
    const nextData = async () => {
        if (pagination.lastPage <= pagination.currentPage) return;
        await getAdmin(pagination.currentPage + 1);
    };
    
    const prevData = async () => {
        if (pagination.currentPage === 1) return;
        await getAdmin(pagination.currentPage - 1);
    };
    useEffect(() => {
            getAdmin(1)
        }, []);
  return (
    <div className="m-10 p-4 rounded-md shadow-md w-[90%]">
        <h1 className="text-3xl font-semibold mb-6">Admins</h1>
        {loading &&
            <LinearProgress />
            
        }
        {!loading && Admins &&
            <div>
                <Table
                    heads={["Full name", "Username", "phone"]}
                    data={admins}
                    viewButton={true}
                    updateButton={false}
                    deleteButton={false}
                    keys={["full_name", "username", "phone"]}
                    pagination={pagination}
                    paginate={paginate}
                    getData={getAdmins}
                    toUpdateOrDelete={"User"}
                />
                <Pagination currentPage={pagination.currentPage} lastPage={pagination.lastPage} previus={prevData} next={nextData} total={pagination.total}/>
            </div>
            
                                    
                               
        }

    
    </div>
  )
}
