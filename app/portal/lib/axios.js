// app/portal/lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/backend/portal", // <-- your PHP lives here
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;
