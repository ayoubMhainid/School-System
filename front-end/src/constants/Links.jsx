import {
  ArrowRightOnRectangleIcon,
  BuildingStorefrontIcon,
  InboxStackIcon,
  Squares2X2Icon,
  TagIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
  FlagIcon,
  ShoppingBagIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export const ADMINLINKS = [
  {
    SVG: <Squares2X2Icon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Dashboard",
    LINK: "/admin/dashboard",
  },
  {
    SVG: <UsersIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Users",
    LINK: "/admin/usersList",
  },
  {
    SVG: <FlagIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Reported products",
    LINK: "/admin/reportedProducts",
  },
  {
    SVG: <InboxStackIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Pending products",
    LINK: "/admin/pendingProducts",
  },
  {
    SVG: <TagIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Categories",
    LINK: "/admin/categories",
  },
  {
    SVG: <BuildingStorefrontIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Stores",
    LINK: "/admin/stores",
  },
  {
    SVG: <UserGroupIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Our Team",
    LINK: "/admin/team",
  },
  {
    SVG: <UserCircleIcon strokeWidth="1" className="w-5 h-5" />,
    TEXT: "Profile",
    LINK: "/admin/profile",
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
