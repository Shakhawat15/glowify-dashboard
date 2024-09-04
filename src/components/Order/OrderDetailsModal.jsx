import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

const OrderDetailsModal = ({ open, handleClose, order }) => {
  console.log("order", order);
  return (
    <Dialog open={open} handler={handleClose} size="lg">
      <DialogHeader>Order Details</DialogHeader>
      <DialogBody divider>
        {order ? (
          <div className="flex flex-col gap-4">
            <Typography variant="h6">Order ID: {order.order_id}</Typography>
            <Typography variant="h6">
              Customer Name: {order.customer_name}
            </Typography>
            <Typography variant="h6">
              Total Amount: {order.total_amount}
            </Typography>
            <Typography variant="h6">Status: {order.status}</Typography>
            <Typography variant="h6">Order Date: {order.order_date}</Typography>
            {/* Add more order details here */}
          </div>
        ) : (
          <Typography variant="small" color="gray">
            No order selected.
          </Typography>
        )}
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default OrderDetailsModal;
