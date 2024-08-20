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
  Switch,
} from "@material-tailwind/react";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { AxiosHeader, baseURL, imageBaseURL } from "../../API/config";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import LazyLoader from "../MasterLayout/LazyLoader";
import Loader from "../MasterLayout/Loader";
import AddBrand from "./AddBrand";

// Define the default image URL
const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150?text=No+Image";

const TABLE_HEAD = ["S.No", "Brand Name", "Logo", "Create Date", "Status", "Action"];

export default function BrandList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/brands/all`, AxiosHeader);
      setBrands(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (brand = null) => {
    setSelectedBrand(brand);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBrand(null);
    fetchBrands();
  };

  const handleEditBrand = (brand) => {
    handleOpenModal(brand);
  };

  const handleDeleteBrand = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseURL}/brands/delete/${id}`, AxiosHeader);
      if (response.status === 200) {
        SuccessToast("Brand deleted successfully");
        setBrands(brands.filter((b) => b._id !== id));
      }
    } catch (error) {
      ErrorToast("Failed to delete brand");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, is_active) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${baseURL}/brands/status/${id}`,
        { is_active: !is_active },
        AxiosHeader
      );
      if (response.status === 200) {
        SuccessToast("Brand status updated successfully");
        setBrands(brands.map((b) => (b._id === id ? { ...b, is_active: !is_active } : b)));
      }
    } catch (error) {
      ErrorToast("Failed to update brand status");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = brands.slice(
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
              <Typography variant="h5" color="blue-gray" className="font-semibold">
                Brand List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage all your brands here
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Brand
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
                  {currentTableData.map(({ brand_name, logo_path, createdAt, is_active, _id }, index) => {
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
                            {brand_name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Avatar
                            src={logo_path ? `${imageBaseURL}/${logo_path}` : DEFAULT_IMAGE_URL}
                            alt={brand_name}
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
                          <div className="flex items-center">
                            <Switch
                              checked={is_active}
                              onChange={() => handleStatusChange(_id, is_active)}
                              color="blue"
                            />
                            <span className="ml-2">{is_active ? "Active" : "Inactive"}</span>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex gap-2">
                            <Tooltip content="Edit Brand">
                              <IconButton
                                onClick={() => handleEditBrand({ _id, brand_name, logo_path, is_active })}
                                variant="text"
                                color="blue"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete Brand">
                              <IconButton
                                onClick={() => handleDeleteBrand(_id)}
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
                  })}
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
          <AddBrand
            onCancel={handleCloseModal}
            existingBrand={selectedBrand}
          />
        </Suspense>
      )}
    </>
  );
}
