import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8003/api",
});

export default axiosClient;
