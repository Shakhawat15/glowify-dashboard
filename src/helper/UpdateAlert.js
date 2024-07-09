import Swal from "sweetalert2";
import { updateStatusRequest } from "../apiRequest/apiRequest";

export const UpdateAlert = async (id, status) => {
  const result = await Swal.fire({
    title: "Change Status",
    input: "select",
    inputOptions: {
      New: "New",
      Completed: "Completed",
      Progress: "Progress",
      Canceled: "Canceled",
    },
    inputValue: status,
  });

  if (result.isConfirmed) {
    return updateStatusRequest(id, result.value);
  } else {
    return null; // Or handle the case where the user cancels the alert
  }
};
