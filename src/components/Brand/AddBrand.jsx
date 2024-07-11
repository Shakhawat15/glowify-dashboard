import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";

export function AddBrand({ existingBrand, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: existingBrand ? existingBrand.name : "",
      logo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Brand name is required!"),
      logo: Yup.mixed().test(
        "fileSize",
        "Logo is required!",
        (value) => !!value || !!existingBrand
      ),
    }),
    onSubmit: async (values) => {
      console.log("values", values);
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.logo) {
        formData.append("logo", values.logo);
      }
      // Handle form submission, e.g., send to backend

      // Close the modal after successful submission if needed
      onCancel();
    },
  });

  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="md" open={true}>
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
              <input
                type="file"
                name="logo"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  formik.touched.logo && formik.errors.logo
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={(event) => {
                  formik.setFieldValue("logo", event.currentTarget.files[0]);
                }}
              />
              <div
                className="text-red-500 mt-1"
                style={{ minHeight: "1.25rem" }}
              >
                {formik.touched.logo && formik.errors.logo ? (
                  <span>{formik.errors.logo}</span>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {existingBrand ? "Update Brand" : "Add Brand"}
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
