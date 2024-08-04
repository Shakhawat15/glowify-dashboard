import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

const baseURL = "http://localhost:8000/api/v1";

export const CreateUserRoleRequest = async (
  role_name,
  is_active,
  setLoading
) => {
  const URL = `${baseURL}/user-roles/create`;
  const PostBody = { role_name, is_active };
  try {
    setLoading(true);
    const response = await axios.post(URL, PostBody);
    setLoading(false);
    if (response.status === 201) {
      SuccessToast(response.data.message);
      return true;
    }
  } catch (error) {
    setLoading(false);
    ErrorToast(error.response.data.message);
  }
};
