import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { LinearProgress} from '@mui/material';
import { Pagination } from '../components/UI/Paginations';
import { getAnnouncementsPaginate } from '../services/announcementServices';

export const Announcements = () => {
    const [announcements,setAnnouncements]=useState([])
    const [loading, setLoading] = useState(false);
    const [paginate, setPaginate] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        lastPage: 0,
        total: 0,
    });
    
    const getAnnouncements_FUNCTION = async (page) => {
        setLoading(true);
        try {
            const response = await getAnnouncementsPaginate(localStorage.getItem("token"), page);
            setPaginate(true);
            setPagination({
                currentPage: response.data.announcements.current_page,
                lastPage: response.data.announcements.last_page,
                total: response.data.announcements.total,
            });
            if (response.data && response.data.announcements.data) {
                setAnnouncements(response.data.announcements.data);
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            setLoading(false);
        }
    };
    const nextData = async () => {
        if (pagination.lastPage <= pagination.currentPage) return;
        await getAnnouncements_FUNCTION(pagination.currentPage + 1);
        };
    
        const prevData = async () => {
        if (pagination.currentPage === 1) return;
        await getAnnouncements_FUNCTION(pagination.currentPage - 1);
        };
    useEffect(() => {
        getAnnouncements_FUNCTION(1)
    }, []);
return (
        <>
        <div className="m-10 p-4 rounded-md shadow-md w-[90%]">
        <h1 className="text-3xl font-semibold mb-6">Manage announcements</h1>
            {loading &&
            <LinearProgress />
            }
            {!loading && announcements.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {announcements.map((announcement) => (
                        <div
                        key={announcement.id}
                        className="border p-4 rounded-md shadow-sm "
                        > 
                            <div className="flex justify-start items-center gap-10">
                            <div>
                                <p className="text-3xl" >{announcement.title}</p>
                                <p className="text-xl mb-4" >{announcement.message}</p>
                            </div>
                            </div>
                            <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">{moment(announcement.created_at).fromNow()} by {announcement.admin.full_name}</span> 
                            </div>
                        </div>
                    ))}
                    
                    <div>
                        <Pagination currentPage={pagination.currentPage} lastPage={pagination.lastPage} previus={prevData} next={nextData} total={pagination.total}/>
                        
                    </div>
                    </div>
                    
                ) : (
                    <p className="text-center text-gray-500">No events found.</p>
                )
                
                
                }
                
        </div>
        </>
    )
}
