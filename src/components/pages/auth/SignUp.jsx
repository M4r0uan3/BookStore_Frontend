import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authServices from "../../../services/authServices";
import { toast } from "react-hot-toast";
import jwt_decode from "jwt-decode";
export default function SignUp({ handleLogin }) {
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValue) => {
      // console.log(name + ': ' + value)
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const navigate = useNavigate();

  async function signup(e) {
    
    e.preventDefault();

    try {
      const result = await authServices.signUp(user);
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        handleLogin(jwt_decode(result.data.token).email);
      }
      navigate("/");
      toast.success("User Created Successfully");
    } catch (error) {
      // console.log(error);
      setError("Email already exists", error);
      toast.error(error?.response?.data.message);
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://cdn-icons-png.flaticon.com/512/2702/2702069.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={signup}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                name="fName"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="First Name"
                value={user.fName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="lName"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Last Name"
                value={user.lName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to={"/login"}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
