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
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosHeader, baseURL, imageBaseURL } from "../../API/config";
import { DeleteAlert } from "../../helper/DeleteAlert";
import { ErrorToast } from "../../helper/FormHelper";
import Loader from "../MasterLayout/Loader";

// Define the default image URL
const DEFAULT_IMAGE_URL = "https://via.placeholder.com/100?text=No+Image";

const TABLE_HEAD = [
  "S.No",
  "Image",
  "Product Title",
  "SKU",
  "Category",
  "Brand",
  "Price",
  "Quantity",
  "Status",
  "Action",
];

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/products/all`, AxiosHeader);
      setProducts(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    navigate("/product-create");
  };

  const handleEditProduct = (product) => {
    navigate(`/product-create`, { state: { product } });
  };

  const handleDeleteProduct = async (id) => {
    const isDelete = await DeleteAlert(id, "products/delete");
    if (isDelete) {
      setProducts(products.filter((product) => product._id !== id));
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = products.slice(
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
                Product List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Manage all your products here
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
                onClick={handleCreateProduct}
                className="flex items-center gap-3"
                size="sm"
                color="blue"
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
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
                        media,
                        title,
                        sku,
                        category,
                        brand,
                        rrp,
                        quantity,
                        status,
                        _id,
                        product_details,
                        discount_type,
                        discount_price,
                      },
                      index
                    ) => {
                      const isLast = index === currentTableData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-gray-200";
                      const serialNumber =
                        (currentPage - 1) * itemsPerPage + index + 1;

                      // Determine status text based on quantity
                      const statusText =
                        quantity > 0 ? "In Stock" : "Out of Stock";

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
                            <img
                              src={
                                media[0]?.path
                                  ? `${imageBaseURL}/${media[0]?.path}`
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
                              {title}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {sku}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {category.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {brand.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {rrp}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {quantity}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className={`font-normal ${
                                quantity > 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {statusText}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="flex gap-2">
                              <Tooltip content="Edit Product">
                                <IconButton
                                  onClick={() =>
                                    handleEditProduct({
                                      _id,
                                      title,
                                      sku,
                                      category,
                                      brand,
                                      rrp,
                                      quantity,
                                      status,
                                      media,
                                      product_details,
                                      discount_type,
                                      discount_price,
                                    })
                                  }
                                  variant="text"
                                  color="blue"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Product">
                                <IconButton
                                  onClick={() => handleDeleteProduct(_id)}
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
    </>
  );
}
