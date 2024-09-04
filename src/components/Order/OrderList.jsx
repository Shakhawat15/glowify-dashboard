import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid"; // Import EyeIcon for the view button
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
import { useEffect, useState } from "react";
import { AxiosHeader, baseURL } from "../../API/config";
import { DeleteAlert } from "../../helper/DeleteAlert";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import Loader from "../MasterLayout/Loader";
import OrderDetailsModal from "./OrderDetailsModal"; // Import the OrderDetailsModal component
import dummyOrders from "./order";

// Define the default image URL
const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150?text=No+Image";

const TABLE_HEAD = [
  "S.No",
  "Order ID",
  "Customer",
  "Total Amount",
  "Status",
  "Date",
  "Action",
];

export default function OrderList() {
  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false); // State for details modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(dummyOrders);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/orders/all`, AxiosHeader);
      setOrders(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (order = null) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
    fetchOrders();
  };

  const handleEditOrder = (order) => {
    handleOpenModal(order);
  };

  const handleDeleteOrder = async (id) => {
    const isDeleted = await DeleteAlert(id, "orders/delete");
    if (isDeleted) {
      setOrders(orders.filter((order) => order._id !== id));
    }
  };

  const handleStatusToggle = async (orderId, currentStatus) => {
    try {
      const newStatus = currentStatus === "completed" ? "pending" : "completed";
      const response = await axios.patch(
        `${baseURL}/orders/status/${orderId}`,
        { status: newStatus },
        AxiosHeader
      );
      if (response.data.success) {
        // Update the status locally
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        SuccessToast("Order status updated successfully");
      } else {
        ErrorToast("Failed to update status");
      }
    } catch (error) {
      ErrorToast("Failed to update status");
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsModal(true); // Open the details modal
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedOrder(null);
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTableData = orders.slice(
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
                Order List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all orders
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Order
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
                        _id,
                        order_id,
                        customer_name,
                        total_amount,
                        status,
                        order_date,
                        products,
                      },
                      index
                    ) => {
                      const isLast = index === currentTableData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-gray-200";

                      return (
                        <tr key={_id} className="hover:bg-gray-50">
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1 + (currentPage - 1) * itemsPerPage}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {order_id}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {customer_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {total_amount}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={
                                status === "completed" ? "Completed" : "Pending"
                              }
                              color={
                                status === "completed" ? "green" : "blue-gray"
                              }
                              className="text-center text-xs font-normal"
                              onClick={() => handleStatusToggle(_id, status)}
                            />
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {order_date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="flex items-center gap-2">
                              <Tooltip content="Edit Order">
                                <IconButton
                                  variant="text"
                                  color="blue-gray"
                                  onClick={() =>
                                    handleEditOrder(currentTableData[index])
                                  }
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Order">
                                <IconButton
                                  variant="text"
                                  color="red"
                                  onClick={() => handleDeleteOrder(_id)}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="View Details">
                                <IconButton
                                  variant="text"
                                  color="blue-gray"
                                  onClick={() =>
                                    handleViewDetails(currentTableData[index])
                                  }
                                >
                                  <EyeIcon className="h-4 w-4" />
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
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography color="blue-gray" className="text-sm font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
      <OrderDetailsModal
        open={openDetailsModal}
        handleClose={handleCloseDetailsModal}
        order={selectedOrder}
      />
    </>
  );
}
