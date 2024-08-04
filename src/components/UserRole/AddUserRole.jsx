import {
  Dialog,
  DialogBody,
  DialogHeader,
  Switch,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ErrorToast, IsEmpty, SuccessToast } from "../../helper/FormHelper";
import { getToken } from "../../helper/SessionHelper";
import Loader from "../MasterLayout/Loader";
import axios from "axios";

const AxiosHeader = { headers: { Authorization: getToken() } };
const baseURL = "http://localhost:8000/api/v1";

export default function AddUserRole({ existingUserRole, onCancel }) {
  const nameRef = useRef(null);
  const [status, setStatus] = useState(
    existingUserRole ? existingUserRole.is_active === true : false
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const handleSubmit = async () => {
    const name = nameRef.current.value;
    const statusValue = status ? true : false;

    if (IsEmpty(name)) {
      ErrorToast("Role name is required!");
    } else {
      setLoading(true);
      const formData = {
        role_name: name,
        is_active: statusValue,
      };
      try {
        let response;
        if (existingUserRole) {
          // Update existing user role
          const URL = `${baseURL}/user-roles/update/${existingUserRole["_id"]}`;
          response = await axios.put(URL, formData, AxiosHeader);
        } else {
          // Create new user role
          const URL = `${baseURL}/user-roles/create`;
          response = await axios.post(URL, formData, AxiosHeader);
        }

        if (response.status === 200 || response.status === 201) {
          SuccessToast(response.data.message);
          onCancel(); // Close the modal after successful submission
        }
      } catch (error) {
        ErrorToast(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
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
          {loading ? (
            <Loader />
          ) : (
            <>
              <input
                ref={nameRef}
                defaultValue={existingUserRole ? existingUserRole.role_name : ""}
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
            </>
          )}
        </DialogBody>
      </Dialog>
    </section>
  );
}
