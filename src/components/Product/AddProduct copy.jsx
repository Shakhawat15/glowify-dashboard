import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="brand"
            >
              Brand
            </label>
            <select className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="1">Brand 1</option>
              <option value="2">Brand 2</option>
              {/* Add more brands as needed */}
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              placeholder="Product Title"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              placeholder="Product Price"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              type="number"
              placeholder="Product Quantity"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="sku"
            >
              SKU
            </label>
            <input
              type="text"
              placeholder="Product SKU"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="discount_type"
            >
              Discount Type
            </label>
            <select className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
              {/* Add more discount types as needed */}
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="discount_price"
            >
              Discount Price
            </label>
            <input
              type="number"
              placeholder="Discount Price"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4">
        <Button className="mr-5" variant="outlined" size="sm">
          Cancel
        </Button>
        <Button color="lightBlue" size="sm">
          Add Product
        </Button>
      </CardFooter>
    </Card>
  );
}
