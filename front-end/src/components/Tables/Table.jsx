import React from 'react'
import { ButtonSvg } from '../UI/ButtonSvg'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export const Table = ({heads,data,viewButton,updateButton,deleteButton,keys}) => {
  return (
    <div>
        <table>
            <thead>
                {
                    <tr>
                        {
                            heads && heads.length?
                                heads.map((head) =>{
                                    return <th>{head}</th>
                                })
                            :null
                        }
                        {
                            viewButton || updateButton || deleteButton ?
                                <th>Actions</th>
                            :null
                        }
                    </tr>
                }
            </thead>
            <tbody>
                {data && data.length ? 
                            data.map((dataVar, rowIndex) => (
                                <tr key={rowIndex}>
                                    {keys &&
                                        keys.map((key, colIndex) => (
                                        <td key={colIndex}>{dataVar[key]}</td> 
                                        ))}
                                    {(viewButton || updateButton || deleteButton) && (
                                        <td className="flex space-x-2">
                                        {viewButton && (
                                            <ButtonSvg svg={<EyeIcon className="w-5 h-5 text-white" />} />
                                        )}
                                        {updateButton && (
                                            <ButtonSvg svg={<PencilSquareIcon className="w-5 h-5 text-white" />} />
                                        )}
                                        {deleteButton && (
                                            <ButtonSvg svg={<TrashIcon className="w-5 h-5 text-white" />} />
                                        )}
                                        </td>
                                    )}
                                </tr>
                            ))
                    : null}
            </tbody>
        </table>
    </div>
  )
}
