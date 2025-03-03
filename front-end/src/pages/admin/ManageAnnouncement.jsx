import React, { useEffect, useState } from "react";
import { getAnnouncements } from "../../services/announcementServices";
import { errors } from "../../constants/Errors";
import { Button } from "../../components/UI/Button";
import { Add } from "../../components/Modals/Add";
import { Announcement } from "../../components/App/Announcement";
import { Table as TableSkeleton } from "../../components/Skeletons/Table";
import { useAppContext } from "../../context/AppContext";
export const ManageAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    lastPage: 0,
    total: 0,
  });
  const { isMenuOpen } = useAppContext();

  const nextData = async () => {
    if (pagination.lastPage <= pagination.currentPage) return;
    await getAnnouncements_FUNCTION(pagination.currentPage + 1);
  };

  const prevData = async () => {
    if (pagination.currentPage === 1) return;
    await getAnnouncements_FUNCTION(pagination.currentPage - 1);
  };

  const [openModalAddAnnouncement, setOpenModalAddAnnouncement] =
    useState(false);

  const getAnnouncements_FUNCTION = async (page) => {
    setLoading(true);
    setErrorMessage(null);
    const response = await getAnnouncements(
      localStorage.getItem("token"),
      page
    );

    if (response.status === 200) {
      setAnnouncements(response.data.announcements.data);
      setPagination({
        currentPage: response.data.announcements.current_page,
        lastPage: response.data.announcements.last_page,
        total: response.data.announcements.total,
      });
    } else {
      setErrorMessage(errors.tryAgain);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAnnouncements_FUNCTION(1);
  }, []);

  return (
    !isMenuOpen && (
      <div className="ml-6 mt-6 md:w-[98%]">
        <div className="w-full px-2">
          <h1 className="text-3xl font-semibold">Manage Announcements</h1>
          <br />

          <div className="flex justify-start mb-4">
            <Button
              text="Add Announcement"
              width="20%"
              onClick={() => setOpenModalAddAnnouncement(true)}
              disabled={loading}
            />
          </div>

          <div className="p-4 rounded-md shadow-lg">
            {loading && <TableSkeleton />}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {!loading && announcements.length > 0 ? (
              <div className="flex flex-col gap-4">
                {announcements.map((announcement) => (
                  <Announcement
                    key={announcement.id}
                    announcement={announcement}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No announcements found.
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mt-6 gap-4">
            <Button text="Previous" width="20%" onClick={prevData} />
            <span className="text-lg font-medium">
              Page {pagination.currentPage} of {pagination.lastPage}
            </span>
            <Button text="Next" width="20%" onClick={nextData} />
          </div>

          {openModalAddAnnouncement && (
            <Add toAdd="announcement" setOpen={setOpenModalAddAnnouncement} />
          )}
        </div>
      </div>
    )
  );
};
