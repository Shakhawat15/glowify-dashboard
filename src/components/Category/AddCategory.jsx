import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useRef } from "react";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { ToastContainer } from "react-toastify";

export function AddCategory({ existingCategory, onCancel }) {
  const titleRef = useRef(null);
  const iconRef = useRef(null);
  const imageRef = useRef(null);

  console.log("existingCategory", existingCategory);

  const handleSubmit = async () => {
    const title = titleRef.current.value;
    const icon = iconRef.current.files[0];
    const image = imageRef.current.files[0];
    console.log(title, icon, image);
    if (IsEmpty(title)) {
      ErrorToast("Category Title is required!");
    } else if (!icon && !existingCategory) {
      ErrorToast("Icon is required!");
    } else if (!image && !existingCategory) {
      ErrorToast("Image is required!");
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("icon", icon);
      // Handle form submission, e.g., send to backend

      // Close the modal after successful submission if needed
      onCancel();
    }
  };

  const handleCancel = () => {
    // Reset form fields
    titleRef.current.value = "";
    iconRef.current.value = null;

    // Call onCancel to close the modal
    onCancel();
  };

  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="md" open={open}>
        <ToastContainer />
        <DialogHeader className="justify-between">
          <h4 className="text-xl font-semibold mb-4">
            {existingCategory ? "Update Category" : "Add Category"}
          </h4>
        </DialogHeader>
        <DialogBody className="overflow-auto">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              ref={titleRef}
              defaultValue={existingCategory ? existingCategory.name : ""}
              type="text"
              placeholder="Category Title"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="icon"
            >
              Icon
            </label>
            <input
              ref={iconRef}
              // defaultValue={existingCategory ? existingCategory.img : ""}
              type="file"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              ref={imageRef}
              type="file"
              id="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {existingCategory ? "Update Category" : "Add Category"}
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

export default AddCategory;
