import { Dialog, DialogBody, DialogHeader, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { AxiosHeader, baseURL, imageBaseURL } from "../../API/config";
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
          response = await axios.put(`${baseURL}/brands/update/${existingBrand._id}`, formData, AxiosHeader);
        } else {
          response = await axios.post(`${baseURL}/brands/create`, formData, AxiosHeader);
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
      setLogoPreview(existingBrand.logo_path);
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

  console.log('logoPreview', logoPreview);
  console.log('existingBrand', existingBrand);

  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="md" open={true} handler={onCancel}>
        <ToastContainer />
        <DialogHeader className="justify-between">
          <h4 className="text-xl font-semibold mb-4">
            {existingBrand ? "Update Brand" : "Add Brand"}
          </h4>
        </DialogHeader>
        <DialogBody className="overflow-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Brand Name"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <div
                className="text-red-500 mt-1"
                style={{ minHeight: "1.25rem" }}
              >
                {formik.touched.name && formik.errors.name ? (
                  <span>{formik.errors.name}</span>
                ) : null}
              </div>
            </div>
            <div className="mb-4">
              {logoPreview ? (
                <div className="flex flex-col items-center">
                <img
                  src={
                    existingBrand?.logo_path == logoPreview
                      ? `${imageBaseURL}/${existingBrand.logo_path}`
                      : logoPreview
                  }
                  alt="Logo Preview"
                  className="w-32 h-32 mb-2 object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Logo
                </button>
              </div>
              ) : (
                <>
                  <input
                    type="file"
                    name="logo"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      formik.touched.logo && formik.errors.logo
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={handleLogoChange}
                  />
                  <div
                    className="text-red-500 mt-1"
                    style={{ minHeight: "1.25rem" }}
                  >
                    {formik.touched.logo && formik.errors.logo ? (
                      <span>{formik.errors.logo}</span>
                    ) : null}
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
                {loading ? <Spinner className="w-4 h-4" /> : existingBrand ? "Update Brand" : "Add Brand"}
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

export default AddBrand;
