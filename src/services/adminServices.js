import http from "./http";
import bcrypt from "bcryptjs-react";

async function deleteBook(idP) {
  return await http.delete(`/admin/books/${idP}`);
}
async function addBook(product) {
  return await http.post(`/admin/books`, product);
}
async function updateBook(product) {
  return await http.put(`/admin/books/${product._id}`, product);
}
// ===========================================
async function deleteCategory(idC) {
  return await http.delete(`/admin/categories/${idC}`);
}
async function addCategory(category) {
  return await http.post(`/admin/categories`, category);
}
async function updateCategory(category) {
  return await http.put(`/admin/categories/${category._id}`, category);
}
// ===========================================
async function deleteUser(idP) {
  return await http.delete(`/admin/users/${idP}`);
}
async function updateUser(user) {
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
  return await http.put(`/admin/users/${user._id}`, user);
}
async function getAllUsers() {
  return await http.get("/admin/users");
}
async function getUserById(idP) {
  return await http.get(`/admin/users/edit/${idP}`);
}
async function getUserByEmail(emailU) {
  return await http.get(`/admin/users/${emailU}`);
}

const adminServices = {
  deleteBook,
  addBook,
  updateBook,
  deleteCategory,
  updateCategory,
  addCategory,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserByEmail,
};

export default adminServices;
