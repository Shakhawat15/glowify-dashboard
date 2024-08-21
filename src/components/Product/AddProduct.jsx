import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill styles
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosHeader, baseURL, imageBaseURL } from "../../API/config";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { getToken } from "../../helper/SessionHelper";

export default function ProductForm() {
  const location = useLocation();
  const existingProduct = location.state?.product;
  console.log("existingProduct", existingProduct);
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState(
    existingProduct?.product_details || []
  );
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState(existingProduct?.category._id || "");
  const [brand, setBrand] = useState(existingProduct?.brand._id || "");
  const [title, setTitle] = useState(existingProduct?.title || "");
  const [price, setPrice] = useState(existingProduct?.rrp || "");
  const [quantity, setQuantity] = useState(existingProduct?.quantity || "");
  const [sku, setSku] = useState(existingProduct?.sku || "");
  const [discountType, setDiscountType] = useState(
    existingProduct?.discount_type || ""
  );
  const [discountPrice, setDiscountPrice] = useState(
    existingProduct?.discount_price || ""
  );
  const [images, setImages] = useState(existingProduct?.media || []);

  console.log("images", images);

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

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
        formData.append("images", image);
      });

      try {
        setLoading(true);
        if (existingProduct) {
          await axios.put(
            `${baseURL}/products/update/${existingProduct._id}`,
            formData,
            AxiosHeader
          );
        } else {
          await axios.post(`${baseURL}/products/create`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: getToken(),
            },
          });
        }
        setLoading(false);
        navigate("/products");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg">
      <CardBody className="p-6">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          {existingProduct ? "Edit Product" : "Add Product"}
        </Typography>
        <Typography color="gray" className="mb-6">
          {existingProduct
            ? "Update the product details"
            : "Fill in the details to add a new product"}
        </Typography>
        {/* Input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category_name}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Brand</option>
              {brands.map((brd) => (
                <option key={brd._id} value={brd._id}>
                  {brd.brand_name}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="discountType"
            >
              Discount Type
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Discount Type</option>
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="discountPrice"
            >
              Discount Price
            </label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Discount Price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Attributes */}
        <div className="mt-6">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Product Attributes
          </Typography>
          {attributes.map((attr, index) => (
            <Card
              key={index}
              className="mb-4 border border-gray-200 rounded-md p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <Typography color="gray" className="font-medium">
                  Attribute {index + 1}
                </Typography>
                <Button
                  color="red"
                  onClick={() => removeAttribute(index)}
                  className="px-3 py-1 text-xs"
                >
                  Remove
                </Button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Type
                </label>
                <input
                  type="text"
                  value={attr.attribute_type}
                  onChange={(e) =>
                    handleAttributeChange(
                      index,
                      "attribute_type",
                      e.target.value
                    )
                  }
                  placeholder="Attribute Type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={attr.attribute_title}
                  onChange={(e) =>
                    handleAttributeChange(
                      index,
                      "attribute_title",
                      e.target.value
                    )
                  }
                  placeholder="Attribute Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <ReactQuill
                  value={attr.attribute_description}
                  onChange={(content) => handleEditorChange(index, content)}
                  className="react-quill-editor"
                />
              </div>
            </Card>
          ))}
          <Button onClick={addAttribute} color="blue" className="w-full mt-4">
            Add Attribute
          </Button>
        </div>

        {/* Image Upload */}
        <div className="mt-6">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Product Images
          </Typography>
          <Dropzone onDrop={onDrop} multiple>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className:
                    "dropzone border-dashed border-2 border-gray-300 p-4 rounded-md",
                })}
              >
                <input {...getInputProps()} />
                <p className="text-gray-500 text-center">
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
            )}
          </Dropzone>
          <div className="mt-4 flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={`${imageBaseURL}/${image.path}`} // Adjust this path according to your media URL structure
                  alt={`Product Preview ${index + 1}`}
                  className="w-60 h-60 object-cover rounded-md"
                />
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end p-6">
        <div>
          <Button
            onClick={() => navigate("/products")}
            className="mr-5"
            variant="outlined"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            color="light-blue"
            size="sm"
            className="ml-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Spinner className="w-4 h-4" />
            ) : existingProduct ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
