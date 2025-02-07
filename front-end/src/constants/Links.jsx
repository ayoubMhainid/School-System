import {
  BuildingStorefrontIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
  ShoppingBagIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  HomeIcon,
  MegaphoneIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export const ADMINLINKS = [
  {
    SVG: <UserCircleIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Profile",
    LINK: "/admin/profile",
  },
  {
    SVG: <Squares2X2Icon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Dashboard",
    LINK: "/admin/dashboard",
  },
  {
    SVG: <UserCircleIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Teachers",
    LINK: "/admin/teachers",
  },
  {
    SVG: <UserGroupIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Students",
    LINK: "/admin/studentsList",
  },
  {
    SVG: <ClipboardDocumentCheckIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Attendances",
    LINK: "/admin/attendances",
  },
  {
    SVG: <MegaphoneIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Announcement",
    LINK: "/admin/announcementList",
  },
  {
    SVG: <CalendarDaysIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Events",
    LINK: "/admin/categories",
  },
  {
    SVG: <DocumentTextIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Exams",
    LINK: "/admin/exams",
  },
];

export const TEACHERLINKS = [
  // {
  //   SVG: <HomeIcon strokeWidth="1" className="w-5 h-5" />,
  //   TEXT: "Home",
  //   LINK: "/user/home",
  // },
  {
    SVG: <UserCircleIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Profile",
    LINK: "/user/profile",
  },
  {
    SVG: <MagnifyingGlassIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Search",
    LINK: "/teacher/searchs",
  },
  {
    SVG: <UserGroupIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Students",
    LINK: "/teacher/studentsList",
  },
  {
    SVG: <ChatBubbleLeftRightIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Classes",
    LINK: "/teacher/classes",
  },
  {
    SVG: <FolderIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Exams",
    LINK: "/teacher/exams",
  },
  {
    SVG: <BellIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Notifications",
    LINK: "/teacher/notifications",
  },

  {
    SVG: <BookmarkIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Subjects",
    LINK: "/teacher/subjects",
  },
];

export const USERLINKS = [
  {
    SVG: <HomeIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Home",
    LINK: "/user/home",
  },
  {
    SVG: <ShoppingBagIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Products",
    LINK: "/user/products",
  },
  {
    SVG: <MagnifyingGlassIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Search",
    LINK: "/user/search",
  },
  {
    SVG: <BellIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Notifications",
    LINK: "/user/notifications",
  },
  {
    SVG: <ChatBubbleLeftRightIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Messages",
    LINK: "/user/messages",
  },
  {
    SVG: <FolderIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "History",
    LINK: "/user/history",
  },
  {
    SVG: <BookmarkIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Saves",
    LINK: "/user/saves",
  },
  {
    SVG: <UserCircleIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Profile",
    LINK: "/user/profile",
  },
];
