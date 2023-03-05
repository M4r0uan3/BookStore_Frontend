import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/20/solid";
import userService from "../../../services/adminServices";
import SearchBar from "../../layout/SearchBar";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = users.filter((u) => {
    return (
      u.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const result = await userService.getAllUsers();
      // console.log(result.data.users);
      setUsers(result.data.users);
    } catch (error) {
      return error;
    }
  }

  async function deleteUser(id) {
    await userService.deleteUser(id);
    getAllUsers();
  }
  const handleClick = (id) => {
    <Link to={`/users/edit/${id}`} />;
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Users
          </h1>
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
                  className="w-10 p-3 text-sm font-semibold tracking-wide text-left text-gray-500"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm font-semibold tracking-wide text-left text-gray-500"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm font-semibold tracking-wide text-left text-gray-500"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm font-semibold tracking-wide text-left text-gray-500"
                >
                  Email
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
                    <td className="p-3 text-sm text-gray-700">{i + 1}</td>
                    <td className="p-3 text-sm text-gray-700">{elem.fName}</td>
                    <td className="p-3 text-sm text-gray-700">{elem.lName}</td>
                    <td className="p-3 text-sm text-gray-700">
                      <span className="p-1.5 text-xs font-medium tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        {elem.email}
                      </span>
                    </td>
                    <td className="">
                      <Link
                        to={`/admin/users/edit/${elem._id}`}
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
                        onClick={() => deleteUser(elem._id)}
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

export default Users;
