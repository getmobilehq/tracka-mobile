import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";

import {
  IoMenu,
  IoMoonSharp,
  IoSettingsOutline,
  IoSunny,
  IoNotificationsSharp,
  IoLogOutOutline,
  IoGridOutline,
} from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import { SidebarContext } from "../../context/SidebarContext";

const Header = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { mode, toggleMode } = useContext(WindmillContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);

  const { state, dispatch } = useAuthContext();
  const { adminInfo } = state;

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("adminInfo");
  };

  const handleNotificationsClick = () =>
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);

  const handleProfileClick = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  return (
    <>
      <header className="z-40 py-4 bg-white shadow-sm dark:bg-gray-800">
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-blue-500 dark:text-blue-500">
          {/* <!-- Mobile hamburger --> */}
          <button
            className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Menu"
          >
            <IoMenu className="w-6 h-6" aria-hidden="true" />
          </button>
          <span></span>

          <ul className="flex justify-end items-center flex-shrink-0 space-x-6">
            {/* <!-- Theme toggler --> */}
            <li className="flex">
              <button
                className="rounded-md focus:outline-none"
                onClick={toggleMode}
                aria-label="Toggle color mode"
              >
                {mode === "dark" ? (
                  <IoSunny className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <IoMoonSharp className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </li>
            {/* <!-- Notifications menu --> */}
            <li className="relative">
              <button
                className="relative align-middle rounded-md focus:outline-none"
                onClick={handleNotificationsClick}
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <IoNotificationsSharp className="w-5 h-5" aria-hidden="true" />
                {/* <!-- Notification badge --> */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                ></span>
              </button>

              <Dropdown
                align="right"
                isOpen={isNotificationsMenuOpen}
                onClose={() => setIsNotificationsMenuOpen(false)}
              >
                <DropdownItem
                  tag="a"
                  href="#"
                  className="justify-between dark:text-gray-400 font-serif"
                >
                  <span>Messages</span>
                  <Badge type="danger">13</Badge>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="#"
                  className="justify-between dark:text-gray-400 font-serif"
                >
                  <span>Sales</span>
                  <Badge type="danger">2</Badge>
                </DropdownItem>
              </Dropdown>
            </li>
            {/* <!-- Profile menu --> */}
            <li className="relative">
              <button
                className="rounded-full dark:bg-gray-500 bg-blue-500 text-white h-8 w-8 font-medium mx-auto focus:outline-none"
                onClick={handleProfileClick}
              >
                {adminInfo?.user?.image_url ? (
                  <Avatar
                    className="align-middle"
                    src={`${adminInfo?.user?.image_url}`}
                    aria-hidden="true"
                  />
                ) : (
                  <span>{adminInfo?.user?.email[0].toUpperCase()}</span>
                )}
              </button>
              <Dropdown
                align="right"
                isOpen={isProfileMenuOpen}
                onClose={() => setIsProfileMenuOpen(false)}
              >
                <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                  <Link to="/dashboard">
                    <span className="flex items-center text-sm">
                      <IoGridOutline
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                      />
                      <span>Dashboard</span>
                    </span>
                  </Link>
                </li>

                <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                  <Link to="/edit-profile">
                    <span className="flex items-center text-sm">
                      <IoSettingsOutline
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                      />
                      <span>Edit Profile</span>
                    </span>
                  </Link>
                </li>
                <li
                  onClick={handleLogOut}
                  className="cursor-pointer justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                >
                  <span className="flex items-center text-sm">
                    <IoLogOutOutline
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>Log out</span>
                  </span>
                </li>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
