import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useRef } from "react";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { ToastContainer } from "react-toastify";

export function AddBrand({ existingBrand, onCancel }) {
  const nameRef = useRef(null);
  const logoRef = useRef(null);

  console.log("existingBrand", existingBrand);

  const handleSubmit = async () => {
    const name = nameRef.current.value;
    const logo = logoRef.current.files[0];
    console.log(name, logo);
    if (IsEmpty(name)) {
      ErrorToast("Brand name is required!");
    } else if (!logo && !existingBrand) {
      ErrorToast("Logo is required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("logo", logo);
      // Handle form submission, e.g., send to backend

      // Close the modal after successful submission if needed
      onCancel();
    }
  };

  const handleCancel = () => {
    // Reset form fields
    nameRef.current.value = "";
    logoRef.current.value = null;

    // Call onCancel to close the modal
    onCancel();
  };

  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="md" open={open}>
        <ToastContainer />
        <DialogHeader className="justify-between">
          <h4 className="text-xl font-semibold mb-4">
            {existingBrand ? "Update Brand" : "Add Brand"}
          </h4>
        </DialogHeader>
        <DialogBody className="overflow-auto">
          <input
            ref={nameRef}
            defaultValue={existingBrand ? existingBrand.name : ""}
            type="text"
            placeholder="Brand Name"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            ref={logoRef}
            // defaultValue={existingBrand ? existingBrand.img : ""}
            type="file"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {existingBrand ? "Update Brand" : "Add Brand"}
            </button>
            <button
              onClick={handleCancel}
              className="py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </section>
  );
}

export default AddBrand;
