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
import { useEffect, useState } from "react";
import { AxiosHeader, baseURL } from "../../API/config";
import { DeleteAlert } from "../../helper/DeleteAlert";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";
import Loader from "../MasterLayout/Loader";

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

const dummyOrders = [
  {
    _id: "1",
    order_id: "ORD001",
    customer_name: "Alice Johnson",
    total_amount: "$120.50",
    status: "completed",
    order_date: "2024-08-25",
  },
  {
    _id: "2",
    order_id: "ORD002",
    customer_name: "Bob Smith",
    total_amount: "$75.00",
    status: "pending",
    order_date: "2024-08-26",
  },
  {
    _id: "3",
    order_id: "ORD003",
    customer_name: "Charlie Brown",
    total_amount: "$200.00",
    status: "completed",
    order_date: "2024-08-27",
  },
  {
    _id: "4",
    order_id: "ORD004",
    customer_name: "Diana Prince",
    total_amount: "$95.75",
    status: "pending",
    order_date: "2024-08-28",
  },
  {
    _id: "5",
    order_id: "ORD005",
    customer_name: "Ethan Hunt",
    total_amount: "$150.00",
    status: "completed",
    order_date: "2024-08-29",
  },
  {
    _id: "6",
    order_id: "ORD006",
    customer_name: "Fiona Gallagher",
    total_amount: "$80.00",
    status: "pending",
    order_date: "2024-08-30",
  },
  {
    _id: "7",
    order_id: "ORD007",
    customer_name: "George Michael",
    total_amount: "$60.00",
    status: "completed",
    order_date: "2024-08-31",
  },
  {
    _id: "8",
    order_id: "ORD008",
    customer_name: "Hannah Montana",
    total_amount: "$110.00",
    status: "pending",
    order_date: "2024-09-01",
  },
  {
    _id: "9",
    order_id: "ORD009",
    customer_name: "Ivy League",
    total_amount: "$95.50",
    status: "completed",
    order_date: "2024-09-02",
  },
  {
    _id: "10",
    order_id: "ORD010",
    customer_name: "Jack Bauer",
    total_amount: "$130.00",
    status: "pending",
    order_date: "2024-09-03",
  },
];

export default function OrderList() {
  const [openModal, setOpenModal] = useState(false);
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
                              {order_id}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {customer_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {total_amount}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={
                                  status === "completed"
                                    ? "Completed"
                                    : "Pending"
                                }
                                color={
                                  status === "completed" ? "green" : "blue-gray"
                                }
                                onClick={() => handleStatusToggle(_id, status)}
                                className="cursor-pointer"
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal"
                            >
                              {order_date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="flex gap-2">
                              <Tooltip content="Edit Order">
                                <IconButton
                                  onClick={() =>
                                    handleEditOrder({
                                      _id,
                                      order_id,
                                      customer_name,
                                      total_amount,
                                      status,
                                      order_date,
                                    })
                                  }
                                  variant="text"
                                  color="blue"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Order">
                                <IconButton
                                  onClick={() => handleDeleteOrder(_id)}
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

      {/* Add/Edit Order Modal */}
    </>
  );
}
