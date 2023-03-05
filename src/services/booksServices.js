import http from "./http";
async function getAllBooks() {
  return await http.get("/books");
}
async function getBookById(idP) {
  return await http.get(`/books/${idP}`);
}
// async function deleteBook(idP) {
//   return await http.delete(`/books/${idP}`);
// }

// async function addBook(product) {
//   return await http.post(`/books`, product);
// }

// async function updateBook(product) {
//   return await http.put(`/books/${product._id}`, product);
// }
const bookService = {
  getAllBooks,
  getBookById,
  // deleteBook,
  // addBook,
  // updateBook,
};

export default bookService;
