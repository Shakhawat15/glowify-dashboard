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
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { AxiosHeader, baseURL, imageBaseURL } from "../../API/config";
import { DeleteAlert } from "../../helper/DeleteAlert";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import LazyLoader from "../MasterLayout/LazyLoader";
import Loader from "../MasterLayout/Loader";
import { AddBlog } from "./AddBlog";

// Define the default image URL
const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150?text=No+Image";

const TABLE_HEAD = [
  "S.No",
  "Title",
  "Cover Photo",
  "Create Date",
  "Status",
  "Action",
];

export default function BlogList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/blogs/all`, AxiosHeader);
      setBlogs(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog = null) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBlog(null);
    fetchBlogs();
  };

  const handleEditBlog = (blog) => {
    handleOpenModal(blog);
  };

  const handleDeleteBlog = async (id) => {
    const isDelete = await DeleteAlert(id, "blogs/delete");
    if (isDelete) {
      setBlogs(blogs.filter((blog) => blog._id !== id));
    }
  };

  const handleStatusChange = async (blogId, currentStatus) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${baseURL}/blogs/status/${blogId}`,
        { is_active: !currentStatus },
        AxiosHeader
      );
      if (response.status === 200) {
        SuccessToast("Blog status updated successfully");
        setBlogs(
          blogs.map((blog) =>
            blog._id === blogId ? { ...blog, is_active: !currentStatus } : blog
          )
        );
      }
    } catch (error) {
      ErrorToast("Failed to update blog status");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = blogs.slice(
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
                Blog List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage all your blogs here
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Blog
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto h-[400px] px-0 pt-0">
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
                        title,
                        cover_photo_path,
                        description,
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
                              {title}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <img
                              src={
                                cover_photo_path
                                  ? `${imageBaseURL}/${cover_photo_path}`
                                  : DEFAULT_IMAGE_URL
                              }
                              alt={title}
                              className="h-16 w-16 rounded-lg object-cover"
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
                              <Tooltip content="Edit Blog">
                                <IconButton
                                  onClick={() =>
                                    handleEditBlog({
                                      _id,
                                      title,
                                      cover_photo_path,
                                      description,
                                      is_active,
                                    })
                                  }
                                  variant="text"
                                  color="blue"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Blog">
                                <IconButton
                                  onClick={() => handleDeleteBlog(_id)}
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
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              color="blue-gray"
              disabled={currentPage === 1}
              onClick={() => handlePageChange("prev")}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              color="blue-gray"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange("next")}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      {openModal && (
        <Suspense fallback={<LazyLoader />}>
          <AddBlog
            existingBlog={selectedBlog}
            open={openModal}
            onCancel={handleCloseModal}
          />
        </Suspense>
      )}
    </>
  );
}
