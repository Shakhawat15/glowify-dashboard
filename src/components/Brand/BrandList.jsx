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
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { AxiosHeader, baseURL, imageBaseURL } from "../../API/config";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import LazyLoader from "../MasterLayout/LazyLoader";
import Loader from "../MasterLayout/Loader";
import AddBrand from "./AddBrand";

const TABLE_HEAD = ["Brand Name", "Logo", "Create Date", "Status", "Action"];

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

  const handleDeleteBrand = async (brand) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseURL}/brands/delete/${brand._id}`, AxiosHeader);
      if (response.status === 200) {
        SuccessToast("Brand deleted successfully");
        setBrands(brands.filter((b) => b._id !== brand._id));
      }
    } catch (error) {
      ErrorToast("Failed to delete brand");
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
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Brand List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all brands
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Brand
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
                {currentTableData.map(({ brand_name, logo_path, createdAt, is_active, _id }, index) => {
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
                              {brand_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={`${imageBaseURL}/${logo_path}`} alt={brand_name} size="sm" />
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
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={is_active ? "online" : "offline"}
                            color={is_active ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit Brand">
                          <IconButton
                            onClick={() => handleEditBrand({ _id, brand_name, logo_path, is_active })}
                            variant="text"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Brand">
                          <IconButton
                            onClick={() => handleDeleteBrand({ _id })}
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
          </div>
        </CardFooter>
      </Card>
      {openModal && (
        <Suspense fallback={LazyLoader}>
          <AddBrand
            onCancel={handleCloseModal}
            existingBrand={selectedBrand}
          />
        </Suspense>
      )}
    </>
  );
}
