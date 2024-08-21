import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  Tooltip,
  Typography,
  Chip,
  Switch,
} from "@material-tailwind/react";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { AxiosHeader, baseURL, imageBaseURL } from "../../API/config";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import LazyLoader from "../MasterLayout/LazyLoader";
import Loader from "../MasterLayout/Loader";
import AddCategory from "./AddCategory";
import { DeleteAlert } from "../../helper/DeleteAlert";

// Define the default image URL
const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150?text=No+Image";

const TABLE_HEAD = [
  "S.No",
  "Title",
  "Icon",
  "Image",
  "Create Date",
  "Status",
  "Action",
];

export default function CategoryList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/categories/all`,
        AxiosHeader
      );
      setCategories(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  const handleEditCategory = (category) => {
    handleOpenModal(category);
  };

  const handleDeleteCategory = async (id) => {
    const isDelete = await DeleteAlert(id, "categories/delete");
    if (isDelete) {
      setCategories(categories.filter((category) => category._id !== id));
    }
  };

  const handleStatusChange = async (categoryId, currentStatus) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${baseURL}/categories/update-status/${categoryId}`,
        { is_active: !currentStatus },
        AxiosHeader
      );
      if (response.status === 200) {
        SuccessToast("Category status updated successfully");
        setCategories(
          categories.map((category) =>
            category._id === categoryId
              ? { ...category, is_active: !currentStatus }
              : category
          )
        );
      }
    } catch (error) {
      ErrorToast("Failed to update category status");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = categories.slice(
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
                Category List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage all your categories here
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Category
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
                    (
                      {
                        category_name,
                        icon_path,
                        image_path,
                        createdAt,
                        is_active,
                        _id,
                      },
                      index
                    ) => {
                      const isLast = index === currentTableData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-gray-200";
                      const serialNumber =
                        (currentPage - 1) * itemsPerPage + index + 1;

                      return (
                        <tr key={_id}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {serialNumber}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {category_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Avatar
                              src={
                                icon_path
                                  ? `${imageBaseURL}/${icon_path}`
                                  : DEFAULT_IMAGE_URL
                              }
                              alt={category_name}
                              size="sm"
                            />
                          </td>
                          <td className={classes}>
                            <Avatar
                              src={
                                image_path
                                  ? `${imageBaseURL}/${image_path}`
                                  : DEFAULT_IMAGE_URL
                              }
                              alt={category_name}
                              size="sm"
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
                            <Switch
                              checked={is_active}
                              onChange={() =>
                                handleStatusChange(_id, is_active)
                              }
                              color={is_active ? "green" : "gray"}
                            />
                          </td>
                          <td className={classes}>
                            <div className="flex gap-2">
                              <Tooltip content="Edit Category">
                                <IconButton
                                  onClick={() =>
                                    handleEditCategory({
                                      _id,
                                      category_name,
                                      icon_path,
                                      image_path,
                                      is_active,
                                    })
                                  }
                                  variant="text"
                                  color="blue"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Category">
                                <IconButton
                                  onClick={() => handleDeleteCategory(_id)}
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
          </div>
        </CardFooter>
      </Card>
      {openModal && (
        <Suspense fallback={LazyLoader}>
          <AddCategory
            onCancel={handleCloseModal}
            existingCategory={selectedCategory}
          />
        </Suspense>
      )}
    </>
  );
}
