import React, { useState } from "react";
import { ButtonSvg } from "../UI/ButtonSvg";
import {
  EyeIcon,
  MinusCircleIcon,
  PaperClipIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "../UI/Paginations";
import { Update } from "../Modals/Update";
import { Delete } from "../Modals/Delete";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Grade from "../Modals/Grade";

export const Table = ({
  heads,
  data,
  viewButton,
  updateButton,
  deleteButton,
  attendanceButton,
  gradeButton,
  keys,
  pagination,
  paginate,
  getData,
  toUpdateOrDelete,
  selectedExam,
  studentTeachers
}) => {
  const [modal, setModal] = useState({
    type: "",
    data: {},
    toUpdateOrDelete: toUpdateOrDelete,
  });
  const navigate = useNavigate();

  const nextData = async () => {
    if (pagination.lastPage <= pagination.currentPage) {
      return;
    }
    await getData(pagination.currentPage + 1);
  };

  const prevData = async () => {
    if (pagination.currentPage == 1) {
      return;
    }
    await getData(pagination.currentPage - 1);
  };

  return (
    <div>
      <table className="w-[100%] border-2 border-gray-400">
        <thead>
          {
            <tr className="bg-gray-950">
              {heads && heads.length
                ? heads.map((head) => {
                    return (
                      <th key={head} className="py-2">
                        {head}
                      </th>
                    );
                  })
                : null}
              {viewButton || updateButton || deleteButton || attendanceButton || gradeButton ? (
                <th>Actions</th>
              ) : null}
            </tr>
          }
        </thead>
        <tbody>
          {data && data.length
            ? data.map((dataVar, rowIndex) => (
                <tr key={rowIndex}>
                  {keys &&
                    keys.map((key, colIndex) => (
                      <td key={colIndex} className="py-1 text-center">
                        {key === "expires_at"
                          ? moment(dataVar["expires_at"]).diff(
                              moment(),
                              "days"
                            ) + " Days"
                          : key
                              .split(".")
                              .reduce((obj, prop) => obj?.[prop], dataVar)}
                      </td>
                    ))}
                  {(viewButton ||
                    updateButton ||
                    deleteButton ||
                    attendanceButton ||
                    gradeButton) && (
                    <td className="flex space-x-2 justify-center">
                      {viewButton && (
                        <ButtonSvg
                          svg={<EyeIcon className="w-5 h-5 text-white" />}
                          color={"green"}
                          onclick={() => navigate(`${studentTeachers ? `/user/${dataVar.teacher.user.id}`:`/user/${dataVar.user?.id}`}`)}
                        />
                      )}
                      {updateButton && (
                        <ButtonSvg
                          svg={
                            <PencilSquareIcon className="w-5 h-5 text-white" />
                          }
                          color={"blue"}
                          onclick={() =>
                            setModal({
                              type: "update",
                              data: dataVar,
                              toUpdateOrDelete: toUpdateOrDelete,
                            })
                          }
                        />
                      )}
                      {deleteButton && (
                        <ButtonSvg
                          svg={<TrashIcon className="w-5 h-5 text-white" />}
                          color={"red"}
                          onclick={() =>
                            setModal({
                              type: "delete",
                              data: dataVar,
                              toUpdateOrDelete: toUpdateOrDelete,
                            })
                          }
                        />
                      )}
                      {attendanceButton && (
                        <ButtonSvg
                          svg={
                            <MinusCircleIcon className="w-5 h-5 text-white" />
                          }
                          color={"pink"}
                          onclick={() => attendanceButton(dataVar)}
                        />
                      )}
                      {gradeButton && (
                        <ButtonSvg
                          svg={
                            <PaperClipIcon className="w-5 h-5 text-white" />
                          }
                          color={"orange"}
                          onclick={() =>
                            setModal({
                              type: "grade",
                              data: dataVar,
                              toUpdateOrDelete: toUpdateOrDelete,
                            })
                          }
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {pagination && paginate && (
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          total={pagination.total}
          next={nextData}
          previus={prevData}
        />
      )}
      {modal.type === "update" && <Update modal={modal} setModal={setModal} />}
      {modal.type === "view" && navigate("/user/{}")}
      {modal.type === "delete" && <Delete modal={modal} setModal={setModal} />}
      {modal.type === "grade" && <Grade modal={modal} setModal={setModal} selectedExam={selectedExam}/>}
    </div>
  );
};
