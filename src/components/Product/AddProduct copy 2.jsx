import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";

export default function AddProduct() {
  const editor = useRef(null);
  const [attributes, setAttributes] = useState([]);
  const [category, setCategory] = useState("1");
  const [brand, setBrand] = useState("1");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sku, setSku] = useState("");
  const [discountType, setDiscountType] = useState("fixed");
  const [discountPrice, setDiscountPrice] = useState("");

  const addAttribute = () => {
    const newAttribute = {
      attribute_type: "",
      attribute_title: "",
      attribute_description: "",
    };
    setAttributes([...attributes, newAttribute]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = value;
    setAttributes(updatedAttributes);
  };

  const handleEditorChange = (index, newContent) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].attribute_description = newContent;
    setAttributes(updatedAttributes);
  };

  const removeAttribute = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };

  const handleSubmit = () => {
    if (IsEmpty(category)) {
      ErrorToast("Category is required");
    } else if (IsEmpty(brand)) {
      ErrorToast("Brand is required");
    } else if (IsEmpty(title)) {
      ErrorToast("Title is required");
    } else if (IsEmpty(price)) {
      ErrorToast("Price is required");
    } else if (IsEmpty(quantity)) {
      ErrorToast("Quantity is required");
    } else if (IsEmpty(sku)) {
      ErrorToast("SKU is required");
    } else if (IsEmpty(discountType)) {
      ErrorToast("Discount Type is required");
    } else if (IsEmpty(discountPrice)) {
      ErrorToast("Discount Price is required");
    } else {
      // Proceed with form submission

      // Collect all form data here
      const formData = {
        category,
        brand,
        title,
        price,
        quantity,
        sku,
        discountType,
        discountPrice,
        attributes,
      };
      console.log(formData);
    }
  };

  return (
    <Card>
      <CardBody className="h-full w-full">
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
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
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
              value={sku}
              onChange={(e) => setSku(e.target.value)}
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
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
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
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Discount Price"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {attributes.map((attribute, index) => (
            <div
              key={index}
              className="col-span-2 mb-4 border border-gray-300 rounded-md p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <Typography className="text-gray-700 font-medium">
                  Attribute {index + 1}
                </Typography>
                <Button
                  color="red"
                  size="sm"
                  onClick={() => removeAttribute(index)}
                >
                  Close
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {/* Add input fields for attribute_type and attribute_title */}
                <select
                  value={attribute.attribute_type}
                  onChange={(e) =>
                    handleAttributeChange(
                      index,
                      "attribute_type",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Type</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                  {/* Add more types as needed */}
                </select>
                <input
                  type="text"
                  value={attribute.attribute_title}
                  onChange={(e) =>
                    handleAttributeChange(
                      index,
                      "attribute_title",
                      e.target.value
                    )
                  }
                  placeholder="Title"
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Jodit editor for attribute content */}
              <JoditEditor
                ref={editor}
                value={attribute.content}
                tabIndex={index} // Ensure each editor instance has a unique tabIndex
                onChange={(newContent) => handleEditorChange(index, newContent)}
              />
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button color="lightBlue" size="sm" onClick={addAttribute}>
          + Add Attribute
        </Button>
        <div>
          <Button className="mr-5" variant="outlined" size="sm">
            Cancel
          </Button>
          <Button
            color="lightBlue"
            size="sm"
            className="ml-2"
            onClick={handleSubmit}
          >
            Add Product
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
