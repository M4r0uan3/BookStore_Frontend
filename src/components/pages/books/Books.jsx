import { useState, useEffect } from "react";
import bookServices from "../../../services/booksServices";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Pagination from "../../layout/Pagination";
import SearchBar from "../../layout/SearchBar";
import { paginate } from "../../../utils/paginate";

function Books() {
  const limit = 4;
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = books.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.auteur.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      item.category.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  async function getAllProducts() {
    try {
      const result = await bookServices.getAllBooks();
      //console.log(result.data);
      setBooks(result.data);
    } catch (error) {
      toast.error(error?.response?.data.message);
      return error;
    }
  }


  // async function deleteBook(id) {
  //   await bookServices.deleteProduct(id);
  //   getAllProducts();
  // }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    //console.log(currentPage);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const data = paginate(filteredData, limit, currentPage);
  return (
    <div>
      <header className="bg-white shadow">
        <div className=" flex justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Books
          </h1>
          <Link to={"/admin/books/new"}>Add Book</Link>
          <SearchBar onChange={handleSearchChange} value={searchTerm} />
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl py-6 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {data.map((book) => (
                  <div key={book._id} className="group relative">
                    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                      <img
                        src={book.image}
                        alt={book.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link to={`/books/${book._id}`}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            <p className="text-sm font-medium text-gray-900">
                              {book.name}
                            </p>
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {book.auteur}
                        </p>
                      </div>
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                        {book.category.name || ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Pagination
          eventsCount={filteredData.length}
          pageSize={limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}

export default Books;
