import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ip } from "./IP";

const axiosClient = axios.create({
  baseURL: `${ip}`
});

axiosClient.interceptors.request.use((config) => {
  const token = AsyncStorage.getItem("token");

  if (token) {
    config.headers['token'] = token
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
