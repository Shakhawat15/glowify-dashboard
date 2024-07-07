import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

const Header = () => (
  <div className="p-4 shadow-lg bg-white w-full flex items-center justify-between z-10">
    <div className="flex items-center space-x-4">
      <Typography variant="h4" color="blue-gray">
        Glowify
      </Typography>
    </div>
    <div className="flex items-center space-x-4">
      <UserCircleIcon className="h-8 w-8 text-blue-gray-500" />
    </div>
  </div>
);

export default Header;
