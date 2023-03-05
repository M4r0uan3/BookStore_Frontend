import http from "./http";

const getAllCategories = async () => {
  return await http.get("/categories");
};

async function getCategory(idC) {
  return await http.get(`/categories/${idC}`);
}

// async function deleteCategory(idC) {
//   return await http.delete(`/categories/${idC}`);
// }

const catServices = { getAllCategories, getCategory };
export default catServices;
