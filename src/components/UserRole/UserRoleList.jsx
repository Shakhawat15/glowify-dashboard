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
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { AxiosHeader, baseURL } from "../../API/config";
import { ErrorToast } from "../../helper/FormHelper";
import LazyLoader from "../MasterLayout/LazyLoader";
import Loader from "../MasterLayout/Loader";
import AddUserRole from "./AddUserRole";

const TABLE_HEAD = ["S.No", "Role Name", "Status", "Create Date", "Action"];

export default function UserRoleList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/user-roles/all`,
        AxiosHeader
      );
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

  const handleDeleteUserRole = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${baseURL}/user-roles/delete/${id}`, AxiosHeader);
      setUserRoles(userRoles.filter((role) => role._id !== id));
      SuccessToast("User Role deleted successfully");
    } catch (error) {
      ErrorToast("Failed to delete User Role");
    } finally {
      setLoading(false);
    }
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
      <Card className="w-full h-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none p-5 bg-gray-100 border-b border-gray-200"
        >
          <div className="mb-6 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-semibold"
              >
                User Role List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all roles
              </Typography>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="w-full lg:w-80">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-3"
                size="sm"
                color="blue"
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Role
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-hidden px-0 pt-0">
          {loading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left border-separate border-spacing-0">
                <thead className="bg-gray-200 border-b border-gray-300 sticky top-0 z-10">
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="p-4 border-b border-gray-300 bg-gray-100 text-gray-700 font-medium"
                      >
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none"
                        >
                          {head}{" "}
                          {index !== TABLE_HEAD.length - 1 && (
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-4 w-4 text-gray-500"
                            />
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map(
                    ({ role_name, is_active, createdAt, _id }, index) => {
                      const isLast = index === currentTableData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-gray-200";

                      return (
                        <tr key={_id} className="hover:bg-gray-50">
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {role_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={is_active ? "Active" : "Inactive"}
                              color={is_active ? "green" : "blue-gray"}
                            />
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {new Date(createdAt).toLocaleDateString()}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="flex gap-2">
                              <Tooltip content="Edit User Role">
                                <IconButton
                                  onClick={() =>
                                    handleEditUserRole({
                                      _id,
                                      role_name,
                                      is_active,
                                    })
                                  }
                                  variant="text"
                                  color="blue"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete User Role">
                                <IconButton
                                  onClick={() => handleDeleteUserRole(_id)}
                                  variant="text"
                                  color="red"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-gray-200 p-4">
          <Typography variant="small" color="gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2 items-center">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              color="blue"
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              color="blue"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      {openModal && (
        <Suspense fallback={<LazyLoader />}>
          <AddUserRole
            onCancel={handleCloseModal}
            existingUserRole={selectedUserRole}
          />
        </Suspense>
      )}
    </>
  );
}
