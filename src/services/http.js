import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
});

export default http;
