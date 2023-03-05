import { useState, useEffect } from "react";
import catServices from "../../../services/categoriesServices";
import { toast } from "react-hot-toast";
import userService from "../../../services/adminServices";
import SearchBar from "../../layout/SearchBar";
import { Link } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/20/solid";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = categories.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleClick = (id) => {
    <Link to={`/admin/categories/edit/${id}`} />;
  };
  async function getAllCategories() {
    try {
      const result = await catServices.getAllCategories();
      //   console.log(result.data);
      setCategories(result.data);
    } catch (error) {
      toast.error(error?.response?.data.message);
      return error;
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);

  async function deleteCategory(id) {
    // await userService.deleteCategory(id);
    // toast.loading("Deleting Category!")
    getAllCategories();
    toast.promise(
      () => {
        userService.deleteCategory(id);
      },
      {
        loading: "Deleting Category...",
        success: <b>Category deleted!</b>,
        error: <b>Could not delete.</b>,
      }
    );
  }
  return (
    <>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>
          <Link to={"/admin/categories/new"}>Add Category</Link>
          <SearchBar onChange={handleSearchChange} value={searchTerm} />
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th
                  scope="col"
                  className="p-3 text-sm font-semibold tracking-wide text-left text-gray-500"
                >
                  Nom
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm font-semibold tracking-wide text-left text-gray-500"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="w-20 p-3 text-sm font-semibold tracking-wide text-left text-gray-500"
                >
                  Edit
                </th>
                <th
                  scope="col"
                  className="w-20 p-3 text-sm font-semibold tracking-wide text-left text-gray-500"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData?.map((elem, i) => {
                // console.log(elem);
                return (
                  <tr
                    key={elem._id}
                    className="bg-white"
                    onClick={() => {
                      handleClick(elem._id);
                    }}
                  >
                    <td className="p-3 text-sm text-gray-700">
                      <span className="p-1.5 text-xs font-medium tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                        {elem.name}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {elem.description}
                    </td>

                    <td className="">
                      <Link
                        to={`/admin/categories/edit/${elem._id}`}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <PencilIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteCategory(elem._id)}
                        className="mx-1 inline-flex items-center rounded-md border border-red-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default Categories;
