import {
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { AxiosHeader, baseURL, imageBaseURL } from "../../API/config";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";

export function AddCategory({ existingCategory, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [iconPreview, setIconPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: existingCategory ? existingCategory.category_name : "",
      icon: null,
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category title is required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("category_name", values.name);
      if (values.icon) {
        formData.append("icon_path", values.icon);
      }
      if (values.image) {
        formData.append("image_path", values.image);
      }

      try {
        let response;
        if (existingCategory) {
          response = await axios.put(`${baseURL}/categories/update/${existingCategory._id}`, formData, AxiosHeader);
        } else {
          response = await axios.post(`${baseURL}/categories/create`, formData, AxiosHeader);
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(existingCategory ? "Category updated successfully" : "Category created successfully");
          setTimeout(() => {
            onCancel(); // Close the modal after showing the toast
          }, 1000);
        } else {
          throw new Error("Failed to save category");
        }
      } catch (error) {
        ErrorToast(error.message || "Failed to save category");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (existingCategory) {
      if (existingCategory.icon_path) {
        setIconPreview(`${imageBaseURL}/${existingCategory.icon_path}`);
      }
      if (existingCategory.image_path) {
        setImagePreview(`${imageBaseURL}/${existingCategory.image_path}`);
      }
    }
  }, [existingCategory]);

  const handleIconChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("icon", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveIcon = () => {
    formik.setFieldValue("icon", null);
    setIconPreview(null);
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  return (
    <Dialog size="md" open={true} handler={onCancel} className="p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <DialogHeader className="bg-gray-100 border-b border-gray-300">
        <h4 className="text-xl font-semibold text-gray-800">
          {existingCategory ? "Update Category" : "Add Category"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Category Title
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter category title"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="mt-1 text-xs text-red-600">{formik.errors.name}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
              Category Icon
            </label>
            {iconPreview ? (
              <div className="relative w-full h-32 bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={iconPreview}
                  alt="Icon Preview"
                  className="object-contain w-full h-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveIcon}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-md hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="icon"
                name="icon"
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  formik.touched.icon && formik.errors.icon ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleIconChange}
              />
            )}
            {formik.touched.icon && formik.errors.icon ? (
              <p className="mt-1 text-xs text-red-600">{formik.errors.icon}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>
            {imagePreview ? (
              <div className="relative w-full h-32 bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="object-contain w-full h-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-md hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="image"
                name="image"
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  formik.touched.image && formik.errors.image ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleImageChange}
              />
            )}
            {formik.touched.image && formik.errors.image ? (
              <p className="mt-1 text-xs text-red-600">{formik.errors.image}</p>
            ) : null}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="py-2 px-4 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              disabled={loading}
              color="blue"
            >
              {loading ? <Spinner className="w-4 h-4" /> : existingCategory ? "Update Category" : "Add Category"}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}

export default AddCategory;
