import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";

export default function AddProduct() {
  return (
    <Card className="h-full w-full">
      <CardBody>
        <div className="mb-8">
          <Typography variant="h5" color="blue-gray">
            Add Product
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Fill in the details to add a new product
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label="Category">
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            {/* Add more options based on your categories */}
          </Select>
          <Select label="Brand">
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            <option value="brand3">Brand 3</option>
            {/* Add more options based on your brands */}
          </Select>
          <Input label="Title" />
          <Input label="SKU" />
          <Input type="number" label="Quantity" defaultValue={0} />
          <Input type="number" label="RRP" />
          <Input type="number" label="Discounted Price" />
          <Select label="Discount Type">
            <option value="percentage">Percentage</option>
            <option value="amount">Amount</option>
          </Select>
          <Input type="number" label="Discount Amount" />
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Cancel
        </Button>
        <Button color="lightBlue" size="sm">
          Add Product
        </Button>
      </CardFooter>
    </Card>
  );
}
