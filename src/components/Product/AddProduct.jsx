import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../API/config";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { getToken } from "../../helper/SessionHelper";

export default function ProductForm() {
  const location = useLocation();
  const existingProduct = location.state?.product;
  console.log('existingProduct', existingProduct)
  const editor = useRef(null);
  const [attributes, setAttributes] = useState(existingProduct?.attributes || []);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState(existingProduct?.category._id || "");
  const [brand, setBrand] = useState(existingProduct?.brand._id || "");
  const [title, setTitle] = useState(existingProduct?.title || "");
  const [price, setPrice] = useState(existingProduct?.price || "");
  const [quantity, setQuantity] = useState(existingProduct?.quantity || "");
  const [sku, setSku] = useState(existingProduct?.sku || "");
  const [discountType, setDiscountType] = useState(existingProduct?.discount_type || "fixed");
  const [discountPrice, setDiscountPrice] = useState(existingProduct?.discount_price || "");
  const [images, setImages] = useState(existingProduct?.images || []);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/categories/all`);
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${baseURL}/brands/all`);
      setBrands(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const handleSubmit = async () => {
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
      const formData = new FormData();
    formData.append("category_id", category);
    formData.append("brand_id", brand);
    formData.append("title", title);
    formData.append("rrp", price);
    formData.append("quantity", quantity);
    formData.append("sku", sku);
    formData.append("discount_type", discountType);
    formData.append("discount_price", discountPrice);
    formData.append("attributes", JSON.stringify(attributes));

    images.forEach((image) => {
      formData.append("images", image); // Ensure this field name matches the one in multer
    });

      try {
        if (existingProduct) {
          // Update existing product
          await axios.put(`${baseURL}/products/${existingProduct._id}`, formData);
        } else {
          // Add new product
          await axios.post(`${baseURL}/products/create`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": getToken(),
            },
          });
        }
        // Handle success (e.g., redirect, show a success message)
        navigate("/products");
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  return (
    <Card>
      <CardBody className="h-full w-full">
        <div className="mb-8">
          <Typography variant="h5" color="blue-gray">
            {existingProduct ? "Edit Product" : "Add Product"}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            {existingProduct ? "Update the product details" : "Fill in the details to add a new product"}
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
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
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
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brand_name}
                </option>
              ))}
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

          <div className="col-span-2 mb-4 border border-gray-300 rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <Typography className="text-gray-700 font-medium">
                Upload Images
              </Typography>
              {/* Dropzone for image uploads */}
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Button color="light-blue" size="sm" className="ml-2">
                      {`Drag'n drop some files here, or click to select files`}
                    </Button>
                  </div>
                )}
              </Dropzone>
            </div>
            {/* Display uploaded images */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-auto rounded-md"
                  />
                  <div className="absolute top-1 right-1">
                    <Button
                      color="red"
                      size="sm"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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
        <Button color="light-blue" size="sm" onClick={addAttribute}>
          + Add Attribute
        </Button>
        <div>
          <Button onClick={() => navigate("/products")} className="mr-5" variant="outlined" size="sm">
            Cancel
          </Button>
          <Button
            color="light-blue"
            size="sm"
            className="ml-2"
            onClick={handleSubmit}
          >
            {existingProduct ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
