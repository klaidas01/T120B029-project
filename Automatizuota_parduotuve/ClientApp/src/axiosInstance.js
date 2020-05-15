import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:44365/api/',
  timeout: 30000,
});
