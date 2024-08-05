import { getToken } from "../helper/SessionHelper";

const baseURL = "http://localhost:8000/api/v1";
const imageBaseURL = "http://localhost:8000";
const AxiosHeader = { headers: { Authorization: getToken() } };

export { baseURL, AxiosHeader, imageBaseURL };
