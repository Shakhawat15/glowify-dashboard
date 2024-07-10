import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { lazy, Suspense, useState } from "react";
import LazyLoader from "../MasterLayout/LazyLoader";

const AddUserRole = lazy(() => import("./AddUserRole"));

const TABLE_HEAD = ["Role Name", "Status", "Create Date", "Action"];

const TABLE_ROWS = [
  {
    name: "Admin",
    online: true,
    date: "23/04/18",
  },
  {
    name: "Manager",
    online: false,
    date: "23/04/18",
  },
  {
    name: "Customer",
    online: false,
    date: "19/09/17",
  },
  {
    name: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    name: "Designer",
    online: false,
    date: "04/10/21",
  },
];
export default function UserRoleList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState(null);

  const handleOpenModal = (userRole = null) => {
    setSelectedUserRole(userRole);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserRole(null);
  };

  const handleEditUserRole = (userRole) => {
    handleOpenModal(userRole);
  };

  const handleDeleteUserRole = (userRole) => {
    console.log(userRole);
    // Implement the delete functionality
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                User Role list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all roles
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-3"
                size="sm"
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Role
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, online, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "online" : "offline"}
                          color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User Role">
                        <IconButton
                          onClick={() => handleEditUserRole({ name, online })}
                          variant="text"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete User Role">
                        <IconButton
                          onClick={() => handleDeleteUserRole({ name, online })}
                          variant="text"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      {openModal && (
        <Suspense fallback={LazyLoader}>
          <AddUserRole
            onCancel={handleCloseModal}
            existingUserRole={selectedUserRole}
          />
        </Suspense>
      )}
    </>
  );
}
