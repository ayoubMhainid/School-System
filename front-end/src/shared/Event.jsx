import React, { useEffect, useState } from 'react'
import { getEventsPaginate } from '../services/eventServices';
import { Button } from '../components/UI/Button';
import moment from 'moment';
import { LinearProgress} from '@mui/material';
import { Pagination } from '../components/UI/Paginations';

export const Events = () => {
    const [events,setEvents]=useState([])
    const [loading, setLoading] = useState(false);
    const [paginate, setPaginate] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        lastPage: 0,
        total: 0,
    });
    
    const getEvents_FUNCTION = async (page) => {
        setLoading(true);
        try {
            const response = await getEventsPaginate(localStorage.getItem("token"), page);
            setPaginate(true);
            setPagination({
                currentPage: response.data.events.current_page,
                lastPage: response.data.events.last_page,
                total: response.data.events.total,
            });
            if (response.data && response.data.events.data) {
                setEvents(response.data.events.data);
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            setLoading(false);
        }
    };
    const nextData = async () => {
        if (pagination.lastPage <= pagination.currentPage) return;
        await getEvents_FUNCTION(pagination.currentPage + 1);
        };
    
        const prevData = async () => {
        if (pagination.currentPage === 1) return;
        await getEvents_FUNCTION(pagination.currentPage - 1);
        };
    useEffect(() => {
        getEvents_FUNCTION(1)
    }, []);
return (
        <>
        <div className="ml-6 mt-6 w-[85%]">
        <h1 className="text-3xl font-semibold mb-6">Events</h1>
            {loading &&
            <LinearProgress />
            }
            {!loading && events.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {events.map((event) => (
                        <div
                        key={event.id}
                        className="border p-4 rounded-md shadow-sm "
                        > 
                            <div className="flex justify-start items-center gap-10">
                            <img 
                                src={`${event.event_picture}`} 
                                className="w-25 h-25 object-cover rounded-md"
                            />
                            <div>
                                <p className="text-3xl" >{event.title}</p>
                                <p className="text-xl mb-4" >{event.message}</p>
                            </div>
                            </div>
                            <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">{moment(event.created_at).fromNow()}</span> 
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
