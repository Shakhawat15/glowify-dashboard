import { Dialog, DialogBody, DialogHeader, Spinner } from "@material-tailwind/react";
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
      // icon: Yup.mixed().test(
      //   "fileSize",
      //   "Icon is required!",
      //   (value) => !!value || !!existingCategory
      // ),
      // image: Yup.mixed().test(
      //   "fileSize",
      //   "Image is required!",
      //   (value) => !!value || !!existingCategory
      // ),
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
        setIconPreview(existingCategory.icon_path);
      }
      if (existingCategory.image_path) {
        setImagePreview(existingCategory.image_path);
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
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="md" open={true} handler={onCancel}>
        <ToastContainer />
        <DialogHeader className="justify-between">
          <h4 className="text-xl font-semibold mb-4">
            {existingCategory ? "Update Category" : "Add Category"}
          </h4>
        </DialogHeader>
        <DialogBody className="overflow-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Category Title</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Category Title"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <div className="text-red-500 mt-1" style={{ minHeight: "1.25rem" }}>
                {formik.touched.name && formik.errors.name ? <span>{formik.errors.name}</span> : null}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="icon" className="block text-gray-700">Icon</label>
              {iconPreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={existingCategory.icon_path == iconPreview ? `${imageBaseURL}/${existingCategory.icon_path}` : iconPreview}
                    alt="Icon Preview"
                    className="w-32 h-32 mb-2 object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveIcon}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Icon
                  </button>
                </div>
              ) : (
                <>
                  <input
                    id="icon"
                    type="file"
                    name="icon"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      formik.touched.icon && formik.errors.icon
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={handleIconChange}
                  />
                  <div className="text-red-500 mt-1" style={{ minHeight: "1.25rem" }}>
                    {formik.touched.icon && formik.errors.icon ? <span>{formik.errors.icon}</span> : null}
                  </div>
                </>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700">Image</label>
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={existingCategory.image_path == imagePreview ? `${imageBaseURL}/${existingCategory.image_path}` : imagePreview}
                    alt="Image Preview"
                    className="w-32 h-32 mb-2 object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      formik.touched.image && formik.errors.image
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={handleImageChange}
                  />
                  <div className="text-red-500 mt-1" style={{ minHeight: "1.25rem" }}>
                    {formik.touched.image && formik.errors.image ? <span>{formik.errors.image}</span> : null}
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? <Spinner className="w-4 h-4" /> : existingCategory ? "Update Category" : "Add Category"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </section>
  );
}

export default AddCategory;
