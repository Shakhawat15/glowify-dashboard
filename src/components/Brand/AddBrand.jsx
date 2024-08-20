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
import { AxiosHeader, AxiosHeaderForImage, baseURL, imageBaseURL } from "../../API/config";
import { ErrorToast, SuccessToast } from "../../helper/FormHelper";

export function AddBrand({ existingBrand, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: existingBrand ? existingBrand.brand_name : "",
      logo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Brand name is required!"),
      // logo: Yup.mixed().test(
      //   "fileSize",
      //   "Logo is required!",
      //   (value) => !!value || !!existingBrand
      // ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("brand_name", values.name);
      if (values.logo) {
        formData.append("logo_path", values.logo);
      }

      try {
        let response;
        if (existingBrand) {
          response = await axios.put(`${baseURL}/brands/update/${existingBrand._id}`, formData, AxiosHeaderForImage);
        } else {
          response = await axios.post(`${baseURL}/brands/create`, formData, AxiosHeaderForImage);
        }
        if (response.status === 200 || response.status === 201) {
          SuccessToast(existingBrand ? "Brand updated successfully" : "Brand created successfully");
          setTimeout(() => {
            onCancel(); // Close the modal after showing the toast
          }, 1000);
        } else {
          throw new Error("Failed to save brand");
        }
      } catch (error) {
        ErrorToast(error.message || "Failed to save brand");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (existingBrand && existingBrand.logo_path) {
      setLogoPreview(`${imageBaseURL}/${existingBrand.logo_path}`);
    }
  }, [existingBrand]);

  const handleLogoChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("logo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    formik.setFieldValue("logo", null);
    setLogoPreview(null);
  };

  return (
    <Dialog size="md" open={true} handler={onCancel} className="p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <DialogHeader className="bg-gray-100 border-b border-gray-300">
        <h4 className="text-xl font-semibold text-gray-800">
          {existingBrand ? "Update Brand" : "Add Brand"}
        </h4>
      </DialogHeader>
      <DialogBody className="p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter brand name"
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
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
              Brand Logo
            </label>
            {logoPreview ? (
              <div className="relative w-full h-32 bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="object-contain w-full h-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-md hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="logo"
                name="logo"
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  formik.touched.logo && formik.errors.logo ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleLogoChange}
              />
            )}
            {formik.touched.logo && formik.errors.logo ? (
              <p className="mt-1 text-xs text-red-600">{formik.errors.logo}</p>
            ) : null}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="py-2 px-4 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              disabled={loading}
              color="blue"
            >
              {loading ? <Spinner className="w-4 h-4" /> : existingBrand ? "Update Brand" : "Add Brand"}
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

export default AddBrand;
