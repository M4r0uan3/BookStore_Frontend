import React from "react";
import { Link } from "react-router-dom";
function CategoryForm({title,updateCategory, category, handleChange}) {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title} Category
          </h1>
          <Link
            to={"/admin/categories"}
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
                    Category Information
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={updateCategory}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={category.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="space-y-1 col-span-6">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              value={category.description}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              defaultValue={""}
                            />
                          </div>
                        </div>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryForm;
