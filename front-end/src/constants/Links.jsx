import React from "react";
import {
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
  BellIcon,
  HomeIcon,
  MegaphoneIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  AcademicCapIcon,
  PencilIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export const dataSideBar = [
  {
    ROLE: "admin",
    SVG: <Squares2X2Icon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Dashboard",
    LINK: "/admin/dashboard",
  },
  {
    ROLE: "admin",
    SVG: <UsersIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Manage Students",
    LINK: "/admin/students",
  },
  {
    ROLE: "admin",
    SVG: <AcademicCapIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Manage Teachers",
    LINK: "/admin/teachers",
  },
  {
    ROLE: "admin",
    SVG: <PencilIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Manage Subjects",
    LINK: "/admin/subjects",
  },
  {
    ROLE: "admin",
    SVG: <BuildingLibraryIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Manage Classes",
    LINK: "/admin/classes",
  },
  {
    ROLE: "admin",
    SVG: <MegaphoneIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Announcement",
    LINK: "/admin/announcement",
  },
  {
    ROLE: "admin",
    SVG: <DocumentTextIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Exams & Results",
    LINK: "/admin/exams",
  },
  {
    ROLE: "admin",
    SVG: <CalendarDaysIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Events",
    LINK: "/admin/events",
  },
  {
    ROLE: "admin",
    SVG: <BellIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Notifications",
    LINK: "/user/notifications",
  },
  {
    ROLE: "admin",
    SVG: <UserGroupIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Team",
    LINK: "/admin/team",
  },
  {
    ROLE: "admin",
    SVG: <IdentificationIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Profile",
    LINK: "/admin/profile",
  },

  {
    ROLE: "teacher",
    SVG: <HomeIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Home",
    LINK: "/home",
  },
  {
    ROLE: "teacher",
    SVG: <ClipboardDocumentCheckIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Subjects",
    LINK: "/teacher/subjects",
  },
  {
    ROLE: "teacher",
    SVG: <BuildingLibraryIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "My Classes",
    LINK: "/teacher/classes",
  },
  {
    ROLE: "teacher",
    SVG: <PencilSquareIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Manage Exams",
    LINK: "/teacher/exams",
  },
  {
    ROLE: "teacher",
    SVG: <UsersIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Grade Students",
    LINK: "/teacher/grades",
  },
  {
    ROLE: "teacher",
    SVG: <MegaphoneIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Announcements",
    LINK: "/teacher/announcements",
  },
  {
    ROLE: "teacher",
    SVG: <CalendarDaysIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Events",
    LINK: "/teacher/events",
  },
  {
    ROLE: "teacher",
    SVG: <BellIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Notifications",
    LINK: "/user/notifications",
  },
  {
    ROLE: "teacher",
    SVG: <IdentificationIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Profile",
    LINK: "/teacher/profile",
  },

  {
    ROLE: "student",
    SVG: <HomeIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Home",
    LINK: "/home",
  },
  {
    ROLE: "student",
    SVG: <BuildingLibraryIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Class",
    LINK: "/student/class",
  },
  {
    ROLE: "student",
    SVG: <DocumentTextIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Exams",
    LINK: "/student/exams",
  },
  {
    ROLE: "student",
    SVG: <DocumentCheckIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Marks",
    LINK: "/student/grades",
  },
  {
    ROLE: "student",
    SVG: <MegaphoneIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Announcements",
    LINK: "/student/announcements",
  },
  {
    ROLE: "student",
    SVG: <BellIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Notifications",
    LINK: "/user/notifications",
  },
  {
    ROLE: "student",
    SVG: <CalendarDaysIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Events",
    LINK: "/student/events",
  },
  {
    ROLE: "student",
    SVG: <IdentificationIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Profile",
    LINK: "/student/profile",
  },
];
