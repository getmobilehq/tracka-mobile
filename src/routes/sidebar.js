import { FiGrid, FiUser, FiUsers } from "react-icons/fi";
import { GiHarborDock } from "react-icons/gi";
import { RiShipLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { roles } from "../utils/roles";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
    // permissions: [IS_SP_ADMIN, IS_SHIPPING_ADMIN, IS_BAY_ADMIN],
  },
  // {
  //   path: "/bookings",
  //   icon: HiOutlineDocumentReport,
  //   name: "Bookings",
  //   permissions: [IS_SP_ADMIN, IS_SHIPPING_ADMIN, IS_BAY_ADMIN],
  // },
  {
    path: "/projects",
    icon: HiOutlineDocumentReport,
    name: "Projects",
    // permissions: [IS_SP_ADMIN, IS_SHIPPING_ADMIN, IS_BAY_ADMIN],
  },
  {
    path: "/allocations",
    icon: HiOutlineDocumentReport,
    name: "Allocations",
    // permissions: [IS_SP_ADMIN, IS_SHIPPING_ADMIN, IS_BAY_ADMIN],
  },
  // {
  //   path: "/shipping-lines",
  //   icon: RiShipLine,
  //   name: "Shipping Line",
  //   permissions: [IS_SP_ADMIN],
  // },
  // {
  //   path: "/bays",
  //   icon: GiHarborDock,
  //   name: "Holding Bays",
  //   permissions: [IS_SP_ADMIN, IS_SHIPPING_ADMIN],
  // },
  // {
  //   path: "/customers",
  //   icon: FiUser,
  //   name: "Customers",
  //   permissions: [IS_SP_ADMIN],
  // },
  // {
  //   path: "/shipping-admin",
  //   icon: FiUsers,
  //   name: "Shipping Admin",
  //   permissions: [IS_SP_ADMIN],
  // },
  // {
  //   path: "/bay-admin",
  //   icon: FiUsers,
  //   name: "Bay Admin",
  //   permissions: [IS_SHIPPING_ADMIN],
  // },

  {
    path: "/administrators",
    icon: FiUsers,
    name: "Administrators",
    // permissions: [IS_SP_ADMIN],
  },
];

export default sidebar;
