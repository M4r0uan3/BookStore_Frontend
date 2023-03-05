import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";
import bookService from "../../../services/booksServices";
import catServices from "../../../services/categoriesServices";
import userServices from "../../../services/adminServices";

function BookDetails({ user }) {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [category, setCategory] = useState("");

  //   async function getBook() {
  //     const rep = await bookService.getBookById(id);
  //     console.log(rep.data);
  //     setBook(rep.data);
  //   }

  //   async function getCategory() {
  //     const res = await catServices.getCategory(book.category);
  //     // setCategory(res.data.name);
  //   }

  //   useEffect(() => {
  //     getBook();
  //     getCategory();
  //   }, []);
  useEffect(() => {
    async function fetchData() {
      const rep = await bookService.getBookById(id);
      setBook(rep.data);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const category = book?.category;
      if (category) {
        const res = await catServices.getCategory(category);
        setCategory(res.data.name);
      }
    }

    fetchData();
  }, [book]);

  async function deleteBook(id) {
    toast.promise(userServices.deleteBook(id), {
      loading: "Deleting Book...",
      success: <b>Book deleted!</b>,
      error: <b>Could not delete.</b>,
    });
    // await userServices.deleteBook(id);
    // toast.loading("");
  }

  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Book Details
          </h1>
          <Link
            to={"/admin/books"}
            className="mx-1 inline-flex items-center rounded-md border border-red-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancel
          </Link>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
          <div className="bg-white">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-6 gap-x-8 py-6 px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {book.name}
                </h2>
                <p className="mt-4 text-gray-500">{book.description}</p>

                <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">ISBN</dt>
                    <dd className="mt-2 text-sm text-gray-500">{book.isbn}</dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Auteur</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {book.auteur}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Editeur</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {book.editeur}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">
                      Date d'edition
                    </dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {book.date_edition}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Category</dt>
                    <dd className="mt-2 text-sm text-gray-500">{category}</dd>
                  </div>
                  {user && (
                    <div className="border-t border-gray-200 pt-4">
                      <span className="hidden sm:block">
                        <Link
                          to={`/admin/books/edit/${book._id}`}
                          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <PencilIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                          Edit
                        </Link>
                        <Link
                          onClick={() => {
                            deleteBook(book._id);
                          }}
                          to={"/admin/books"}
                          className="mx-10 inline-flex items-center rounded-md border border-red-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="-ml-1 mr-2 h-5 w-5 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                          Delete
                        </Link>
                      </span>
                    </div>
                  )}
                </dl>
              </div>
              <div className=" sm:gap-6 lg:gap-8">
                <img
                  src={book.image}
                  alt={book.image}
                  className="rounded-lg bg-gray-100"
                  width={300}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookDetails;
