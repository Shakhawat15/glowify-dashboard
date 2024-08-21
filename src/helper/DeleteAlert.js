// src/helper/SweetAlertHelper.js
import Swal from "sweetalert2";
import axios from "axios";
import { AxiosHeader, baseURL } from "../API/config";
import { ErrorToast, SuccessToast } from "./FormHelper";

export const DeleteAlert = async (id, deleteEndpoint) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Make the delete request
        await axios.delete(`${baseURL}/${deleteEndpoint}/${id}`, AxiosHeader);
        SuccessToast("Deleted successfully!");
        return true; // Return true to indicate successful deletion
      } catch (error) {
        ErrorToast("Failed to delete");
        return false;
      }
    }
  });
};
