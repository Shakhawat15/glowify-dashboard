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
  Typography
} from "@material-tailwind/react";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { AxiosHeader, baseURL } from "../../API/config";
import { ErrorToast } from "../../helper/FormHelper";
import LazyLoader from "../MasterLayout/LazyLoader";
import Loader from "../MasterLayout/Loader";
import AddUserRole from "./AddUserRole";

const TABLE_HEAD = ["Role Name", "Status", "Create Date", "Action"];


export default function UserRoleList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${baseURL}/user-roles/all`, AxiosHeader);
      setUserRoles(response.data.data);
    } catch (error) {
      ErrorToast(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  const handleOpenModal = (userRole = null) => {
    setSelectedUserRole(userRole);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserRole(null);
    fetchUserRoles();
  };

  const handleEditUserRole = (userRole) => {
    handleOpenModal(userRole);

  };

  const handleDeleteUserRole = (userRole) => {
    console.log(userRole);
    // Implement the delete functionality
  };

  const totalPages = Math.ceil(userRoles.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = userRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                User Role List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all roles
              </Typography>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="w-full lg:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
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
        <CardBody className="overflow-auto px-0 pt-0" style={{ maxHeight: "500px" }}>
          {loading ? (
            <Loader />
          ) : (
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead className="sticky top-0 z-10 bg-white shadow-md">
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
                {currentTableData.map(({ role_name, is_active, createdAt, _id }, index) => {
                  const isLast = index === currentTableData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {role_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={is_active ? "Active" : "Inactive"}
                            color={is_active ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User Role">
                          <IconButton
                            onClick={() => handleEditUserRole({ _id, role_name, is_active })}
                            variant="text"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete User Role">
                          <IconButton
                            onClick={() => handleDeleteUserRole({ _id })}
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
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2 items-center">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            {/* <Select
              label="Items per page"
              value={itemsPerPage.toString()}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              className="w-24"
            >
              <Option value="5">5</Option>
              <Option value="10">10</Option>
              <Option value="15">15</Option>
            </Select> */}
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
