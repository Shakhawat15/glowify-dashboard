import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AxiosHeader, baseURL } from "../../API/config";
import { ErrorToast, IsEmpty, SuccessToast } from "../../helper/FormHelper";
import Loader from "../MasterLayout/Loader";


export default function AddUser({ existingUser, onCancel }) {
  const roleRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const profilePhotoRef = useRef(null);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  console.log('roles', roles)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${baseURL}/user-roles/all`, AxiosHeader);
        setRoles(response.data.data);
      } catch (error) {
        ErrorToast("Failed to fetch user roles");
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async () => {
    const role = roleRef.current.value;
    const first_name = firstNameRef.current.value;
    const last_name = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    const profilePhoto = profilePhotoRef.current.files[0];

    if (IsEmpty(role)) {
      ErrorToast("Role is required!");
    } else if (IsEmpty(first_name)) {
      ErrorToast("First Name is required!");
    } else if (IsEmpty(last_name)) {
      ErrorToast("Last Name is required!");
    } else if (IsEmpty(email)) {
      ErrorToast("Valid Email is required!");
    } else if (IsEmpty(phone)) {
      ErrorToast("Valid Phone is required!");
    } else if (IsEmpty(password)) {
      ErrorToast("Password is required!");
    } else if (!profilePhoto && !existingUser) {
      ErrorToast("Profile Photo is required");
    } else {
      const formData = new FormData();
      formData.append("role_id", role);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      if (profilePhoto) formData.append("photo_path", profilePhoto);

      setLoading(true);
      try {
        let response;
        if (existingUser) {
          // Update existing user
          const URL = `${baseURL}/users/update/${existingUser["_id"]}`;
          response = await axios.put(URL, formData, AxiosHeader);
        } else {
          // Register new user
          const URL = `${baseURL}/users/register`;
          response = await axios.post(URL, formData, AxiosHeader);
        }

        if (response.status === 200 || response.status === 201) {
          SuccessToast(response.data.message);
          // Delay closing the modal
          setTimeout(() => {
            onCancel(); // Close the modal after showing the toast
          }, 1000); // Adjust the delay as needed
        }
      } catch (error) {
        ErrorToast(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="md" open={open}>
        <ToastContainer />
        <DialogHeader className="justify-between">
          <h4 className="text-xl font-semibold mb-4">
            {existingUser ? "Update User" : "Add User"}
          </h4>
        </DialogHeader>
        <DialogBody className="overflow-auto">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  ref={roleRef}
                  id="role"
                  name="role"
                  defaultValue={existingUser ? existingUser.role : "user"}
                  className="w-full px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                >
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  ref={firstNameRef}
                  defaultValue={existingUser ? existingUser.first_name : ""}
                  type="text"
                  placeholder="First Name"
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  ref={lastNameRef}
                  defaultValue={existingUser ? existingUser.last_name : ""}
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  defaultValue={existingUser ? existingUser.email : ""}
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  ref={phoneRef}
                  defaultValue={existingUser ? existingUser.phone : ""}
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  ref={passwordRef}
                  defaultValue={existingUser ? existingUser.password : ""}
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="profilePhoto"
                >
                  Profile Photo
                </label>
                <input
                  ref={profilePhotoRef}
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}
          {!loading && (
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {existingUser ? "Update User" : "Add User"}
              </button>
              <button
                onClick={handleCancel}
                className="py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          )}
        </DialogBody>
      </Dialog>
    </section>
  );
}
