import {
  Dialog,
  DialogBody,
  DialogHeader,
  Switch,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";

export default function AddUserRole({ existingUserRole, onCancel }) {
  const nameRef = useRef(null);
  const [status, setStatus] = useState(
    existingUserRole ? existingUserRole.online === true : false
  );

  console.log("existingUserRole", existingUserRole);

  const handleSubmit = async () => {
    const name = nameRef.current.value;
    const statusValue = status ? true : false;

    if (IsEmpty(name)) {
      ErrorToast("Role name is required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("status", statusValue);
      // Handle form submission, e.g., send to backend

      // Close the modal after successful submission if needed
      onCancel();
    }
  };

  const handleCancel = () => {
    // Reset form fields
    nameRef.current.value = "";
    setStatus(false);

    // Call onCancel to close the modal
    onCancel();
  };

  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="md" open={open}>
        <ToastContainer />
        <DialogHeader className="justify-between">
          <h4 className="text-xl font-semibold mb-4">
            {existingUserRole ? "Update User Role" : "Add User Role"}
          </h4>
        </DialogHeader>
        <DialogBody className="overflow-auto">
          <input
            ref={nameRef}
            defaultValue={existingUserRole ? existingUserRole.name : ""}
            type="text"
            placeholder="User Role Name"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="flex items-center mb-4">
            <Switch
              id="status"
              checked={status}
              onChange={() => setStatus(!status)}
              color="indigo"
              label="Active"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {existingUserRole ? "Update User Role" : "Add User Role"}
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
