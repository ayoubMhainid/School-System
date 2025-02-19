import React,{ useState,useEffect } from "react";
import { getEventsPaginate } from "../../services/eventServices";
import { Button } from "../../components/UI/Button";
import { Delete } from "../../components/Modals/Delete";

export const ManageEvents = () => {
    const [events,setEvents]=useState([])
    const [loading, setLoading] = useState(false);
    const [paginate, setPaginate] = useState(false);
    const [pagination, setPagination] = useState({
      currentPage: 0,
      lastPage: 0,
      total: 0,
    });
    const [modal,setModal] = useState({
        type: "",
        data: {},
        toUpdateOrDelete: "",
    })
    
    const getEvents_FUNCTION = async (page) => {
        setLoading(true);
        try {
            const response = await getEventsPaginate(localStorage.getItem("token"), page);
            console.log("Response from API:", response.data.events.data);
            console.log(events)
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
        {/* events List */}
        <div className="m-10 p-4 rounded-md shadow-md">
          {!loading && events.length > 0 ? (
            <div className="flex flex-col gap-4">
              {events.map((event) => (
                <div
                key={event.id}
                className="border p-4 rounded-md shadow-sm"
                >
                    <p>
                    <strong>Title:</strong> {event.title}
                    </p>
                    <p>
                    <strong>Message:</strong> {event.message}
                    </p>
                    <Button
                        text={"Delete"}
                        width={"20%"}
                        bg={"bg-red-600 px-3"}
                        onClick={() => setModal({type: "Delete", data: event, toUpdateOrDelete: "Event"})}
                    />
                    {
                        modal.type === "Delete" && <Delete modal={modal} setModal={setModal} />
                    }
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No events found.</p>
          )}
          <div className="flex justify-center items-center mt-6 gap-4">
            <div>
                <span className="text-lg font-medium mr-120">
                    Total {pagination.total} ,Page {pagination.currentPage} of {pagination.lastPage}
                </span>
            </div>
            <div className="flex justify-center gap-4" >
                <Button text="Previous" width="20%" onClick={prevData} />
                <Button text="Next" width="20%" onClick={nextData} />
            </div>
          </div>
        </div>
        </>
    )

}