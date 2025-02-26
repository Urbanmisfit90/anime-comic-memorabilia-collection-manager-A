import axios from "axios";

const API_URL = process.env.VITE_API_URL || "http://localhost:5000"; // Use process.env

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
