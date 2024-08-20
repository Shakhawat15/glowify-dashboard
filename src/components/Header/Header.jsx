import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Typography, Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { getUser, removeSession } from "../../helper/SessionHelper.js";
import { imageBaseURL } from "../../API/config.js";

const Header = () => {
  const user = getUser();

  const handleLogout = () => {
    // Clear user session
    removeSession();
  };

  return (
    <header className="py-2 px-4 shadow-md bg-white w-full flex items-center justify-between z-10">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Typography variant="h4" className="text-blue-gray-800 font-semibold">
          Glowify
        </Typography>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center space-x-2">
        <Menu>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              {user?.photo_path ? (
                <img
                  src={`${imageBaseURL}/${user.photo_path}`}
                  alt="User Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8 text-blue-gray-500" />
              )}
            </Button>
          </MenuHandler>
          <MenuList className="p-2 shadow-lg rounded-lg">
            <MenuItem className="hover:bg-blue-50 rounded-lg">Profile</MenuItem>
            <MenuItem className="hover:bg-blue-50 rounded-lg">Settings</MenuItem>
            <MenuItem className="hover:bg-blue-50 rounded-lg" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
