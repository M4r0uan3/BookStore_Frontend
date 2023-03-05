import React from 'react';

function SearchBar({ value,onChange }) {
  return (
    <div>
      {" "}
      <div className="flex items-center">
        <div className="flex border border-purple-200 rounded">
          <input
            type="text"
            name="query"
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
