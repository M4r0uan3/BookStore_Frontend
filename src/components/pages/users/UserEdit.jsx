import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import userServices from "../../../services/adminServices";
import { toast } from "react-hot-toast";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    async function fetchData() {
      const rep = await userServices.getUserById(id);
      //   console.log(rep.data.user);
      setUser(rep.data.user);
    }

    fetchData();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValue) => {
      // console.log(name + ": " + value);
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  async function updateUser(e) {
    navigate("/admin/users");
    try {
      await userServices.updateUser(user);
      toast.success("User Modified Successfully");
    } catch (e) {
      if (e.response.status === 500) {
        toast.error("Email already exists!");
      } else {
        toast.error("Error!");
      }

      // console.log(e);
    }
  }

  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Edit User
          </h1>
          <Link
            to={"/admin/users"}
            className="mx-1 inline-flex items-center rounded-md border border-red-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancel
          </Link>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    User Information
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={updateUser}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="py-7">
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button
                            type="button"
                            className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="fName"
                            id="fName"
                            value={user.fName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="auteur"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lName"
                            id="lName"
                            value={user.lName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="editeur"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="editeur"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="text"
                            name="password"
                            id="password"
                            //   value={user.password}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserEdit;
