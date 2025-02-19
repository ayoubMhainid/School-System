import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Button, Menu, MenuItem } from '@mui/material'
import moment from 'moment';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateNotificationStatus } from '../../services/notificationServices';
import { errors } from '../../constants/Errors';
import { Notification as NotificationN } from '../UI/Notification';
import { Loading } from './Loading';
import { Delete } from '../Modals/Delete';
export const Notification = ({notification}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [notificationN,setNotification] = useState({})
    const [loading,setLoading] = useState(false);
    const [modal,setModal] = useState({
        type:'',
        data:{},
        toUpdateOrDelete:'Notification'
    });

    const markSeen_FUNCTION = async () =>{
        handleClose();
        setLoading(true);
        setNotification(null);
        
        try{
            const response = await updateNotificationStatus(localStorage.getItem('token'),notification.id);
            setLoading(false);
            console.log(response);
            
            response.status === 200 ? response.data.message ? setNotification({type:"success",message:response.data.message})
            : null : null;

        }catch(error){
            setLoading(false);
            error.response.data.message ? setNotification({type:"error",message:error.response.data.message}) 
            : setNotification({type:"error",message:errors.tryAgain})
        }
    }
  return (
    <div className='bg-gray-900 px-3 py-2 rounded-md'>
        <div>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-lg'>From: <span className='text-blue-500 cursor-pointer' onClick={() => navigate(`/user/${notification.sender.id}`)}>{notification.sender.email}</span> 
                <span className='ml-5 text-sm text-gray-400'>{moment(notification.created_at).fromNow()}</span>
                <br></br>
                <span className='text-sm'>{notification.status}</span>
                </h1>
                
                <div>
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <EllipsisVerticalIcon className='w-5 h-5 text-white'/>
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                        'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={markSeen_FUNCTION}>Make as seen</MenuItem>
                        <MenuItem onClick={() => (setModal({
                            type:"delete",
                            data:notification,
                            toUpdateOrDelete:"Notification"
                        }), handleClose())}>Delete notification</MenuItem>
                    </Menu>
                </div>
            </div>
            {
                loading && <Loading />
            }
            {
                notificationN && <NotificationN type={notificationN.type} message={notificationN.message} />
            }
            {
                modal.type === 'delete' && <Delete modal={modal} setModal={setModal} />
            }
            <br></br>
            <span className='font-semibold'>{notification.content}</span>
        </div>
    </div>
  )
}
