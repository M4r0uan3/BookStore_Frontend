import http from "./http";
import jwt_decode from "jwt-decode";

async function login(user) {
  return await http.post(`/auth/login`, user);
}

async function signUp(user) {
  return await http.post(`/auth/signup`, user);
}

async function getCurrentUser(){
  try {
    const {email} = jwt_decode(localStorage.getItem("token"));
    return email
  } catch (e) {
    return null;
  }
};

const authServices = {
  login,
  signUp,
  getCurrentUser
};

export default authServices;
