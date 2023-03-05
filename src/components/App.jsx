import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import PrivateRoute from "./layout/PrivateRoute";
import NavBar from "./layout/NavBar";
import Books from "./pages/books/Books";
import BookDetails from "./pages/books/BookDetails";
import NotFound from "./pages/NotFound";
import BookEdit from "./pages/books/BookEdit";
import Users from "./pages/users/Users";
import UserDetails from "./pages/users/UserEdit";
import Categories from "./pages/categories/Categories";
import CategoryEdit from "./pages/categories/CategoryEdit";
import AddBook from "./pages/books/AddBook";
import AddCategory from "./pages/categories/AddCategory";

function App() {
  const [userDetails, setUserDetails] = useState(null);

  const handleLogout = () => {
    setUserDetails(null);
    localStorage.removeItem("token");
    <Navigate to={"/"} />;
  };

  useEffect(() => {
    setUserDetails(userDetails);
  }, [userDetails]);

  return (
    <>
      <BrowserRouter>
        <NavBar user={userDetails} handleLogout={handleLogout} />
        <Routes>
          <Route path="/admin" element={<PrivateRoute user={userDetails} />}>
            <Route path="books" element={<Books />} />
            <Route path="books/new/" element={<AddBook />} />
            <Route path="books/edit/:id" element={<BookEdit />} />
            <Route path="users" element={<Users />} />
            <Route path="users/edit/:id" element={<UserDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/new/" element={<AddCategory />} />
            <Route path="categories/edit/:id" element={<CategoryEdit />} />
          </Route>
          <Route path="/" element={<Dashboard />} exact />
          <Route
            path="/books/:id"
            element={<BookDetails user={userDetails} />}
          />
          <Route
            path="/login"
            element={<Login handleLogin={setUserDetails} />}
          />
          <Route
            path="/signup"
            element={<SignUp handleLogin={setUserDetails} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
