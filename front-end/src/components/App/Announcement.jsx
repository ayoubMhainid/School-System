import React, { useState } from 'react'
import { Button } from '../UI/Button'
import { Delete } from '../Modals/Delete'

export const Announcement = ({announcement}) => {
    const [modal,setModal] = useState({
        type: "",
        data: {},
        toUpdateOrDelete: "",
    })
  return (
    <div
        key={announcement.id}
        className="border p-4 rounded-md shadow-sm"
    >
        <p>
        <strong>Admin:</strong> {announcement.admin.username}
        </p>
        <p>
        <strong>Title:</strong> {announcement.title}
        </p>
        <p>
        <strong>Message:</strong> {announcement.message}
        </p>
        <p>
        <strong>Receivers:</strong> {announcement.receiver}
        </p>
        <Button
            text={"Delete"}
            width={"20%"}
            bg={"bg-red-600 px-3"}
            onClick={() => setModal({type: "Delete", data: announcement, toUpdateOrDelete: "Announcement"})}
        />
        {
            modal.type === "Delete" && <Delete modal={modal} setModal={setModal} />
        }
    </div>
  )
}
