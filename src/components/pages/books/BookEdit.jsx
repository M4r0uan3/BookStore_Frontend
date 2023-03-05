import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import catServices from "../../../services/categoriesServices";
import bookService from "../../../services/booksServices";
import adminServices from "../../../services/adminServices";
import { toast } from "react-hot-toast";
import BookForm from "./BookForm";
function BookEdit() {
  const { id } = useParams();

  const [book, setBook] = useState({
    name: "",
    description: "",
    isbn: 0,
    auteur: "",
    editeur: "",
    date_edition: Date.now(),
    image: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  // console.log(categories);
  useEffect(() => {
    async function fetchData() {
      const rep = await bookService.getBookById(id);
      setBook(rep.data);
    }

    fetchData();
  }, [id]);

  async function getCategory() {
    const res = await catServices.getAllCategories();
    setCategories(res.data);
  }

  useEffect(() => {
    getCategory();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setBook((prevValue) => {
      // console.log(name + ": " + value);
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  const navigate = useNavigate();

  async function updateBook(e) {
    navigate("/admin/books");

    try {
      await adminServices.updateBook(book);
      toast.success("Book Modified Successfully");
    } catch (e) {
      toast.error("Something went wrong!");

      console.log(e);
    }
  }
  return (
    <BookForm
      title={"Edit"}
      updateBook={updateBook}
      book={book}
      categories={categories}
      handleChange={handleChange}
    />
  );
}

export default BookEdit;
