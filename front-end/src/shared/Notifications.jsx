import { Add } from "../components/Modals/Add";
import { Button } from "../components/UI/Button";
import { useAppContext } from "../context/AppContext";
import React, { useEffect, useState } from "react";
import { getNotification } from "../services/notificationServices";
import { errors } from "../constants/Errors";
import { Notification } from "../components/Skeletons/Notification";
import { Notification as NotificationComponent } from "../components/App/Notification";
import { Pagination } from "../components/UI/Paginations";

export const Notifications = () => {
    const { isMenuOpen } = useAppContext();
    const [openMakeMessage,setOpenMakeMessage] = useState(false);
    const [notifications,setNotifications] = useState([]);
    const [errorMessage,setErrorMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        lastPage: 0,
        total: 0,
    });

    const getNotifications_FUNCTION = async (page) =>{        
        setLoading(true);
        const response = await getNotification(localStorage.getItem('token'),page);
        setLoading(false);

        setPagination({
            currentPage:response.data.notifications.current_page,
            lastPage:response.data.notifications.last_page,
            total:response.data.notifications.total,
        })        

        response.data.notifications.data ? response.data.notifications.data.length ? 
            setNotifications(response.data.notifications.data)
            : setErrorMessage(errors.notFound) : setErrorMessage(errors.tryAgain);
    }

    const nextData = async () => {
        if (pagination.lastPage <= pagination.currentPage) {
          return;
        }
        await getNotifications_FUNCTION(pagination.currentPage + 1);
    };
    
    const prevData = async () => {
        if (pagination.currentPage == 1) {
        return;
        }
        await getNotifications_FUNCTION(pagination.currentPage - 1);
    };
    
    useEffect(() =>{
        getNotifications_FUNCTION(1);
    },[])
  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Notifications</h1>
          <br></br>
          <div className="sm:flex block justify-between w-[100%]">
            <div>
              <Button
                text={"Make a message"}
                width={"20%"}
                onClick={() => {
                  setOpenMakeMessage(true);
                }}
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
          {loading && <Notification />}
          <div className="flex flex-col gap-2">
            {
                notifications && notifications.length ?
                    notifications.map((notification) =>{
                        return <NotificationComponent notification={notification} />
                    })
                : "No notifications founded"
            }
          </div>
          {
            <Pagination currentPage={pagination.currentPage} lastPage={pagination.lastPage}
                        total={pagination.total} next={nextData} previus={prevData} />
          }
        </div>
        {openMakeMessage && <Add toAdd="notification" setOpen={setOpenMakeMessage} />}
      </div>
    )
  );
};
