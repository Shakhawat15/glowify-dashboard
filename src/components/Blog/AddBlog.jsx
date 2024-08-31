import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
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

export function AddBlog({ existingBlog, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: existingBlog ? existingBlog.title : "",
      cover_photo: null,
      description: existingBlog ? existingBlog.description : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Blog title is required!"),
      description: Yup.string().required("Description is required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.cover_photo) {
        formData.append("cover_photo_path", values.cover_photo);
      }

      try {
        let response;
        if (existingBlog) {
          response = await axios.put(
            `${baseURL}/blogs/update/${existingBlog._id}`,
            formData,
            AxiosHeader
          );
        } else {
          response = await axios.post(
            `${baseURL}/blogs/create`,
            formData,
            AxiosHeader
          );
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(
            existingBlog
              ? "Blog updated successfully"
              : "Blog created successfully"
          );
          setTimeout(() => {
            onCancel(); // Close the modal after showing the toast
          }, 1000);
        } else {
          throw new Error("Failed to save blog");
        }
      } catch (error) {
        ErrorToast(error.message || "Failed to save blog");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (existingBlog && existingBlog.cover_photo_path) {
      setCoverPhotoPreview(`${imageBaseURL}/${existingBlog.cover_photo_path}`);
    }
  }, [existingBlog]);

  const handleCoverPhotoChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("cover_photo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCoverPhoto = () => {
    formik.setFieldValue("cover_photo", null);
    setCoverPhotoPreview(null);
  };

  return (
    <Dialog
      size="md"
      open={true}
      handler={onCancel}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <ToastContainer />
      <DialogHeader className="bg-gray-100 border-b border-gray-300">
        <h4 className="text-xl font-semibold text-gray-800">
          {existingBlog ? "Update Blog" : "Add Blog"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter blog title"
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="mt-1 text-xs text-red-600">{formik.errors.title}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="cover_photo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cover Photo
            </label>
            {coverPhotoPreview ? (
              <div className="relative w-full h-32 bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={coverPhotoPreview}
                  alt="Cover Photo Preview"
                  className="object-contain w-full h-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveCoverPhoto}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-md hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="cover_photo"
                name="cover_photo"
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  formik.touched.cover_photo && formik.errors.cover_photo
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={handleCoverPhotoChange}
              />
            )}
            {formik.touched.cover_photo && formik.errors.cover_photo ? (
              <p className="mt-1 text-xs text-red-600">
                {formik.errors.cover_photo}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              id="description"
              value={formik.values.description}
              onChange={(content) =>
                formik.setFieldValue("description", content)
              }
              onBlur={formik.handleBlur}
              className={`h-40 mb-4 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="mt-1 text-xs text-red-600">
                {formik.errors.description}
              </p>
            ) : null}
          </div>

          <div className="flex gap-4 pt-10">
            <Button
              type="submit"
              className="py-2 px-4 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              disabled={loading}
              color="blue"
            >
              {loading ? (
                <Spinner className="w-4 h-4" />
              ) : existingBlog ? (
                "Update Blog"
              ) : (
                "Add Blog"
              )}
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

export default AddBlog;
