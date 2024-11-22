import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    "https://orderapp-77c3b-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosApi;