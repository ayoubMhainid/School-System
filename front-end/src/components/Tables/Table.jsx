import React, { useState } from 'react'
import { ButtonSvg } from '../UI/ButtonSvg'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Pagination } from '../UI/Paginations'

export const Table = ({heads,data,viewButton,updateButton,deleteButton,keys,pagination,getData}) => {
    
    const nextData = async () =>{
        if(pagination.lastPage <= pagination.currentPage){
            return
        }
        await getData(pagination.currentPage + 1)
    }
    const prevData = async () =>{
        if(pagination.currentPage == 1){
            return
        }
        await getData(pagination.currentPage - 1);
    }

  return (
    <div>
        <table className='w-[100%] border-2 border-gray-400'>
            <thead>
                {
                    <tr className='bg-gray-950'>
                        {
                            heads && heads.length?
                                heads.map((head) =>{
                                    return <th className='py-2'>{head}</th>
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
                                        <td key={colIndex} className='py-1 text-center'>{dataVar[key]}</td> 
                                        ))}
                                    {(viewButton || updateButton || deleteButton) && (
                                        <td className="flex space-x-2 justify-center">
                                        {viewButton && (
                                            <ButtonSvg svg={<EyeIcon className="w-5 h-5 text-white" />} color={'green'}/>
                                        )}
                                        {updateButton && (
                                            <ButtonSvg svg={<PencilSquareIcon className="w-5 h-5 text-white" />} color={'blue'}/>
                                        )}
                                        {deleteButton && (
                                            <ButtonSvg svg={<TrashIcon className="w-5 h-5 text-white" />} color={'red'}/>
                                        )}
                                        </td>
                                    )}
                                </tr>
                            ))
                    : null}
            </tbody>
        </table>
        {
            pagination && <Pagination currentPage={pagination.currentPage} 
                        lastPage={pagination.lastPage}
                        total={pagination.total}
                        next={nextData}
                        previus={prevData}/>
        }
    </div>
  )
}
