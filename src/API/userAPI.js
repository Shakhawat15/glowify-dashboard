import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { setToken, setUser } from "../helper/SessionHelper";
import { baseURL } from "./config";

export const LoginRequest = async (email, password, setLoading) => {
  const URL = `${baseURL}/users/login`;
  const PostBody = { email, password };
  try {
    setLoading(true);
    const response = await axios.post(URL, PostBody);
    setLoading(false);
    if (response.status === 200) {
      setToken(response.data.data.accessToken);
      setUser(response.data.data.user);
      SuccessToast(response.data.message);
      return true;
    }
  } catch (error) {
    setLoading(false);
    ErrorToast(error.response.data.message);
  }
};
