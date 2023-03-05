import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import catServices from "../../../services/categoriesServices";
import adminServices from "../../../services/adminServices";
import { toast } from "react-hot-toast";
import BookForm from "./BookForm";

function AddBook() {
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

  async function getCategory() {
    const res = await catServices.getAllCategories();
    setCategories(res.data);
  }

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

  async function addBook(e) {
    navigate("/admin/books");

    // try {
    //   await adminServices.addBook(book);
    //   toast.success("Book Added Successfully");
    // } catch (e) {
    //   toast.error("Something went wrong!");

    //   console.log(e);
    // }

    toast.promise(
      adminServices.addBook(book),
       {
         loading: 'Creating new Book...',
         success: <b>Book Added Successfully</b>,
         error: <b>Something went wrong!</b>,
       }
     );
  }

  useEffect(() => {
    getCategory();
  }, []);


  return (
    <BookForm
      title={"Add"}
      updateBook={addBook}
      book={book}
      categories={categories}
      handleChange={handleChange}
    />
  );
}

export default AddBook;
