import { getToken } from "../helper/SessionHelper";

// const baseURL = "http://localhost:8000/api/v1";
// const imageBaseURL = "http://localhost:8000";

const baseURL = "https://glowify-backend.vercel.app/api/v1";
const imageBaseURL = "https://glowify-backend.vercel.app";

const AxiosHeader = { headers: { Authorization: getToken() } };
const AxiosHeaderForImage = {
  headers: { Authorization: getToken(), "Content-Type": "multipart/form-data" },
};

export { baseURL, AxiosHeader, imageBaseURL, AxiosHeaderForImage };
