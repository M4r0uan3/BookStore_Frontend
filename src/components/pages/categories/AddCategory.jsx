import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../../../services/adminServices";
import { toast } from "react-hot-toast";
import CategoryForm from "./CategoryForm";

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setCategory((prevValue) => {
      //   console.log(name + ": " + value);
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  async function addCategory(e) {
    navigate("/admin/categories");
    try {
      await userServices.addCategory(category);
      toast.success("Category Added Successfully");
    } catch (e) {
      toast.error("Something went wrong!");
      console.log(e);
    }
  }

  return (
    <CategoryForm
      title={"Edit"}
      updateCategory={addCategory}
      category={category}
      handleChange={handleChange}
    />
  );
}

export default AddCategory;
